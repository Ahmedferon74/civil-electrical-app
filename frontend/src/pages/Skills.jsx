import React from "react";
import '../styles/Skills.css';
import { useMedia } from "../context/MediaContext";

const Skills = () => {
  const { mediaItems } = useMedia();

  return (
    <div className="skills-container">
      <h2 className="skills-title">المهارات الفنية</h2>

      {/* ✅ قائمة المهارات النصية */}
      <section className="skills-section">
        <h3>🛠 قائمة المهارات:</h3>
        <ul>
          <li>تصميم أنظمة الكهرباء (الإضاءة - التكييف - الإنذار - القوى)</li>
          <li>رسم المخططات الكهربائية باستخدام AutoCAD وRevit</li>
          <li>تنفيذ التركيبات الكهربائية في المشاريع</li>
          <li>حساب الأحمال وتوزيع الدوائر الكهربائية</li>
          <li>العمل الجماعي والتنسيق مع فرق متعددة التخصصات</li>
        </ul>
      </section>

      {/* ✅ روابط الوسائط لسهولة الفحص */}
      {mediaItems.length > 0 && (
        <section className="skills-section">
          <h3>🔗 روابط الوسائط:</h3>
          <ul style={{ fontSize: '0.85rem', color: 'gray' }}>
            {mediaItems.map((item) => (
              <li key={`link-${item.id}`}>
                {item.title}:{" "}
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ✅ المعرض الفني */}
      <section className="skills-section">
        <h3>📸 المعرض الفني:</h3>

        {mediaItems.length === 0 ? (
          <p>🚫 لا توجد وسائط مضافة بعد.</p>
        ) : (
          <div className="media-gallery">
            {mediaItems.map((item) => (
              <div key={`media-${item.id}`} className="media-item">
                <h4>{item.title}</h4>
                <p>{item.description}</p>

                {item.type === "video" ? (
                  <div className="video-wrapper">
                    <iframe
                      src={item.url}
                      title={item.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      sandbox="allow-same-origin allow-scripts allow-presentation allow-popups"
                    ></iframe>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="image-preview"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Skills;
