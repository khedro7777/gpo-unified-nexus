
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { UserPlus, Mail, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ShareholderManagement = () => {
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  const shareholders = [
    {
      id: 1,
      name: 'أحمد محمد علي',
      email: 'ahmed@example.com',
      phone: '+1-555-0123',
      shares: 2500,
      percentage: 25,
      investmentAmount: 62500,
      joinDate: '2024-03-15',
      role: 'مؤسس',
      status: 'active'
    },
    {
      id: 2,
      name: 'سارة أحمد حسن',
      email: 'sara@example.com',
      phone: '+1-555-0124',
      shares: 2000,
      percentage: 20,
      investmentAmount: 50000,
      joinDate: '2024-03-20',
      role: 'مستثمر',
      status: 'active'
    },
    {
      id: 3,
      name: 'محمد حسن إبراهيم',
      email: 'mohamed@example.com',
      phone: '+1-555-0125',
      shares: 1500,
      percentage: 15,
      investmentAmount: 37500,
      joinDate: '2024-04-01',
      role: 'مستثمر',
      status: 'active'
    },
    {
      id: 4,
      name: 'فاطمة علي محمد',
      email: 'fatima@example.com',
      phone: '+1-555-0126',
      shares: 1000,
      percentage: 10,
      investmentAmount: 25000,
      joinDate: '2024-04-15',
      role: 'مستثمر',
      status: 'pending'
    }
  ];

  const totalShares = shareholders.reduce((sum, sh) => sum + sh.shares, 0);
  const totalInvestment = shareholders.reduce((sum, sh) => sum + sh.investmentAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium">إدارة المساهمين</h3>
          <p className="text-sm text-muted-foreground">
            إجمالي {shareholders.length} مساهم - {totalShares.toLocaleString()} سهم
          </p>
        </div>
        
        <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              دعوة مساهم جديد
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>دعوة مساهم جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="البريد الإلكتروني" />
              <Input placeholder="عدد الأسهم المطلوب شراؤها" type="number" />
              <Input placeholder="مبلغ الاستثمار ($)" type="number" />
              <div className="flex gap-2">
                <Button className="flex-1">إرسال الدعوة</Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowInviteDialog(false)}>
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">إجمالي الأسهم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalShares.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">من أصل 10,000 سهم مصرح</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">إجمالي الاستثمار</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInvestment.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">رأس المال المدفوع</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">متوسط سعر السهم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalInvestment / totalShares).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">القيمة الحالية</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة المساهمين</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {shareholders.map((shareholder) => (
              <div key={shareholder.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{shareholder.name}</h4>
                    <Badge variant="outline" className="text-xs">{shareholder.role}</Badge>
                    <Badge 
                      variant={shareholder.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {shareholder.status === 'active' ? 'نشط' : 'معلق'}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {shareholder.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {shareholder.phone}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">الأسهم: </span>
                      <span className="font-medium">{shareholder.shares.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">النسبة: </span>
                      <span className="font-medium">{shareholder.percentage}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">الاستثمار: </span>
                      <span className="font-medium">${shareholder.investmentAmount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">تاريخ الانضمام: </span>
                      <span className="font-medium">{shareholder.joinDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">تعديل</Button>
                  <Button size="sm" variant="outline">رسالة</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShareholderManagement;
