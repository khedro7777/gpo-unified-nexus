
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Database, Server, Settings, Info, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import StrapiContent from '@/components/cms/StrapiContent';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminAccess = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [ipAuthorized, setIpAuthorized] = useState(true);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Simulate IP check on component mount
  useEffect(() => {
    const checkIP = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const authorized = Math.random() > 0.3;
      setIpAuthorized(authorized);
      
      if (!authorized) {
        toast({
          title: "غير مصرح بالوصول",
          description: "عنوان IP الخاص بك غير مصرح له بالوصول",
          variant: "destructive"
        });
      }
    };
    
    checkIP();
  }, [toast]);
  
  // Block non-admin users from accessing this page
  if (isAuthenticated && role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  const handleEnterDashboard = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      window.open('https://cms.gpo.example.com/admin', '_blank');
      setIsLoading(false);
      
      toast({
        title: "تم فتح لوحة التحكم",
        description: "تم فتح لوحة تحكم Strapi في نافذة جديدة",
      });
    }, 1000);
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (adminPassword === 'admin123') {
      setShowAccessForm(false);
      handleEnterDashboard();
    } else {
      toast({
        title: "كلمة المرور غير صحيحة",
        description: "كلمة المرور المؤقتة هي: admin123",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background/95 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
              <ShieldCheck className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">
              <StrapiContent 
                contentType="admin" 
                field="title" 
                fallback="مرحبًا بك في بوابة إدارة GPO" 
              />
            </CardTitle>
            <CardDescription className="text-center">
              <StrapiContent 
                contentType="admin" 
                field="description" 
                fallback="هذه المنطقة مخصصة للحوكمة الداخلية والمراقبة وإدارة المحتوى" 
              />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {!ipAuthorized ? (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md text-center">
                <p className="font-medium">غير مصرح بالوصول من عنوان IP الحالي</p>
                <p className="text-sm mt-1">يرجى الاتصال بمسؤول النظام للحصول على مساعدة</p>
              </div>
            ) : showAccessForm ? (
              <div className="w-full space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    كلمة المرور المؤقتة: <strong>admin123</strong>
                  </AlertDescription>
                </Alert>
                
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="أدخل كلمة مرور المسؤول" 
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={isLoading}
                    >
                      {isLoading ? 'جاري التحقق...' : 'تأكيد الدخول'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowAccessForm(false)}
                    >
                      إلغاء
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3 w-full mb-4">
                  <div className="border rounded-md p-3 text-center">
                    <Database className="mx-auto h-5 w-5 mb-1 text-primary" />
                    <p className="text-sm font-medium">Strapi CMS</p>
                    <p className="text-xs text-muted-foreground">متصل</p>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <Server className="mx-auto h-5 w-5 mb-1 text-primary" />
                    <p className="text-sm font-medium">API Status</p>
                    <p className="text-xs text-muted-foreground">متاح</p>
                  </div>
                </div>
                
                <Alert className="mb-4 w-full">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    للوصول إلى Strapi CMS، ستحتاج إلى كلمة المرور المؤقتة: <strong>admin123</strong>
                  </AlertDescription>
                </Alert>
                
                <Button 
                  size="lg" 
                  className="w-full mt-4"
                  onClick={() => setShowAccessForm(true)}
                  disabled={isLoading}
                >
                  {isLoading ? 'جاري التحميل...' : 'دخول لوحة تحكم Strapi'}
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg" 
                  className="w-full mt-2"
                  onClick={() => navigate('/admin-monitor-access')}
                >
                  فتح لوحة مراقبة النظام
                </Button>
              </>
            )}
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground flex-col gap-1">
            <div className="flex items-center justify-center gap-1">
              <Info className="h-3 w-3" />
              <p>جميع الأنشطة يتم تسجيلها</p>
            </div>
            <p>GPO Smart Cooperation Platform © {new Date().getFullYear()}</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminAccess;
