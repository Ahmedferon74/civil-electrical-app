import React from 'react';
import '../styles/Home.css'; // استيراد ملف CSS الخارجي

const Home = () => {
  const whatsappNumber = '966561868366'; // ✅ عدل الرقم هنا إلى رقمك الحقيقي بدون '+' فقط رمز الدولة

  return (
    <div className="home">
      <section className="welcome-section">
        <h1 className="home-heading">مرحبًا بك في الموقع الرسمي لفني الكهرباء والسباكة</h1>
        <p className="home-paragraph">
          هذا الموقع يقدّم نبذة شاملة عن الخدمات الفنية المقدّمة في مجال الكهرباء والسباكة داخل المملكة العربية السعودية، ويعرض السيرة الذاتية، المهارات، وأحدث المشاريع المنفذة.
        </p>
        <p className="home-paragraph">
          يمكنك تصفح أقسام الموقع للاطلاع على صور الأعمال السابقة، الفيديوهات التوضيحية، والتواصل مباشرة لطلب الخدمة المناسبة.
        </p>
      </section>

      <section className="about-section">
        <h2 className="home-subheading">نبذة عني</h2>
        <p className="home-paragraph">
          أنا فني متخصص في أعمال الكهرباء والسباكة، أعمل في المملكة العربية السعودية، وأمتلك أكثر من 5 سنوات من الخبرة العملية في تنفيذ وتمديد الأنظمة الكهربائية والسباكة للمنازل والمشاريع الصغيرة والمتوسطة.
        </p>
        <p className="home-paragraph">
          أحرص على تقديم خدمة احترافية بجودة عالية، سواء في التمديدات الكهربائية (الإنارة، المفاتيح، القواطع، اللوحات) أو أعمال السباكة (التمديدات، التركيبات، الصيانة). رضى العميل وجودة العمل هما أولويتي دائمًا.
        </p>
      </section>

      <section className="contact-section">
        <h2 className="home-subheading">📞 تواصل معي</h2>
        <p className="home-paragraph">للحجز أو الاستفسار، تواصل مباشرة عبر واتساب:</p>
        <a
          href="https://wa.me/966561868366"
             target="_blank"
            rel="noopener noreferrer"
           className="whatsapp-button"
>
  💬 تواصل عبر واتساب
</a>

      </section>
    </div>
  );
};

export default Home;
