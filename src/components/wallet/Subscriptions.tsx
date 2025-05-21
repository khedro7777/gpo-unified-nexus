
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Subscriptions: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">الاشتراكات</h1>
      <Card>
        <CardHeader>
          <CardTitle>إدارة اشتراكاتك</CardTitle>
          <CardDescription>عرض وإدارة خطط الاشتراك الخاصة بك</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Card className="bg-muted/30 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">الباقة الأساسية</h3>
                  <p className="text-sm text-muted-foreground">$9.99 شهرياً</p>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">نشط</div>
              </div>
              <div className="mt-3 text-sm">
                <p>تتجدد في: 2025-06-15</p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm">تغيير الباقة</Button>
                  <Button variant="destructive" size="sm">إلغاء</Button>
                </div>
              </div>
            </Card>
            
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              إضافة اشتراك جديد
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscriptions;
