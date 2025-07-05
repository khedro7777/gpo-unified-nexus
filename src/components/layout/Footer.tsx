
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

/**
 * Enhanced Footer Component with Site Map
 * Includes all platform links, policies, and navigation
 * Organized in sections for better user experience
 */
const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={`bg-card border-t mt-auto ${className}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GPO</span>
              </div>
              <h3 className="font-bold text-lg">منصة التعاون الذكي</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              منصة شاملة للتعاون الذكي والشراء الجماعي والاستثمار المشترك
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Web3</span>
              <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded">DAO</span>
              <span className="text-xs bg-purple-500/10 text-purple-600 px-2 py-1 rounded">AI-Powered</span>
            </div>
          </div>

          {/* Main Services - خريطة الموقع الرئيسية */}
          <div>
            <h4 className="font-semibold mb-4">البوابات الرئيسية</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/create-group/purchasing" className="text-muted-foreground hover:text-foreground transition-colors">
                  الشراء التعاوني
                </Link>
              </li>
              <li>
                <Link to="/create-group/marketing" className="text-muted-foreground hover:text-foreground transition-colors">
                  التسويق الجماعي
                </Link>
              </li>
              <li>
                <Link to="/suppliers" className="text-muted-foreground hover:text-foreground transition-colors">
                  الموردون
                </Link>
              </li>
              <li>
                <Link to="/freelance" className="text-muted-foreground hover:text-foreground transition-colors">
                  المستقلون
                </Link>
              </li>
              <li>
                <Link to="/company-incorporation" className="text-muted-foreground hover:text-foreground transition-colors">
                  تأسيس الشركات
                </Link>
              </li>
              <li>
                <Link to="/investment" className="text-muted-foreground hover:text-foreground transition-colors">
                  بوابة الاستثمار
                </Link>
              </li>
              <li>
                <Link to="/arbitration" className="text-muted-foreground hover:text-foreground transition-colors">
                  التحكيم والتوثيق
                </Link>
              </li>
            </ul>
          </div>

          {/* User Services - خدمات المستخدم */}
          <div>
            <h4 className="font-semibold mb-4">خدمات المستخدم</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/groups" className="text-muted-foreground hover:text-foreground transition-colors">
                  المجموعات
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                  الملف الشخصي
                </Link>
              </li>
              <li>
                <Link to="/wallet" className="text-muted-foreground hover:text-foreground transition-colors">
                  المحفظة
                </Link>
              </li>
              <li>
                <Link to="/contracts" className="text-muted-foreground hover:text-foreground transition-colors">
                  العقود
                </Link>
              </li>
              <li>
                <Link to="/notifications" className="text-muted-foreground hover:text-foreground transition-colors">
                  الإشعارات
                </Link>
              </li>
              <li>
                <Link to="/governance" className="text-muted-foreground hover:text-foreground transition-colors">
                  الحوكمة والتصويت
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-muted-foreground hover:text-foreground transition-colors">
                  إدارة الوثائق
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal - الدعم والسياسات */}
          <div>
            <h4 className="font-semibold mb-4">الدعم والسياسات</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                  كيف تعمل المنصة
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/mission" className="text-muted-foreground hover:text-foreground transition-colors">
                  المهمة والرؤية  
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-muted-foreground hover:text-foreground transition-colors">
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <a href="mailto:support@gpo-platform.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  الدعم الفني
                </a>
              </li>
              <li>
                <Link to="/admin-access" className="text-muted-foreground hover:text-foreground transition-colors opacity-50 text-xs">
                  مراقبة النظام
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>© 2025 GPO Smart Cooperation Platform</span>
            <span>•</span>
            <span>منصة التعاون الذكي</span>
            <span>•</span>
            <span>مدعومة بتقنيات متقدمة</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-muted-foreground">النظام متاح</span>
            </div>
            <div className="text-muted-foreground">
              v2.0.0
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
