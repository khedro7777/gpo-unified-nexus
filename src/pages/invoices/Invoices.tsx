
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Plus } from 'lucide-react';

const Invoices = () => {
  const invoices = [
    {
      id: 'INV-001',
      client: 'شركة التقنية المتقدمة',
      amount: '$2,500.00',
      status: 'paid',
      date: '2025-05-20',
      dueDate: '2025-06-20'
    },
    {
      id: 'INV-002',
      client: 'مجموعة التسويق الرقمي',
      amount: '$1,800.00',
      status: 'pending',
      date: '2025-05-18',
      dueDate: '2025-06-18'
    },
    {
      id: 'INV-003',
      client: 'منصة التجارة الإلكترونية',
      amount: '$3,200.00',
      status: 'overdue',
      date: '2025-04-15',
      dueDate: '2025-05-15'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'overdue': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'مدفوعة';
      case 'pending': return 'قيد الانتظار';
      case 'overdue': return 'متأخرة';
      default: return 'غير معروف';
    }
  };

  return (
    <NewMainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">الفواتير</h1>
            <p className="text-muted-foreground">
              إدارة الفواتير والمدفوعات
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            إنشاء فاتورة جديدة
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">$7,500</div>
              <p className="text-xs text-muted-foreground">إجمالي الفواتير</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">$2,500</div>
              <p className="text-xs text-muted-foreground">مدفوعة</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">$1,800</div>
              <p className="text-xs text-muted-foreground">قيد الانتظار</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">$3,200</div>
              <p className="text-xs text-muted-foreground">متأخرة</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              قائمة الفواتير
            </CardTitle>
            <CardDescription>جميع الفواتير الخاصة بك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{invoice.id}</h3>
                      <p className="text-sm text-muted-foreground">{invoice.client}</p>
                      <p className="text-xs text-muted-foreground">
                        تاريخ الإصدار: {invoice.date} | تاريخ الاستحقاق: {invoice.dueDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold">{invoice.amount}</div>
                      <Badge variant={getStatusColor(invoice.status)}>
                        {getStatusText(invoice.status)}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </NewMainLayout>
  );
};

export default Invoices;
