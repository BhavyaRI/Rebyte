import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);
  // Add a submitted state to show success message
  const [submitted, setSubmitted] = useState(false);

  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
       setError("Password must be at least 6 characters long.");
       return;
    }

    try {
      const passworddata = { password, passwordConfirm };
      // Note: The /r/ proxy fix we discussed is important for this URL to work correctly
      const url = `/api/resetPassword/${token}`;
      
      await axios.patch(url, passworddata);

      // Instead of alert/navigate immediately, show success state
      setSubmitted(true);
    } catch (error) {
      // Using the corrected error handling variable 'error'
      setError(
        error.response?.data?.message || "An unknown error occurred."
      );
      console.error(
        "There was an error resetting the password:",
        error.response?.data
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 rounded-xl">
        <div className="card-body">
          {!submitted ? (
            <>
              <h2 className="text-center text-3xl font-bold text-neutral mb-4">
                Reset Password
              </h2>
              <p className="text-center text-gray-500 mb-6 text-sm">
                Please enter your new password below.
              </p>

              {error && (
                <div className="alert alert-error text-sm shadow-lg mb-4">
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">New Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="input input-bordered input-neutral w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm New Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="input input-bordered input-neutral w-full"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <button type="submit" className="btn btn-neutral w-full mt-6">
                  Reset Password
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-center text-3xl font-bold text-success mb-4">
                Password Reset!
              </h2>
              <p className="text-center text-gray-500 mb-6 text-sm">
                Your password has been successfully updated. You can now log in
                with your new credentials.
              </p>
              <div className="text-center">
                <Link to="/Login" className="btn btn-neutral w-full">
                  Continue to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;