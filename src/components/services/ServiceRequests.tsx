
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

// نموذج بيانات لطلبات الخدمات
const serviceRequests = [
  {
    id: 'req-001',
    title: 'طلب توريد أجهزة حاسب',
    type: 'purchasing',
    status: 'pending',
    deadline: '2025-06-01',
    requestor: 'شركة الأفق للتقنية',
    budget: '50000 ر.س',
    description: 'طلب توريد 20 جهاز حاسب محمول لإدارة تطوير الأعمال'
  },
  {
    id: 'req-002',
    title: 'خدمات تصميم هوية بصرية',
    type: 'marketing',
    status: 'active',
    deadline: '2025-05-25',
    requestor: 'مؤسسة الابتكار',
    budget: '15000 ر.س',
    description: 'تصميم هوية بصرية كاملة لمشروع تجاري جديد في مجال التجزئة'
  },
  {
    id: 'req-003',
    title: 'تطوير منصة تعليمية',
    type: 'freelancers',
    status: 'closed',
    deadline: '2025-05-10',
    requestor: 'أكاديمية التعلم الرقمي',
    budget: '80000 ر.س',
    description: 'تطوير منصة تعليمية متكاملة لدعم التعلم عن بعد'
  },
  {
    id: 'req-004',
    title: 'توريد مواد خام للبناء',
    type: 'suppliers',
    status: 'urgent',
    deadline: '2025-05-22',
    requestor: 'شركة الإعمار للمقاولات',
    budget: '120000 ر.س',
    description: 'توريد مواد خام للبناء لمشروع سكني في المنطقة الغربية'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 hover:bg-yellow-50">قيد الانتظار</Badge>;
    case 'active':
      return <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">نشط</Badge>;
    case 'closed':
      return <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">مغلق</Badge>;
    case 'urgent':
      return <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50">عاجل</Badge>;
    default:
      return <Badge variant="outline">قيد الانتظار</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'active':
      return <FileText className="h-5 w-5 text-blue-500" />;
    case 'closed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'urgent':
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    default:
      return <Clock className="h-5 w-5" />;
  }
};

const ServiceRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active' | 'urgent' | 'closed'>('all');
  
  const filteredRequests = activeTab === 'all' 
    ? serviceRequests 
    : serviceRequests.filter(request => request.status === activeTab);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-semibold">طلبات الخدمات</h2>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full sm:w-auto mt-2 sm:mt-0">
          <TabsList className="grid grid-cols-3 sm:grid-cols-5 w-full sm:w-auto">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
            <TabsTrigger value="active">نشط</TabsTrigger>
            <TabsTrigger value="urgent">عاجل</TabsTrigger>
            <TabsTrigger value="closed">مغلق</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                {getStatusIcon(request.status)}
                {getStatusBadge(request.status)}
              </div>
              <CardTitle className="mt-4 text-xl">{request.title}</CardTitle>
              <CardDescription>
                <div className="flex justify-between">
                  <span>{request.requestor}</span>
                  <span>الميزانية: {request.budget}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{request.description}</p>
              <div className="bg-muted p-2 rounded flex justify-between text-sm">
                <span>الموعد النهائي: {new Date(request.deadline).toLocaleDateString('ar-SA')}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-4 flex justify-between">
              <Button variant="outline" asChild>
                <Link to={`/services/requests/${request.id}`}>التفاصيل</Link>
              </Button>
              {request.status !== 'closed' && (
                <Button asChild>
                  <Link to={`/services/requests/${request.id}/apply`}>تقديم عرض</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceRequests;
