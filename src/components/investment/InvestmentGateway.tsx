
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight } from 'lucide-react';
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
  const navigate = useNavigate();

  const handleCreateInvestment = () => {
    navigate('/create-group/investment');
  };

  const handleJoinInvestment = () => {
    navigate('/groups?filter=investment');
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Bar */}
      <div className="flex flex-wrap gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <Button onClick={handleCreateInvestment} className="flex-1 min-w-[200px]">
          <Plus className="h-4 w-4 mr-2" />
          إنشاء استثمار جديد
        </Button>
        <Button variant="outline" onClick={handleJoinInvestment} className="flex-1 min-w-[200px]">
          <ArrowRight className="h-4 w-4 mr-2" />
          انضمام لاستثمار موجود
        </Button>
        <Button variant="outline" onClick={() => navigate('/governance')} className="flex-1 min-w-[200px]">
          الانتقال للحوكمة
        </Button>
      </div>

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
