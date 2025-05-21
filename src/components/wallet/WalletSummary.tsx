
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: string;
  date: string;
  description: string;
}

interface WalletSummaryProps {
  recentTransactions: Transaction[];
}

const WalletSummary: React.FC<WalletSummaryProps> = ({ recentTransactions }) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return '+';
      case 'withdrawal':
        return '-';
      case 'earning':
        return '+';
      case 'fee':
        return '-';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ملخص المحفظة</CardTitle>
        <CardDescription>نظرة عامة على أنشطة محفظتك</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-muted/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">أحدث المعاملات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.slice(0, 3).map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(transaction.type)}
                      <span>{transaction.description}</span>
                    </div>
                    <span className={transaction.type === 'withdrawal' || transaction.type === 'fee' ? 'text-red-600' : 'text-green-600'}>
                      {transaction.type === 'withdrawal' || transaction.type === 'fee' ? '-' : '+'}${transaction.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">إحصائيات سريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">إجمالي المعاملات</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">إجمالي السحوبات</span>
                  <span className="font-medium">$150.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">إجمالي الإيداعات</span>
                  <span className="font-medium">$500.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletSummary;
