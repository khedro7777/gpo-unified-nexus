
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  User, 
  Menu, 
  X, 
  MessageCircle, 
  HelpCircle, 
  Building,
  Clock
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

const EnhancedTopBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ar');
  const [selectedCountry, setSelectedCountry] = useState('');
  const { isAuthenticated, name } = useAuth();
  const navigate = useNavigate();

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
  ];

  const countries = [
    { code: 'SA', name: 'السعودية', currency: 'SAR', flag: '🇸🇦' },
    { code: 'AE', name: 'الإمارات', currency: 'AED', flag: '🇦🇪' },
    { code: 'EG', name: 'مصر', currency: 'EGP', flag: '🇪🇬' },
    { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
    { code: 'DE', name: 'Germany', currency: 'EUR', flag: '🇩🇪' },
    { code: 'FR', name: 'France', currency: 'EUR', flag: '🇫🇷' },
    { code: 'CN', name: 'China', currency: 'CNY', flag: '🇨🇳' },
    { code: 'JP', name: 'Japan', currency: 'JPY', flag: '🇯🇵' },
    { code: 'IN', name: 'India', currency: 'INR', flag: '🇮🇳' }
  ];

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navLinks = [
    { href: '/about', label: 'من نحن' },
    { href: '/how-it-works', label: 'كيف تعمل المنصة' },
    { href: '/support', label: 'الدعم والمساعدة' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-primary" />
              <div className="mr-3">
                <div className="text-xl font-bold text-primary">GPO WORLD</div>
                <div className="text-xs text-muted-foreground">Smart Cooperation Platform</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language, Country, Time */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-32 h-9">
                <Globe className="h-4 w-4 ml-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Country Selector */}
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-40 h-9">
                <SelectValue placeholder="اختر البلد" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {country.currency}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Time Display */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <div className="text-center">
                <div className="font-medium">{getCurrentTime()}</div>
                <div className="text-xs">{getCurrentDate()}</div>
              </div>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard">
                    <User className="h-4 w-4 ml-2" />
                    {name || 'لوحة التحكم'}
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">تسجيل الدخول</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">إنشاء حساب</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <Separator />
              
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">اللغة:</span>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-32 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">البلد:</span>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="w-32 h-8">
                      <SelectValue placeholder="اختر" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.flag} {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default EnhancedTopBar;
