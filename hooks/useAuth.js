// --- useAuth.js ---
// This file is in /frontend/src/hooks/

import { useContext } from 'react';
import AuthContext from '../context/AuthContext'; // Make sure to import the .jsx file

/**
 * @desc    Custom hook to easily access AuthContext
 * @returns {object} The AuthContext value ({ user, login, logout })
 */
export const useAuth = () => {
  return useContext(AuthContext);
};