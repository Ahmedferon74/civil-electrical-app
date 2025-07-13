import React, { useState, useEffect } from 'react';
import '../styles/Skills.css';

const Skills = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب الوسائط من الخادم
  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/media');
      if (!response.ok) throw new Error('فشل في جلب البيانات');
      const data = await response.json();
      setMedia(data);
    } catch (err) {
      setError(err.message);
      console.error('خطأ في جلب الوسائط:', err);
    } finally {
      setLoading(false);
    }
  };

  const skills = [
    {
      category: 'الأعمال الكهربائية',
      icon: '⚡',
      color: '#3b82f6',
      items: [
        { name: 'تمديد أنظمة الكهرباء', level: 95, description: 'الإضاءة - الأنذار - القوى' },
        { name: 'قراءة المخططات الكهربائية', level: 90, description: 'باستخدام AutoCAD و Revit' },
        { name: 'تركيب التركيبات الكهربائية', level: 88, description: 'في المشاريع' },
        { name: 'كتابة الأحمال وتوزيع الدوائر الكهربائية', level: 85, description: '' },
        { name: 'العمل الجماعي والتنسيق', level: 92, description: 'مع فرق متعددة التخصصات' }
      ]
    },
    {
      category: 'أعمال السباكة',
      icon: '🔧',
      color: '#10b981',
      items: [
        { name: 'تمديد شبكات المياه', level: 90, description: 'للمباني السكنية والتجارية' },
        { name: 'تركيب الأدوات الصحية', level: 88, description: 'حسب أحدث المعايير' },
        { name: 'صيانة أنظمة السباكة', level: 85, description: 'الوقائية والطارئة' },
        { name: 'تمديد شبكات الصرف', level: 87, description: 'وفقاً للمواصفات' }
      ]
    },
    {
      category: 'المهارات التقنية',
      icon: '💻',
      color: '#f59e0b',
      items: [
        { name: 'AutoCAD', level: 85, description: 'لرسم المخططات الفنية' },
        { name: 'Revit', level: 80, description: 'للنمذجة ثلاثية الأبعاد' },
        { name: 'أنظمة الأمان والمراقبة', level: 88, description: 'كاميرات وأنذار حريق' },
        { name: 'قراءة المواصفات الفنية', level: 92, description: 'والمعايير السعودية' }
      ]
    },
    {
      category: 'المهارات الشخصية',
      icon: '🎯',
      color: '#8b5cf6',
      items: [
        { name: 'إدارة المشاريع', level: 88, description: 'التخطيط والتنفيذ' },
        { name: 'حل المشاكل', level: 90, description: 'بطرق إبداعية وفعالة' },
        { name: 'التواصل الفعال', level: 85, description: 'مع العملاء والفرق' },
        { name: 'الالتزام بالمواعيد', level: 95, description: 'والجودة المطلوبة' }
      ]
    }
  ];

  const certifications = [
    {
      title: 'شهادة السلامة المهنية',
      issuer: 'المؤسسة العامة للتدريب التقني',
      year: '2023',
      icon: '🛡️'
    },
    {
      title: 'دورة AutoCAD المتقدمة',
      issuer: 'معهد التدريب التقني',
      year: '2022',
      icon: '📐'
    },
    {
      title: 'شهادة أنظمة الإنذار والحريق',
      issuer: 'الدفاع المدني السعودي',
      year: '2023',
      icon: '🚨'
    }
  ];

  if (loading) {
    return (
      <div className="skills-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>جاري تحميل المهارات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="skills-container">
      {/* العنوان الرئيسي */}
      <div className="skills-header">
        <h1 className="skills-title">🛠️ المهارات الفنية</h1>
        <p className="skills-subtitle">
          خبرة متنوعة في مجالات الكهرباء والسباكة والأعمال المدنية
        </p>
      </div>

      {/* قسم المهارات */}
      <div className="skills-grid">
        {skills.map((category, categoryIndex) => (
          <div key={categoryIndex} className="skill-category" style={{ '--category-color': category.color }}>
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <h2 className="category-title">{category.category}</h2>
            </div>
            
            <div className="skills-list">
              {category.items.map((skill, skillIndex) => (
                <div key={skillIndex} className="skill-item">
                  <div className="skill-info">
                    <h3 className="skill-name">{skill.name}</h3>
                    {skill.description && (
                      <p className="skill-description">{skill.description}</p>
                    )}
                  </div>
                  
                  <div className="skill-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${skill.level}%`,
                          backgroundColor: category.color
                        }}
                      ></div>
                    </div>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* قسم الشهادات */}
      <div className="certifications-section">
        <h2 className="section-title">🏆 الشهادات والدورات</h2>
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="certification-card">
              <div className="cert-icon">{cert.icon}</div>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <span className="cert-year">{cert.year}</span>
            </div>
          ))}
        </div>
      </div>

      {/* قسم المعرض الفني */}
      <div className="portfolio-section">
        <h2 className="section-title">📸 المعرض الفني</h2>
        
        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
            <button onClick={fetchMedia} className="retry-btn">إعادة المحاولة</button>
          </div>
        )}

        {media.length === 0 && !error ? (
          <div className="empty-portfolio">
            <div className="empty-icon">📁</div>
            <h3>لا توجد أعمال في المعرض حالياً</h3>
            <p>سيتم إضافة صور وفيديوهات الأعمال المنجزة قريباً</p>
          </div>
        ) : (
          <div className="media-grid">
            {media.map((item) => (
              <div key={item.id} className="media-item">
                {item.type === 'image' ? (
                  <div className="image-container">
                    <img 
                      src={item.url} 
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=فشل+تحميل+الصورة';
                      }}
                    />
                    <div className="media-overlay">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ) : (
                  <div className="video-container">
                    <video 
                      controls 
                      poster={item.thumbnail || ''}
                      preload="metadata"
                    >
                      <source src={item.url} type="video/mp4" />
                      متصفحك لا يدعم تشغيل الفيديو
                    </video>
                    <div className="media-overlay">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* روابط الوسائط */}
      <div className="media-links-section">
        <h2 className="section-title">🔗 روابط الوسائط</h2>
        <div className="links-grid">
          <a 
            href="https://via.placeholder.com/600x400?text=فشل+الاتصال" 
            target="_blank" 
            rel="noopener noreferrer"
            className="media-link"
          >
            <span className="link-icon">🔗</span>
            <span className="link-text">كتالوج الأعمال</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Skills;
