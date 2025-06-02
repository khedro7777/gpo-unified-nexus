
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet as WalletIcon, CreditCard, ArrowUp, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Wallet = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">المحفظة والمدفوعات</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          إدارة أموال منظمتك والمدفوعات والاشتراكات
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-2">خزينة DAO</h3>
            <div className="text-2xl md:text-3xl font-bold mb-1">$128,450.00</div>
            <p className="text-sm text-green-600">+2.4% هذا الشهر</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm" className="flex-1">تحويل</Button>
              <Button size="sm" className="flex-1">إدارة</Button>
            </div>
          </Card>
          
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-2">رصيد ETH</h3>
            <div className="text-2xl md:text-3xl font-bold mb-1">45.32 ETH</div>
            <p className="text-sm text-muted-foreground">≈ $77,044.00</p>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">عرض</Button>
            </div>
          </Card>
          
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-2">رموز GPO</h3>
            <div className="text-2xl md:text-3xl font-bold mb-1">150,000</div>
            <p className="text-sm text-red-600">-0.8% هذا الأسبوع</p>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">عرض</Button>
            </div>
          </Card>
        </div>
        
        <div className="mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-4">المعاملات الحديثة</h2>
          <Card>
            <div className="divide-y divide-border">
              <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <p className="font-medium text-sm md:text-base">دفع اشتراك</p>
                  <p className="text-xs md:text-sm text-muted-foreground">خطة ERPNext الشهرية</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600 text-sm md:text-base">-$49.99</p>
                  <p className="text-xs text-muted-foreground">15 مايو، 2025</p>
                </div>
              </div>
              
              <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <p className="font-medium text-sm md:text-base">مساهمة عضو</p>
                  <p className="text-xs md:text-sm text-muted-foreground">من: 0x8f23...45ab</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600 text-sm md:text-base">+$500.00</p>
                  <p className="text-xs text-muted-foreground">12 مايو، 2025</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </NewMainLayout>
  );
};

export default Wallet;
