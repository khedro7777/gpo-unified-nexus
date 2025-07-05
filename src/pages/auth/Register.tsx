
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, User, Lock, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      toast({
        title: "رمز التحقق مرسل",
        description: "تم إرسال رمز التحقق إلى بريدك الإلكتروني",
      });
      setOtpSent(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to verify OTP
    setTimeout(() => {
      toast({
        title: "تم التحقق بنجاح",
        description: "يرجى اختيار دورك في النظام",
      });
      navigate('/role-selection', { state: { name, email } });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Logo Section */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Building className="h-12 w-12 text-primary" />
          <div className="mr-3">
            <div className="text-3xl font-bold text-primary">GPO WORLD</div>
            <div className="text-sm text-muted-foreground">Smart Cooperation Platform</div>
          </div>
        </div>
      </div>
      
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-1 text-center pb-6">
          <CardTitle className="text-2xl font-bold">إنشاء حساب جديد</CardTitle>
          <CardDescription className="text-muted-foreground">
            انضم إلى منصة GPO وابدأ رحلة التعاون الذكي
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-5">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="الاسم الكامل"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12 text-base"
                    required
                    dir="rtl"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 text-base"
                    required
                    dir="rtl"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium" 
                disabled={isLoading}
              >
                {isLoading ? "جاري الإرسال..." : "إرسال رمز التحقق"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div className="space-y-3">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="رمز التحقق"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="text-center text-lg tracking-widest h-12 pl-10"
                    maxLength={6}
                    dir="ltr"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  تم إرسال رمز التحقق إلى: {email}
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium" 
                disabled={isLoading}
              >
                {isLoading ? "جاري التحقق..." : "تحقق من الرمز"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base"
                onClick={() => setOtpSent(false)}
                disabled={isLoading}
              >
                العودة لتغيير المعلومات
              </Button>
            </form>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4 pt-2">
          <div className="relative w-full my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">أو</span>
            </div>
          </div>
          
          <div className="text-sm text-center text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="text-primary font-medium hover:underline transition-colors">
              تسجيل الدخول
            </Link>
          </div>
          
          <div className="text-sm text-center text-muted-foreground">
            <Link to="/" className="text-primary font-medium hover:underline transition-colors">
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
