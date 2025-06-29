import React, { useState } from 'react';
import '../styles/Admin.css';
import { useMedia } from '../context/MediaContext';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [file, setFile] = useState(null);
  const [code, setCode] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);

  const { mediaItems, addMedia, deleteMedia } = useMedia();

  const handleAccess = () => {
    if (code === '123456') {
      setAccessGranted(true);
    } else {
      alert('❌ الرمز غير صحيح');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || (!mediaUrl && !file)) {
      alert('⚠️ يرجى ملء جميع الحقول');
      return;
    }

    let uploadedUrl = mediaUrl;
    let type = 'video';

    try {
      // رفع الملف إذا وُجد
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadRes = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();
        uploadedUrl = uploadData.url;
        type = file.type.startsWith('video') ? 'video' : 'image';
      }

      // تحقق من وجود الملف أو الرابط مسبقًا في mediaItems
      const exists = mediaItems.some((item) => item.url === uploadedUrl);
      if (exists) {
        alert('⚠️ هذا الملف أو الرابط موجود مسبقًا.');
        return;
      }

      // إرسال البيانات للسيرفر
      const mediaRes = await fetch('http://localhost:5000/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, url: uploadedUrl, type }),
      });

      if (!mediaRes.ok) {
        const errData = await mediaRes.json();
        alert(`❌ خطأ: ${errData.error}`);
        return;
      }

      const savedItem = await mediaRes.json();

      // أضف العنصر الجديد للسياق
      addMedia(savedItem);

      alert('✅ تمت الإضافة بنجاح');

      // تفريغ الحقول
      setTitle('');
      setDescription('');
      setMediaUrl('');
      setFile(null);
    } catch (error) {
      console.error('❌ خطأ في رفع الملف:', error);
      alert('حدث خطأ أثناء رفع الملف');
    }
  };

  return (
    <div className="admin-page">
      {!accessGranted ? (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
          <h3>🔐 أدخل رمز الدخول</h3>
          <input
            type="password"
            value={code}
            placeholder="رمز المشرف"
            onChange={(e) => setCode(e.target.value)}
            style={{ padding: '10px', width: '100%', margin: '10px 0' }}
          />
          <button onClick={handleAccess}>دخول</button>
        </div>
      ) : (
        <>
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
            ></textarea>

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

            <button type="submit">➕ إضافة</button>
          </form>

          <h3 style={{ marginTop: '30px' }}>📂 المواد المضافة:</h3>
          {mediaItems.length === 0 ? (
            <p>🚫 لا توجد مواد مضافة بعد.</p>
          ) : (
            mediaItems.map((item) => (
              <div key={item.id} className="media-item">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                {item.type === 'video' ? (
                  <div className="video-wrapper">
                    <iframe
                      src={item.url}
                      title={item.title}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <img src={item.url} alt={item.title} className="image-preview" />
                )}
                <button
                  className="delete-btn"
                  onClick={() => deleteMedia(item.id)}
                >
                  🗑 حذف
                </button>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Admin;
