import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AscencioTaxApp } from './AscencioTaxApp.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AscencioTaxApp />
  </StrictMode>
);
