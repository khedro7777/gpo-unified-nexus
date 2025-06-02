
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageSquare, Zap, Clock, CheckCircle, AlertCircle, BarChart3 } from 'lucide-react';

const MCP = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bot className="h-8 w-8 text-primary" />
            نظام MCP المدمج مع Rasa
          </h1>
          <p className="text-muted-foreground">
            نظام ذكي شامل للمساعدة والتحكم مع دعم المحادثة بالذكاء الاصطناعي
          </p>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">حالة MCP</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">متصل</div>
              <p className="text-xs text-muted-foreground">
                آخر تحديث منذ دقيقتين
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rasa Assistant</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">نشط</div>
              <p className="text-xs text-muted-foreground">
                جاهز للمحادثة والمساعدة
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المهام اليوم</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">24</div>
              <p className="text-xs text-muted-foreground">
                مهمة مكتملة من أصل 27
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                مزايا MCP المحدث
              </CardTitle>
              <CardDescription>
                نظام ذكي محسن مع واجهة سهلة الاستخدام
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="default" className="bg-green-500">جديد</Badge>
                  <span className="text-sm">لوحة MCP على اليمين دائماً متاحة</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="default" className="bg-blue-500">محسن</Badge>
                  <span className="text-sm">أوضاع واضحة: تلقائي، استشارة، يدوي</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="default" className="bg-purple-500">ذكي</Badge>
                  <span className="text-sm">مساعد Rasa للدردشة الذكية</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">متقدم</Badge>
                  <span className="text-sm">تتبع المهام والإحصائيات المباشرة</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                مزايا مساعد Rasa
              </CardTitle>
              <CardDescription>
                ذكاء اصطناعي متطور لفهم احتياجاتك
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">فهم النصوص باللغة العربية</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">التعرف على الصوت والنطق</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">اقتراحات ذكية حسب السياق</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">تعلم من تفاعلاتك</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
            <CardDescription>
              استخدم اللوحة على اليمين للوصول السريع لجميع مزايا MCP و Rasa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Zap className="h-6 w-6" />
                <span>تفعيل الوضع التلقائي</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <MessageSquare className="h-6 w-6" />
                <span>بدء محادثة مع Rasa</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <BarChart3 className="h-6 w-6" />
                <span>عرض إحصائيات المهام</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </NewMainLayout>
  );
};

export default MCP;
