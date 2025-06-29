import React, { createContext, useContext, useState, useEffect } from 'react';

const MediaContext = createContext();

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};

export const MediaProvider = ({ children }) => {
  const [mediaItems, setMediaItems] = useState([]);

  // ✅ جلب الوسائط من السيرفر
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/media');
        const data = await res.json();
        setMediaItems(data);
      } catch (err) {
        console.error('❌ فشل في تحميل الوسائط من الباك إند:', err);
      }
    };

    fetchMedia();
  }, []);

  // ✅ إضافة وسائط من السيرفر فقط
  const addMedia = async (item) => {
    // لا تضف إذا لم يكن بها id (حالة blob مؤقتة)
    if (!item || !item.title || !item.url) return;

    // إذا كان فيها id => أُرسلت بالفعل من الباك إند
    if (item.id) {
      setMediaItems((prev) => [item, ...prev]);
      return;
    }

    // إرسال للسيرفر
    try {
      const res = await fetch('http://localhost:5000/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      const newItem = await res.json();
      setMediaItems((prev) => [newItem, ...prev]);
    } catch (err) {
      console.error('❌ فشل في إضافة الوسيط إلى الباك إند:', err);
    }
  };

  // ✅ حذف وسائط من الباك إند
  const deleteMedia = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/media/${id}`, {
        method: 'DELETE',
      });
      setMediaItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('❌ فشل في حذف الوسيط من الباك إند:', err);
    }
  };

  return (
    <MediaContext.Provider value={{ mediaItems, addMedia, deleteMedia }}>
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContext;
