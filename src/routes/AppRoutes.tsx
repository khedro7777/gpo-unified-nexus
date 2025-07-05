
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

// Auth pages
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import RoleSelection from '@/pages/auth/RoleSelection';

// Main pages
import Landing from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Wallet from '@/pages/Wallet';

// Group pages
import GroupDetails from '@/pages/groups/GroupDetails';
import MyGroups from '@/pages/groups/MyGroups';
import GroupManagementPage from '@/pages/groups/GroupManagementPage';

// Company pages
import CompanyManagement from '@/pages/companies/CompanyManagement';

// Tool pages
import ToolsAIAgent from '@/pages/tools/ToolsAIAgent';

// Protected route wrapper
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/role-selection" element={<RoleSelection />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/wallet"
        element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        }
      />

      {/* Group routes */}
      <Route
        path="/groups"
        element={
          <ProtectedRoute>
            <MyGroups />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/groups/:id"
        element={
          <ProtectedRoute>
            <GroupDetails />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/groups/:id/management"
        element={
          <ProtectedRoute>
            <GroupManagementPage />
          </ProtectedRoute>
        }
      />

      {/* Company routes */}
      <Route
        path="/company-management"
        element={
          <ProtectedRoute>
            <CompanyManagement />
          </ProtectedRoute>
        }
      />

      {/* Tools routes */}
      <Route
        path="/tools/ai-agent"
        element={
          <ProtectedRoute>
            <ToolsAIAgent />
          </ProtectedRoute>
        }
      />

      {/* Catch-all redirect */}
      <Route 
        path="*" 
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
