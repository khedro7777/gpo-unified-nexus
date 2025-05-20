
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowDown, 
  Search, 
  Calendar, 
  FileText, 
  Download, 
  CheckCircle, 
  AlertCircle,
  Clock
} from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Invoices = () => {
  // Mock invoice data
  const invoices = [
    { 
      id: 'INV-001', 
      date: '2025-05-15', 
      amount: 150.00, 
      status: 'paid', 
      description: 'رسوم مجموعة الشراء التعاوني #123' 
    },
    { 
      id: 'INV-002', 
      date: '2025-05-10', 
      amount: 320.00, 
      status: 'paid', 
      description: 'أرباح المشروع #A-456' 
    },
    { 
      id: 'INV-003', 
      date: '2025-05-08', 
      amount: 75.50, 
      status: 'pending', 
      description: 'رسوم عضوية شهر مايو' 
    },
    { 
      id: 'INV-004', 
      date: '2025-05-01', 
      amount: 200.00, 
      status: 'overdue', 
      description: 'رسوم مجموعة المشتريات #456' 
    },
    { 
      id: 'INV-005', 
      date: '2025-04-28', 
      amount: 550.00, 
      status: 'paid', 
      description: 'مدفوعات مشروع التسويق #M-789' 
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            مدفوع
          </div>
        );
      case 'pending':
        return (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            قيد الانتظار
          </div>
        );
      case 'overdue':
        return (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            متأخر
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">الفواتير</h1>
          <Button size="sm">
            <ArrowDown className="mr-2 h-4 w-4" />
            تصدير الفواتير
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>سجل الفواتير</CardTitle>
            <CardDescription>عرض وتنزيل سجل الفواتير الخاص بك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في الفواتير..."
                  className="pl-9 h-10"
                />
              </div>
              <div className="relative w-full sm:w-48">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select 
                  className="w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background text-sm"
                >
                  <option value="all">جميع الفترات</option>
                  <option value="this-month">هذا الشهر</option>
                  <option value="last-month">الشهر الماضي</option>
                  <option value="last-quarter">آخر 3 أشهر</option>
                  <option value="last-year">السنة الماضية</option>
                </select>
              </div>
              <div className="w-full sm:w-48">
                <select 
                  className="w-full h-10 px-4 rounded-md border border-input bg-background text-sm"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="paid">مدفوع</option>
                  <option value="pending">قيد الانتظار</option>
                  <option value="overdue">متأخر</option>
                </select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الفاتورة</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>تحميل</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">عرض 5 من أصل 24 فاتورة</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>السابق</Button>
                <Button variant="outline" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">التالي</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Invoices;
