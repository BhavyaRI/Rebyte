import React from 'react';
import { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/Forgotpassword';
import ResetPassword from './components/Resetpassword';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <nav>
        <Link to='/Signup'>Signup</Link> | <Link to='/login'>Login</Link>
      </nav>
      <h1>My awesome app</h1>
      <Routes>
        <Route path='/Signup' element={<Signup />}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/Home' element={<Home />} />
        <Route path='/' element={<Signup />} />
        <Route path='/Forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetPassword/:token' element={<ResetPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
