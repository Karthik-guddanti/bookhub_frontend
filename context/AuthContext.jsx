// --- AuthContext.jsx ---
// This file is in /frontend/src/context/

import React, { createContext, useState, useEffect } from 'react';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 3. Check for existing user in localStorage when app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('bookHubUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 4. Login function
  const login = (userData) => {
    // userData should be { _id, username, role, token }
    localStorage.setItem('bookHubUser', JSON.stringify(userData));
    setUser(userData);
  };

  // 5. Logout function
  const logout = () => {
    localStorage.removeItem('bookHubUser');
    setUser(null);
  };

  // 6. Provide the user and functions to the rest of the app
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;