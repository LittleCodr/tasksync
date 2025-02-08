import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CustomCursor } from './components/CustomCursor';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomCursor />
    <App />
  </StrictMode>
);