import React, { createContext, useContext, useState, useEffect } from "react";

const MediaContext = createContext();

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) throw new Error("useMedia must be used within a MediaProvider");
  return context;
};

export const MediaProvider = ({ children }) => {
  const [mediaItems, setMediaItems] = useState([]);
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // تحميل الوسائط من السيرفر
  const fetchMedia = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/media`);
      if (!res.ok) throw new Error(`فشل جلب البيانات: ${res.status}`);
      const data = await res.json();
      setMediaItems(data);
    } catch (err) {
      console.error("❌ فشل تحميل الوسائط:", err.message);
      setMediaItems([
        {
          id: Date.now(),
          title: "فشل الاتصال",
          description: "يرجى التحقق من السيرفر أو الإنترنت",
          url: "https://via.placeholder.com/600x400?text=No+Connection",
          type: "image",
        },
      ]);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [API_BASE]);

  // إضافة عنصر وسائط جديد (يسمح بالتكرار)
  const addMedia = async (item) => {
    if (!item || !item.title || !item.url || !item.type) return;

    try {
      const res = await fetch(`${API_BASE}/api/media`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "فشل إرسال البيانات");
      }

      const savedItem = await res.json();
      setMediaItems((prev) => [savedItem, ...prev]);
    } catch (err) {
      console.error("❌ خطأ أثناء الإضافة:", err.message);
      alert(`⚠️ لم يتم رفع الملف: ${err.message}`);
    }
  };

  // حذف عنصر وسائط
  const deleteMedia = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/media/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("فشل في الحذف");

      setMediaItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("❌ خطأ أثناء الحذف:", err.message);
      alert(`⚠️ لم يتم حذف العنصر: ${err.message}`);
    }
  };

  return (
    <MediaContext.Provider value={{ mediaItems, addMedia, deleteMedia, fetchMedia }}>
      {children}
    </MediaContext.Provider>
  );
};
