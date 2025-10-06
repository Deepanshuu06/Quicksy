import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import HomePage from './pages/HomePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import Cart from './pages/Cart.jsx';
import Profile from './pages/Profile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:"/",
        element:<HomePage />
      },
      {
        path:"/login", 
        element: <LoginPage />
      },
      {
        path:"/register", 
        element: <RegistrationPage />
      },
      {
        path:"/category/:id",
        element: <CategoryPage />
      },
      {
        path:"/product/:id",
        element:<ProductPage />
      },
      {
        path:"/cart",
        element:<Cart />
      },
      {
        path:"/profile",
        element:<Profile />
      }
    ],

  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);