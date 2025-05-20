
// Core types for the GPO platform

export type UserRole = 'freelancer' | 'buyer' | 'supplier' | 'founder' | 'admin';

export type GroupType = 'buying' | 'marketing' | 'company_formation' | 'freelancers';

export type GroupStatus = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled';

export type MCPMode = 'auto' | 'ask' | 'manual';

export type DisputeStatus = 'open' | 'review' | 'resolved' | 'closed';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  country?: string;
  language?: string;
}

export interface Group {
  id: string;
  title: string;
  type: GroupType;
  category: 'individual' | 'collective';
  description: string;
  status: GroupStatus;
  members: number;
  country: string;
  creator: string;
  createdAt: Date;
  votesRequired: number;
  votesReceived: number;
  deadline?: Date;
}

export interface Offer {
  id: string;
  groupId: string;
  supplierId: string;
  title: string;
  description: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected' | 'negotiating';
  createdAt: Date;
}

export interface Dispute {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  status: DisputeStatus;
  createdBy: string;
  createdAt: Date;
  evidence: string[];
  ipfsHash?: string;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'payment' | 'earning';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  createdAt: Date;
  reference?: string;
}
