
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import SystemTesting from '@/components/testing/SystemTesting';

const SystemTestingPage = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">اختبار النظام</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            اختبار شامل لجميع وظائف وصفحات منصة GPO
          </p>
        </div>
        
        <SystemTesting />
      </div>
    </NewMainLayout>
  );
};

export default SystemTestingPage;
