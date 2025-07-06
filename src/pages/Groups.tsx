
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import GroupSystem from '@/components/groups/GroupSystem';

const Groups = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">المجموعات</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          استعراض المجموعات النشطة والانضمام إليها أو إنشاء مجموعة جديدة
        </p>
        
        <GroupSystem />
      </div>
    </NewMainLayout>
  );
};

export default Groups;
