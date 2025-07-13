import React, { useState } from "react";
import { useMedia } from "../context/MediaContext";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [file, setFile] = useState(null);
  const [code, setCode] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mediaItems, addMedia, deleteMedia } = useMedia();

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; // تم التعديل هنا
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  console.log("Cloudinary Cloud Name:", cloudName); // Debugging log
  console.log("Cloudinary Upload Preset:", preset); // Debugging log

  const handleAccess = () => {
    const validCode = import.meta.env.VITE_ADMIN_CODE || "123456";
    if (code === validCode) {
      setAccessGranted(true);
    } else {
      alert("❌ الرمز غير صحيح");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || (!mediaUrl && !file)) {
      return alert("⚠️ يرجى ملء جميع الحقول");
    }

    let uploadedUrl = mediaUrl;
    let type = "video";

    try {
      setLoading(true);

      if (file) {
        if (file.size > 10 * 1024 * 1024) {
          alert("❌ لا يمكن رفع ملف أكبر من 10 ميجا بايت");
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset);

        console.log("Attempting to upload to Cloudinary with:"); // Debugging log
        console.log("  cloudName:", cloudName); // Debugging log
        console.log("  preset:", preset); // Debugging log

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          { method: "POST", body: formData }
        );

        if (!uploadRes.ok) {
          const errorText = await uploadRes.text();
          throw new Error(`فشل رفع الملف إلى Cloudinary: ${errorText}`);
        }

        const uploadData = await uploadRes.json();
        uploadedUrl = uploadData.secure_url;
        type = file.type.startsWith("video") ? "video" : "image";
      } else {
        if (mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be")) {
          type = "video";
        } else {
          type = "image";
        }
      }

      await addMedia({ title, description, url: uploadedUrl, type });

      alert("✅ تمت الإضافة بنجاح");

      setTitle("");
      setDescription("");
      setFile(null);
      setMediaUrl("");
    } catch (err) {
      console.error("❌ خطأ في رفع الملف:", err.message);
      alert(`❌ حدث خطأ أثناء رفع الملف: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      {!accessGranted ? (
        <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
          <h3>🔐 أدخل رمز الدخول</h3>
          <input
            type="password"
            value={code}
            placeholder="رمز المشرف"
            onChange={(e) => setCode(e.target.value)}
            style={{ padding: "10px", width: "100%", margin: "10px 0" }}
          />
          <button onClick={handleAccess}>🔓 دخول</button>
        </div>
      ) : (
        <div>
          <h2>لوحة تحكم المشرف</h2>

          <form className="admin-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="عنوان المادة"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="وصف مختصر"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>📁 اختر ملف من الجهاز:</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <label>🌐 أو أدخل رابط مباشر (YouTube / صورة):</label>
            <input
              type="text"
              placeholder="https://youtube.com/embed/..."
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
            />

            <button type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? "⏳ جاري الرفع..." : "➕ إضافة"}
            </button>
          </form>

          <h3 style={{ marginTop: "30px" }}>📂 المواد المضافة:</h3>
          {mediaItems.length === 0 ? (
            <p>🚫 لا توجد مواد مضافة بعد.</p>
          ) : (
            mediaItems.map((item) => (
              <div key={`media-${item.id}`} className="media-item">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                {item.type === "video" ? (
                  <div className="video-wrapper">
                    <iframe
                      src={item.url}
                      title={item.title}
                      frameBorder="0"
                      allowFullScreen
                      sandbox="allow-same-origin allow-scripts allow-presentation"
                    />
                  </div>
                ) : (
                  <img src={item.url} alt={item.title} className="image-preview" />
                )}
                <button className="delete-btn" onClick={() => deleteMedia(item.id)}>
                  🗑 حذف
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;