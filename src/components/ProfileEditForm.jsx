import React, { useState, useEffect } from "react";
import defaultAvatar from "../assets/avatar.png";

const ProfileEditForm = () => {
  const [formData, setFormData] = useState({
    bio: "",
    location: "",
    phone_number: "",
    birthday: "",
  });
  const [readonlyData, setReadonlyData] = useState({
    full_name: "",
    gender: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(defaultAvatar);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const storedUser =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  const username = storedUser ? JSON.parse(storedUser)?.username : null;

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      if (!username) {
        setError("No username found — please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await API.get(`profile/${username}/`);
        const profile = res.data.profile_data ?? res.data;

        setFormData({
          bio: profile.bio ?? "",
          location: profile.location ?? "",
          phone_number: profile.phone_number ?? "",
          birthday: profile.birthday ?? "",
        });

        setReadonlyData({
          full_name: profile.full_name ?? "",
          gender: profile.gender ?? "",
        });
      } catch (err) {
        console.error(
          "Failed to fetch profile:",
          err.response?.data || err.message
        );
        setError("Failed to load profile. Try reloading or logging in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      const res = await API.patch("edit/profile/", formData);
      const updatedProfile = res.data.profile_data ?? res.data;

      try {
        const stored = JSON.parse(localStorage.getItem("user") || "{}");
        const merged = { ...stored, ...updatedProfile };
        localStorage.setItem("user", JSON.stringify(merged));
        window.dispatchEvent(new CustomEvent("user-updated"));
      } catch (err) {
        console.warn("Failed to save updated user", err);
      }

      setMessage("Profile updated successfully!");
    } catch (err) {
      if (err.response) {
        setError(
          `Update failed: ${
            err.response.data?.detail || JSON.stringify(err.response.data)
          }`
        );
      } else if (err.request) {
        setError("No response from server. Check your network.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-x-12"
      >
        {/* Left: Profile Picture Upload */}
        <div className="w-full md:w-1/3 flex flex-col items-center mb-7 md:mb-0">
          <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="mt-4">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <span className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer">
              Upload Picture
            </span>
          </label>
        </div>

        {/* Right: Input Fields */}
        <div className="w-full md:w-2/3 space-y-4">
           <label className="block">
            <span className="block text-base font-bold text-Roboto">Bio</span>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-[10px]"
              rows={4}
            />
          </label>

          <label className="block">
            <span className="block text-base font-bold text-Roboto">
              Location
            </span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-[10px]"
            />
          </label>

          <label className="block">
            <span className="block text-base font-bold text-Roboto">
              Phone Number
            </span>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-[10px]"
            />
          </label>

          <label className="block">
            <span className="block text-base font-bold">Birthday</span>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-[10px]"
            />
          </label>

           <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;
