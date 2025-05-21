
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp, Plus, BarChart, CreditCard } from 'lucide-react';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: string;
  date: string;
  description: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-orange-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDown className="h-4 w-4 text-green-600" />;
      case 'withdrawal':
        return <ArrowUp className="h-4 w-4 text-red-600" />;
      case 'earning':
        return <Plus className="h-4 w-4 text-blue-600" />;
      case 'fee':
        return <BarChart className="h-4 w-4 text-gray-600" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  return (
    <Table>
      <TableCaption>قائمة بجميع معاملاتك المالية</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>الوصف</TableHead>
          <TableHead>التاريخ</TableHead>
          <TableHead>المبلغ</TableHead>
          <TableHead>الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium flex items-center gap-2">
              {getTransactionIcon(transaction.type)}
              {transaction.description}
            </TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell className={transaction.type === 'withdrawal' || transaction.type === 'fee' ? 'text-red-600' : 'text-green-600'}>
              {transaction.type === 'withdrawal' || transaction.type === 'fee' ? '-' : '+'}${transaction.amount.toFixed(2)}
            </TableCell>
            <TableCell className={getStatusColor(transaction.status)}>
              {transaction.status === 'completed' ? 'مكتمل' : 
               transaction.status === 'pending' ? 'قيد الانتظار' : 'فشل'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsList;
