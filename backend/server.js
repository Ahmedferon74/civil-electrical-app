console.log("🚀 Starting server...");
require("dotenv").config();
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "media.json");

// إعداد Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// إعداد Multer للذاكرة
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    // قبول الصور والفيديوهات فقط
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("نوع الملف غير مدعوم. يرجى رفع صور أو فيديوهات فقط."), false);
    }
  },
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ✅ راوت ترحيبي محسّن للمسار الرئيسي /
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Civil-Electrical API</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: "Cairo", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            text-align: center;
            padding: 50px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 600px;
            width: 100%;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            background: linear-gradient(45deg, #fff, #f0f0f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          p {
            font-size: 1.1rem;
            margin-bottom: 15px;
            line-height: 1.6;
          }
          a {
            color: #4fc3f7;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s ease;
          }
          a:hover {
            color: #29b6f6;
            text-shadow: 0 0 10px rgba(79, 195, 247, 0.5);
          }
          .api-info {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
            border-left: 4px solid #4fc3f7;
          }
          code {
            background: rgba(0, 0, 0, 0.3);
            padding: 4px 8px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
          }
          .status {
            display: inline-block;
            background: #4caf50;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🏗️ Civil-Electrical API</h1>
          <div class="status">✅ الخادم يعمل بنجاح</div>
          <p>مرحبًا بك في الواجهة الخلفية لتطبيق الهندسة المدنية والكهربائية</p>
          <p>هذا الخادم يدعم رفع الصور والفيديوهات باستخدام Cloudinary</p>
          
          <div class="api-info">
            <h3>🛠️ المسارات المتاحة:</h3>
            <p><code>GET /api/media</code> - جلب جميع الوسائط</p>
            <p><code>POST /api/media</code> - إضافة وسائط جديدة</p>
            <p><code>POST /api/upload</code> - رفع ملفات إلى Cloudinary</p>
            <p><code>DELETE /api/media/:id</code> - حذف وسائط</p>
          </div>
          
          <p style="margin-top: 30px;">
            لزيارة الموقع الكامل: 
            <a href="https://civil-electrical-app.vercel.app" target="_blank">اضغط هنا</a>
          </p>
        </div>
      </body>
    </html>
  `);
});

// ✅ رفع الملفات إلى Cloudinary
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "لم يتم اختيار ملف للرفع" });
    }

    // رفع الملف إلى Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto", // يدعم الصور والفيديوهات تلقائياً
        folder: "civil-electrical", // مجلد منظم في Cloudinary
        transformation: [
          { quality: "auto" }, // ضغط تلقائي
          { fetch_format: "auto" }, // تنسيق تلقائي
        ],
      },
      (error, result) => {
        if (error) {
          console.error("❌ خطأ في رفع الملف:", error);
          return res.status(500).json({ error: "فشل رفع الملف إلى Cloudinary" });
        }

        res.json({
          success: true,
          url: result.secure_url,
          public_id: result.public_id,
          resource_type: result.resource_type,
          format: result.format,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
          created_at: result.created_at,
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error("❌ خطأ في معالجة الرفع:", error);
    res.status(500).json({ error: "خطأ في الخادم أثناء رفع الملف" });
  }
});

// ✅ حذف ملف من Cloudinary
app.delete("/api/upload/:public_id", async (req, res) => {
  try {
    const { public_id } = req.params;
    const { resource_type = "image" } = req.query;

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: resource_type,
    });

    if (result.result === "ok") {
      res.json({ success: true, message: "تم حذف الملف بنجاح" });
    } else {
      res.status(404).json({ error: "الملف غير موجود" });
    }
  } catch (error) {
    console.error("❌ خطأ في حذف الملف:", error);
    res.status(500).json({ error: "فشل حذف الملف من Cloudinary" });
  }
});

// ✅ تحميل الوسائط
app.get("/api/media", (req, res) => {
  try {
    if (!fs.existsSync(DATA_FILE)) return res.json([]);
    const data = fs.readFileSync(DATA_FILE, "utf8");
    const media = JSON.parse(data);
    res.json(media);
  } catch (err) {
    console.error("❌ قراءة البيانات فشلت:", err.message);
    res.status(500).json({ error: "فشل تحميل الوسائط" });
  }
});

// ✅ إضافة وسائط
app.post("/api/media", (req, res) => {
  const { title, description, url, type, cloudinary_id } = req.body;

  if (!title || !description || !url || !type) {
    return res.status(400).json({ error: "جميع الحقول مطلوبة" });
  }

  try {
    const media = fs.existsSync(DATA_FILE)
      ? JSON.parse(fs.readFileSync(DATA_FILE, "utf8"))
      : [];

    const newItem = {
      id: Date.now(),
      title,
      description,
      url,
      type,
      cloudinary_id: cloudinary_id || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    media.push(newItem);
    fs.writeFileSync(DATA_FILE, JSON.stringify(media, null, 2), "utf8");

    res.status(201).json(newItem);
  } catch (err) {
    console.error("❌ خطأ أثناء الحفظ:", err.message);
    res.status(500).json({ error: "فشل حفظ البيانات" });
  }
});

// ✅ تحديث وسائط
app.put("/api/media/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, url, type } = req.body;

  try {
    if (!fs.existsSync(DATA_FILE)) return res.status(404).json({ error: "الملف غير موجود" });

    let media = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    const index = media.findIndex((item) => item.id === id);
    if (index === -1) return res.status(404).json({ error: "العنصر غير موجود" });

    media[index] = {
      ...media[index],
      title: title || media[index].title,
      description: description || media[index].description,
      url: url || media[index].url,
      type: type || media[index].type,
      updated_at: new Date().toISOString(),
    };

    fs.writeFileSync(DATA_FILE, JSON.stringify(media, null, 2), "utf8");
    res.json(media[index]);
  } catch (err) {
    console.error("❌ خطأ أثناء التحديث:", err.message);
    res.status(500).json({ error: "فشل تحديث البيانات" });
  }
});

// ✅ حذف وسائط
app.delete("/api/media/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    if (!fs.existsSync(DATA_FILE)) return res.status(404).json({ error: "الملف غير موجود" });

    let media = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    const index = media.findIndex((item) => item.id === id);
    if (index === -1) return res.status(404).json({ error: "العنصر غير موجود" });

    const item = media[index];

    // حذف الملف من Cloudinary إذا كان موجوداً
    if (item.cloudinary_id) {
      try {
        await cloudinary.uploader.destroy(item.cloudinary_id, {
          resource_type: item.type === "video" ? "video" : "image",
        });
        console.log(`✅ تم حذف الملف من Cloudinary: ${item.cloudinary_id}`);
      } catch (cloudinaryError) {
        console.error("⚠️ خطأ في حذف الملف من Cloudinary:", cloudinaryError);
        // نكمل العملية حتى لو فشل حذف الملف من Cloudinary
      }
    }

    media.splice(index, 1);
    fs.writeFileSync(DATA_FILE, JSON.stringify(media, null, 2), "utf8");

    res.json({ message: "تم الحذف بنجاح" });
  } catch (err) {
    console.error("❌ خطأ أثناء الحذف:", err.message);
    res.status(500).json({ error: "فشل حذف البيانات" });
  }
});

// ✅ معلومات Cloudinary
app.get("/api/cloudinary/info", (req, res) => {
  res.json({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    upload_preset: process.env.VITE_CLOUDINARY_PRESET,
    api_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}`,
  });
});

// ✅ معالجة الأخطاء العامة
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "حجم الملف كبير جداً. الحد الأقصى 10 ميجابايت" });
    }
  }

  console.error("❌ خطأ عام:", error);
  res.status(500).json({ error: error.message || "خطأ في الخادم" });
});

// ✅ معالجة المسارات غير الموجودة
app.use((req, res) => {
  res.status(404).json({ error: "المسار غير موجود" });
});

// ✅ تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📁 Cloudinary configured for: ${process.env.CLOUDINARY_CLOUD_NAME}`);
});
