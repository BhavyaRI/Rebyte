import React from 'react';
import { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/Forgotpassword';
import ResetPassword from './components/Resetpassword';
import { Routes, Route, Link } from 'react-router-dom';
//import './index.css'
import './App.css';
import ProtectedRoute from './Routes/ProtectedRoutes';
import PublicRoute from './Routes/PublicRoutes';


function App() {
  return (
    <div className='App'>
      <div className="navbar bg-base shadow-md px-6">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold text-neutral">
            MyApp
          </Link>
        </div>
        <div className="flex-none space-x-4">
          <Link to="/signup" className="btn btn-outline btn-neutral">
            Signup
          </Link>
          <Link to="/login" className="btn btn-neutral">
            Login
          </Link>
        </div>
      </div>
      <Routes>
        <Route path='/Signup' element={<PublicRoute><Signup /></PublicRoute>}/>
        <Route path='/Login' element={<PublicRoute><Login /></PublicRoute>}/>
        <Route path='/Home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/' element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path='/Forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetPassword/:token' element={<ResetPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
