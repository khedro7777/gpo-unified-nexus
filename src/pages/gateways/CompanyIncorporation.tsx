
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import CompanyIncorporationGateway from '@/components/gateways/CompanyIncorporationGateway';

const CompanyIncorporation = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">تأسيس الشركات</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            خدمات تأسيس الشركات في أفضل الولايات القضائية العالمية
          </p>
        </div>
        
        <CompanyIncorporationGateway />
      </div>
    </NewMainLayout>
  );
};

export default CompanyIncorporation;
