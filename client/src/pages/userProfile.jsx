import React from 'react';
import { useAuth } from '../hooks/useAuth';

const UserProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="bg-white rounded shadow p-4 w-full max-w-sm">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <p><strong>ID:</strong> {user?.id}</p>
        <button
          onClick={logout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
