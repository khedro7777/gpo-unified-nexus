
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  GitBranch,
  Zap,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  Database,
  Globe,
  Shield,
  Cpu
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'failed';
  service: string;
  integration: string;
}

interface IntegrationService {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'error';
  type: 'automation' | 'blockchain' | 'ai' | 'governance';
  version: string;
}

const WorkflowIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('workflow');

  const workflowSteps: WorkflowStep[] = [
    {
      id: '1',
      name: 'إنشاء مجموعة تعاونية',
      description: 'إنشاء مجموعة جديدة للتعاون الذكي',
      status: 'completed',
      service: 'إدارة المجموعات',
      integration: 'nexus-ai-workspace'
    },
    {
      id: '2',
      name: 'تفعيل نظام التصويت',
      description: 'تفعيل آلية التصويت اللامركزية',
      status: 'in-progress',
      service: 'التصويت والحوكمة',
      integration: 'snapdao-web-gateway'
    },
    {
      id: '3',
      name: 'إعداد العقود الذكية',
      description: 'تكوين وتشغيل العقود الذكية',
      status: 'pending',
      service: 'العقود الذكية',
      integration: 'gpo-smart-contracts-hub'
    },
    {
      id: '4',
      name: 'تكامل محفظة النقاط',
      description: 'ربط نظام النقاط بالخدمات',
      status: 'completed',
      service: 'نظام النقاط',
      integration: 'nexus-ai-workspace'
    }
  ];

  const integrationServices: IntegrationService[] = [
    {
      id: 'nexus-ai',
      name: 'مساحة العمل الذكية',
      description: 'منصة إدارة المشاريع والتعاون',
      status: 'active',
      type: 'ai',
      version: 'v2.1.0'
    },
    {
      id: 'snapdao-gateway',
      name: 'بوابة التصويت',
      description: 'نظام التصويت اللامركزي المتقدم',
      status: 'active',
      type: 'governance',
      version: 'v1.8.2'
    },
    {
      id: 'smart-contracts',
      name: 'مركز العقود الذكية',
      description: 'إدارة وتشغيل العقود الذكية',
      status: 'inactive',
      type: 'blockchain',
      version: 'v3.0.1'
    },
    {
      id: 'automation-engine',
      name: 'محرك الأتمتة',
      description: 'أتمتة العمليات والمهام',
      status: 'active',
      type: 'automation',
      version: 'v1.5.3'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-400" />;
      case 'failed':
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'inactive':
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ai':
        return <Cpu className="h-5 w-5" />;
      case 'blockchain':
        return <Shield className="h-5 w-5" />;
      case 'governance':
        return <Globe className="h-5 w-5" />;
      case 'automation':
        return <Zap className="h-5 w-5" />;
      default:
        return <Database className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ai':
        return 'bg-purple-100 text-purple-800';
      case 'blockchain':
        return 'bg-blue-100 text-blue-800';
      case 'governance':
        return 'bg-green-100 text-green-800';
      case 'automation':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-orange-100 text-orange-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'failed':
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const completedSteps = workflowSteps.filter(step => step.status === 'completed').length;
  const progressPercentage = (completedSteps / workflowSteps.length) * 100;

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">تكامل سير العمل</h2>
        <p className="text-gray-600">إدارة ومراقبة تكامل الخدمات والأنظمة</p>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-6 w-6" />
            تقدم سير العمل العام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>{completedSteps} من {workflowSteps.length} خطوات مكتملة</span>
              <span className="font-bold">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-white/20" />
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="workflow">سير العمل</TabsTrigger>
          <TabsTrigger value="services">الخدمات المتكاملة</TabsTrigger>
        </TabsList>

        <TabsContent value="workflow" className="space-y-6">
          <div className="space-y-4">
            {workflowSteps.map((step, index) => (
              <Card key={step.id} className={step.status === 'completed' ? 'bg-green-50 border-green-200' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{step.name}</h3>
                        <p className="text-gray-600 mb-2">{step.description}</p>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">{step.service}</Badge>
                          <Badge variant="secondary">{step.integration}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(step.status)}
                      <Badge className={getStatusColor(step.status)}>
                        {step.status === 'completed' ? 'مكتمل' :
                         step.status === 'in-progress' ? 'قيد التنفيذ' :
                         step.status === 'pending' ? 'في الانتظار' : 'فشل'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrationServices.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(service.type)}`}>
                        {getTypeIcon(service.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                    {getStatusIcon(service.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(service.status)}>
                      {service.status === 'active' ? 'نشط' :
                       service.status === 'inactive' ? 'غير نشط' : 'خطأ'}
                    </Badge>
                    <span className="text-sm text-gray-600">الإصدار {service.version}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={service.status === 'active' ? "secondary" : "default"}
                    >
                      {service.status === 'active' ? 'إدارة' : 'تفعيل'}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4 ml-1" />
                      إعدادات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowIntegration;
