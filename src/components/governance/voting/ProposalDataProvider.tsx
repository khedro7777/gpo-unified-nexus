
import React from 'react';
import { ProposalType } from './ProposalVotingCard';
import { PastVotingItem } from './PastVotingsList';

export const activeProposal: ProposalType = {
  id: 1,
  title: 'تخصيص صندوق المجتمع',
  description: 'اقتراح لتخصيص 5% من أموال الخزينة لمشاريع تطوير المجتمع',
  status: 'active',
  votes: { yes: 23, no: 7, abstain: 3 },
  deadline: '2025-06-01',
  author: 'member1.eth',
  quorum: 66,
  requiredTokens: 100,
  votingPower: 1.5,
  documents: [
    { name: 'تفاصيل_الاقتراح.pdf', size: '1.2MB' },
    { name: 'ميزانية_المشروع.xlsx', size: '0.8MB' }
  ]
};

export const pastVotings: PastVotingItem[] = [
  {
    id: 2,
    title: 'تكامل مورد جديد',
    description: 'إضافة XYZ Manufacturing كمورد معتمد للمشتريات التعاونية',
    status: 'completed',
    result: 'approved',
    votes: { yes: 34, no: 5, abstain: 2 },
    date: '2025-05-15'
  },
  {
    id: 3,
    title: 'تحديث قواعد العضوية',
    description: 'مراجعة معايير العضوية لتشمل التحقق من بيانات الاعتماد',
    status: 'completed',
    result: 'rejected',
    votes: { yes: 12, no: 25, abstain: 4 },
    date: '2025-04-30'
  }
];
