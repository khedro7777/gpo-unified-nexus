
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown } from 'lucide-react';

const Offers = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">العروض</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          إدارة العروض المرسلة والمستلمة
        </p>
        
        <Tabs defaultValue="sent" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="sent" className="flex items-center gap-2 text-xs md:text-sm">
              <ArrowUp size={16} />
              العروض المرسلة
            </TabsTrigger>
            <TabsTrigger value="received" className="flex items-center gap-2 text-xs md:text-sm">
              <ArrowDown size={16} />
              العروض المستلمة
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sent">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                      <div>
                        <CardTitle className="text-base md:text-lg">عرض شراء مجموعي #{i}001</CardTitle>
                        <CardDescription className="text-xs md:text-sm">مجموعة الشراء التعاوني للتقنية</CardDescription>
                      </div>
                      <Badge variant={i === 1 ? "default" : i === 2 ? "secondary" : "destructive"} className="text-xs">
                        {i === 1 ? "قيد المراجعة" : i === 2 ? "مقبول" : "مرفوض"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                      <div className="text-xs md:text-sm text-muted-foreground">
                        تاريخ الإرسال: 2025-05-{20 - i}
                      </div>
                      <div className="font-semibold text-sm md:text-base">
                        ${(500 * i).toLocaleString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="received">
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                      <div>
                        <CardTitle className="text-base md:text-lg">عرض واردة من مورد #{i}23</CardTitle>
                        <CardDescription className="text-xs md:text-sm">عرض لمنتجات تقنية متقدمة</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs">جديد</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                      <div className="text-xs md:text-sm text-muted-foreground">
                        وصل في: 2025-05-{25 - i}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs">رفض</Button>
                        <Button size="sm" className="text-xs">قبول</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default Offers;
