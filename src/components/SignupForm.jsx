import React, { useState } from "react";
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://routineapp-production.up.railway.app/api/register/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      const data = err.response?.data;
      setError(
        data?.detail ||
          data?.email?.[0] ||
          data?.non_field_errors?.[0] ||
          "Registration failed. Try again."
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-5 md:p-0 pt-5 md:pt-10 pb-5 md:pb-10">
        <div className="bg-white shadow-[0_4px_20px_rgba(2,1,129,0.63)] backdrop-blur-[25px] w-full md:max-w-xl rounded-[20px] p-6">
          <h1 className="text-xl md:text-2xl font-bold ">
            Create Your Account
          </h1>

          <form onSubmit={handleSubmit} className="mt-4">
            {error && <div className="text-red-500">{error}</div>}

            {/* First Name */}
            <label htmlFor="first_name" className="block">
              <span className="text-base font-medium">First Name</span>
              <input
                id="first_name"
                type="text"
                value={formData.first_name}
                placeholder="Enter your Name"
                className="mt-2 mb-6 block w-full rounded-lg border-2 border-[rgb(232,232,234)] p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(90,187,187)]"
                onChange={handleChange}
                required
              />
            </label>

            {/* Last Name */}
            <label htmlFor="last_name" className="block">
              <span className="text-base font-medium">Last Name</span>
              <input
                id="last_name"
                type="text"
                value={formData.last_name}
                placeholder="Enter your Name"
                className="mt-2 mb-6 block w-full rounded-lg border-2 border-[rgb(232,232,234)] p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(90,187,187)]"
                onChange={handleChange}
                required
              />
            </label>

            {/* Gender */}
            <label htmlFor="gender" className="block">
              <span className="text-base font-medium">Gender</span>
              <select
                id="gender"
                value={formData.gender}
                className="mt-2 mb-6 block w-full rounded-lg border-2 border-[rgb(232,232,234)] p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(90,187,187)]"
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="m">Male</option>
                <option value="f">Female</option>
                <option value="o">Other</option>
              </select>
            </label>

            {/* Username */}
            <label htmlFor="username" className="block">
              <span className="text-base font-medium">Username</span>
              <input
                id="username"
                type="text"
                value={formData.username}
                placeholder="Enter your Username"
                className="mt-2 mb-6 block w-full rounded-lg border-2 border-[rgb(232,232,234)] p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(90,187,187)]"
                onChange={handleChange}
                required
              />
            </label>

            {/* Email */}
            <label htmlFor="email" className="block">
              <span className="text-base font-medium">Email</span>
              <input
                id="email"
                type="email"
                value={formData.email}
                placeholder="Enter your e-mail address"
                className="mt-2 mb-6 block w-full rounded-lg border border-[rgb(232,232,234)] p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(90,187,187)]"
                onChange={handleChange}
                required
              />
            </label>

            {/* Password */}
            <div className="relative w-full mb-6">
  <label htmlFor="password" className="block">
    <span className="text-base font-medium">Password</span>
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      value={formData.password}
      placeholder="Create your password"
      className="mt-2 block w-full rounded-lg border border-[rgb(232,232,234)] p-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(90,187,187)]"
      onChange={handleChange}
      required
    />
  </label>

  {/* Password toggle icon */}
  <div
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-[70%] -translate-y-1/2 cursor-pointer text-gray-400"
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </div>
</div>

            {/* Confirm Password */}
             <div className="relative w-full mb-6">
  <label htmlFor="password2" className="block">
    <span className="text-base font-medium">Password</span>
    <input
      id="password2"
      type={showPassword ? "text" : "password"}
      value={formData.password2}
      placeholder="Create your password"
      className="mt-2 block w-full rounded-lg border border-[rgb(232,232,234)] p-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(90,187,187)]"
      onChange={handleChange}
      required
    />
  </label>

  {/* Password toggle icon */}
  <div
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-[70%] -translate-y-1/2 cursor-pointer text-gray-400"
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </div>
</div>

            {/* Remember Me */}
            <label
              className="flex items-center gap-2 cursor-pointer mt-2 select-none"
              onClick={() => setRemember(!remember)}
            >
              {remember ? (
                <FaCheckSquare className="text-xl text-[rgb(90,187,187)]" />
              ) : (
                <FaRegSquare className="text-xl" />
              )}
              <span>Remember me</span>
            </label>

            <button
              type="submit"
              className="w-full bg-[rgb(90,187,187)] text-sm font-bold text-white py-2 rounded-md mt-5 cursor-pointer"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center justify-center gap-5 mt-5">
            <p className=" text-[12px] md:text-base">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="font-bold text-[rgb(90,187,187)] text-[12px] md:text-base cursor-pointer"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
