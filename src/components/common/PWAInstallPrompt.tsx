
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt if user hasn't dismissed it
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA installed');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:w-80">
      <Card className="border shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">
                {isRTL ? 'تثبيت التطبيق' : 'Install App'}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                {isRTL 
                  ? 'أضف GPO إلى شاشتك الرئيسية للوصول السريع'
                  : 'Add GPO to your home screen for quick access'
                }
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleInstall} className="text-xs">
                  <Download className="h-3 w-3 mr-1" />
                  {isRTL ? 'تثبيت' : 'Install'}
                </Button>
                <Button size="sm" variant="outline" onClick={handleDismiss} className="text-xs">
                  {isRTL ? 'تجاهل' : 'Dismiss'}
                </Button>
              </div>
            </div>
            <Button size="icon" variant="ghost" onClick={handleDismiss} className="h-6 w-6">
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWAInstallPrompt;
