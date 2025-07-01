
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InvestmentForm from './InvestmentForm';

/**
 * Investment Opportunities Component
 * Contains the investment form for creating new opportunities
 */
const InvestmentOpportunities = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>فرص الاستثمار المتاحة</CardTitle>
        <CardDescription>
          استثمارات جماعية وفردية متنوعة في قطاعات مختلفة
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InvestmentForm investmentType="group" />
      </CardContent>
    </Card>
  );
};

export default InvestmentOpportunities;
