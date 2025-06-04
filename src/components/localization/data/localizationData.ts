
import { Language, Country, Currency, Timezone, DateFormat } from '../types';

export const languages: Language[] = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
];

export const countries: Country[] = [
  { code: 'SA', name: 'السعودية', flag: '🇸🇦' },
  { code: 'AE', name: 'الإمارات', flag: '🇦🇪' },
  { code: 'EG', name: 'مصر', flag: '🇪🇬' },
  { code: 'US', name: 'الولايات المتحدة', flag: '🇺🇸' },
  { code: 'GB', name: 'المملكة المتحدة', flag: '🇬🇧' },
  { code: 'FR', name: 'فرنسا', flag: '🇫🇷' },
  { code: 'DE', name: 'ألمانيا', flag: '🇩🇪' },
  { code: 'CN', name: 'الصين', flag: '🇨🇳' },
  { code: 'JP', name: 'اليابان', flag: '🇯🇵' },
  { code: 'KR', name: 'كوريا الجنوبية', flag: '🇰🇷' }
];

export const currencies: Currency[] = [
  { code: 'SAR', name: 'ريال سعودي', symbol: 'ر.س' },
  { code: 'AED', name: 'درهم إماراتي', symbol: 'د.إ' },
  { code: 'EGP', name: 'جنيه مصري', symbol: 'ج.م' },
  { code: 'USD', name: 'دولار أمريكي', symbol: '$' },
  { code: 'EUR', name: 'يورو', symbol: '€' },
  { code: 'GBP', name: 'جنيه إسترليني', symbol: '£' },
  { code: 'CNY', name: 'يوان صيني', symbol: '¥' },
  { code: 'JPY', name: 'ين ياباني', symbol: '¥' },
  { code: 'KRW', name: 'وون كوري', symbol: '₩' }
];

export const timezones: Timezone[] = [
  { code: 'Asia/Riyadh', name: 'الرياض (GMT+3)', offset: '+3' },
  { code: 'Asia/Dubai', name: 'دبي (GMT+4)', offset: '+4' },
  { code: 'Africa/Cairo', name: 'القاهرة (GMT+2)', offset: '+2' },
  { code: 'America/New_York', name: 'نيويورك (GMT-5)', offset: '-5' },
  { code: 'Europe/London', name: 'لندن (GMT+0)', offset: '+0' },
  { code: 'Europe/Paris', name: 'باريس (GMT+1)', offset: '+1' },
  { code: 'Asia/Shanghai', name: 'شنغهاي (GMT+8)', offset: '+8' },
  { code: 'Asia/Tokyo', name: 'طوكيو (GMT+9)', offset: '+9' },
  { code: 'Asia/Seoul', name: 'سيول (GMT+9)', offset: '+9' }
];

export const dateFormats: DateFormat[] = [
  { code: 'DD/MM/YYYY', name: 'DD/MM/YYYY', example: '31/12/2025' },
  { code: 'MM/DD/YYYY', name: 'MM/DD/YYYY', example: '12/31/2025' },
  { code: 'YYYY-MM-DD', name: 'YYYY-MM-DD', example: '2025-12-31' },
  { code: 'DD-MM-YYYY', name: 'DD-MM-YYYY', example: '31-12-2025' }
];
