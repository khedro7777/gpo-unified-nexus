
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, FileText, MessageSquare, Settings, Gavel } from 'lucide-react';
import GroupContract from './GroupContract';
import TelegramBot from '../integrations/TelegramBot';
import TrelloIntegration from '../integrations/TrelloIntegration';

const GroupDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock group data
  const group = {
    id: id || '1',
    name: 'مجموعة شراء أجهزة إلكترونية',
    type: 'buying' as const,
    description: 'مجموعة شراء تعاوني للحصول على أجهزة إلكترونية بأسعار الجملة',
    members: 24,
    status: 'active',
    created: new Date('2025-01-15'),
    category: 'تكنولوجيا'
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{group.name}</CardTitle>
              <CardDescription className="mt-2">
                {group.description}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="default">نشط</Badge>
              <Badge variant="outline">{group.category}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span>{group.members} عضو</span>
            </div>
            <div>
              <span className="text-muted-foreground">تاريخ الإنشاء: </span>
              {group.created.toLocaleDateString('ar-SA')}
            </div>
            <div>
              <span className="text-muted-foreground">النوع: </span>
              {group.type === 'buying' ? 'شراء تعاوني' : group.type}
            </div>
            <div className="flex gap-2">
              <Button size="sm">انضمام</Button>
              <Button size="sm" variant="outline">تواصل</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="members">الأعضاء</TabsTrigger>
          <TabsTrigger value="offers">العروض</TabsTrigger>
          <TabsTrigger value="contract">العقد</TabsTrigger>
          <TabsTrigger value="integrations">التكامل</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>نظرة عامة على المجموعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">الهدف من المجموعة</h4>
                  <p className="text-muted-foreground">
                    الحصول على أجهزة إلكترونية عالية الجودة بأسعار منافسة من خلال الشراء الجماعي.
                    نستهدف شراء أجهزة كمبيوتر، هواتف ذكية، وأجهزة منزلية ذكية.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">المتطلبات</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• التزام بالمواصفات المحددة</li>
                    <li>• ضمان لمدة سنتين على الأقل</li>
                    <li>• خدمة ما بعد البيع</li>
                    <li>• إمكانية التسليم خلال 30 يوم</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>أعضاء المجموعة ({group.members})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {['أ', 'م', 'س', 'ف', 'ع'][i]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">
                          {['أحمد محمد', 'محمد علي', 'سارة أحمد', 'فاطمة خالد', 'عبدالله حسن'][i]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          انضم منذ {i + 1} أسابيع
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {i === 0 && <Badge variant="default">مدير</Badge>}
                      <Button size="sm" variant="outline">تواصل</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers">
          <Card>
            <CardHeader>
              <CardTitle>العروض المستلمة</CardTitle>
              <CardDescription>عروض الموردين للمجموعة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">
                        شركة {['التقنية المتقدمة', 'الإلكترونيات الحديثة', 'تجارة الأجهزة'][i]}
                      </h4>
                      <Badge variant={i === 0 ? 'default' : 'secondary'}>
                        {i === 0 ? 'الأفضل' : 'قيد المراجعة'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">السعر: </span>
                        ${(15000 - i * 1000).toLocaleString()}
                      </div>
                      <div>
                        <span className="text-muted-foreground">التسليم: </span>
                        {20 + i * 5} يوم
                      </div>
                      <div>
                        <span className="text-muted-foreground">الضمان: </span>
                        {2 + i} سنوات
                      </div>
                      <div>
                        <Button size="sm" variant="outline">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contract">
          <GroupContract groupId={group.id} groupType={group.type} />
        </TabsContent>

        <TabsContent value="integrations">
          <div className="space-y-6">
            <TelegramBot groupId={group.id} />
            <TrelloIntegration groupId={group.id} groupName={group.name} />
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                إعدادات المجموعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">إعدادات الخصوصية</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    التحكم في من يمكنه رؤية المجموعة والانضمام إليها
                  </p>
                  <Button variant="outline" size="sm">
                    تحديث الإعدادات
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">إدارة الأعضاء</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    إضافة أو إزالة الأعضاء وتحديد الأدوار
                  </p>
                  <Button variant="outline" size="sm">
                    إدارة الأعضاء
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupDetails;
