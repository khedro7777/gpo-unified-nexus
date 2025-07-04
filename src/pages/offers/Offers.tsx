
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Home, Plus, FileText, Send, Inbox } from 'lucide-react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { useAuth } from '@/hooks/use-auth';

const Offers = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('received');

  // Redirect non-authenticated users
  if (!user) {
    return (
      <NewMainLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            يتطلب تسجيل الدخول
          </h2>
          <p className="text-muted-foreground text-center">
            يجب تسجيل الدخول لعرض العروض
          </p>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/login')}>تسجيل الدخول</Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="h-4 w-4 mr-2" />الصفحة الرئيسية
            </Button>
          </div>
        </div>
      </NewMainLayout>
    );
  }

  const receivedOffers = [
    {
      id: 1,
      title: 'عرض توريد معدات مكتبية',
      sender: 'شركة التوريدات المتقدمة',
      amount: '15,000 ريال',
      status: 'pending',
      groupName: 'مجموعة شراء المكاتب',
      date: '2024-01-10'
    },
    {
      id: 2,
      title: 'خدمة تطوير موقع إلكتروني',
      sender: 'أحمد المطور',
      amount: '8,500 ريال',
      status: 'accepted',
      groupName: 'مجموعة المطورين',
      date: '2024-01-08'
    }
  ];

  const sentOffers = [
    {
      id: 1,
      title: 'عرض استشارات مالية',
      recipient: 'مجموعة الاستثمار الذكي',
      amount: '5,000 ريال',
      status: 'pending',
      date: '2024-01-09'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: 'secondary' as const, label: 'قيد المراجعة' },
      accepted: { variant: 'default' as const, label: 'مقبول' },
      rejected: { variant: 'destructive' as const, label: 'مرفوض' }
    };
    const config = variants[status as keyof typeof variants] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <NewMainLayout>
      <div className="space-y-6">
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />رجوع
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Home className="h-4 w-4 mr-2" />الرئيسية
            </Button>
          </div>
          
          <Button onClick={() => navigate('/groups')} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            تقديم عرض جديد
          </Button>
        </div>

        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            إدارة العروض
          </h1>
          <p className="text-muted-foreground mt-2">
            متابعة العروض المرسلة والمستلمة من الموردين والمستقلين
          </p>
        </div>

        {/* Offers Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="received" className="flex items-center gap-2">
              <Inbox className="h-4 w-4" />
              العروض المستلمة ({receivedOffers.length})
            </TabsTrigger>
            <TabsTrigger value="sent" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              العروض المرسلة ({sentOffers.length})
            </TabsTrigger>
          </TabsList>

          {/* Received Offers */}
          <TabsContent value="received" className="space-y-4">
            {receivedOffers.length > 0 ? (
              receivedOffers.map((offer) => (
                <Card key={offer.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{offer.title}</CardTitle>
                        <CardDescription>
                          من: {offer.sender} • المجموعة: {offer.groupName}
                        </CardDescription>
                      </div>
                      {getStatusBadge(offer.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-lg text-primary">{offer.amount}</p>
                        <p className="text-sm text-muted-foreground">{offer.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => navigate(`/groups`)}>
                          <FileText className="h-4 w-4 mr-1" />
                          عرض التفاصيل
                        </Button>
                        {offer.status === 'pending' && (
                          <>
                            <Button size="sm" variant="destructive">رفض</Button>
                            <Button size="sm">قبول</Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Inbox className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">لا توجد عروض مستلمة</p>
                  <Button onClick={() => navigate('/groups')}>
                    تصفح المجموعات المتاحة
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Sent Offers */}
          <TabsContent value="sent" className="space-y-4">
            {sentOffers.length > 0 ? (
              sentOffers.map((offer) => (
                <Card key={offer.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{offer.title}</CardTitle>
                        <CardDescription>إلى: {offer.recipient}</CardDescription>
                      </div>
                      {getStatusBadge(offer.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-lg text-primary">{offer.amount}</p>
                        <p className="text-sm text-muted-foreground">{offer.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => navigate(`/groups`)}>
                          <FileText className="h-4 w-4 mr-1" />
                          عرض التفاصيل
                        </Button>
                        {offer.status === 'pending' && (
                          <Button size="sm" variant="outline">تعديل العرض</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Send className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">لم ترسل أي عروض بعد</p>
                  <Button onClick={() => navigate('/groups')}>
                    تصفح المجموعات وتقديم عروض
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" onClick={() => navigate('/groups')} className="h-auto p-4">
                <div className="text-center">
                  <Plus className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">تقديم عرض جديد</div>
                  <div className="text-xs text-muted-foreground">انضم لمجموعة وقدم عرضك</div>
                </div>
              </Button>
              <Button variant="outline" onClick={() => navigate('/suppliers')} className="h-auto p-4">
                <div className="text-center">
                  <FileText className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">تسجيل كمورد</div>
                  <div className="text-xs text-muted-foreground">انضم كمورد معتمد</div>
                </div>
              </Button>
              <Button variant="outline" onClick={() => navigate('/freelance')} className="h-auto p-4">
                <div className="text-center">
                  <FileText className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">خدمات المستقلين</div>
                  <div className="text-xs text-muted-foreground">تقديم خدماتك المهنية</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </NewMainLayout>
  );
};

export default Offers;
