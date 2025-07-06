
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import GroupSystem from '@/components/groups/GroupSystem';
import BackToHome from '@/components/common/BackToHome';

const Groups = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <BackToHome />
        
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">المجموعات</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            استعراض المجموعات النشطة والانضمام إليها أو إنشاء مجموعة جديدة
          </p>
        </div>
        
        <GroupSystem />
      </div>
    </NewMainLayout>
  );
};

export default Groups;
