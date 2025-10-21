// --- ProtectedRoute.jsx ---
// This file is in /frontend/src/routes/

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * @desc    A component to protect routes based on auth state and role
 * @param   {React.ReactNode} children - The component to render if authorized
 * @param   {boolean} [adminOnly=false] - If true, only admins can access
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  // 1. Check if user is logged in
  if (!user) {
    // If not, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // 2. Check if the route is for admins only
  if (adminOnly && user.role !== 'admin') {
    // If user is not an admin, redirect to user dashboard (or a "forbidden" page)
    return <Navigate to="/dashboard" replace />;
  }

  // 3. If all checks pass, render the component
  return children;
};

export default ProtectedRoute;