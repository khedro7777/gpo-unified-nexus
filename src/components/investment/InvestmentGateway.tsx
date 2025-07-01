
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InvestmentStats from './InvestmentStats';
import InvestmentOverview from './InvestmentOverview';
import InvestmentOpportunities from './InvestmentOpportunities';
import InvestmentGovernance from './InvestmentGovernance';
import PortfolioManagement from './PortfolioManagement';

/**
 * Investment Gateway Component - مكون بوابة الاستثمار
 * Main component that orchestrates investment features
 * Refactored into smaller focused components
 */
const InvestmentGateway = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Investment Stats Cards */}
      <InvestmentStats />

      {/* Main Investment Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="opportunities">فرص الاستثمار</TabsTrigger>
          <TabsTrigger value="portfolio">محفظتي</TabsTrigger>
          <TabsTrigger value="governance">الحوكمة</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <InvestmentOverview />
        </TabsContent>

        {/* Investment Opportunities */}
        <TabsContent value="opportunities" className="space-y-6">
          <InvestmentOpportunities />
        </TabsContent>

        {/* Portfolio Management */}
        <TabsContent value="portfolio" className="space-y-6">
          <PortfolioManagement />
        </TabsContent>

        {/* Governance */}
        <TabsContent value="governance" className="space-y-6">
          <InvestmentGovernance />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentGateway;
