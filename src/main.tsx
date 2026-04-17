import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { BookingProvider } from './context/BookingContext';
import App from './App.tsx';
import './index.css';
import './i18n/config';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <ToastProvider>
          <BookingProvider>
            <App />
          </BookingProvider>
        </ToastProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
);
