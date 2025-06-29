import React, { createContext, useContext, useState, useEffect } from 'react';

// ✅ إنشاء السياق
const MediaContext = createContext();

// ✅ هوك مخصص للوصول إلى السياق بسهولة
export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};

// ✅ المزود الرئيسي للسياق
export const MediaProvider = ({ children }) => {
  const [mediaItems, setMediaItems] = useState([]);

  // ✅ تحميل الوسائط من الباك إند عند أول تحميل
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/media');
        const data = await res.json();
        setMediaItems(data);
      } catch (err) {
        console.error('❌ فشل تحميل الوسائط من الباك إند:', err);
      }
    };

    fetchMedia();
  }, []);

  // ✅ إضافة عنصر وسائط جديد بدون تكرار
  const addMedia = async (item) => {
    if (!item || !item.title || !item.url || !item.type) return;

    try {
      const res = await fetch('http://localhost:5000/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (!res.ok) throw new Error('فشل إرسال البيانات إلى السيرفر');

      const savedItem = await res.json();

      setMediaItems((prev) => {
        // تحقق إذا العنصر موجود مسبقًا عبر id أو url
        const exists = prev.some((m) => m.id === savedItem.id || m.url === savedItem.url);
        if (exists) return prev; // إذا موجود، لا تضيفه
        return [savedItem, ...prev]; // إذا غير موجود، أضف العنصر
      });
    } catch (err) {
      console.error('❌ خطأ أثناء الإضافة:', err);
    }
  };

  // ✅ حذف عنصر بالـ id
  const deleteMedia = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/media/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('فشل في حذف الوسيط من السيرفر');

      setMediaItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('❌ خطأ أثناء الحذف:', err);
    }
  };

  return (
    <MediaContext.Provider value={{ mediaItems, addMedia, deleteMedia }}>
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContext;
