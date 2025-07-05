
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types';
import { Users, ShoppingCart, Store, Building } from 'lucide-react';

interface RoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const RoleSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const { name = '', email = '' } = (location.state || {}) as { name: string; email: string };

  const roleOptions: RoleOption[] = [
    {
      id: 'freelancer',
      title: 'مستقل',
      description: 'تقديم خدماتك للمشاريع والمجموعات المختلفة',
      icon: <Users className="h-12 w-12" />,
      color: 'bg-gradient-to-br from-blue-500 to-indigo-600'
    },
    {
      id: 'buyer',
      title: 'مشتري',
      description: 'إنشاء وإدارة مجموعات الشراء والتسويق',
      icon: <ShoppingCart className="h-12 w-12" />,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600'
    },
    {
      id: 'supplier',
      title: 'مورد',
      description: 'تقديم العروض والخدمات للمجموعات المختلفة',
      icon: <Store className="h-12 w-12" />,
      color: 'bg-gradient-to-br from-orange-500 to-amber-600'
    },
    {
      id: 'founder',
      title: 'مؤسس شركات',
      description: 'تأسيس الشركات والكيانات القانونية',
      icon: <Building className="h-12 w-12" />,
      color: 'bg-gradient-to-br from-purple-500 to-violet-600'
    },
  ];

  const handleRoleSelection = (role: UserRole) => {
    // In a real app, this would be an API call
    const userId = Math.random().toString(36).substr(2, 9);
    login(email, name, role, userId);
    
    toast({
      title: "تم إكمال التسجيل بنجاح",
      description: `مرحبًا بك في منصة GPO كـ ${roleOptions.find(r => r.id === role)?.title}`,
    });
    
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-primary mb-2">GPO</h2>
        <p className="text-lg text-muted-foreground">Smart Cooperation Platform</p>
      </div>
      
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">مرحبًا بك في منصة GPO</h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-xl mx-auto">
            اختر دورك في النظام للاستفادة من الخدمات المناسبة لك
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roleOptions.map((role) => (
            <Card 
              key={role.id} 
              className="transition-all duration-200 hover:shadow-lg border-2 hover:border-primary/50 overflow-hidden"
              onClick={() => handleRoleSelection(role.id)}
            >
              <div className={`h-2 ${role.color}`}></div>
              <CardHeader className="pb-2 pt-6">
                <div className="flex justify-between items-center">
                  <div className={`p-3 rounded-lg ${role.color} bg-opacity-10 text-white`}>
                    {role.icon}
                  </div>
                </div>
                <CardTitle className="mt-4 text-2xl">{role.title}</CardTitle>
                <CardDescription className="text-base">{role.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <Button className={`w-full mt-4`}>
                  اختيار هذا الدور
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
