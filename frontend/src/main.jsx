import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MediaProvider } from './context/MediaContext';
import { BrowserRouter } from 'react-router-dom'; // ✅ أضف هذا السطر

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ غلف التطبيق هنا */}
      <MediaProvider>
        <App />
      </MediaProvider>
    </BrowserRouter>
  </React.StrictMode>
);
