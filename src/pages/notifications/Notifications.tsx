
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, MessageSquare, Users, ShoppingCart, CheckCircle } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'group',
      title: 'دعوة للانضمام إلى مجموعة',
      message: 'تمت دعوتك للانضمام إلى مجموعة الشراء التعاوني للتقنية',
      time: 'منذ 5 دقائق',
      read: false,
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 2,
      type: 'offer',
      title: 'عرض جديد مستلم',
      message: 'تلقيت عرضًا جديدًا من مورد التقنية المتقدمة',
      time: 'منذ 30 دقيقة',
      read: false,
      icon: <ShoppingCart className="h-5 w-5" />
    },
    {
      id: 3,
      type: 'message',
      title: 'رسالة جديدة',
      message: 'لديك رسالة جديدة في مجموعة التسويق الرقمي',
      time: 'منذ ساعة',
      read: true,
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      id: 4,
      type: 'system',
      title: 'تم قبول عرضك',
      message: 'تم قبول عرضك في مجموعة الشراء #123',
      time: 'منذ 3 ساعات',
      read: true,
      icon: <CheckCircle className="h-5 w-5" />
    }
  ];

  return (
    <NewMainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">الإشعارات</h1>
          <Button variant="outline" size="sm">
            وضع علامة مقروء على الكل
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              إشعاراتك
            </CardTitle>
            <CardDescription>تصفح أحدث التحديثات والإشعارات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg border transition-colors ${
                    !notification.read 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      !notification.read ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {notification.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Badge variant="default" className="bg-blue-500">
                              جديد
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm">
                            وضع علامة مقروء
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline">تحميل المزيد</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </NewMainLayout>
  );
};

export default Notifications;
