import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setpasswordConfirm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signupData = { email, password, passwordConfirm };
      const response = await axios.post(
        'https://psychic-system-xxxp69rwj7j399gq-3000.app.github.dev/api/signin',
        signupData
      );
      console.log('Signup successful:', response.data);
      navigate('/Login');
    } catch (error) {
      console.error('There was an error signing up', error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold text-neutral mb-2">
            Create an Account
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Fill in your details to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="input input-bordered input-neutral w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="input input-bordered input-neutral w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="passwordConfirm">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                id="passwordConfirm"
                placeholder="Confirm password"
                className="input input-bordered input-neutral w-full"
                value={passwordConfirm}
                onChange={(e) => setpasswordConfirm(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-neutral w-full mt-4">
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{' '}
              <Link to="/Login" className="link link-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
