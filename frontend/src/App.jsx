import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ بدون BrowserRouter هنا

import Navbar from './components/Navbar';
import Home from './pages/Home';
import CV from './pages/CV';
import Skills from './pages/Skills';
import Admin from './pages/Admin';

import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
