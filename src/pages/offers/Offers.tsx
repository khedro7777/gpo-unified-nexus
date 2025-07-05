
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Home, Send, Inbox, TrendingUp, Package, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { useAuth } from '@/hooks/use-auth';

// Sample offers data
const sampleOffers = [
  {
    id: 1,
    title: 'عرض شراء جماعي للإلكترونيات',
    type: 'supplier',
    status: 'active',
    amount: 50000,
    currency: 'SAR',
    groupName: 'مجموعة التقنية المتقدمة',
    companyName: 'شركة الإلكترونيات الحديثة',
    deadline: '2025-01-15',
    description: 'عرض شامل لأجهزة الكمبيوتر المحمولة والأجهزة اللوحية بأسعار تنافسية'
  },
  {
    id: 2,
    title: 'طلب خدمات تطوير موقع إلكتروني',
    type: 'freelancer',
    status: 'pending',
    amount: 15000,
    currency: 'SAR',
    groupName: 'مجموعة التسويق الرقمي',
    freelancerName: 'أحمد محمد - مطور ويب',
    deadline: '2025-01-20',
    description: 'تطوير موقع إلكتروني متكامل مع نظام إدارة المحتوى'
  },
  {
    id: 3,
    title: 'عرض توريد مواد البناء',
    type: 'supplier',
    status: 'completed',
    amount: 120000,
    currency: 'SAR',
    groupName: 'مجموعة المقاولين',
    companyName: 'مؤسسة الإنشاءات الشاملة',
    deadline: '2025-01-10',
    description: 'توريد مواد البناء الأساسية للمشاريع السكنية'
  }
];

const Offers = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');

  // Redirect non-authenticated users
  if (!user) {
    return (
      <NewMainLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            يتطلب تسجيل الدخول
          </h2>
          <p className="text-muted-foreground text-center">
            يجب تسجيل الدخول للوصول إلى العروض
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      default:
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'completed':
        return 'مكتمل';
      case 'pending':
        return 'قيد المراجعة';
      default:
        return 'ملغي';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const filteredOffers = activeTab === 'all' 
    ? sampleOffers 
    : sampleOffers.filter(offer => 
        activeTab === 'supplier' ? offer.type === 'supplier' : 
        activeTab === 'freelancer' ? offer.type === 'freelancer' :
        offer.status === activeTab
      );

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
          
          <div className="flex gap-2">
            <Button size="sm" onClick={() => navigate('/groups')}>
              <Send className="h-4 w-4 mr-2" />
              إرسال عرض جديد
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/suppliers/register')}>
              <Package className="h-4 w-4 mr-2" />
              التسجيل كمورد
            </Button>
          </div>
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

        {/* Offers Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Inbox className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">إجمالي العروض</p>
                  <p className="text-2xl font-bold">{sampleOffers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">العروض النشطة</p>
                  <p className="text-2xl font-bold">{sampleOffers.filter(o => o.status === 'active').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm font-medium">العروض المكتملة</p>
                  <p className="text-2xl font-bold">{sampleOffers.filter(o => o.status === 'completed').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">قيد المراجعة</p>
                  <p className="text-2xl font-bold">{sampleOffers.filter(o => o.status === 'pending').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Offers Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="all">جميع العروض</TabsTrigger>
            <TabsTrigger value="active">النشطة</TabsTrigger>
            <TabsTrigger value="pending">قيد المراجعة</TabsTrigger>
            <TabsTrigger value="supplier">الموردين</TabsTrigger>
            <TabsTrigger value="freelancer">المستقلين</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredOffers.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">لا توجد عروض</h3>
                  <p className="text-muted-foreground mb-4">
                    لم يتم العثور على عروض في هذا القسم
                  </p>
                  <Button onClick={() => navigate('/groups')}>
                    <Send className="h-4 w-4 mr-2" />
                    إرسال عرض جديد
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredOffers.map((offer) => (
                  <Card key={offer.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-lg">{offer.title}</CardTitle>
                          <CardDescription>{offer.description}</CardDescription>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {offer.type === 'supplier' ? 'مورد' : 'مستقل'}
                            </Badge>
                            <Badge className={`text-xs ${getStatusColor(offer.status)}`}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(offer.status)}
                                {getStatusText(offer.status)}
                              </div>
                            </Badge>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="text-2xl font-bold text-primary">
                            {offer.amount.toLocaleString()} {offer.currency}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            انتهاء: {offer.deadline}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">المجموعة:</span>
                          <span className="font-medium">{offer.groupName}</span>
                        </div>
                        {offer.companyName && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">الشركة:</span>
                            <span className="font-medium">{offer.companyName}</span>
                          </div>
                        )}
                        {offer.freelancerName && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">المستقل:</span>
                            <span className="font-medium">{offer.freelancerName}</span>
                          </div>
                        )}
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" onClick={() => navigate(`/offers/${offer.id}`)}>
                            عرض التفاصيل
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => navigate(`/groups/${offer.id}`)}>
                            المجموعة
                          </Button>
                          {offer.status === 'active' && (
                            <Button size="sm" variant="outline">
                              تعديل العرض
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default Offers;
