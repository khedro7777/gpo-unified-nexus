
import React, { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { AppRoutes } from './routes/AppRoutes';
import { useAuth } from './hooks/use-auth';
import { ThemeProvider } from '@/hooks/use-theme';
import PWAInstallPrompt from '@/components/common/PWAInstallPrompt';

function App() {
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);
  
  return (
    <ThemeProvider>
      <Toaster />
      <AppRoutes />
      <PWAInstallPrompt />
    </ThemeProvider>
  );
}

export default App;
