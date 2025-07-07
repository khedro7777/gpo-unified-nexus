
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, Send, Zap, Settings, Terminal, Wrench, 
  CheckCircle, Clock, AlertTriangle, Lightbulb,
  MessageSquare, FileText, TrendingUp, Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MCPBoxProps {
  className?: string;
}

const MCPBox: React.FC<MCPBoxProps> = ({ className }) => {
  const [activeMode, setActiveMode] = useState<'auto' | 'ask' | 'manual'>('auto');
  const [userPrompt, setUserPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const mcpCapabilities = [
    {
      title: 'إدارة المجموعات الذكية',
      description: 'إنشاء وإدارة المجموعات تلقائياً',
      icon: Users,
      status: 'active'
    },
    {
      title: 'التفاوض المتقدم',
      description: 'مساعدة في التفاوض وإدارة العروض',
      icon: MessageSquare,
      status: 'active'
    },
    {
      title: 'تحليل السوق',
      description: 'تحليل الأسعار واتجاهات السوق',
      icon: TrendingUp,
      status: 'active'
    },
    {
      title: 'إدارة الوثائق',
      description: 'معالجة وتصنيف الوثائق تلقائياً',
      icon: FileText,
      status: 'beta'
    }
  ];

  const handlePromptSubmit = async () => {
    if (!userPrompt.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "تم معالجة الطلب",
        description: `تم تنفيذ "${userPrompt}" في الوضع ${activeMode === 'auto' ? 'التلقائي' : activeMode === 'ask' ? 'التفاعلي' : 'اليدوي'}`,
      });
      setUserPrompt('');
      setIsProcessing(false);
    }, 2000);
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'auto': return <Zap className="h-4 w-4" />;
      case 'ask': return <MessageSquare className="h-4 w-4" />;
      case 'manual': return <Wrench className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'auto': return 'bg-green-100 text-green-800 border-green-200';
      case 'ask': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'manual': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'beta': return <Clock className="h-3 w-3 text-orange-500" />;
      case 'inactive': return <AlertTriangle className="h-3 w-3 text-red-500" />;
      default: return <CheckCircle className="h-3 w-3 text-green-500" />;
    }
  };

  return (
    <Card className={`${className} border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">صندوق MCP الذكي</CardTitle>
              <CardDescription>مركز التحكم والمعالجة الذكية</CardDescription>
            </div>
          </div>
          
          <Badge className={`${getModeColor(activeMode)} font-medium`}>
            {getModeIcon(activeMode)}
            <span className="mr-1">
              {activeMode === 'auto' ? 'تلقائي' : activeMode === 'ask' ? 'تفاعلي' : 'يدوي'}
            </span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Mode Selection */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: 'auto', label: 'تلقائي', desc: 'تنفيذ مباشر' },
            { key: 'ask', label: 'تفاعلي', desc: 'يسأل قبل التنفيذ' },
            { key: 'manual', label: 'يدوي', desc: 'تحكم كامل' }
          ].map((mode) => (
            <Button
              key={mode.key}
              variant={activeMode === mode.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveMode(mode.key as any)}
              className="flex flex-col items-center gap-1 h-auto py-3"
            >
              {getModeIcon(mode.key)}
              <span className="text-xs font-medium">{mode.label}</span>
              <span className="text-xs text-muted-foreground">{mode.desc}</span>
            </Button>
          ))}
        </div>

        {/* Prompt Input */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Textarea
              placeholder="اكتب طلبك هنا... مثال: أنشئ مجموعة شراء لأجهزة اللابتوب"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="resize-none h-20 bg-white border-2"
              dir="rtl"
            />
          </div>
          
          <Button 
            onClick={handlePromptSubmit}
            disabled={!userPrompt.trim() || isProcessing}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
          >
            {isProcessing ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                جاري المعالجة...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                تنفيذ الطلب
              </>
            )}
          </Button>
        </div>

        {/* Capabilities */}
        <Tabs defaultValue="capabilities" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="capabilities">القدرات</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="capabilities" className="space-y-3 mt-4">
            {mcpCapabilities.map((capability, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border hover:shadow-sm transition-shadow">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <capability.icon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{capability.title}</h4>
                    {getStatusIcon(capability.status)}
                  </div>
                  <p className="text-xs text-muted-foreground">{capability.description}</p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div>
                  <h4 className="font-medium text-sm">الإشعارات الذكية</h4>
                  <p className="text-xs text-muted-foreground">تلقي إشعارات عن العمليات</p>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div>
                  <h4 className="font-medium text-sm">التعلم المتقدم</h4>
                  <p className="text-xs text-muted-foreground">تحسين الأداء من تفاعلاتك</p>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Lightbulb className="mr-1 h-3 w-3" />
            اقتراحات ذكية
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <Terminal className="mr-1 h-3 w-3" />
            سجل العمليات
          </Button>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-center gap-2 pt-2 border-t">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">MCP متصل ونشط</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MCPBox;
