import React, { use, useState } from "react";
import axios from "axios";
import { useNavigate, Link, data } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(EyeOff);
  const navigate = useNavigate();

  const handletoggle = () => {
    if (type === "password") {
      setType("text");
      setIcon(Eye);
    } else {
      setType("password");
      setIcon(EyeOff);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const logindata = { email, password };
      const response = await axios.post(
        //"http://localhost:3000/api/login",
        "/api/login",
        logindata
      );
      if (response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
      }
      navigate("/Home");
    } catch (error) {
      console.error("There was a problem logging in", error.response);
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
                className="input input-bordered input-default w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="login-password">
                <span className="label-text">Password</span>
              </label>
              <div className="relative w-full max-w-m">
                <input
                  type={type}
                  id="login-password"
                  placeholder="Enter your password"
                  className="input input-bordered input-default w-full pr-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={handletoggle}
                  className="btn btn-ghost btn-xs absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {React.createElement(icon, { size: 18 })}
                </button>
              </div>

              <label className="label text-sm mt-1">
                <Link
                  to="/ForgotPassword"
                  className="label-text-alt link link-primary"
                >
                  Forgot password?
                </Link>
              </label>
            </div>

            <button type="submit" className="btn btn-neutral w-full mt-4">
              Log In
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm">
              Don't have an account?{" "}
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
