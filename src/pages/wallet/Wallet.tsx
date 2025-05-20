
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CreditCard, Plus, ArrowUp, ArrowDown, BarChart } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Wallet = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mockup transaction data
  const recentTransactions = [
    { id: 1, type: 'deposit', amount: 500, status: 'completed', date: '2025-05-18', description: 'إيداع من باي بال' },
    { id: 2, type: 'withdrawal', amount: 150, status: 'completed', date: '2025-05-15', description: 'سحب إلى باي بال' },
    { id: 3, type: 'earning', amount: 320, status: 'completed', date: '2025-05-12', description: 'أرباح من المشروع #122' },
    { id: 4, type: 'fee', amount: 25, status: 'completed', date: '2025-05-10', description: 'رسوم النظام' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-orange-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDown className="h-4 w-4 text-green-600" />;
      case 'withdrawal':
        return <ArrowUp className="h-4 w-4 text-red-600" />;
      case 'earning':
        return <Plus className="h-4 w-4 text-blue-600" />;
      case 'fee':
        return <BarChart className="h-4 w-4 text-gray-600" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">المحفظة</h1>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <ArrowUp className="mr-2 h-4 w-4" />
              سحب
            </Button>
            <Button size="sm">
              <ArrowDown className="mr-2 h-4 w-4" />
              إيداع
            </Button>
          </div>
        </div>
        
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="transactions">المعاملات</TabsTrigger>
            <TabsTrigger value="payments">طرق الدفع</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ملخص المحفظة</CardTitle>
                <CardDescription>نظرة عامة على أنشطة محفظتك</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">أحدث المعاملات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentTransactions.slice(0, 3).map(transaction => (
                          <div key={transaction.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getTransactionIcon(transaction.type)}
                              <span>{transaction.description}</span>
                            </div>
                            <span className={transaction.type === 'withdrawal' || transaction.type === 'fee' ? 'text-red-600' : 'text-green-600'}>
                              {transaction.type === 'withdrawal' || transaction.type === 'fee' ? '-' : '+'}${transaction.amount.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">إحصائيات سريعة</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">إجمالي المعاملات</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">إجمالي السحوبات</span>
                          <span className="font-medium">$150.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">إجمالي الإيداعات</span>
                          <span className="font-medium">$500.00</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>سجل المعاملات</CardTitle>
                <CardDescription>جميع المعاملات المالية الخاصة بك</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>قائمة بجميع معاملاتك المالية</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الوصف</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                          {getTransactionIcon(transaction.type)}
                          {transaction.description}
                        </TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell className={transaction.type === 'withdrawal' || transaction.type === 'fee' ? 'text-red-600' : 'text-green-600'}>
                          {transaction.type === 'withdrawal' || transaction.type === 'fee' ? '-' : '+'}${transaction.amount.toFixed(2)}
                        </TableCell>
                        <TableCell className={getStatusColor(transaction.status)}>
                          {transaction.status === 'completed' ? 'مكتمل' : 
                           transaction.status === 'pending' ? 'قيد الانتظار' : 'فشل'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>طرق الدفع</CardTitle>
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
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Wallet;
