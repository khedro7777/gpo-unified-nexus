
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowRight } from 'lucide-react';

interface BackToHomeProps {
  className?: string;
  showText?: boolean;
}

const BackToHome: React.FC<BackToHomeProps> = ({ className = "", showText = true }) => {
  return (
    <Button variant="outline" size="sm" className={`mb-6 ${className}`} asChild>
      <Link to="/" className="flex items-center gap-2">
        <ArrowRight className="h-4 w-4" />
        <Home className="h-4 w-4" />
        {showText && <span>العودة للصفحة الرئيسية</span>}
      </Link>
    </Button>
  );
};

export default BackToHome;
