import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/foundation.css';
import './styles/runtime.css';
import './styles/site.css';
import './styles/globals.css';
import './styles/accessibility.css';

createRoot(document.getElementById('app')!).render(
  <StrictMode><App /></StrictMode>,
);
