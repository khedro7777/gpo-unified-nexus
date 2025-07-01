
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import InvestmentGateway from '@/components/investment/InvestmentGateway';

/**
 * Investment Gateway Page - بوابة الاستثمار
 * Main page for investment and company management features
 * Handles both individual and group investment scenarios
 */
const Investment = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="text-center md:text-right">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
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
