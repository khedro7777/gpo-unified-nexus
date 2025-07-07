
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import MCPBox from '@/components/mcp/MCPBox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, Zap, MessageSquare, TrendingUp, Users, 
  FileText, Settings, Terminal, Lightbulb,
  CheckCircle, Clock, BarChart3
} from 'lucide-react';

const MCPPage = () => {
  const mcpStats = [
    {
      title: 'العمليات المنجزة',
      value: '1,247',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'المجموعات المدارة',
      value: '89',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'المفاوضات النشطة',
      value: '34',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'الوقت الموفر (ساعة)',
      value: '156',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentOperations = [
    {
      id: 1,
      operation: 'إنشاء مجموعة شراء',
      status: 'completed',
      timestamp: 'منذ 10 دقائق',
      details: 'تم إنشاء مجموعة لشراء أجهزة كمبيوتر بنجاح'
    },
    {
      id: 2,
      operation: 'تحليل عروض الموردين',
      status: 'processing',
      timestamp: 'منذ 20 دقيقة',
      details: 'جاري تحليل 12 عرض من موردين مختلفين'
    },
    {
      id: 3,
      operation: 'إدارة التصويت',
      status: 'completed',
      timestamp: 'منذ ساعة',
      details: 'تم تنظيم عملية تصويت وجمع النتائج'
    }
  ];

  return (
    <NewMainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                صندوق MCP الذكي
              </h1>
              <p className="text-lg text-muted-foreground">مركز التحكم والمعالجة الذكية المتقدم</p>
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mb-6">
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="mr-1 h-3 w-3" />
              متصل
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <Zap className="mr-1 h-3 w-3" />
              الوضع التلقائي
            </Badge>
            <Badge className="bg-purple-100 text-purple-800">
              <Bot className="mr-1 h-3 w-3" />
              نشط
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mcpStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main MCP Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MCP Box */}
          <div className="lg:col-span-2">
            <MCPBox />
          </div>

          {/* Operations Log */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  سجل العمليات
                </CardTitle>
                <CardDescription>آخر العمليات المنفذة بواسطة MCP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOperations.map((operation) => (
                    <div key={operation.id} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{operation.operation}</h4>
                        <Badge 
                          className={
                            operation.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-orange-100 text-orange-800'
                          }
                        >
                          {operation.status === 'completed' ? 'مكتمل' : 'قيد المعالجة'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{operation.details}</p>
                      <p className="text-xs text-gray-400">{operation.timestamp}</p>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  عرض التقرير الكامل
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                تحليل السوق
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                تحليل ذكي لاتجاهات السوق والأسعار لمساعدتك في اتخاذ قرارات أفضل
              </p>
              <Button variant="outline" className="w-full">
                <TrendingUp className="mr-2 h-4 w-4" />
                عرض التحليل
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5" />
                الاقتراحات الذكية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                اقتراحات مخصصة لتحسين أداء مجموعاتك ونجاح مشاريعك
              </p>
              <Button variant="outline" className="w-full">
                <Lightbulb className="mr-2 h-4 w-4" />
                عرض الاقتراحات
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5" />
                إعدادات متقدمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                تخصيص سلوك MCP وضبط الإعدادات المتقدمة للحصول على أفضل أداء
              </p>
              <Button variant="outline" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                فتح الإعدادات
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </NewMainLayout>
  );
};

export default MCPPage;
