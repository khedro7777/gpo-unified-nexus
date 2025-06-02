
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface RasaMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  intent?: string;
  confidence?: number;
}

interface RasaResponse {
  recipient_id: string;
  text: string;
  buttons?: Array<{
    title: string;
    payload: string;
  }>;
}

const RasaChat: React.FC = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<RasaMessage[]>([
    {
      id: '1',
      text: 'مرحباً! أنا مساعد Rasa الذكي. كيف يمكنني مساعدتك اليوم؟',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated Rasa API call
  const sendToRasa = async (message: string): Promise<RasaResponse[]> => {
    // In real implementation, this would call your Rasa server
    // For now, we'll simulate responses based on common intents
    
    const responses: { [key: string]: string[] } = {
      'greet': ['مرحباً! كيف يمكنني مساعدتك؟', 'أهلاً وسهلاً! ماذا تحتاج؟'],
      'ask_groups': ['يمكنك إنشاء مجموعة جديدة أو الانضمام لمجموعة موجودة من قائمة المجموعات'],
      'ask_payment': ['يمكنك إدارة المدفوعات من خلال المحفظة والاطلاع على الفواتير'],
      'ask_formation': ['نوفر خدمات تأسيس الشركات LLC و Corporation بخطوات بسيطة'],
      'goodbye': ['وداعاً! أتمنى أن أكون قد ساعدتك', 'إلى اللقاء! لا تتردد في العودة أي وقت']
    };

    // Simple intent detection
    let intent = 'chitchat';
    if (message.includes('مرحبا') || message.includes('السلام')) intent = 'greet';
    else if (message.includes('مجموعة') || message.includes('انضمام')) intent = 'ask_groups';
    else if (message.includes('دفع') || message.includes('محفظة')) intent = 'ask_payment';
    else if (message.includes('شركة') || message.includes('تأسيس')) intent = 'ask_formation';
    else if (message.includes('وداع') || message.includes('شكرا')) intent = 'goodbye';

    const responseTexts = responses[intent] || ['عذراً، لم أفهم طلبك. هل يمكنك إعادة صياغته؟'];
    const randomResponse = responseTexts[Math.floor(Math.random() * responseTexts.length)];

    return [{
      recipient_id: 'user',
      text: randomResponse
    }];
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: RasaMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responses = await sendToRasa(input);
      
      responses.forEach((response, index) => {
        setTimeout(() => {
          const botMessage: RasaMessage = {
            id: (Date.now() + index).toString(),
            text: response.text,
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, botMessage]);
        }, 500 * (index + 1));
      });
    } catch (error) {
      toast({
        title: "خطأ في الاتصال",
        description: "لم أتمكن من الاتصال بخادم Rasa",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'ar-SA';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "خطأ في التعرف على الصوت",
          description: "لم أتمكن من التعرف على صوتك، حاول مرة أخرى",
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast({
        title: "غير مدعوم",
        description: "متصفحك لا يدعم التعرف على الصوت",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border rounded-lg">
      <div className="p-4 border-b bg-gray-50 rounded-t-lg">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          مساعد Rasa الذكي
        </h3>
        <p className="text-sm text-gray-600">مساعد ذكي يفهم احتياجاتك</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={cn(
              "flex gap-3 max-w-[80%] animate-fade-in", 
              message.sender === 'user' ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              message.sender === 'user' ? "bg-primary text-white" : "bg-gray-100"
            )}>
              {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={cn(
              "rounded-lg p-3 text-sm",
              message.sender === 'user' 
                ? "bg-primary text-white rounded-br-sm" 
                : "bg-gray-100 rounded-bl-sm"
            )}>
              {message.text}
              {message.intent && (
                <div className="text-xs opacity-70 mt-1">
                  Intent: {message.intent} ({(message.confidence || 0 * 100).toFixed(0)}%)
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-gray-100 rounded-lg p-3 text-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
            dir="rtl"
            disabled={isLoading}
          />
          <Button 
            size="icon" 
            onClick={handleVoiceInput}
            disabled={isLoading || isListening}
            variant="outline"
            className={isListening ? "bg-red-50 border-red-200" : ""}
          >
            {isListening ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
          >
            <Send size={18} />
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          اضغط على أيقونة الميكروفون للتحدث أو اكتب رسالتك
        </div>
      </div>
    </div>
  );
};

export default RasaChat;
