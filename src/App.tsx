
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { AppRoutes } from './routes/AppRoutes';
import { useAuth } from './hooks/use-auth';

function App() {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
}

export default App;
