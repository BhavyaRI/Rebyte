import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, data } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const logindata = { email, password };
      const response = await axios.post(
        'https://psychic-system-xxxp69rwj7j399gq-3000.app.github.dev/api/login',
        logindata
      );
      console.log('Login successful', response.data);
      if(response.data.token){
        localStorage.setItem('jwtToken',response.data.token);
      }
      navigate('/Home');
    } catch (error) {
      console.error('There was a problem logging in', error.response.data);
    }
  };

  return (
    <div className="min h-screen flex justify-center items-center bg-base-200 ">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 rounded-xl">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold text-default mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Please log in to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="login-email">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="login-email"
                placeholder="Enter your email"
                className="input input-bordered input-default w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="login-password">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="login-password"
                placeholder="Enter your password"
                className="input input-bordered input-default w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type = "button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setshowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <label className="label text-sm">
                <Link
                  to="/ForgotPassword"
                  className="label-text-alt link link-primary"
                >
                  Forgot password?
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-neutral w-full mt-4"
            >
              Log In
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm">
              Don't have an account?{' '}
              <Link to="/Signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
