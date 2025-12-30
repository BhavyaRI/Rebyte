import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const useremail = { email };
      const response = await axios.post(
        "/api/forgotPassword",
        useremail
      );
      setSubmitted(true);
    } catch (error) {
      console.error("Error in sending mail", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 rounded-xl">
        <div className="card-body">
          {!submitted ? (
            <>
              <h2 className="text-center text-3xl font-bold text-neutral mb-4">
                Forgot Password
              </h2>
              <p className="text-center text-gray-500 mb-6 text-sm">
                Enter your registered email address below, and we’ll send you
                instructions to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label htmlFor="reset-email" className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    id="reset-email"
                    placeholder="Enter your email"
                    className="input input-bordered input-neutral w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-neutral w-full mt-4">
                  Request Password Reset
                </button>
              </form>

              <div className="text-center mt-4">
                <Link to="/Login" className="link link-primary text-sm">
                  Back to Login
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-center text-3xl font-bold text-success mb-2">
                Check Your Email
              </h2>
              <p className="text-center text-gray-500 mb-6 text-sm">
                If an account with that email exists, we've sent password reset
                instructions to your inbox.
              </p>
              <div className="text-center">
                <Link to="/Login" className="btn btn-neutral w-full">
                  Return to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
