
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionsList from './TransactionsList';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: string;
  date: string;
  description: string;
}

interface TransactionsViewProps {
  transactions: Transaction[];
}

const TransactionsView: React.FC<TransactionsViewProps> = ({ transactions }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">سجل المعاملات</h1>
      <Card>
        <CardHeader>
          <CardTitle>جميع المعاملات المالية</CardTitle>
          <CardDescription>سجل كامل لكل معاملاتك المالية</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionsList transactions={transactions} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsView;
