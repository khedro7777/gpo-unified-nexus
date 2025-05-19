
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Shield, Lightbulb, Globe, ArrowRight } from 'lucide-react';

const Mission = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">رسالتنا</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            هدفنا هو تمكين التعاون الاقتصادي من خلال تقنيات ذكية وعقود شفافة
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span>رؤيتنا وأهدافنا</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">الرؤية</h3>
                <p className="leading-relaxed">
                  نسعى لبناء منظومة اقتصادية عالمية تعتمد على التعاون والشفافية والكفاءة، من خلال الجمع بين أحدث التقنيات وأفضل الممارسات الإدارية. نهدف إلى أن تصبح منصة GPO MCP المنصة الرائدة عالميًا في مجال الخدمات التعاونية والعقود الذكية.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">المهمة</h3>
                <p className="leading-relaxed">
                  تتمثل مهمتنا في توفير منصة متكاملة تمكن المؤسسات والشركات من العمل معًا بطريقة أكثر كفاءة وشفافية، وتعزيز التعاون الاقتصادي من خلال تقنيات ذكية وعقود شفافة. نعمل على تسهيل عمليات الشراء والتسويق والتعاون بين المؤسسات، وتوفير حلول مبتكرة للتحديات التي تواجهها.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <div className="bg-primary/10 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-medium mb-2">الثقة والشفافية</h4>
                <p className="text-sm text-muted-foreground">
                  نؤمن بأهمية الثقة والشفافية في كل تعاملاتنا، لذا نحرص على توفير منصة آمنة وشفافة تمكن المستخدمين من التعاون بثقة.
                </p>
              </div>
              
              <div>
                <div className="bg-primary/10 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-medium mb-2">الابتكار المستمر</h4>
                <p className="text-sm text-muted-foreground">
                  نسعى دائمًا للابتكار وتطوير حلول جديدة تلبي احتياجات المستخدمين وتواكب التطورات التكنولوجية المتسارعة.
                </p>
              </div>
              
              <div>
                <div className="bg-primary/10 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-medium mb-2">التأثير العالمي</h4>
                <p className="text-sm text-muted-foreground">
                  نهدف إلى إحداث تأثير إيجابي على الاقتصاد العالمي من خلال تمكين الشركات والمؤسسات من مختلف أنحاء العالم من التعاون بفعالية.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>أهدافنا الاستراتيجية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">توسيع نطاق الخدمات</h4>
                  <p className="text-sm text-muted-foreground">
                    العمل على إضافة خدمات جديدة تلبي احتياجات مختلف القطاعات والصناعات، وتوسيع نطاق الخدمات الحالية.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">تعزيز التكامل التقني</h4>
                  <p className="text-sm text-muted-foreground">
                    العمل على تعزيز التكامل بين تقنيات WEB2 و WEB3 لتوفير تجربة سلسة وفعالة للمستخدمين، وتطوير حلول مبتكرة.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">بناء مجتمع متعاون</h4>
                  <p className="text-sm text-muted-foreground">
                    العمل على بناء مجتمع نشط ومتعاون يضم مختلف الشركات والمؤسسات، وتشجيع التعاون والتبادل المعرفي بينها.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">تعزيز الابتكار المستدام</h4>
                  <p className="text-sm text-muted-foreground">
                    العمل على تطوير حلول مستدامة تساهم في تحقيق التنمية المستدامة والاقتصاد الدائري، وتعزيز الممارسات المسؤولة.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Mission;
