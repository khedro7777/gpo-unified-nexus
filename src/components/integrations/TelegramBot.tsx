
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { MessageSquare, Bot, Users, Bell, Settings, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TelegramBotProps {
  groupId?: string;
}

const TelegramBot: React.FC<TelegramBotProps> = ({ groupId }) => {
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState({
    newMembers: true,
    newOffers: true,
    voting: true,
    contracts: true
  });
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!botToken || !chatId) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال جميع البيانات المطلوبة",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simulate API call to verify bot connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsConnected(true);
      toast({
        title: "تم الاتصال بنجاح",
        description: "تم ربط البوت بالمجموعة بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في الاتصال",
        description: "فشل في الاتصال بالبوت، يرجى التحقق من البيانات",
        variant: "destructive",
      });
    }
  };

  const sendTestMessage = async () => {
    try {
      // Simulate sending test message
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "تم إرسال الرسالة",
        description: "تم إرسال رسالة تجريبية بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في الإرسال",
        description: "فشل في إرسال الرسالة",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            Telegram Bot Integration
          </CardTitle>
          <CardDescription>
            ربط بوت Telegram لإرسال الإشعارات والتحديثات للمجموعة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-medium">حالة البوت</h3>
                <p className="text-sm text-muted-foreground">
                  {isConnected ? 'متصل ونشط' : 'غير متصل'}
                </p>
              </div>
            </div>
            <Badge variant={isConnected ? 'default' : 'secondary'}>
              {isConnected ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  متصل
                </>
              ) : (
                'غير متصل'
              )}
            </Badge>
          </div>

          {!isConnected && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="bot-token">Bot Token</Label>
                <Input
                  id="bot-token"
                  type="password"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  placeholder="1234567890:ABCdefGHIjklMNOpqrSTUvwxyz"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  احصل على Token من @BotFather في Telegram
                </p>
              </div>

              <div>
                <Label htmlFor="chat-id">Chat ID</Label>
                <Input
                  id="chat-id"
                  value={chatId}
                  onChange={(e) => setChatId(e.target.value)}
                  placeholder="-1001234567890"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  معرف المجموعة أو القناة في Telegram
                </p>
              </div>

              <Button onClick={handleConnect} className="w-full">
                ربط البوت
              </Button>
            </div>
          )}

          {isConnected && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={sendTestMessage} variant="outline">
                  إرسال رسالة تجريبية
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => setIsConnected(false)}
                >
                  قطع الاتصال
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            إعدادات الإشعارات
          </CardTitle>
          <CardDescription>
            اختر نوع الإشعارات التي تريد إرسالها عبر Telegram
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">أعضاء جدد</h4>
                <p className="text-sm text-muted-foreground">
                  إشعار عند انضمام عضو جديد للمجموعة
                </p>
              </div>
              <Switch
                checked={notifications.newMembers}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, newMembers: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">عروض جديدة</h4>
                <p className="text-sm text-muted-foreground">
                  إشعار عند استلام عرض جديد من مورد
                </p>
              </div>
              <Switch
                checked={notifications.newOffers}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, newOffers: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">جلسات التصويت</h4>
                <p className="text-sm text-muted-foreground">
                  إشعار عند بدء أو انتهاء جلسات التصويت
                </p>
              </div>
              <Switch
                checked={notifications.voting}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, voting: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">تحديثات العقود</h4>
                <p className="text-sm text-muted-foreground">
                  إشعار عند تغيير حالة العقود أو التفاوض
                </p>
              </div>
              <Switch
                checked={notifications.contracts}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, contracts: checked }))
                }
              />
            </div>
          </div>

          <div className="pt-4">
            <Button disabled={!isConnected}>
              <Settings className="h-4 w-4 mr-2" />
              حفظ إعدادات الإشعارات
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TelegramBot;
