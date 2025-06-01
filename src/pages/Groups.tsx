
import React from 'react';
import SimplifiedLayout from '@/components/layout/SimplifiedLayout';
import GroupSystem from '@/components/groups/GroupSystem';

const Groups = () => {
  return (
    <SimplifiedLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">المجموعات</h1>
        <p className="text-muted-foreground">
          استعراض المجموعات النشطة والانضمام إليها أو إنشاء مجموعة جديدة
        </p>
        
        <GroupSystem />
      </div>
    </SimplifiedLayout>
  );
};

export default Groups;
