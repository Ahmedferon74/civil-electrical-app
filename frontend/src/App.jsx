import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import CV from './pages/CV';
import Skills from './pages/Skills';
import Admin from './pages/Admin';

import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />

        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/admin" element={<Admin />} />
            {/* ✅ لو أضفت صفحة تسجيل دخول مستقبلاً، فعل السطر التالي:
                <Route path="/login" element={<Login />} /> 
            */}
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
