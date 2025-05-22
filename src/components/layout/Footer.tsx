
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={`border-t border-border py-6 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} GPO Smart Platform. جميع الحقوق محفوظة.
            </p>
          </div>
          <div className="flex space-x-6 rtl:space-x-reverse">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              الشروط والأحكام
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              سياسة الخصوصية
            </Link>
            <Link to="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              مركز المساعدة
            </Link>
            <Link to="/admin-access" className="text-sm text-muted-foreground/50 hover:text-primary/80 transition-colors">
              .
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
