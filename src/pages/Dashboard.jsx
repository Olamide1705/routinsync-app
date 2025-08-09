import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/api"; // axios instance
import { FaBell } from "react-icons/fa"; // notification bell icon

const Dashboard = () => {
  const [user, setUser] = useState(() => {
    try {
      const raw =
        localStorage.getItem("user") ??
        sessionStorage.getItem("user") ??
        null;
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.warn("Failed to parse stored user:", err);
      return null;
    }
  });

  // Mock followers/following data
  const [followers] = useState([
    { id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/40?img=1" },
    { id: 2, name: "Jane Smith", avatar: "https://i.pravatar.cc/40?img=2" },
  ]);

  const [following] = useState([
    { id: 3, name: "Alex Johnson", avatar: "https://i.pravatar.cc/40?img=3" },
    { id: 4, name: "Emily Davis", avatar: "https://i.pravatar.cc/40?img=4" },
  ]);

  const [notifications] = useState([
    "Your routine 'Morning Workout' has a new comment",
    "John Doe started following you",
    "Your task 'Read a book' is due today",
  ]);

  // Auth check
  useEffect(() => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <DashboardLayout>
      {/* Top Header */}
      <div className="flex justify-between items-center mb-2 mt-10">
        <h1 className="text-xl md:text-2xl font-bold">
          Welcome, {user?.username ?? "Guest"}
        </h1>
        <div className="relative">
          <FaBell size={20} className="cursor-pointer text-gray-600" />
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            {notifications.length}
          </span>
        </div>
      </div>

      <p className="text-sm md:text-base mb-10">
        What are your plans for today?
      </p>

      {/* Followers / Following Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Followers */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Followers</h2>
          <ul className="space-y-2">
            {followers.map((f) => (
              <li key={f.id} className="flex items-center gap-3">
                <img
                  src={f.avatar}
                  alt={f.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{f.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Following */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Following</h2>
          <ul className="space-y-2">
            {following.map((f) => (
              <li key={f.id} className="flex items-center gap-3">
                <img
                  src={f.avatar}
                  alt={f.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{f.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Notifications Feed */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3">Recent Notifications</h2>
        <ul className="space-y-2">
          {notifications.map((note, index) => (
            <li
              key={index}
              className="text-gray-700 text-sm border-b pb-2 last:border-none"
            >
              {note}
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
