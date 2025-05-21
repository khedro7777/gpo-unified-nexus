
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai' | 'system';
  timestamp: Date;
  status?: 'pending' | 'approved' | 'rejected';
}

type MCPMode = 'auto' | 'ask' | 'manual';

const MCPChat: React.FC = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'مرحباً، أنا مساعد MCP. كيف يمكنني مساعدتك اليوم؟',
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<MCPMode>('ask');
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('online');
  const [autoSuggestion, setAutoSuggestion] = useState<string | null>(null);

  // Simulate server status check
  useEffect(() => {
    const checkServerStatus = () => {
      const isOnline = Math.random() > 0.1; // 90% chance to be online
      setServerStatus(isOnline ? 'online' : 'offline');
      
      if (!isOnline) {
        toast({
          title: "MCP Server Offline",
          description: "Switched to Manual mode. You can continue working.",
          variant: "destructive",
        });
        setMode('manual');
      }
    };
    
    // Initial check
    checkServerStatus();
    
    // Periodic check every 30 seconds
    const interval = setInterval(checkServerStatus, 30000);
    
    return () => clearInterval(interval);
  }, [toast]);

  // Handle auto suggestions based on context
  useEffect(() => {
    if (mode === 'auto' && messages.length > 1) {
      // Simulate AI generating a suggestion based on context
      const suggestions = [
        "هل تريد إنشاء اقتراح جديد للتصويت؟",
        "أقترح مراجعة بيانات المشاركين قبل التصويت",
        "يمكنني تحليل نتائج التصويت السابق لك",
        "هل تحتاج مساعدة في صياغة مقترح جديد؟",
      ];
      
      setTimeout(() => {
        setAutoSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
      }, 3000);
    } else {
      setAutoSuggestion(null);
    }
  }, [mode, messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setAutoSuggestion(null);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(input, mode),
        sender: 'ai',
        timestamp: new Date(),
        status: mode === 'auto' ? 'pending' : undefined
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const generateResponse = (input: string, currentMode: MCPMode): string => {
    if (serverStatus === 'offline') {
      return "عذراً، خادم MCP غير متصل حالياً. يمكنك مواصلة العمل في الوضع اليدوي.";
    }
    
    switch (currentMode) {
      case 'auto':
        return `سأقوم بتنفيذ طلبك على الفور: "${input}". يُرجى الموافقة على الإجراء.`;
      case 'ask':
        return `بناء على طلبك "${input}"، أقترح عليك: ${[
          "إنشاء اقتراح جديد للتصويت",
          "مراجعة بيانات المشاركين",
          "تحليل نتائج التصويت السابقة"
        ][Math.floor(Math.random() * 3)]}`;
      case 'manual':
        return `أنت في الوضع اليدوي. يمكنك تنفيذ "${input}" بنفسك باستخدام أدوات المنصة.`;
      default:
        return "لم أفهم طلبك. هل يمكنك إعادة صياغته؟";
    }
  };

  const handleApproveAction = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, status: 'approved' } 
          : msg
      )
    );
    
    toast({
      title: "تم تنفيذ الإجراء",
      description: "تم تنفيذ الإجراء بنجاح",
    });
  };

  const handleRejectAction = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, status: 'rejected' } 
          : msg
      )
    );
  };

  const handleModeChange = (newMode: MCPMode) => {
    if (serverStatus === 'offline' && newMode !== 'manual') {
      toast({
        title: "MCP Server Offline",
        description: "Only Manual mode is available while server is offline",
        variant: "destructive",
      });
      return;
    }
    
    setMode(newMode);
    
    // Add system message about mode change
    const modeMessages = {
      auto: "تم تغيير الوضع إلى التلقائي. سأقوم بتنفيذ الطلبات بعد موافقتك.",
      ask: "تم تغيير الوضع إلى الاستشارة. سأقدم اقتراحات فقط دون تنفيذ.",
      manual: "تم تغيير الوضع إلى اليدوي. يمكنك العمل بنفسك وسأكون متاحًا للاستشارة فقط."
    };
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: modeMessages[newMode],
      sender: 'system',
      timestamp: new Date()
    }]);
  };

  const handleAcceptSuggestion = () => {
    if (autoSuggestion) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: autoSuggestion,
        sender: 'ai',
        timestamp: new Date(),
        status: 'pending'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setAutoSuggestion(null);
    }
  };

  const handleResetConversation = () => {
    setMessages([{
      id: '1',
      content: 'مرحبًا، أنا مساعد MCP. كيف يمكنني مساعدتك اليوم؟',
      sender: 'ai',
      timestamp: new Date(),
    }]);
    setAutoSuggestion(null);
  };

  return (
    <div className="flex flex-col h-full border-l border-border bg-muted/30">
      <div className="p-3 border-b border-border bg-background flex justify-between items-center">
        <h3 className="text-sm font-medium">MCP Assistant</h3>
        <div className="flex space-x-1">
          <Button 
            size="sm" 
            variant={mode === 'auto' ? "default" : "outline"} 
            onClick={() => handleModeChange('auto')}
            className="text-xs h-7 px-2"
            disabled={serverStatus === 'offline'}
          >
            تلقائي
          </Button>
          <Button 
            size="sm" 
            variant={mode === 'ask' ? "default" : "outline"} 
            onClick={() => handleModeChange('ask')}
            className="text-xs h-7 px-2"
            disabled={serverStatus === 'offline'}
          >
            استشارة
          </Button>
          <Button 
            size="sm" 
            variant={mode === 'manual' ? "default" : "outline"} 
            onClick={() => handleModeChange('manual')}
            className="text-xs h-7 px-2"
          >
            يدوي
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={cn(
              "flex gap-2 max-w-[85%] animate-fade-in", 
              message.sender === 'user' ? "ml-auto" : "",
              message.sender === 'system' ? "mx-auto" : ""
            )}
          >
            <div 
              className={cn(
                "rounded-lg p-3 text-sm",
                message.sender === 'user' 
                  ? "bg-primary text-primary-foreground" 
                  : message.sender === 'system'
                  ? "bg-muted/50 text-muted-foreground text-xs"
                  : "bg-muted"
              )}
            >
              {message.sender !== 'system' && (
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === 'user' ? 
                    <User size={14} /> : 
                    <Bot size={14} />
                  }
                  <span className="text-xs font-medium">
                    {message.sender === 'user' ? 'أنت' : 'مساعد MCP'}
                  </span>
                </div>
              )}
              {message.content}
              
              {message.status === 'pending' && (
                <div className="flex gap-2 mt-2 justify-end">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-7 px-2 text-xs"
                    onClick={() => handleRejectAction(message.id)}
                  >
                    رفض
                  </Button>
                  <Button 
                    size="sm" 
                    className="h-7 px-2 text-xs"
                    onClick={() => handleApproveAction(message.id)}
                  >
                    موافقة
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {autoSuggestion && mode === 'auto' && (
          <div className="flex gap-2 max-w-[85%] animate-fade-in">
            <div className="rounded-lg p-3 text-sm border border-primary/20 bg-primary/5">
              <div className="flex items-center gap-2 mb-1">
                <Bot size={14} />
                <span className="text-xs font-medium">اقتراح MCP</span>
              </div>
              {autoSuggestion}
              
              <div className="flex gap-2 mt-2 justify-end">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-7 px-2 text-xs"
                  onClick={() => setAutoSuggestion(null)}
                >
                  رفض
                </Button>
                <Button 
                  size="sm" 
                  className="h-7 px-2 text-xs"
                  onClick={handleAcceptSuggestion}
                >
                  قبول
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 bg-background border-t border-border">
        <div className="flex gap-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اسأل مساعد MCP..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
            dir="rtl"
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            disabled={!input.trim()}
          >
            <Send size={18} />
          </Button>
        </div>
        <div className="mt-2 flex justify-between items-center text-xs text-muted-foreground">
          <span>
            الحالة: <span className={`font-medium ${serverStatus === 'offline' ? 'text-destructive' : 'text-green-500'}`}>
              {serverStatus === 'online' ? 'متصل' : 'غير متصل'}
            </span>
          </span>
          <button className="flex items-center gap-1 hover:text-foreground transition-colors" onClick={handleResetConversation}>
            <RefreshCw size={12} /> إعادة ضبط المحادثة
          </button>
        </div>
        {serverStatus === 'offline' && (
          <div className="mt-2 p-2 bg-destructive/10 text-xs text-destructive rounded-md flex items-center gap-2">
            <AlertTriangle size={12} />
            <span>خادم MCP غير متصل. تم التحويل للوضع اليدوي.</span>
          </div>
        )}
        {mode === 'auto' && serverStatus === 'online' && (
          <div className="mt-2 p-2 bg-green-500/10 text-xs text-green-500 rounded-md flex items-center gap-2">
            <CheckCircle2 size={12} />
            <span>الوضع التلقائي نشط. سيتم تنفيذ الإجراءات بعد موافقتك.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MCPChat;
