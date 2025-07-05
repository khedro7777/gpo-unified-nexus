
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, Loader2, MessageSquare, Settings, Zap } from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'action' | 'suggestion';
  actions?: Array<{ label: string; action: string }>;
}

interface BotpressAssistantProps {
  groupId: string;
  userId: string;
  context: 'group_management' | 'general' | 'voting' | 'contracts';
}

const BotpressAssistant: React.FC<BotpressAssistantProps> = ({ 
  groupId, 
  userId, 
  context = 'general' 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [assistantMode, setAssistantMode] = useState<'chat' | 'actions' | 'analytics'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize assistant with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      content: getWelcomeMessage(context),
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([welcomeMessage]);
    setIsConnected(true);
  }, [context]);

  const getWelcomeMessage = (ctx: string) => {
    switch (ctx) {
      case 'group_management':
        return 'مرحباً! أنا مساعدك الذكي لإدارة المجموعة. يمكنني مساعدتك في إدارة الأعضاء، تنظيم التصويتات، تتبع التقدم، وأتمتة المهام الإدارية. كيف يمكنني مساعدتك اليوم؟';
      case 'voting':
        return 'مرحباً! أنا هنا لمساعدتك في إدارة التصويتات. يمكنني إنشاء استطلاعات، تحليل النتائج، وإرسال التذكيرات للأعضاء.';
      case 'contracts':
        return 'مرحباً! أنا مساعدك في إدارة العقود. يمكنني مساعدتك في مراجعة الشروط، تتبع التواقيع، وإدارة المواعيد النهائية.';
      default:
        return 'مرحباً! أنا مساعدك الذكي في منصة GPO. كيف يمكنني مساعدتك اليوم؟';
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate Botpress response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage, context);
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string, ctx: string): ChatMessage => {
    const input = userInput.toLowerCase();
    
    // Context-aware responses
    if (ctx === 'group_management') {
      if (input.includes('عضو') || input.includes('أعضاء')) {
        return {
          id: Date.now().toString(),
          content: 'يمكنني مساعدتك في إدارة الأعضاء. إليك ما يمكنني فعله:',
          sender: 'bot',
          timestamp: new Date(),
          type: 'action',
          actions: [
            { label: 'عرض قائمة الأعضاء', action: 'list_members' },
            { label: 'إضافة عضو جديد', action: 'add_member' },
            { label: 'إدارة الأذونات', action: 'manage_permissions' }
          ]
        };
      }
      
      if (input.includes('تصويت') || input.includes('استطلاع')) {
        return {
          id: Date.now().toString(),
          content: 'بالتأكيد! يمكنني مساعدتك في إدارة التصويتات:',
          sender: 'bot',
          timestamp: new Date(),
          type: 'action',
          actions: [
            { label: 'إنشاء تصويت جديد', action: 'create_vote' },
            { label: 'عرض التصويتات النشطة', action: 'show_active_votes' },
            { label: 'تحليل نتائج التصويت', action: 'analyze_results' }
          ]
        };
      }
      
      if (input.includes('تقرير') || input.includes('إحصائية')) {
        return {
          id: Date.now().toString(),
          content: 'إليك ملخص سريع عن نشاط المجموعة:\n\n• العدد الحالي للأعضاء: 24\n• التصويتات النشطة: 2\n• المهام المكتملة: 15\n• معدل المشاركة: 87%\n\nهل تريد تقريراً مفصلاً أكثر؟',
          sender: 'bot',
          timestamp: new Date(),
          type: 'suggestion'
        };
      }
    }

    // General responses
    const responses = [
      'شكراً لك على رسالتك. كيف يمكنني مساعدتك أكثر؟',
      'أفهم ما تقصده. دعني أساعدك في هذا الأمر.',
      'هذا سؤال جيد! دعني أقدم لك المعلومات المناسبة.',
      'يمكنني بالتأكيد مساعدتك في ذلك. ما التفاصيل التي تحتاجها؟'
    ];

    return {
      id: Date.now().toString(),
      content: responses[Math.floor(Math.random() * responses.length)],
      sender: 'bot',
      timestamp: new Date()
    };
  };

  const handleActionClick = (action: string) => {
    const actionResponse: ChatMessage = {
      id: Date.now().toString(),
      content: `تم تنفيذ الإجراء: ${action}. سأقوم بتنفيذ هذا الطلب الآن...`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, actionResponse]);
  };

  const quickActions = [
    { label: 'عرض إحصائيات المجموعة', action: 'show_stats' },
    { label: 'إنشاء تصويت سريع', action: 'quick_vote' },
    { label: 'إرسال إشعار للأعضاء', action: 'send_notification' },
    { label: 'تصدير تقرير', action: 'export_report' }
  ];

  return (
    <div className="space-y-6">
      {/* Assistant Status */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">المساعد الذكي</CardTitle>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
            <div className="flex gap-1">
              <Button
                variant={assistantMode === 'chat' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAssistantMode('chat')}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button
                variant={assistantMode === 'actions' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAssistantMode('actions')}
              >
                <Zap className="h-4 w-4" />
              </Button>
              <Button
                variant={assistantMode === 'analytics' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAssistantMode('analytics')}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>
            مساعد ذكي متخصص في {context === 'group_management' ? 'إدارة المجموعات' : 'المساعدة العامة'}
          </CardDescription>
        </CardHeader>
      </Card>

      {assistantMode === 'chat' && (
        <Card className="h-[500px] flex flex-col">
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      
                      <div className={`rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        
                        {message.actions && (
                          <div className="mt-3 space-y-2">
                            {message.actions.map((action, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                onClick={() => handleActionClick(action.action)}
                                className="w-full text-right"
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        <div className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString('ar-SA')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="اكتب رسالتك للمساعد الذكي..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                  dir="rtl"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {assistantMode === 'actions' && (
        <Card>
          <CardHeader>
            <CardTitle>الإجراءات السريعة</CardTitle>
            <CardDescription>إجراءات يمكن للمساعد الذكي تنفيذها بنقرة واحدة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickActions.map((action, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  onClick={() => handleActionClick(action.action)}
                  className="h-auto p-4 text-right"
                >
                  <div>
                    <div className="font-medium">{action.label}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {assistantMode === 'analytics' && (
        <Card>
          <CardHeader>
            <CardTitle>تحليلات المساعد الذكي</CardTitle>
            <CardDescription>إحصائيات استخدام المساعد والتوصيات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">127</div>
                <div className="text-sm text-muted-foreground">استفسارات اليوم</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">94%</div>
                <div className="text-sm text-muted-foreground">معدل الرضا</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">23</div>
                <div className="text-sm text-muted-foreground">مهام مؤتمتة</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">الموضوعات الأكثر شيوعاً:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">إدارة الأعضاء</Badge>
                <Badge variant="secondary">التصويتات</Badge>
                <Badge variant="secondary">التقارير</Badge>
                <Badge variant="secondary">العقود</Badge>
                <Badge variant="secondary">الإشعارات</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BotpressAssistant;
