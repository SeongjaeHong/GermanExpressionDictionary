import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Main from './components/Main.jsx';
import { ROUTES } from './assets/constants.js';

const routes = createBrowserRouter([
  {
    path: ROUTES.home,
    Component: App,
    children: [
      { index: true, Component: Main },
      { path: ROUTES.starred, Component: Main },
    ],
  },
]);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service_worker.js')
      .then((reg) => console.log('✅ SW registered:', reg.scope))
      .catch((err) => console.error('❌ SW registration failed:', err));
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
