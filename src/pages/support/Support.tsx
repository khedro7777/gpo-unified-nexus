import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Phone, Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const Support = () => {
  const tickets = [
    {
      id: 'T-001',
      title: 'مشكلة في الدفع',
      status: 'open',
      priority: 'high',
      date: '2025-05-20',
      lastUpdate: 'منذ ساعتين'
    },
    {
      id: 'T-002',
      title: 'استفسار حول الميزات',
      status: 'resolved',
      priority: 'medium',
      date: '2025-05-18',
      lastUpdate: 'منذ يومين'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'destructive';
      case 'resolved': return 'default';
      case 'pending': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'مفتوحة';
      case 'resolved': return 'محلولة';
      case 'pending': return 'قيد المراجعة';
      default: return 'غير معروف';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'عالية';
      case 'medium': return 'متوسطة';
      case 'low': return 'منخفضة';
      default: return 'غير محدد';
    }
  };

  return (
    <NewMainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">الدعم والمساعدة</h1>
        <p className="text-muted-foreground">
          احصل على المساعدة والدعم الفني
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                طرق التواصل
              </CardTitle>
              <CardDescription>تواصل معنا عبر القنوات المختلفة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">الدردشة المباشرة</p>
                  <p className="text-sm text-muted-foreground">متوفرة 24/7</p>
                </div>
                <Button size="sm" className="ml-auto">ابدأ الدردشة</Button>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Mail className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">البريد الإلكتروني</p>
                  <p className="text-sm text-muted-foreground">support@gpo.example.com</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">إرسال بريد</Button>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Phone className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-medium">الهاتف</p>
                  <p className="text-sm text-muted-foreground">+966 11 123 4567</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">اتصل بنا</Button>
              </div>
            </CardContent>
          </Card>

          {/* New Ticket Form */}
          <Card>
            <CardHeader>
              <CardTitle>إنشاء تذكرة دعم جديدة</CardTitle>
              <CardDescription>أرسل استفسارك أو مشكلتك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">الموضوع</label>
                <Input placeholder="اكتب موضوع المشكلة أو الاستفسار" />
              </div>
              
              <div>
                <label className="text-sm font-medium">الأولوية</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="low">منخفضة</option>
                  <option value="medium">متوسطة</option>
                  <option value="high">عالية</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">الوصف</label>
                <Textarea 
                  placeholder="اكتب تفاصيل المشكلة أو الاستفسار..."
                  rows={4}
                />
              </div>
              
              <Button className="w-full">إرسال التذكرة</Button>
            </CardContent>
          </Card>
        </div>

        {/* Existing Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              تذاكر الدعم الخاصة بك
            </CardTitle>
            <CardDescription>تتبع حالة طلبات الدعم المرسلة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      {ticket.status === 'resolved' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{ticket.id} - {ticket.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        تاريخ الإنشاء: {ticket.date}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        آخر تحديث: {ticket.lastUpdate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusColor(ticket.status)}>
                      {getStatusText(ticket.status)}
                    </Badge>
                    <Badge variant={getPriorityColor(ticket.priority)}>
                      {getPriorityText(ticket.priority)}
                    </Badge>
                    <Button variant="outline" size="sm">
                      عرض التفاصيل
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {tickets.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                لا توجد تذاكر دعم حالياً
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </NewMainLayout>
  );
};

export default Support;
