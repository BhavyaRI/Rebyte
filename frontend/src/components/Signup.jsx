import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handletoggle = () => {
    if (type === "password" && id === "password") {
      setType("text");
      setIcon(Eye);
    } else if (type === "password" && id === "passwordconfirm") {
      setType("text");
      setIcon(Eye);
    } else {
      if (id === "passwordconfirm") {
        setType("passwordConfirm");
      } else {
        setType("password");
      }
      setIcon(EyeOff);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signupData = { email, password, passwordConfirm };
      const response = await axios.post(
        "http://localhost:3000/api/signin",
        signupData
      );
      console.log("Signup successful:", response.data);
      navigate("/Login");
    } catch (error) {
      console.error("There was an error signing up", error.response.data);
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
                className="input input-bordered input-default w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <div className="relative w-full max-w-m">
                <input
                  type={showPassword?"text":"password"}
                  id="password"
                  placeholder="Enter your password"
                  className="input input-bordered input-default w-full pr-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={()=>setShowPassword(!showPassword)}
                  className="btn btn-ghost btn-xs absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {React.createElement(showPassword ? Eye : EyeOff, { size: 18 })}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label" htmlFor="passwordConfirm">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="relative w-full max-w-m">
                <input
                  type={showConfirm ? "text" : "password"}
                  id="passwordconfirm"
                  placeholder="Confirm your password"
                  className="input input-bordered input-default w-full pr-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={passwordConfirm}
                  onChange={(e) => setpasswordConfirm(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="btn btn-ghost btn-xs absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {React.createElement(showConfirm ? Eye : EyeOff, { size: 18 })}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-neutral w-full mt-4">
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
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
