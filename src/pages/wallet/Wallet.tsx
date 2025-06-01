
import React, { useState } from 'react';
import SimplifiedLayout from '@/components/layout/SimplifiedLayout';
import { Wallet as WalletIcon, CreditCard, ArrowUp, Plus } from 'lucide-react';
import TabSystem from '@/components/tabs/TabSystem';
import WalletOverview from '@/components/wallet/WalletOverview';
import TransactionsView from '@/components/wallet/TransactionsView';
import PaymentMethods from '@/components/wallet/PaymentMethods';
import Subscriptions from '@/components/wallet/Subscriptions';

// Common transaction data model
const transactionData = [
  { id: 1, type: 'deposit', amount: 500, status: 'completed', date: '2025-05-18', description: 'إيداع من باي بال' },
  { id: 2, type: 'withdrawal', amount: 150, status: 'completed', date: '2025-05-15', description: 'سحب إلى باي بال' },
  { id: 3, type: 'earning', amount: 320, status: 'completed', date: '2025-05-12', description: 'أرباح من المشروع #122' },
  { id: 4, type: 'fee', amount: 25, status: 'completed', date: '2025-05-10', description: 'رسوم النظام' }
];

const Wallet = () => {
  const tabs = [
    {
      id: 'overview',
      title: 'نظرة عامة',
      icon: <WalletIcon size={16} />,
      content: <WalletOverview recentTransactions={transactionData} />
    },
    {
      id: 'transactions',
      title: 'المعاملات',
      icon: <CreditCard size={16} />,
      content: <TransactionsView transactions={transactionData} />
    },
    {
      id: 'payment-methods',
      title: 'طرق الدفع',
      icon: <ArrowUp size={16} />,
      content: <PaymentMethods />
    },
    {
      id: 'subscriptions',
      title: 'الاشتراكات',
      icon: <Plus size={16} />,
      content: <Subscriptions />
    }
  ];

  return (
    <SimplifiedLayout>
      <TabSystem tabs={tabs} />
    </SimplifiedLayout>
  );
};

export default Wallet;
