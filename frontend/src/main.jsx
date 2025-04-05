import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import About from './pages/About.jsx';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadFile from './pages/UploadFile.jsx';

import { AuthProvider, useAuth } from './context/AuthProvider.jsx';
import NotFound from './pages/NotFound.jsx';

// move the hook inside a component
const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Login />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/upload" element={<ProtectedRoute element={<UploadFile />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);