// --- api.js ---
// This file is in /frontend/src/services/

import axios from 'axios';

// 1. Create a central axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend API base URL
});

// 2. Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get user data from localStorage
    const userString = localStorage.getItem('bookHubUser');
    
    if (userString) {
      const user = JSON.parse(userString);
      const token = user.token;
      
      // If a token exists, add it to the Authorization header
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;