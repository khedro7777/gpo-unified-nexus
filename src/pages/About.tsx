
import React from 'react';
import EnhancedTopBar from '@/components/layout/EnhancedTopBar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, Zap, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <EnhancedTopBar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              من نحن
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              GPO منصة التعاون الذكي - نحن نعيد تعريف طريقة العمل الجماعي في العصر الرقمي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle className="text-foreground">رؤيتنا</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  نسعى لبناء أكبر منصة عربية للتعاون الذكي، حيث يمكن للأفراد والشركات 
                  العمل معاً لتحقيق أهداف مشتركة بكفاءة أعلى وتكلفة أقل.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-8 w-8 text-primary" />
                  <CardTitle className="text-foreground">مهمتنا</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  تمكين المجتمعات والشركات من الوصول إلى الموارد والخدمات بأفضل جودة 
                  وأسعار تنافسية من خلال قوة العمل الجماعي.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="h-8 w-8 text-primary" />
                  <CardTitle className="text-foreground">التقنيات المتقدمة</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  نستخدم أحدث التقنيات مثل الذكاء الاصطناعي، البلوك تشين، وأنظمة التصويت 
                  اللامركزية لضمان الشفافية والعدالة.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="h-8 w-8 text-primary" />
                  <CardTitle className="text-foreground">الوصول العالمي</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  ندعم 8 لغات عالمية ونعمل في أكثر من 20 دولة، مما يتيح للمستخدمين 
                  التعاون عبر الحدود الجغرافية.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-foreground">قيمنا الأساسية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold mb-2 text-foreground">الشفافية</h4>
                  <p className="text-sm text-muted-foreground">
                    جميع العمليات مفتوحة وقابلة للتتبع
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2 text-foreground">العدالة</h4>
                  <p className="text-sm text-muted-foreground">
                    نظام تصويت ديمقراطي وحل نزاعات عادل
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2 text-foreground">الابتكار</h4>
                  <p className="text-sm text-muted-foreground">
                    استخدام التقنيات الحديثة لحلول ذكية
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
