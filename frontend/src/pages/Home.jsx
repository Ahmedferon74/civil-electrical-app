import React, { useEffect, useState } from 'react';
import '../styles/Home.css';

const Home = () => {
  const whatsappNumber = '966561868366';
  const [scrollY, setScrollY] = useState(0);

  // تأثير التمرير
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // تأثير الظهور عند التمرير
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: '⚡',
      title: 'الأعمال الكهربائية',
      description: 'تمديد وصيانة الأنظمة الكهربائية، تركيب لوحات التوزيع، والإنارة'
    },
    {
      icon: '🔧',
      title: 'أعمال السباكة',
      description: 'تمديد شبكات المياه والصرف الصحي، تركيب وصيانة الأدوات الصحية'
    },
    {
      icon: '🏗️',
      title: 'الأعمال المدنية',
      description: 'تنفيذ المشاريع الإنشائية والتشطيبات حسب أعلى معايير الجودة'
    },
    {
      icon: '🛡️',
      title: 'أنظمة الأمان',
      description: 'تركيب أنظمة الإنذار، كاميرات المراقبة، وأنظمة الحماية'
    }
  ];

  const stats = [
    { number: '5+', label: 'سنوات خبرة' },
    { number: '200+', label: 'مشروع منجز' },
    { number: '100%', label: 'رضا العملاء' },
    { number: '24/7', label: 'خدمة متواصلة' }
  ];

  return (
    <div className="home">
      {/* شريط التقدم */}
      <div 
        className="progress-bar" 
        style={{ 
          width: `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` 
        }}
      />

      {/* قسم الترحيب الرئيسي */}
      <section className="welcome-section animate-fade-in-up">
        <div className="parallax-bg" style={{ transform: `translateY(${scrollY * 0.5}px)` }} />
        <h1 className="home-heading">
          مرحبًا بك في الموقع الرسمي لفني الكهرباء والسباكة
        </h1>
        <p className="home-paragraph">
          هذا الموقع يقدّم نبذة شاملة عن الخدمات الفنية المقدّمة في مجال الكهرباء والسباكة داخل المملكة العربية السعودية، ويعرض السيرة الذاتية، المهارات، وأحدث المشاريع المنفذة.
        </p>
        <p className="home-paragraph">
          يمكنك تصفح أقسام الموقع للاطلاع على صور الأعمال السابقة، الفيديوهات التوضيحية، والتواصل مباشرة لطلب الخدمة المناسبة.
        </p>
      </section>

      {/* قسم الخدمات */}
      <section className="scroll-reveal">
        <h2 className="home-subheading">🛠️ خدماتنا المتميزة</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <span className="service-icon">{service.icon}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* قسم الإحصائيات */}
      <section className="scroll-reveal">
        <h2 className="home-subheading">📊 إنجازاتنا بالأرقام</h2>
        <div className="stats-section">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* قسم نبذة عني */}
      <section className="about-section scroll-reveal">
        <h2 className="home-subheading">👨‍🔧 نبذة عني</h2>
        <p className="home-paragraph">
          أنا فني متخصص في أعمال الكهرباء والسباكة، أعمل في المملكة العربية السعودية، وأمتلك أكثر من 5 سنوات من الخبرة العملية في تنفيذ وتمديد الأنظمة الكهربائية والسباكة للمنازل والمشاريع الصغيرة والمتوسطة.
        </p>
        <p className="home-paragraph">
          أحرص على تقديم خدمة احترافية بجودة عالية، سواء في التمديدات الكهربائية (الإنارة، المفاتيح، القواطع، اللوحات) أو أعمال السباكة (التمديدات، التركيبات، الصيانة). رضى العميل وجودة العمل هما أولويتي دائمًا.
        </p>
        <p className="home-paragraph">
          أعمل وفقاً لأحدث المعايير والمواصفات الفنية، مع الالتزام الكامل بمعايير السلامة المهنية. كما أحرص على استخدام أفضل المواد والأدوات لضمان جودة العمل واستدامته.
        </p>
      </section>

      {/* قسم التواصل */}
      <section className="contact-section scroll-reveal">
        <h2 className="home-subheading">📞 تواصل معي</h2>
        <p className="home-paragraph">
          للحجز أو الاستفسار، تواصل مباشرة عبر واتساب للحصول على استشارة مجانية وعرض سعر مناسب
        </p>
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button bounce-in"
        >
          <span>💬</span>
          تواصل عبر واتساب
        </a>
        <p className="home-paragraph" style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
          متاح للرد على استفساراتكم من 8 صباحاً حتى 10 مساءً
        </p>
      </section>
    </div>
  );
};

export default Home;

