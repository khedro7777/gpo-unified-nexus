
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bot, Zap, MessageCircle, Settings, Send, Lightbulb, Play, Pause } from 'lucide-react';
import MCPChat from '@/components/chat/MCPChat';

interface MCPAssistantBoxProps {
  className?: string;
}

const MCPAssistantBox: React.FC<MCPAssistantBoxProps> = ({ className = '' }) => {
  const [mode, setMode] = useState<'auto' | 'ask' | 'manual'>('ask');
  const [isExpanded, setIsExpanded] = useState(false);
  const [quickPrompt, setQuickPrompt] = useState('');

  const quickActions = [
    { id: 'create-group', label: 'إنشاء مجموعة', icon: '👥' },
    { id: 'find-suppliers', label: 'البحث عن موردين', icon: '🏪' },
    { id: 'vote-analysis', label: 'تحليل التصويت', icon: '📊' },
    { id: 'contract-review', label: 'مراجعة العقد', icon: '📋' }
  ];

  const modeConfig = {
    auto: {
      color: 'bg-green-500',
      icon: <Zap className="h-4 w-4" />,
      label: 'تلقائي',
      description: 'تنفيذ المهام تلقائياً بعد الموافقة'
    },
    ask: {
      color: 'bg-blue-500',
      icon: <MessageCircle className="h-4 w-4" />,
      label: 'استشارة',
      description: 'تقديم اقتراحات وإرشادات'
    },
    manual: {
      color: 'bg-orange-500',
      icon: <Settings className="h-4 w-4" />,
      label: 'يدوي',
      description: 'توجيه خطوة بخطوة'
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Collapsed State */}
      {!isExpanded && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <Button
            onClick={() => setIsExpanded(true)}
            className={`relative h-16 w-16 rounded-full shadow-2xl ${modeConfig[mode].color} hover:scale-110 transition-all duration-300`}
            size="icon"
          >
            <Bot className="h-8 w-8 text-white" />
          </Button>
          <Badge className="absolute -top-2 -right-2 text-xs">
            {modeConfig[mode].label}
          </Badge>
        </div>
      )}

      {/* Expanded State */}
      {isExpanded && (
        <Card className="w-96 max-h-[600px] shadow-2xl border-0 bg-white/95 backdrop-blur-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-lg">مساعد MCP الذكي</CardTitle>
                  <CardDescription className="text-xs">
                    {modeConfig[mode].description}
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-8 w-8 p-0"
              >
                ✕
              </Button>
            </div>

            {/* Mode Selector */}
            <div className="flex gap-1 mt-3">
              {Object.entries(modeConfig).map(([key, config]) => (
                <Button
                  key={key}
                  variant={mode === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMode(key as typeof mode)}
                  className="flex-1 text-xs h-8"
                >
                  {config.icon}
                  <span className="mr-1">{config.label}</span>
                </Button>
              ))}
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mx-4">
                <TabsTrigger value="chat" className="text-xs">المحادثة</TabsTrigger>
                <TabsTrigger value="quick" className="text-xs">إجراءات سريعة</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="px-4 pb-4">
                <div className="h-64 border rounded-lg">
                  <MCPChat />
                </div>
              </TabsContent>

              <TabsContent value="quick" className="px-4 pb-4 space-y-3">
                {/* Quick Prompt */}
                <div className="flex gap-2">
                  <Input
                    placeholder="اكتب طلبك السريع..."
                    value={quickPrompt}
                    onChange={(e) => setQuickPrompt(e.target.value)}
                    className="text-sm"
                    dir="rtl"
                  />
                  <Button size="sm" disabled={!quickPrompt.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.id}
                      variant="outline"
                      size="sm"
                      className="h-auto py-3 flex flex-col items-center gap-1 text-xs"
                    >
                      <span className="text-lg">{action.icon}</span>
                      <span>{action.label}</span>
                    </Button>
                  ))}
                </div>

                {/* Smart Suggestions */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lightbulb className="h-3 w-3" />
                    <span>اقتراحات ذكية</span>
                  </div>
                  <div className="space-y-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
                      💡 تحليل أداء مجموعاتك النشطة
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
                      📈 اقتراح موردين جدد لمشاريعك
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
                      ⚡ تفعيل التصويت التلقائي
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MCPAssistantBox;
