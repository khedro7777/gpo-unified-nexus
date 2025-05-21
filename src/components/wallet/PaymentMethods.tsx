
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const PaymentMethods: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">طرق الدفع</h1>
      <Card>
        <CardHeader>
          <CardTitle>إدارة طرق الدفع</CardTitle>
          <CardDescription>إدارة طرق الدفع المرتبطة بحسابك</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/40">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 text-white p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium">باي بال</p>
                <p className="text-muted-foreground text-sm">user@example.com</p>
              </div>
            </div>
            <Button variant="outline" size="sm">تعديل</Button>
          </div>
          
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            إضافة طريقة دفع
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethods;
