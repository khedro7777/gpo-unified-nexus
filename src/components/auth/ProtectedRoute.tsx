
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import NewMainLayout from '@/components/layout/NewMainLayout';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = '/login'
}) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If role check is required, and user doesn't have the required role
  if (requiredRole && role && !requiredRole.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // User is authenticated and has the required role
  return (
    <NewMainLayout>
      {children}
    </NewMainLayout>
  );
};

export default ProtectedRoute;
