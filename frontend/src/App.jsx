import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import AppLayout from './components/layout/AppLayout';

// Pages
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/Forgotpassword';
import ResetPassword from './components/Resetpassword';
import AnalyticsPage from './components/LinkAnalytics'; 

// Route Guards
import ProtectedRoute from './Routes/ProtectedRoutes';
import PublicRoute from './Routes/PublicRoutes';

function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<PublicRoute><PublicLayout /></PublicRoute>}
      >
        <Route index element={<Signup />} /> {/* Default page at / */}
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="resetPassword/:token" element={<ResetPassword />} />
      </Route>

      <Route 
        path="/" 
        element={<ProtectedRoute><AppLayout /></ProtectedRoute>}
      >
        <Route path="home" element={<Home />} />
        <Route path="analytics/:linkId" element={<AnalyticsPage />} />
      </Route>
    </Routes>
  );
}

export default App;