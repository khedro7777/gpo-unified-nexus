
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Lock, Users, Database, Server, ShieldAlert, Settings, Globe, LayoutDashboard, Check } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

const AdminMonitor = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { role } = useAuth();
  const { toast } = useToast();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Very simple admin check - in a real app this would be an API call
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة تحكم الإدارة",
      });
    } else {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "اسم المستخدم أو كلمة المرور غير صحيحة",
        variant: "destructive",
      });
    }
  };
  
  // If user is not admin in auth state and not locally authenticated, redirect or show login
  if (role !== 'admin' && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">منطقة المسؤولين</CardTitle>
            <CardDescription>
              يرجى تسجيل الدخول للوصول إلى لوحة التحكم
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="username"
                  placeholder="اسم المستخدم"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                تسجيل الدخول
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/')}
              >
                العودة للرئيسية
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // If authenticated as admin, show admin panel
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-primary" />
            <h1 className="font-bold text-lg">لوحة مراقبة GPO</h1>
          </div>
          <div className="flex gap-2 items-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/')}
            >
              العودة للموقع
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => {
                setIsAuthenticated(false);
                navigate('/');
              }}
            >
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Admin Sidebar */}
        <div className="w-64 border-r bg-muted/10 p-4">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              لوحة التحكم
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              المستخدمين
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Database className="mr-2 h-4 w-4" />
              المحتوى
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Globe className="mr-2 h-4 w-4" />
              المجموعات
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Server className="mr-2 h-4 w-4" />
              حالة خادم MCP
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              إعدادات النظام
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">لوحة التحكم</h2>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="العرض" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع البيانات</SelectItem>
                <SelectItem value="today">اليوم فقط</SelectItem>
                <SelectItem value="week">هذا الأسبوع</SelectItem>
                <SelectItem value="month">هذا الشهر</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>إجمالي المستخدمين</CardDescription>
                <CardTitle className="text-3xl">128</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  <span className="text-green-500">+12%</span> منذ الشهر الماضي
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>المجموعات النشطة</CardDescription>
                <CardTitle className="text-3xl">24</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  <span className="text-green-500">+3</span> هذا الأسبوع
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>العقود المنفذة</CardDescription>
                <CardTitle className="text-3xl">18</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  <span className="text-green-500">+5</span> هذا الشهر
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>حالة خادم MCP</CardDescription>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  متصل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  آخر تحديث: قبل 5 دقائق
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="users">
            <TabsList>
              <TabsTrigger value="users">المستخدمين الجدد</TabsTrigger>
              <TabsTrigger value="groups">المجموعات النشطة</TabsTrigger>
              <TabsTrigger value="system">معلومات النظام</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>آخر المستخدمين المسجلين</CardTitle>
                  <CardDescription>
                    قائمة بآخر 5 مستخدمين قاموا بالتسجيل في النظام
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المستخدم</TableHead>
                        <TableHead>الدور</TableHead>
                        <TableHead>تاريخ التسجيل</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>أحمد محمد</TableCell>
                        <TableCell>مشتري</TableCell>
                        <TableCell>2025-05-18</TableCell>
                        <TableCell><Badge variant="outline" className="bg-green-50 text-green-600">نشط</Badge></TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">عرض</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>سارة أحمد</TableCell>
                        <TableCell>مستقل</TableCell>
                        <TableCell>2025-05-17</TableCell>
                        <TableCell><Badge variant="outline" className="bg-green-50 text-green-600">نشط</Badge></TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">عرض</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>محمد علي</TableCell>
                        <TableCell>مورد</TableCell>
                        <TableCell>2025-05-15</TableCell>
                        <TableCell><Badge variant="outline" className="bg-amber-50 text-amber-600">قيد التحقق</Badge></TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">عرض</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="groups" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>المجموعات النشطة</CardTitle>
                  <CardDescription>
                    قائمة بالمجموعات النشطة حاليًا
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>اسم المجموعة</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>عدد الأعضاء</TableHead>
                        <TableHead>التقدم</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>مجموعة شراء إلكترونيات</TableCell>
                        <TableCell>شراء</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>60%</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">عرض</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>حملة تسويقية مشتركة</TableCell>
                        <TableCell>تسويق</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>30%</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">عرض</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>تطوير تطبيق موبايل</TableCell>
                        <TableCell>مستقلين</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>40%</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">عرض</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="system" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>معلومات النظام</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between p-3 border rounded-md">
                    <div>إصدار النظام</div>
                    <div className="font-medium">1.0.0</div>
                  </div>
                  <div className="flex justify-between p-3 border rounded-md">
                    <div>حالة خادم MCP</div>
                    <div className="font-medium flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      متصل
                    </div>
                  </div>
                  <div className="flex justify-between p-3 border rounded-md">
                    <div>اتصال Strapi CMS</div>
                    <div className="font-medium flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      متصل
                    </div>
                  </div>
                  <div className="flex justify-between p-3 border rounded-md">
                    <div>تاريخ آخر تحديث للنظام</div>
                    <div className="font-medium">2025-05-15</div>
                  </div>
                  <div className="flex justify-between p-3 border rounded-md">
                    <div>حالة التخزين</div>
                    <div className="font-medium">2.4 GB / 10 GB</div>
                  </div>
                  <div className="flex justify-between p-3 border rounded-md">
                    <div>حالة نظام IPFS</div>
                    <div className="font-medium flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      متصل
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminMonitor;
