const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const app = express();

app.use(cors());
app.use(express.json());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// نقطة تجريبية للتأكد إن السيرفر شغال
app.get("/api", (req, res) => {
  res.send("Serverless API is running!");
});

// مسار لرفع الوسائط إلى Cloudinary
app.post("/api/media", async (req, res) => {
  try {
    const { title, description, url, type } = req.body;

    // إذا كان هناك ملف مرفوع (من الواجهة الأمامية)
    if (url && url.startsWith("data:")) {
      const uploadResult = await cloudinary.uploader.upload(url, {
        resource_type: type === "video" ? "video" : "image",
      });
      const newMedia = { title, description, url: uploadResult.secure_url, type };
      // هنا يمكنك حفظ newMedia في قاعدة بيانات إذا كنت تستخدم واحدة
      res.status(201).json(newMedia);
    } else {
      // إذا كان رابط مباشر (مثل يوتيوب)
      const newMedia = { title, description, url, type };
      // هنا يمكنك حفظ newMedia في قاعدة بيانات إذا كنت تستخدم واحدة
      res.status(201).json(newMedia);
    }
  } catch (error) {
    console.error("Error uploading media:", error);
    res.status(500).json({ message: "Failed to upload media", error: error.message });
  }
});

// مسار لجلب الوسائط (مثال بسيط، ستحتاج إلى قاعدة بيانات حقيقية)
app.get("/api/media", (req, res) => {
  // هنا يجب أن تجلب الوسائط من قاعدة البيانات
  // كمثال، سأعيد قائمة فارغة أو بعض البيانات الوهمية
  res.json([]);
});

// مسار لحذف الوسائط (مثال بسيط، ستحتاج إلى قاعدة بيانات حقيقية)
app.delete("/api/media/:id", (req, res) => {
  // هنا يجب أن تحذف الوسائط من قاعدة البيانات
  res.status(204).send();
});

// تصدير التطبيق كوظيفة بلا خادم لـ Vercel
module.exports = app;


