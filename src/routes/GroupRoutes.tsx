
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Groups from '@/pages/Groups';
import GroupDetails from '@/pages/groups/GroupDetails';
import CreateGroup from '@/pages/groups/CreateGroup';
import CreateFormationGroup from '@/pages/groups/CreateFormationGroup';

export const GroupRoutes = () => (
  <>
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
    <Route path="/create-group/:type" element={
      <ProtectedRoute>
        <CreateGroup />
      </ProtectedRoute>
    } />
    <Route path="/create-group/formation" element={
      <ProtectedRoute>
        <CreateFormationGroup />
      </ProtectedRoute>
    } />
  </>
);
