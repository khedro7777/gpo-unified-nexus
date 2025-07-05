
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageSquare, Users, Settings, Hash } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  avatar?: string;
  reactions?: Array<{ emoji: string; count: number; users: string[] }>;
}

interface ZulipChatProps {
  groupId: string;
  userId: string;
  isAdmin: boolean;
}

const ZulipChat: React.FC<ZulipChatProps> = ({ groupId, userId, isAdmin }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeStream, setActiveStream] = useState('general');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock Zulip streams
  const streams = [
    { name: 'general', topic: 'مناقشة عامة', color: '#3f51b5', unread: 2 },
    { name: 'voting', topic: 'التصويتات', color: '#4caf50', unread: 0 },
    { name: 'announcements', topic: 'الإعلانات', color: '#ff9800', unread: 1 },
    { name: 'admin', topic: 'إدارة المجموعة', color: '#f44336', unread: 0, adminOnly: true }
  ];

  // Mock messages
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        content: 'مرحباً بالجميع في المجموعة الجديدة!',
        sender: 'أحمد محمد',
        timestamp: new Date(Date.now() - 3600000),
        reactions: [{ emoji: '👍', count: 3, users: ['user1', 'user2', 'user3'] }]
      },
      {
        id: '2',
        content: 'ما رأيكم في العرض الجديد من المورد؟',
        sender: 'سارة أحمد',
        timestamp: new Date(Date.now() - 1800000),
        reactions: [{ emoji: '🤔', count: 2, users: ['user1', 'user4'] }]
      },
      {
        id: '3',
        content: 'أعتقد أنه عرض جيد، لكن يجب مناقشة التفاصيل أكثر',
        sender: 'محمد علي',
        timestamp: new Date(Date.now() - 900000)
      }
    ];
    setMessages(mockMessages);
    setIsConnected(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: 'أنت',
        timestamp: new Date()
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);
        if (existingReaction) {
          existingReaction.count++;
          existingReaction.users.push(userId);
        } else {
          reactions.push({ emoji, count: 1, users: [userId] });
        }
        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Streams Sidebar */}
      <Card className="lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Hash className="h-4 w-4" />
            القنوات
          </CardTitle>
          <div className="flex items-center gap-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            {isConnected ? 'متصل' : 'غير متصل'}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {streams
              .filter(stream => !stream.adminOnly || isAdmin)
              .map((stream) => (
                <button
                  key={stream.name}
                  onClick={() => setActiveStream(stream.name)}
                  className={`w-full text-right p-3 hover:bg-muted transition-colors ${
                    activeStream === stream.name ? 'bg-muted border-r-2 border-primary' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">#{stream.name}</span>
                    {stream.unread > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {stream.unread}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{stream.topic}</div>
                </button>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="lg:col-span-3 flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                #{activeStream}
              </CardTitle>
              <CardDescription>
                {streams.find(s => s.name === activeStream)?.topic}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">12 عضو</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="group">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {message.sender.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString('ar-SA')}
                        </span>
                      </div>
                      <div className="text-sm">{message.content}</div>
                      
                      {/* Reactions */}
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {message.reactions.map((reaction, idx) => (
                            <button
                              key={idx}
                              onClick={() => addReaction(message.id, reaction.emoji)}
                              className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted/50 hover:bg-muted text-xs"
                            >
                              <span>{reaction.emoji}</span>
                              <span>{reaction.count}</span>
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* Quick Reactions (shown on hover) */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                        <div className="flex gap-1">
                          {['👍', '❤️', '😄', '🤔'].map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => addReaction(message.id, emoji)}
                              className="w-6 h-6 text-sm hover:bg-muted rounded"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                placeholder={`اكتب رسالة في #${activeStream}...`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="min-h-[40px] max-h-[120px] resize-none"
                dir="rtl"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              اضغط Enter للإرسال، Shift+Enter لسطر جديد
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZulipChat;
