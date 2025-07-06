
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';

// Pages
import Index from '@/pages/Index';
import EnhancedHomePage from '@/pages/EnhancedHomePage';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import About from '@/pages/About';
import Support from '@/pages/Support';
import HowItWorks from '@/pages/HowItWorks';
import CreateGroup from '@/pages/groups/CreateGroup';
import GroupDetails from '@/pages/groups/GroupDetails';
import Groups from '@/pages/Groups';
import Suppliers from '@/pages/suppliers/Suppliers';
import Services from '@/pages/Services';
import Arbitration from '@/pages/arbitration/Arbitration';
import CompanyIncorporation from '@/pages/gateways/CompanyIncorporation';
import CompanyFormation from '@/pages/formation/CompanyFormation';
import DocumentManagement from '@/pages/documents/DocumentManagement';
import Freelance from '@/pages/freelance/Freelance';
import Governance from '@/pages/governance/Governance';
import Contracts from '@/pages/contracts/Contracts';
import Notifications from '@/pages/notifications/Notifications';
import Offers from '@/pages/offers/Offers';
import Wallet from '@/pages/Wallet';
import Investment from '@/pages/investment/Investment';

// Auth Routes
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import RoleSelection from '@/pages/auth/RoleSelection';

// Service Routes
import { ServiceRoutes } from './ServiceRoutes';

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes - Accessible without authentication */}
        <Route path="/" element={<Index />} />
        <Route path="/old-home" element={<EnhancedHomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        
        {/* Protected Routes - Require authentication */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        {/* Group Management Routes */}
        <Route path="/groups" element={
          <ProtectedRoute>
            <Groups />
          </ProtectedRoute>
        } />
        <Route path="/groups/:id" element={
          <ProtectedRoute>
            <GroupDetails />
          </ProtectedRoute>
        } />
        <Route path="/create-group" element={
          <ProtectedRoute>
            <CreateGroup />
          </ProtectedRoute>
        } />
        <Route path="/create-group/:type" element={
          <ProtectedRoute>
            <CreateGroup />
          </ProtectedRoute>
        } />

        {/* Business Function Routes */}
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/suppliers/register" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-background py-8">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <h1 className="text-3xl font-bold text-center mb-8">تسجيل كمورد معتمد</h1>
                  <Suspense fallback={<LoadingSpinner />}>
                    {React.createElement(React.lazy(() => import('@/components/suppliers/SupplierRegistration')))}
                  </Suspense>
                </div>
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/freelance" element={<Freelance />} />
        <Route path="/governance" element={
          <ProtectedRoute>
            <Governance />
          </ProtectedRoute>
        } />
        <Route path="/investment" element={
          <ProtectedRoute>
            <Investment />
          </ProtectedRoute>
        } />
        
        {/* Company Formation Routes */}
        <Route path="/company-incorporation" element={
          <ProtectedRoute>
            <CompanyIncorporation />
          </ProtectedRoute>
        } />
        <Route path="/company-formation" element={
          <ProtectedRoute>
            <CompanyFormation />
          </ProtectedRoute>
        } />
        
        {/* Service and Management Routes */}
        <Route path="/services" element={<Services />} />
        <Route path="/contracts" element={
          <ProtectedRoute>
            <Contracts />
          </ProtectedRoute>
        } />
        <Route path="/offers" element={
          <ProtectedRoute>
            <Offers />
          </ProtectedRoute>
        } />
        <Route path="/wallet" element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        } />
        
        {/* Communication and Support Routes */}
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
        <Route path="/arbitration" element={
          <ProtectedRoute>
            <Arbitration />
          </ProtectedRoute>
        } />
        <Route path="/documents" element={
          <ProtectedRoute>
            <DocumentManagement />
          </ProtectedRoute>
        } />

        {/* Service-specific routes */}
        <Route path="/services/*" element={<ServiceRoutes />} />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
              <p className="text-muted-foreground mb-6">الصفحة غير موجودة</p>
              <Button
                onClick={() => window.location.href = '/'}
                className="text-primary hover:underline inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
              >
                العودة للصفحة الرئيسية
              </Button>
            </div>
          </div>
        } />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
