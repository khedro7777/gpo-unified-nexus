
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Globe, Check } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = async (langCode: string) => {
    await i18n.changeLanguage(langCode);
    localStorage.setItem('gpo-language', langCode);
    document.documentElement.lang = langCode;
    document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
    setIsOpen(false);
    window.location.reload(); // Reload to apply direction changes
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden md:block text-sm">{currentLang.flag}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 bg-white shadow-lg border z-50" align="end">
        <div className="space-y-1">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant="ghost"
              size="sm"
              className="w-full justify-start relative hover:bg-gray-100"
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="mr-2">{lang.flag}</span>
              <span className="flex-1 text-left">{lang.name}</span>
              {i18n.language === lang.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
