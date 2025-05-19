
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const MCPChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello, I am MCP Assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'auto' | 'ask' | 'manual'>('ask');

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

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'm processing your request in ${mode} mode. This is a placeholder response.`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full border-l border-border bg-muted/30">
      <div className="p-3 border-b border-border bg-background flex justify-between items-center">
        <h3 className="text-sm font-medium">MCP Assistant</h3>
        <div className="flex space-x-1">
          <Button 
            size="sm" 
            variant={mode === 'auto' ? "default" : "outline"} 
            onClick={() => setMode('auto')}
            className="text-xs h-7 px-2"
          >
            Auto
          </Button>
          <Button 
            size="sm" 
            variant={mode === 'ask' ? "default" : "outline"} 
            onClick={() => setMode('ask')}
            className="text-xs h-7 px-2"
          >
            Ask
          </Button>
          <Button 
            size="sm" 
            variant={mode === 'manual' ? "default" : "outline"} 
            onClick={() => setMode('manual')}
            className="text-xs h-7 px-2"
          >
            Manual
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={cn(
              "flex gap-2 max-w-[85%] animate-fade-in", 
              message.sender === 'user' ? "ml-auto" : ""
            )}
          >
            <div 
              className={cn(
                "rounded-lg p-3 text-sm",
                message.sender === 'user' 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.sender === 'user' ? 
                  <User size={14} /> : 
                  <Bot size={14} />
                }
                <span className="text-xs font-medium">
                  {message.sender === 'user' ? 'You' : 'MCP Assistant'}
                </span>
              </div>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 bg-background border-t border-border">
        <div className="flex gap-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask MCP Assistant..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
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
            Mode: <span className="font-medium">{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
          </span>
          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
            <RefreshCw size={12} /> Reset conversation
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCPChat;
