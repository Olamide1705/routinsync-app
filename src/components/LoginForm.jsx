import React, { useState } from "react";
import axios from "axios";
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api"; // your axios instance with interceptor
import { Eye, EyeOff } from "lucide-react";

const API_BASE = "https://routineapp-production.up.railway.app/api";
const CREATE_TOKEN_PATH = `${API_BASE}/create-token/`; // change if needed

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.id]: e.target.value }));
  };

  const getStorage = () => (remember ? localStorage : sessionStorage);

  const saveTokens = (access, refresh) => {
    const storage = getStorage();
    storage.setItem("access_token", access);
    storage.setItem("refresh_token", refresh);
  };

  const saveUser = (userObj) => {
    const storage = getStorage();
    storage.setItem("user", JSON.stringify(userObj));
  };

  const setApiAuthHeader = (access) => {
    // Make sure API uses this access token immediately
    API.defaults.headers = API.defaults.headers || {};
    API.defaults.headers.Authorization = `Bearer ${access}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const tokenRes = await axios.post(
        CREATE_TOKEN_PATH,
        { email: formData.email, password: formData.password },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = tokenRes.data;
      const access = data.access;
      const refresh = data.refresh;

      if (!access || !refresh) {
        throw new Error("Login did not return tokens.");
      }

      // Save tokens to chosen storage
      saveTokens(access, refresh);
      // Set API header so next requests use the token
      setApiAuthHeader(access);

      // Try to extract username from token response
      const username =
        data.username ??
        data.user?.username ??
        data.user?.user?.username ??
        data.profile?.username ??
        null;

      if (username) {
        // If username provided, fetch profile and save it
        try {
          const profileRes = await API.get(`profile/${username}/`);
          const profileData = profileRes?.data?.profile_data ?? profileRes?.data ?? { username };
          saveUser(profileData);
        } catch (profileErr) {
          console.warn("Failed to fetch profile by username:", profileErr);
          // fallback: try /profile/me/
          try {
            const meRes = await API.get("profile/me/");
            const profileData = meRes?.data?.profile_data ?? meRes?.data ?? { username };
            saveUser(profileData);
          } catch (meErr) {
            console.warn("Fallback /profile/me/ failed:", meErr);
            // still save minimal user so Profile doesn't break
            saveUser({ username });
          }
        }
      } else {
        // Username missing from token response: try /profile/me/ using token
        try {
          const meRes = await API.get("profile/me/");
          const profileData = meRes?.data?.profile_data ?? meRes?.data ?? {};
          // if profile lacks username, keep null but save the object
          saveUser(profileData);
        } catch (meErr) {
          console.warn("No username in token, /profile/me/ failed:", meErr);
          // fallback: save minimal user with null username to avoid app crash
          saveUser({ username: null });
        }
      }

      // persist remember flag if you want to check it later
      if (remember) localStorage.setItem("remember", "true");
      else localStorage.removeItem("remember");

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      const detail =
        err.response?.data?.detail ||
        (err.response?.data && JSON.stringify(err.response.data)) ||
        err.message;
      setError(detail || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-5 md:p-0">
      <div className="bg-white shadow-[0_4px_20px_rgba(2,1,129,0.63)] backdrop-blur-[25px] w-full md:max-w-xl rounded-[20px] p-6">
        <h1 className="text-xl md:text-2xl font-bold pt-10">Login</h1>

        {error && <div className="text-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-4">
          <label htmlFor="email" className="block">
            <span className="text-base font-medium">Email</span>
            <input
              id="email"
              type="email"
               autoComplete="username"
              value={formData.email}
              placeholder="Enter your e-mail address"
              className="mt-2 mb-6 block w-full rounded-lg border border-[rgb(232,232,234)] p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(90,187,187)]"
              onChange={handleChange}
              required
            />
          </label>

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

          <label
            className="flex items-center gap-2 cursor-pointer mt-2 select-none"
            onClick={() => setRemember((r) => !r)}
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
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 md:gap-5 mt-5">
          <p className=" text-[12px] md:text-base">Do not have an account?</p>
          <Link
            to="/signup"
            className="font-bold text-[rgb(90,187,187)] text-[12px] md:text-base cursor-pointer"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
