
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { AuthRoutes } from './AuthRoutes';
import { DashboardRoutes } from './DashboardRoutes';
import { GroupRoutes } from './GroupRoutes';
import { CompanyRoutes } from './CompanyRoutes';
import { ServiceRoutes } from './ServiceRoutes';
import { AdminRoutes } from './AdminRoutes';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      
      {/* Auth Routes */}
      {AuthRoutes()}
      
      {/* Dashboard Routes */}
      {DashboardRoutes()}
      
      {/* Group Routes */}
      {GroupRoutes()}
      
      {/* Company Routes */}
      {CompanyRoutes()}
      
      {/* Service Routes */}
      {ServiceRoutes()}
      
      {/* Admin Routes */}
      {AdminRoutes()}
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
