
import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'الخدمات',
      links: [
        { label: 'الشراء التعاوني', href: '/cooperative-buying' },
        { label: 'التسويق التعاوني', href: '/cooperative-marketing' },
        { label: 'المستقلون', href: '/freelancers' },
        { label: 'الموردون', href: '/suppliers' },
        { label: 'تأسيس الشركات', href: '/company-formation' },
        { label: 'التحكيم والتوثيق', href: '/arbitration' }
      ]
    },
    {
      title: 'الشركة',
      links: [
        { label: 'من نحن', href: '/about' },
        { label: 'رؤيتنا ورسالتنا', href: '/mission' },
        { label: 'فريق العمل', href: '/team' },
        { label: 'الشراكات', href: '/partnerships' },
        { label: 'الوظائف', href: '/careers' },
        { label: 'أخبار المنصة', href: '/news' }
      ]
    },
    {
      title: 'الدعم',
      links: [
        { label: 'مركز المساعدة', href: '/help-center' },
        { label: 'كيف تعمل المنصة', href: '/how-it-works' },
        { label: 'الأسئلة الشائعة', href: '/faq' },
        { label: 'تواصل معنا', href: '/contact' },
        { label: 'تقديم شكوى', href: '/complaints' },
        { label: 'حالة الخدمة', href: '/status' }
      ]
    },
    {
      title: 'القانون والأمان',
      links: [
        { label: 'سياسة الخصوصية', href: '/privacy' },
        { label: 'شروط الاستخدام', href: '/terms' },
        { label: 'سياسة الأمان', href: '/security' },
        { label: 'حماية البيانات', href: '/data-protection' },
        { label: 'سياسة الاسترداد', href: '/refund-policy' },
        { label: 'التحكيم ORDA', href: '/orda-arbitration' }
      ]
    }
  ];

  const supportContacts = [
    {
      department: 'الدعم العام',
      email: 'support@gpoworld.com',
      description: 'للاستفسارات العامة والدعم التقني'
    },
    {
      department: 'المبيعات والشراكات',
      email: 'sales@gpoworld.com',
      description: 'للاستفسارات التجارية والشراكات'
    },
    {
      department: 'التحكيم والقانون',
      email: 'legal@gpoworld.com',
      description: 'للمسائل القانونية والتحكيم'
    },
    {
      department: 'تأسيس الشركات',
      email: 'incorporation@gpoworld.com',
      description: 'لخدمات تأسيس الشركات والاستشارات'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Top Section - Logo and Description */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <Building className="h-10 w-10 text-blue-400" />
              <div className="mr-3">
                <div className="text-2xl font-bold text-white">GPO WORLD</div>
                <div className="text-sm text-gray-400">Smart Cooperation Platform</div>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              منصة عالمية متطورة للتعاون الذكي والتفاوض التجاري، تربط بين المشترين والموردين والمستقلين 
              في بيئة آمنة ومبتكرة مع دعم الذكاء الاصطناعي.
            </p>

            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>متاح عالمياً - خدمات متعددة الدول</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1-800-GPO-WORLD</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@gpoworld.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center gap-1 group"
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-gray-700 my-8" />

        {/* Support Contacts Section */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            فرق الدعم المتخصصة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportContacts.map((contact, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
                <h4 className="font-medium text-white mb-2">{contact.department}</h4>
                <a 
                  href={`mailto:${contact.email}`}
                  className="text-blue-400 hover:text-blue-300 text-sm block mb-2 transition-colors"
                >
                  {contact.email}
                </a>
                <p className="text-xs text-gray-400">{contact.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-700 my-8" />

        {/* Integration Partners */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            شركاء التكنولوجيا والتكامل
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Paddle Billing', 'Loomio Voting', 'Snapshot DAO', 'ORDA Arbitration',
              'OpenZeppelin Security', 'Strapi CMS', 'MCP AI', 'IPFS Storage',
              'Zulip Chat', 'Botpress AI', 'ERPNext', 'Supabase'
            ].map((partner, index) => (
              <div
                key={index}
                className="bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-300 hover:bg-gray-700 transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-700 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} GPO WORLD. جميع الحقوق محفوظة.</p>
            <p className="mt-1">
              مرخص ومسجل دولياً - ISO 44001 معتمد للتعاون التجاري
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/admin-monitor-access" className="hover:text-blue-400 transition-colors text-xs opacity-50">
              مراقب النظام
            </Link>
            <div className="text-xs">
              الإصدار 2.5.0 - آخر تحديث: يناير 2025
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Admin Monitor Link */}
      <Link 
        to="/admin-monitor-access" 
        className="fixed bottom-0 right-0 w-2 h-2 opacity-0 pointer-events-auto"
        style={{ zIndex: -1 }}
      >
        Admin
      </Link>
    </footer>
  );
};

export default Footer;
