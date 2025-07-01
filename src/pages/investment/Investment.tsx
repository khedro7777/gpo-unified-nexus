
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import InvestmentGateway from '@/components/investment/InvestmentGateway';

/**
 * Investment Gateway Page
 * Main page for investment and company management features
 * Handles both individual and group investment scenarios
 */
const Investment = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">بوابة الاستثمار</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            إنشاء وإدارة الشركات الاستثمارية مع نظام حوكمة متقدم بين المساهمين
          </p>
        </div>
        
        <InvestmentGateway />
      </div>
    </NewMainLayout>
  );
};

export default Investment;
