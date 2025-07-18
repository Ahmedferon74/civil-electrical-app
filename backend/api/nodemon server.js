const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// الحل الأول: استيراد البيانات مباشرة (الأفضل لـ Vercel)
// import media data directly instead of reading from file
const mediaData = require("./media.json");

// الحل البديل: إذا كان الملف في مجلد public
// Alternative: if the file is in public folder
app.get("/api/media", (req, res) => {
  try {
    // استخدام البيانات المستوردة مباشرة
    // Use directly imported data
    res.json(mediaData);
  } catch (error) {
    console.error("Error serving media data:", error);
    res.status(500).json({ error: "Failed to load media data" });
  }
});

// إضافة CORS headers للسماح بالوصول من الفرونت إند
// Add CORS headers to allow frontend access
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// إضافة endpoint للصحة العامة للسيرفر
// Add health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// معالجة الأخطاء العامة
// General error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// للتطوير المحلي فقط
// For local development only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


module.exports = app;