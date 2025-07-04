
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Main Pages - أولوية عالية
import EnhancedHomePage from '@/pages/EnhancedHomePage';
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';

// Auth Pages - مطلوبة للدخول
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import RoleSelection from '@/pages/auth/RoleSelection';

// Core Business Pages - الوظائف الأساسية
import Groups from '@/pages/Groups';
import CreateGroup from '@/pages/groups/CreateGroup';
import GroupDetails from '@/pages/groups/GroupDetails';
import Offers from '@/pages/offers/Offers';
import Wallet from '@/pages/Wallet';
import Investment from '@/pages/investment/Investment';
import Governance from '@/pages/governance/Governance';

// Service Pages - الخدمات المتخصصة
import Services from '@/pages/Services';
import Freelance from '@/pages/freelance/Freelance';
import Suppliers from '@/pages/suppliers/Suppliers';
import CompanyIncorporation from '@/pages/gateways/CompanyIncorporation';
import CompanyFormation from '@/pages/formation/CompanyFormation';
import Arbitration from '@/pages/arbitration/Arbitration';

// Management Pages - الإدارة والمتابعة
import Contracts from '@/pages/contracts/Contracts';
import DocumentManagement from '@/pages/documents/DocumentManagement';
import Notifications from '@/pages/notifications/Notifications';

// Information Pages - المعلومات والدعم
import About from '@/pages/About';
import Support from '@/pages/Support';
import HowItWorks from '@/pages/HowItWorks';

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
        {/* ========================= */}
        {/* الصفحات الرئيسية - أولوية قصوى */}
        {/* ========================= */}
        <Route path="/" element={<EnhancedHomePage />} />
        <Route path="/home" element={<EnhancedHomePage />} />
        <Route path="/old-home" element={<Index />} />
        
        {/* ========================= */}
        {/* صفحات المصادقة - مطلوبة */}
        {/* ========================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        
        {/* ========================= */}
        {/* لوحة التحكم والملف الشخصي */}
        {/* ========================= */}
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

        {/* ========================= */}
        {/* الوظائف الأساسية للمنصة */}
        {/* ========================= */}
        
        {/* إدارة المجموعات */}
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

        {/* العروض والصفقات */}
        <Route path="/offers" element={
          <ProtectedRoute>
            <Offers />
          </ProtectedRoute>
        } />
        
        {/* المحفظة المالية */}
        <Route path="/wallet" element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        } />
        
        {/* الاستثمار */}
        <Route path="/investment" element={
          <ProtectedRoute>
            <Investment />
          </ProtectedRoute>
        } />
        
        {/* الحوكمة والتصويت */}
        <Route path="/governance" element={
          <ProtectedRoute>
            <Governance />
          </ProtectedRoute>
        } />

        {/* ========================= */}
        {/* الخدمات المتخصصة */}
        {/* ========================= */}
        
        {/* صفحة الخدمات العامة */}
        <Route path="/services" element={<Services />} />
        
        {/* المستقلين */}
        <Route path="/freelance" element={<Freelance />} />
        
        {/* الموردين */}
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
        
        {/* تأسيس الشركات */}
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
        
        {/* التحكيم */}
        <Route path="/arbitration" element={
          <ProtectedRoute>
            <Arbitration />
          </ProtectedRoute>
        } />

        {/* ========================= */}
        {/* الإدارة والمتابعة */}
        {/* ========================= */}
        
        {/* العقود */}
        <Route path="/contracts" element={
          <ProtectedRoute>
            <Contracts />
          </ProtectedRoute>
        } />
        
        {/* إدارة الوثائق */}
        <Route path="/documents" element={
          <ProtectedRoute>
            <DocumentManagement />
          </ProtectedRoute>
        } />
        
        {/* الإشعارات */}
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />

        {/* ========================= */}
        {/* صفحات المعلومات والدعم */}
        {/* ========================= */}
        
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/how-it-works" element={<HowItWorks />} />

        {/* ========================= */}
        {/* الصفحات المتخصصة */}
        {/* ========================= */}
        
        {/* Service-specific routes */}
        <Route path="/services/*" element={<ServiceRoutes />} />
        
        {/* ========================= */}
        {/* معالجة الصفحات غير الموجودة */}
        {/* ========================= */}
        
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6">
              <h1 className="text-6xl font-bold text-foreground">404</h1>
              <h2 className="text-2xl font-semibold text-muted-foreground">الصفحة غير موجودة</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/" 
                  className="text-primary hover:underline inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
                >
                  العودة للصفحة الرئيسية
                </a>
                <a 
                  href="/dashboard" 
                  className="text-muted-foreground hover:text-foreground inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-md hover:bg-accent transition-colors"
                >
                  لوحة التحكم
                </a>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
