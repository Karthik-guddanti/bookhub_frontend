// --- main.jsx ---
// This file is in /frontend/src/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // <-- Make sure this import ends with .jsx

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap App in AuthProvider and BrowserRouter */}
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);