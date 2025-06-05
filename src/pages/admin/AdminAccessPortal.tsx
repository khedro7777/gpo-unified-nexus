
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ExternalLink, Database, Settings, Users, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminAccessPortal = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const handleOpenStrapiAdmin = () => {
    window.open('https://cms.gpo.example.com/admin', '_blank');
  };

  const adminFeatures = [
    {
      icon: <Database className="h-5 w-5" />,
      title: isRTL ? 'إدارة المحتوى' : 'Content Management',
      description: isRTL ? 'التحكم في جميع النصوص والمحتويات' : 'Control all texts and content'
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: isRTL ? 'إدارة المستخدمين' : 'User Management',
      description: isRTL ? 'مراقبة وإدارة حسابات المستخدمين' : 'Monitor and manage user accounts'
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: isRTL ? 'إعدادات النظام' : 'System Settings',
      description: isRTL ? 'تكوين إعدادات المنصة' : 'Configure platform settings'
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics',
      description: isRTL ? 'عرض إحصائيات المنصة' : 'View platform statistics'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-card to-card/80 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary via-blue-500 to-purple-500"></div>
          
          <CardHeader className="text-center space-y-4 py-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            
            <CardTitle className="text-3xl font-bold">
              {isRTL ? 'مرحباً بك في بوابة إدارة GPO' : 'Welcome to GPO Admin Access Portal'}
            </CardTitle>
            
            <CardDescription className="text-lg max-w-2xl mx-auto">
              {isRTL 
                ? 'هذه المنطقة مخصصة للحوكمة الداخلية والمراقبة والتحكم في المحتوى.'
                : 'This area is reserved for internal governance, observation, and content control.'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8 pb-8">
            {/* Admin Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adminFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Security Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-amber-800 mb-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">
                  {isRTL ? 'تنبيه أمني' : 'Security Notice'}
                </span>
              </div>
              <p className="text-sm text-amber-700">
                {isRTL 
                  ? 'هذه المنطقة محمية وتتطلب صلاحيات إدارية. جميع الأنشطة مراقبة ومسجلة.'
                  : 'This area is protected and requires administrative privileges. All activities are monitored and logged.'
                }
              </p>
            </div>
            
            {/* Main Action Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-primary/90"
                onClick={handleOpenStrapiAdmin}
              >
                <ExternalLink className="h-5 w-5 mr-3" />
                {isRTL ? 'دخول لوحة الإدارة' : 'Enter Admin Dashboard'}
              </Button>
              
              <p className="text-sm text-muted-foreground mt-3">
                {isRTL 
                  ? 'سيتم فتح لوحة إدارة Strapi في نافذة جديدة'
                  : 'Will open Strapi admin panel in a new tab'
                }
              </p>
            </div>
            
            {/* System Status */}
            <div className="border-t pt-6">
              <h4 className="font-medium mb-4 text-center">
                {isRTL ? 'حالة الأنظمة المدمجة' : 'Integrated Systems Status'}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {['Strapi CMS', 'Paddle', 'Loomio', 'Snapshot'].map((system) => (
                  <div key={system} className="space-y-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full mx-auto animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">{system}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAccessPortal;
