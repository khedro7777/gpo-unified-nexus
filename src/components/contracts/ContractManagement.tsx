
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FileText, Download, Edit, Eye, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface Contract {
  id: string;
  title: string;
  type: 'purchase' | 'service' | 'partnership' | 'formation';
  status: 'draft' | 'review' | 'voting' | 'signed' | 'executed';
  progress: number;
  parties: string[];
  value: string;
  deadline: string;
  lastModified: string;
  description: string;
}

const ContractManagement = () => {
  const [activeTab, setActiveTab] = useState('active');
  
  const contracts: Contract[] = [
    {
      id: 'CNT-001',
      title: 'عقد توريد أجهزة حاسب',
      type: 'purchase',
      status: 'voting',
      progress: 75,
      parties: ['شركة التقنية المتقدمة', 'مجموعة الشراء التعاوني'],
      value: '150,000 ر.س',
      deadline: '2025-06-15',
      lastModified: '2025-05-28',
      description: 'عقد توريد 50 جهاز حاسب محمول للشركات الأعضاء'
    },
    {
      id: 'CNT-002',
      title: 'اتفاقية شراكة تسويقية',
      type: 'partnership',
      status: 'review',
      progress: 45,
      parties: ['وكالة الإبداع التسويقي', 'تحالف الشركات الناشئة'],
      value: '80,000 ر.س',
      deadline: '2025-06-01',
      lastModified: '2025-05-27',
      description: 'اتفاقية تسويق مشترك لخدمات الشركات الأعضاء'
    },
    {
      id: 'CNT-003',
      title: 'عقد تأسيس شركة مساهمة',
      type: 'formation',
      status: 'signed',
      progress: 100,
      parties: ['المؤسسون', 'المحامي القانوني'],
      value: '500,000 ر.س',
      deadline: '2025-05-20',
      lastModified: '2025-05-20',
      description: 'عقد تأسيس شركة تقنية مساهمة'
    }
  ];

  const getStatusBadge = (status: Contract['status']) => {
    const variants = {
      draft: { label: 'مسودة', variant: 'secondary' as const, icon: Edit },
      review: { label: 'قيد المراجعة', variant: 'outline' as const, icon: Eye },
      voting: { label: 'قيد التصويت', variant: 'default' as const, icon: Clock },
      signed: { label: 'موقع', variant: 'default' as const, icon: CheckCircle },
      executed: { label: 'منفذ', variant: 'default' as const, icon: CheckCircle }
    };
    
    const config = variants[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getTypeLabel = (type: Contract['type']) => {
    const labels = {
      purchase: 'شراء',
      service: 'خدمة',
      partnership: 'شراكة',
      formation: 'تأسيس'
    };
    return labels[type];
  };

  const filteredContracts = contracts.filter(contract => {
    if (activeTab === 'active') return ['draft', 'review', 'voting'].includes(contract.status);
    if (activeTab === 'completed') return ['signed', 'executed'].includes(contract.status);
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">إدارة العقود</h2>
        <p className="text-muted-foreground">
          متابعة وإدارة جميع العقود والاتفاقيات
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">العقود النشطة</TabsTrigger>
          <TabsTrigger value="completed">العقود المكتملة</TabsTrigger>
          <TabsTrigger value="all">جميع العقود</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredContracts.map((contract) => (
            <Card key={contract.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{contract.title}</CardTitle>
                    <CardDescription>{contract.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{getTypeLabel(contract.type)}</Badge>
                    {getStatusBadge(contract.status)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">القيمة:</span>
                    <p className="text-muted-foreground">{contract.value}</p>
                  </div>
                  <div>
                    <span className="font-medium">الموعد النهائي:</span>
                    <p className="text-muted-foreground">{contract.deadline}</p>
                  </div>
                  <div>
                    <span className="font-medium">آخر تعديل:</span>
                    <p className="text-muted-foreground">{contract.lastModified}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">حالة التقدم</span>
                    <span className="text-sm text-muted-foreground">{contract.progress}%</span>
                  </div>
                  <Progress value={contract.progress} className="h-2" />
                </div>

                <div>
                  <span className="text-sm font-medium">الأطراف:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {contract.parties.map((party, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {party}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      عرض
                    </Button>
                    {contract.status !== 'executed' && (
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        تعديل
                      </Button>
                    )}
                  </div>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    تحميل PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {filteredContracts.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد عقود</h3>
            <p className="text-muted-foreground">
              لم يتم العثور على عقود في هذه الفئة
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContractManagement;
