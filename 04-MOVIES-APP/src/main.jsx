import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LibraryProvider } from './context/LibraryContext';
import { ToastProvider } from './context/ToastContext';
import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <LibraryProvider>
          <App />
        </LibraryProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
);
