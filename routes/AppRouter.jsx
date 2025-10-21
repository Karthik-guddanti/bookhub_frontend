// --- AppRouter.jsx ---
// This file is in /frontend/src/routes/

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// --- Import Pages ---
import Home from '../pages/Home.jsx'; // <-- IMPORT NEW HOME PAGE
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';
import UserDashboard from '../pages/UserDashboard.jsx';

// --- Page Components ---

const NotFound = () => <div>404 Not Found</div>;

const AppRouter = () => {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/" element={<Home />} /> {/* <-- USE REAL HOME PAGE */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* --- User Protected Route --- */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* --- Admin Protected Route --- */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* --- Catch-all 404 Route --- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;