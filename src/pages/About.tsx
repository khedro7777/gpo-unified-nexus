
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoIcon, Users, Building, Globe } from 'lucide-react';

const About = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">من نحن</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            تعرف على منصة GPO MCP وفريق العمل
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <InfoIcon className="h-5 w-5" />
              <span>عن المنصة</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed mb-6">
              منصة GPO MCP هي منصة متكاملة للعقود التعاونية الذكية، تجمع بين تقنيات WEB2 و WEB3 لتوفير حلول متكاملة للمشتريات الجماعية والتعاون المؤسسي. تم تأسيس المنصة في عام 2025 بهدف تمكين المؤسسات والشركات من العمل معًا بطريقة أكثر كفاءة وشفافية.
            </p>
            
            <p className="leading-relaxed mb-6">
              تقدم المنصة مجموعة متنوعة من الخدمات، بدءًا من الشراء التعاوني والتسويق الجماعي وصولاً إلى خدمات التحكيم وفض النزاعات والعقود الذكية. جميع هذه الخدمات مدعومة بتقنيات الذكاء الاصطناعي والتحليل المتقدم للبيانات.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium mb-1">+5000</h3>
                <p className="text-sm text-muted-foreground">عميل نشط</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium mb-1">+120</h3>
                <p className="text-sm text-muted-foreground">مؤسسة مشاركة</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium mb-1">25</h3>
                <p className="text-sm text-muted-foreground">دولة حول العالم</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>فريق العمل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-lg font-medium">MA</span>
                  </div>
                  <div>
                    <h4 className="font-medium">محمد أحمد</h4>
                    <p className="text-sm text-muted-foreground">المؤسس والرئيس التنفيذي</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-lg font-medium">SK</span>
                  </div>
                  <div>
                    <h4 className="font-medium">سارة خالد</h4>
                    <p className="text-sm text-muted-foreground">مدير التكنولوجيا</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-lg font-medium">TH</span>
                  </div>
                  <div>
                    <h4 className="font-medium">طارق حسن</h4>
                    <p className="text-sm text-muted-foreground">مدير العمليات</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>شركاؤنا</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="border rounded-md p-4 flex items-center justify-center h-20">
                  <span className="text-lg font-medium text-muted-foreground">SnapDAO</span>
                </div>
                
                <div className="border rounded-md p-4 flex items-center justify-center h-20">
                  <span className="text-lg font-medium text-muted-foreground">Paddle</span>
                </div>
                
                <div className="border rounded-md p-4 flex items-center justify-center h-20">
                  <span className="text-lg font-medium text-muted-foreground">ERPNext</span>
                </div>
                
                <div className="border rounded-md p-4 flex items-center justify-center h-20">
                  <span className="text-lg font-medium text-muted-foreground">Loomio</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
