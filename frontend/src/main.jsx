// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ✅ استيراد الـ Context الصحيح بدون .jsx
import { MediaProvider } from './context/MediaContext';

// ✅ استيراد CSS الأساسي
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MediaProvider>
      <App />
    </MediaProvider>
  </React.StrictMode>
);
