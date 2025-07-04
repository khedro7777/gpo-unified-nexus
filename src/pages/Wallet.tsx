
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, CreditCard, Download, Upload } from 'lucide-react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import WalletOverview from '@/components/wallet/WalletOverview';
import TransactionsView from '@/components/wallet/TransactionsView';
import PaymentMethods from '@/components/wallet/PaymentMethods';
import Subscriptions from '@/components/wallet/Subscriptions';
import { useAuth } from '@/hooks/use-auth';

// Sample transaction data
const transactionData = [
  { id: 1, type: 'deposit', amount: 500, status: 'completed', date: '2025-01-07', description: 'إيداع من باي بال' },
  { id: 2, type: 'withdrawal', amount: 150, status: 'completed', date: '2025-01-05', description: 'سحب إلى باي بال' },
  { id: 3, type: 'earning', amount: 320, status: 'completed', date: '2025-01-03', description: 'أرباح من المشروع #122' },
  { id: 4, type: 'fee', amount: 25, status: 'completed', date: '2025-01-01', description: 'رسوم النظام' }
];

const Wallet = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect non-authenticated users
  if (!user) {
    return (
      <NewMainLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            يتطلب تسجيل الدخول
          </h2>
          <p className="text-muted-foreground text-center">
            يجب تسجيل الدخول للوصول إلى المحفظة
          </p>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/login')}>تسجيل الدخول</Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="h-4 w-4 mr-2" />الصفحة الرئيسية
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
              <ArrowLeft className="h-4 w-4 mr-2" />رجوع
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Home className="h-4 w-4 mr-2" />الرئيسية
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => navigate('/profile')}>
              <Download className="h-4 w-4 mr-2" />
              تصدير البيانات
            </Button>
            <Button size="sm" onClick={() => setActiveTab('subscriptions')}>
              <CreditCard className="h-4 w-4 mr-2" />
              إدارة الاشتراكات
            </Button>
          </div>
        </div>

        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            المحفظة المالية
          </h1>
          <p className="text-muted-foreground mt-2">
            إدارة الأموال والمعاملات والاشتراكات والنقاط
          </p>
        </div>

        {/* Wallet Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="transactions">المعاملات</TabsTrigger>
            <TabsTrigger value="payments">طرق الدفع</TabsTrigger>
            <TabsTrigger value="subscriptions">الاشتراكات</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <WalletOverview recentTransactions={transactionData} />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <TransactionsView transactions={transactionData} />
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <PaymentMethods />
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <Subscriptions />
          </TabsContent>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default Wallet;
