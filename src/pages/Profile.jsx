import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../api/api';
import ProfileEditForm from '../components/ProfileEditForm';
import DashboardLayout from '../layouts/DashboardLayout';
import avatar from '../assets/avatar.png';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const readStoredUser = () => {
    try {
      const rawLocal = localStorage.getItem('user');
      if (rawLocal) return JSON.parse(rawLocal);
      const rawSession = sessionStorage.getItem('user');
      if (rawSession) return JSON.parse(rawSession);
      return null;
    } catch (err) {
      console.error('Failed to parse stored user', err);
      return null;
    }
  };

  const getUsername = () => {
    if (location?.state?.username) return location.state.username;
    const stored = readStoredUser();
    return stored?.username ?? null;
  };

  useEffect(() => {
    let isMounted = true;
    const username = getUsername();

    if (!username) {
      if (isMounted) {
        setError('No user found. Please log in.');
        setLoading(false);
      }
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get(`profile/${username}/`);
        const data = res.data?.profile_data ?? res.data;
        if (!isMounted) return;
        setProfile(data);
      } catch (err) {
        console.error('[Profile] fetch error:', err);
        if (!isMounted) return;
        const serverMsg = err?.response?.data ? JSON.stringify(err.response.data) : err.message;
        setError(`Failed to load profile: ${serverMsg}`);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    fetchProfile();
    return () => { isMounted = false; };
  }, [location]);

  const handleProfileSaved = (updatedProfile) => {
    setProfile(updatedProfile);
    try {
      const usedLocal = localStorage.getItem('user') !== null;
      const storage = usedLocal ? localStorage : sessionStorage;
      const raw = storage.getItem('user') || '{}';
      const stored = JSON.parse(raw);
      const merged = { ...stored, ...updatedProfile };
      storage.setItem('user', JSON.stringify(merged));
    } catch (err) {
      console.warn('Could not persist updated user', err);
    }
    window.dispatchEvent(new CustomEvent('user-updated', { detail: updatedProfile }));
    setEditMode(false);
  };

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={() => navigate('/login')} className="bg-blue-500 text-white px-4 py-2 rounded">
          Go to login
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
        <p>No profile found</p>
        <button onClick={() => navigate('/dashboard')} className="mt-4 text-sm text-gray-600">
          ← Back
        </button>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 md:mt-0">
        {!editMode ? (
          <>
            <div className="flex items-center gap-4">
              <img
                src={profile.pfp || avatar}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">{profile.full_name}</h2>
                <p className="text-sm text-gray-600">{profile.username} • {profile.gender}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p><strong>Bio:</strong> {profile.bio || '—'}</p>
              <p><strong>Location:</strong> {profile.location || '—'}</p>
              <p><strong>Phone:</strong> {profile.phone_number || '—'}</p>
              <p><strong>Birthday:</strong> {profile.birthday || '—'}</p>
            </div>

            <div className="mt-6 flex gap-2">
              <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          <>
            <button onClick={() => setEditMode(false)} className="mb-4 text-sm text-gray-600">← Back to profile</button>
            <ProfileEditForm profile={profile} onSave={handleProfileSaved} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
