console.log("🚀 Starting server...");
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'media.json');

app.use(cors());
app.use(express.json());

// راوت ترحيبي للمسار الرئيسي /
app.get('/', (req, res) => {
  res.send('📡 Welcome to Civil-Electrical API');
});

// تحميل الوسائط
app.get('/api/media', (req, res) => {
  try {
    if (!fs.existsSync(DATA_FILE)) return res.json([]);
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const media = JSON.parse(data);
    res.json(media);
  } catch (err) {
    console.error('❌ قراءة البيانات فشلت:', err.message);
    res.status(500).json({ error: 'فشل تحميل الوسائط' });
  }
});

// إضافة وسائط (يسمح بالتكرار)
app.post('/api/media', (req, res) => {
  const { title, description, url, type } = req.body;

  if (!title || !description || !url || !type) {
    return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  }

  try {
    const media = fs.existsSync(DATA_FILE)
      ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
      : [];

    const newItem = {
      id: Date.now(),
      title,
      description,
      url,
      type,
    };

    media.push(newItem);
    fs.writeFileSync(DATA_FILE, JSON.stringify(media, null, 2), 'utf8');

    res.status(201).json(newItem);
  } catch (err) {
    console.error('❌ خطأ أثناء الحفظ:', err.message);
    res.status(500).json({ error: 'فشل حفظ البيانات' });
  }
});

// حذف وسائط
app.delete('/api/media/:id', (req, res) => {
  const id = parseInt(req.params.id);

  try {
    if (!fs.existsSync(DATA_FILE)) return res.status(404).json({ error: 'الملف غير موجود' });

    let media = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const index = media.findIndex((item) => item.id === id);
    if (index === -1) return res.status(404).json({ error: 'العنصر غير موجود' });

    media.splice(index, 1);
    fs.writeFileSync(DATA_FILE, JSON.stringify(media, null, 2), 'utf8');

    res.json({ message: 'تم الحذف بنجاح' });
  } catch (err) {
    console.error('❌ خطأ أثناء الحذف:', err.message);
    res.status(500).json({ error: 'فشل حذف البيانات' });
  }
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
