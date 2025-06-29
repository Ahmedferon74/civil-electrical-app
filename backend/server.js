// backend/server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'media.json');

// إعداد مجلد الرفع
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

// تحميل البيانات
const loadMedia = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

// حفظ البيانات
const saveMedia = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// API endpoints
app.get('/api/media', (req, res) => {
  const media = loadMedia();
  res.json(media);
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'لم يتم رفع الملف' });
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.status(200).json({ url: fileUrl });
});

app.post('/api/media', (req, res) => {
  const { title, description, url, type } = req.body;
  if (!title || !description || !url || !type) {
    return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  }

  const media = loadMedia();

  // تحقق من وجود العنصر مسبقاً بنفس الرابط url
  const exists = media.find(item => item.url === url);
  if (exists) {
    return res.status(409).json({ error: 'هذا الملف أو الرابط موجود مسبقًا' });
  }

  const newItem = { id: Date.now(), title, description, url, type };
  media.unshift(newItem);
  saveMedia(media);

  res.status(201).json(newItem);
});

app.delete('/api/media/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let media = loadMedia();
  media = media.filter((item) => item.id !== id);
  saveMedia(media);
  res.status(204).end();
});

app.get('/', (req, res) => {
  res.send('🎉 الباك إند شغال تمام!');
});

app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل على: http://localhost:${PORT}`);
});
