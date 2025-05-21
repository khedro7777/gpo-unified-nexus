
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const WalletCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
        <CardHeader className="pb-2">
          <CardDescription>الرصيد الحالي</CardDescription>
          <CardTitle className="text-3xl">500.00 USD</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">آخر تحديث: اليوم، الساعة 10:30 ص</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
        <CardHeader className="pb-2">
          <CardDescription>الأرباح المستلمة</CardDescription>
          <CardTitle className="text-3xl">320.00 USD</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">إجمالي الأرباح المستلمة</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
        <CardHeader className="pb-2">
          <CardDescription>الأرباح المعلقة</CardDescription>
          <CardTitle className="text-3xl">150.00 USD</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">ستكون متاحة للسحب خلال 3 أيام</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletCards;
