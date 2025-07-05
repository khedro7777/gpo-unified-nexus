
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  MessageSquare, 
  Settings, 
  Zap, 
  ArrowRight, 
  Send,
  Lightbulb,
  TrendingUp,
  Users,
  ShoppingCart
} from 'lucide-react';
import { useMCP } from '@/hooks/use-mcp';
import { useAuth } from '@/hooks/use-auth';

const MCPAssistantBox = () => {
  const [activeMode, setActiveMode] = useState<'auto' | 'ask' | 'manual'>('manual');
  const [userQuery, setUserQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { mode, setMode, serverStatus, executeAction } = useMCP();
  const { isAuthenticated } = useAuth();

  const handleModeChange = (newMode: 'auto' | 'ask' | 'manual') => {
    setActiveMode(newMode);
    setMode(newMode);
  };

  const handleQuerySubmit = async () => {
    if (!userQuery.trim()) return;
    
    setIsProcessing(true);
    try {
      const result = await executeAction('process_user_query', { query: userQuery });
      console.log('MCP Response:', result);
      // Here you would handle the response and show it to the user
    } catch (error) {
      console.error('MCP Error:', error);
    } finally {
      setIsProcessing(false);
      setUserQuery('');
    }
  };

  const quickActions = [
    {
      title: 'إنشاء مجموعة شراء',
      description: 'ابدأ مجموعة شراء تعاونية جديدة',
      icon: <ShoppingCart className="h-5 w-5" />,
      action: 'create_buying_group',
      route: '/create-group/purchasing'
    },
    {
      title: 'العثور على موردين',
      description: 'ابحث عن موردين موثوقين',
      icon: <Users className="h-5 w-5" />,
      action: 'find_suppliers',
      route: '/suppliers'
    },
    {
      title: 'تحليل السوق',
      description: 'احصل على تحليل ذكي للسوق',
      icon: <TrendingUp className="h-5 w-5" />,
      action: 'market_analysis',
      route: '/analytics'
    }
  ];

  const getModeColor = (modeType: string) => {
    switch (modeType) {
      case 'auto': return 'bg-green-500 text-white';
      case 'ask': return 'bg-blue-500 text-white';
      case 'manual': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getModeDescription = (modeType: string) => {
    switch (modeType) {
      case 'auto': return 'تنفيذ تلقائي للمهام بدون تدخل';
      case 'ask': return 'السؤال قبل تنفيذ أي إجراء';
      case 'manual': return 'تنفيذ يدوي مع إرشادات';
      default: return 'وضع غير معروف';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">GPO MCP Assistant</CardTitle>
              <CardDescription className="text-base">
                مساعدك الذكي للتعاون والتفاوض
              </CardDescription>
            </div>
          </div>

          {/* Server Status */}
          <div className="flex items-center justify-center gap-2">
            <div className={`w-3 h-3 rounded-full ${serverStatus.connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-sm text-muted-foreground">
              {serverStatus.connected ? 'متصل ونشط' : 'غير متصل'}
            </span>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeMode} onValueChange={(value) => handleModeChange(value as any)} className="w-full">
            {/* Mode Selection */}
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="auto" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                تلقائي
              </TabsTrigger>
              <TabsTrigger value="ask" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                اسأل
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                يدوي
              </TabsTrigger>
            </TabsList>

            {/* Mode Content */}
            <div className="space-y-6">
              {/* Mode Description */}
              <div className="text-center">
                <Badge className={`${getModeColor(activeMode)} px-4 py-2 text-sm`}>
                  {getModeDescription(activeMode)}
                </Badge>
              </div>

              {/* Query Input */}
              <div className="flex gap-3">
                <Input
                  placeholder="اسأل المساعد الذكي أو اطلب المساعدة..."
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  className="flex-1 h-12 text-base"
                  dir="rtl"
                  onKeyPress={(e) => e.key === 'Enter' && handleQuerySubmit()}
                />
                <Button 
                  onClick={handleQuerySubmit}
                  disabled={isProcessing || !userQuery.trim()}
                  className="h-12 px-6"
                >
                  {isProcessing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Lightbulb className="h-4 w-4" />
                  إجراءات سريعة:
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            {action.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1">{action.title}</h4>
                            <p className="text-xs text-muted-foreground mb-3">
                              {action.description}
                            </p>
                            <Button size="sm" variant="outline" className="w-full text-xs">
                              {isAuthenticated ? 'ابدأ الآن' : 'سجل دخول للبدء'}
                              <ArrowRight className="mr-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              {serverStatus.connected && serverStatus.capabilities.length > 0 && (
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    القدرات المتاحة:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {serverStatus.capabilities.map((capability, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MCPAssistantBox;
