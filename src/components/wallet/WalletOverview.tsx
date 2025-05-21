
import React from 'react';
import WalletHeader from './WalletHeader';
import WalletCards from './WalletCards';
import WalletSummary from './WalletSummary';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: string;
  date: string;
  description: string;
}

interface WalletOverviewProps {
  recentTransactions: Transaction[];
}

const WalletOverview: React.FC<WalletOverviewProps> = ({ recentTransactions }) => {
  return (
    <div className="space-y-6">
      <WalletHeader title="المحفظة" />
      <WalletCards />
      <WalletSummary recentTransactions={recentTransactions} />
    </div>
  );
};

export default WalletOverview;
