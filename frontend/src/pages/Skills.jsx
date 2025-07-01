// Skills.jsx

import React from "react";
import '../styles/Skills.css';
import { useMedia } from "../context/MediaContext"; // ✅ التأكد من المسار الصحيح

const Skills = () => {
  const { mediaItems } = useMedia(); // ✅ استخدام الهوك هنا

  return (
    <div className="skills-container">
      <h2 className="skills-title">المهارات الفنية</h2>

      {/* قائمة المهارات */}
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

      {/* المعرض الفني */}
      <section className="skills-section">
        <h3>📸 المعرض الفني:</h3>

        {mediaItems.length === 0 ? (
          <p>🚫 لا توجد وسائط مضافة بعد.</p>
        ) : (
          <>
            {/* فحص روابط الوسائط */}
            <div style={{ marginBottom: '20px', fontSize: '0.85rem', color: 'gray' }}>
              <strong>فحص روابط الوسائط:</strong>
              <ul>
                {mediaItems.map(item => (
                  <li key={'link-'+item.id}>
                    {item.title}: <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="media-gallery">
              {mediaItems.map((item) => (
                <div key={item.id} className="media-item">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  {item.type === 'video' ? (
                    <div className="video-wrapper">
                      <iframe
                        src={item.url}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
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
          </>
        )}
      </section>
    </div>
  );
};

export default Skills;