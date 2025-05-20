
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Linkedin, ChevronRight } from 'lucide-react';

const Footer = () => {
  // Secret counter for admin access
  const [secretCounter, setSecretCounter] = useState(0);
  
  const handleLogoClick = () => {
    setSecretCounter(prev => prev + 1);
  };
  
  return (
    <footer className="bg-muted/30 pt-12 pb-6 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Admin Access */}
          <div>
            <div onClick={handleLogoClick} className="cursor-default">
              <h3 className="font-bold text-2xl">GPO</h3>
              <p className="text-sm text-muted-foreground">منصة التعاون الذكي</p>
            </div>
            <p className="mt-4 text-muted-foreground">
              نظام متكامل للتعاون والتنظيم بين مختلف الأطراف، بدعم من تقنيات الذكاء الاصطناعي والعقود الذكية.
            </p>
            {/* Hidden admin link appears after 5 clicks */}
            {secretCounter >= 5 && (
              <Link to="/admin-monitor-access" className="mt-2 text-xs text-muted-foreground/50 hover:text-primary transition-colors">
                Admin Monitor
              </Link>
            )}
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-lg mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="ml-1" />
                  عن المنصة
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="ml-1" />
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="ml-1" />
                  كيف تعمل المنصة
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="ml-1" />
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-medium text-lg mb-4">معلومات قانونية</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="ml-1" />
                  شروط الخدمة
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="ml-1" />
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link to="/orda" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="ml-1" />
                  نظام ORDA للنزاعات
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-medium text-lg mb-4">النشرة البريدية</h4>
            <p className="text-muted-foreground mb-4">
              اشترك للحصول على آخر أخبار وتحديثات منصة GPO
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1"
                dir="rtl"
              />
              <Button type="button">اشتراك</Button>
            </div>
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GPO - منصة التعاون الذكي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
