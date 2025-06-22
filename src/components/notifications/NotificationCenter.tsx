
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Check, Clock, AlertCircle, MessageSquare, FileText, Vote } from 'lucide-react';

interface Notification {
  id: string;
  type: 'vote' | 'message' | 'contract' | 'group' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-001',
      type: 'vote',
      title: 'تصويت جديد متاح',
      message: 'يرجى التصويت على اقتراح توريد أجهزة الحاسب',
      timestamp: '2025-05-28T14:30:00',
      read: false,
      priority: 'high',
      actionUrl: '/governance/voting'
    },
    {
      id: 'notif-002',
      type: 'message',
      title: 'رسالة جديدة في المناقشة',
      message: 'تم إضافة تعليق جديد على مناقشة "خطة التسويق المشترك"',
      timestamp: '2025-05-28T13:15:00',
      read: false,
      priority: 'medium',
      actionUrl: '/governance/discussions'
    },
    {
      id: 'notif-003',
      type: 'contract',
      title: 'عقد جاهز للمراجعة',
      message: 'عقد توريد الأجهزة جاهز للمراجعة والتوقيع',
      timestamp: '2025-05-28T11:45:00',
      read: true,
      priority: 'high',
      actionUrl: '/contracts'
    },
    {
      id: 'notif-004',
      type: 'group',
      title: 'عضو جديد انضم للمجموعة',
      message: 'انضم محمد أحمد إلى مجموعة الشراء التعاوني',
      timestamp: '2025-05-28T10:20:00',
      read: true,
      priority: 'low',
      actionUrl: '/groups'
    },
    {
      id: 'notif-005',
      type: 'system',
      title: 'تحديث النظام',
      message: 'تم إضافة ميزات جديدة لإدارة الوثائق',
      timestamp: '2025-05-27T16:00:00',
      read: true,
      priority: 'low'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'important'>('all');

  const getIcon = (type: Notification['type']) => {
    const icons = {
      vote: Vote,
      message: MessageSquare,
      contract: FileText,
      group: Bell,
      system: AlertCircle
    };
    return icons[type];
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    const colors = {
      low: 'text-gray-500',
      medium: 'text-yellow-500',
      high: 'text-red-500'
    };
    return colors[priority];
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `منذ ${diffDays} ${diffDays === 1 ? 'يوم' : 'أيام'}`;
    } else if (diffHours > 0) {
      return `منذ ${diffHours} ${diffHours === 1 ? 'ساعة' : 'ساعات'}`;
    } else {
      return 'منذ قليل';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'unread') return !notif.read;
    if (activeTab === 'important') return notif.priority === 'high';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6" />
            مركز الإشعارات
            {unreadCount > 0 && (
              <Badge variant="default" className="ml-2">
                {unreadCount} جديد
              </Badge>
            )}
          </h2>
          <p className="text-muted-foreground">
            تابع جميع التحديثات والإشعارات المهمة
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <Check className="h-4 w-4 mr-2" />
            تحديد الكل كمقروء
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList>
          <TabsTrigger value="all">
            جميع الإشعارات ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            غير مقروء ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="important">
            مهم ({notifications.filter(n => n.priority === 'high').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-3">
          {filteredNotifications.map((notification) => {
            const Icon = getIcon(notification.type);
            
            return (
              <Card key={notification.id} className={`transition-all hover:shadow-md ${!notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-gray-100 ${getPriorityColor(notification.priority)}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {notification.message}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          {notification.type === 'vote' && 'تصويت'}
                          {notification.type === 'message' && 'رسالة'}
                          {notification.type === 'contract' && 'عقد'}
                          {notification.type === 'group' && 'مجموعة'}
                          {notification.type === 'system' && 'نظام'}
                        </Badge>
                        
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => markAsRead(notification.id)}
                            >
                              تحديد كمقروء
                            </Button>
                          )}
                          {notification.actionUrl && (
                            <Button size="sm">
                              عرض التفاصيل
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>

      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد إشعارات</h3>
            <p className="text-muted-foreground">
              {activeTab === 'unread' && 'جميع الإشعارات مقروءة'}
              {activeTab === 'important' && 'لا توجد إشعارات مهمة'}
              {activeTab === 'all' && 'لا توجد إشعارات حالياً'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationCenter;
