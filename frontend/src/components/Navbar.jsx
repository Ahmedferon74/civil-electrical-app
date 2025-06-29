import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState('light');

  // تحميل الوضع من localStorage عند بدء التشغيل
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  // تبديل الوضع
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="navbar">
      <div className="logo">🏗️ فني معماري كهرباء</div>

      <nav className="nav-links">
        <Link to="/">الرئيسية</Link>
        <Link to="/cv">السيرة الذاتية</Link>
        <Link to="/skills">المهارات</Link>
        <Link to="/admin">لوحة التحكم</Link>
      </nav>

      <div className="theme-toggle-container">
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === 'dark' ? '☀️ وضع نهاري' : '🌙 وضع ليلي'}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
