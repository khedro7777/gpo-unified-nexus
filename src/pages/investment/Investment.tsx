
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import InvestmentGateway from '@/components/investment/InvestmentGateway';
import { useAuth } from '@/hooks/use-auth';

/**
 * Investment Gateway Page - بوابة الاستثمار
 * Main page for investment and company management features
 * Handles both individual and group investment scenarios
 */
const Investment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect non-authenticated users
  if (!user) {
    return (
      <NewMainLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            يتطلب تسجيل الدخول
          </h2>
          <p className="text-muted-foreground text-center">
            يجب تسجيل الدخول للوصول إلى بوابة الاستثمار
          </p>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/login')}>
              تسجيل الدخول
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="h-4 w-4 mr-2" />
              الصفحة الرئيسية
            </Button>
          </div>
        </div>
      </NewMainLayout>
    );
  }

  return (
    <NewMainLayout>
      <div className="space-y-6">
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              رجوع
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Home className="h-4 w-4 mr-2" />
              الرئيسية
            </Button>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center md:text-right">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            بوابة الاستثمار
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-2">
            إنشاء وإدارة الشركات الاستثمارية مع نظام حوكمة متقدم بين المساهمين
          </p>
        </div>
        
        {/* Investment Gateway Component */}
        <InvestmentGateway />
      </div>
    </NewMainLayout>
  );
};

export default Investment;
