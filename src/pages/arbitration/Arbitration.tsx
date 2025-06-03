
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import ORDAArbitration from '@/components/arbitration/ORDAArbitration';

const Arbitration = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">التحكيم التجاري</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            نظام ORDA لحل النزاعات التجارية بطريقة عادلة وسريعة
          </p>
        </div>
        
        <ORDAArbitration />
      </div>
    </NewMainLayout>
  );
};

export default Arbitration;
