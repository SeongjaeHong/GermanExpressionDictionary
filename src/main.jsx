import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import App from './App.jsx';
import { ROUTES } from './assets/constants.js';
import Main from './components/Main.jsx';

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
      .catch((err) => console.error('❌ SW registration failed:', err));
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
