// hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { user, logout } = useContext(AuthContext);

  const isAuthenticated = !!user;

  return { user, isAuthenticated, logout };
};
