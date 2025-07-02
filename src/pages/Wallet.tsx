
import React, { useState } from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet as WalletIcon, Star, TrendingUp, GitBranch } from 'lucide-react';
import WalletOverview from '@/components/wallet/WalletOverview';
import TransactionsView from '@/components/wallet/TransactionsView';
import PaymentMethods from '@/components/wallet/PaymentMethods';
import Subscriptions from '@/components/wallet/Subscriptions';
import PointsWallet from '@/components/wallet/PointsWallet';
import PointsEarning from '@/components/wallet/PointsEarning';
import WorkflowIntegration from '@/components/integration/WorkflowIntegration';

// Common transaction data model
const transactionData = [
  { id: 1, type: 'deposit', amount: 500, status: 'completed', date: '2025-05-18', description: 'إيداع من المحفظة الرقمية' },
  { id: 2, type: 'withdrawal', amount: 150, status: 'completed', date: '2025-05-15', description: 'سحب إلى الحساب البنكي' },
  { id: 3, type: 'earning', amount: 320, status: 'completed', date: '2025-05-12', description: 'أرباح من المشروع #122' },
  { id: 4, type: 'fee', amount: 25, status: 'completed', date: '2025-05-10', description: 'رسوم النظام' }
];

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState('points');

  return (
    <NewMainLayout>
      <div className="space-y-6" dir="rtl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <WalletIcon className="h-8 w-8 text-primary" />
              المحفظة الذكية
            </h1>
            <p className="text-gray-600 mt-1">
              إدارة أموالك ونقاطك ومعاملاتك المالية بأمان وسهولة
            </p>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 lg:grid-cols-6 w-full">
            <TabsTrigger value="points" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              نظام النقاط
            </TabsTrigger>
            <TabsTrigger value="earning" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              كسب النقاط
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <WalletIcon className="h-4 w-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="transactions">المعاملات</TabsTrigger>
            <TabsTrigger value="subscriptions">الاشتراكات</TabsTrigger>
            <TabsTrigger value="workflow" className="flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              سير العمل
            </TabsTrigger>
          </TabsList>

          <TabsContent value="points">
            <PointsWallet />
          </TabsContent>

          <TabsContent value="earning">
            <PointsEarning />
          </TabsContent>

          <TabsContent value="overview">
            <WalletOverview recentTransactions={transactionData} />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionsView transactions={transactionData} />
          </TabsContent>

          <TabsContent value="subscriptions">
            <Subscriptions />
          </TabsContent>

          <TabsContent value="workflow">
            <WorkflowIntegration />
          </TabsContent>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default WalletPage;
