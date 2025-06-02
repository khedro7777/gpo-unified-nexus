
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Clock, CheckCircle } from 'lucide-react';

const SentOffers = () => (
  <div className="space-y-6">
    <div className="grid gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">عرض شراء مجموعي #{i}001</CardTitle>
                <CardDescription>مجموعة الشراء التعاوني للتقنية</CardDescription>
              </div>
              <Badge variant={i === 1 ? "default" : i === 2 ? "secondary" : "destructive"}>
                {i === 1 ? "قيد المراجعة" : i === 2 ? "مقبول" : "مرفوض"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                تاريخ الإرسال: 2025-05-{20 - i}
              </div>
              <div className="font-semibold">
                ${(500 * i).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const ReceivedOffers = () => (
  <div className="space-y-6">
    <div className="grid gap-4">
      {[1, 2].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">عرض واردة من مورد #{i}23</CardTitle>
                <CardDescription>عرض لمنتجات تقنية متقدمة</CardDescription>
              </div>
              <Badge variant="outline">جديد</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                وصل في: 2025-05-{25 - i}
              </div>
              <div className="space-x-2">
                <Button size="sm" variant="outline">رفض</Button>
                <Button size="sm">قبول</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const Offers = () => {
  const tabs = [
    {
      id: 'sent',
      title: 'العروض المرسلة',
      icon: <ArrowUp size={16} />,
      content: <SentOffers />
    },
    {
      id: 'received',
      title: 'العروض المستلمة',
      icon: <ArrowDown size={16} />,
      content: <ReceivedOffers />
    }
  ];

  return (
    <NewMainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">العروض</h1>
        <p className="text-muted-foreground">
          إدارة العروض المرسلة والمستلمة
        </p>
        <TabSystem tabs={tabs} />
      </div>
    </NewMainLayout>
  );
};

export default Offers;
