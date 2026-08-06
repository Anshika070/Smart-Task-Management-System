import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './features/auth/AuthContext';
import './styles/global.css';
import './styles/theme.css';
createRoot(document.getElementById('root')).render(<AuthProvider><App /></AuthProvider>);
