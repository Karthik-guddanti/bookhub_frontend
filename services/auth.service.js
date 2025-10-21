// --- auth.service.js ---
// This file is in /frontend/src/services/

import api from './api'; // Import your central axios instance

/**
 * @desc    Logs in a user
 * @param   {string} username
 * @param   {string} password
 * @returns {object} User data and token
 */
const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    // Re-throw the error to be caught by the component
    throw error.response?.data?.message || 'An error occurred during login.';
  }
};

/**
 * @desc    Registers a new user
 * @param   {string} username
 * @param   {string} password
 * @param   {string} role
 * @returns {object} User data and token
 */
const signup = async (username, password, role) => {
  try {
    const response = await api.post('/auth/signup', {
      username,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    // Re-throw the error to be caught by the component
    throw error.response?.data?.message || 'An error occurred during signup.';
  }
};

const authService = {
  login,
  signup,
};

export default authService;