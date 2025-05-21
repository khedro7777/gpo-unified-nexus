
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface StrapiContentProps {
  contentType: string;
  contentId?: string;
  field: string;
  fallback?: string;
  locale?: string;
  className?: string;
  richText?: boolean;
}

const StrapiContent: React.FC<StrapiContentProps> = ({
  contentType,
  contentId,
  field,
  fallback = 'جاري تحميل المحتوى...',
  locale = 'ar',
  className,
  richText = false
}) => {
  const [content, setContent] = useState<string>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // Mock API call - in real implementation, this would be a fetch to the Strapi API
        // const response = await fetch(`${process.env.STRAPI_URL}/api/${contentType}/${contentId || ''}?locale=${locale}`);
        
        // For demo purposes, we'll simulate a successful API call
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Sample response based on the content type
        let mockContent = '';
        
        switch (contentType) {
          case 'homepage':
            mockContent = field === 'title' 
              ? 'منصة GPO للتعاون الذكي'
              : field === 'description' 
              ? 'منصة متكاملة لإدارة المشتريات الجماعية والتسويق التعاوني وإدارة العقود الذكية'
              : 'محتوى افتراضي من Strapi CMS';
            break;
            
          case 'faq':
            mockContent = field === 'question' 
              ? 'كيف يمكنني إنشاء مجموعة شراء جديدة؟'
              : field === 'answer'
              ? 'يمكنك إنشاء مجموعة شراء جديدة من خلال النقر على زر "إنشاء مجموعة" في لوحة التحكم الخاصة بك، ثم اختيار نوع المجموعة وملء المعلومات المطلوبة.'
              : 'محتوى افتراضي من Strapi CMS';
            break;
            
          case 'terms':
            mockContent = field === 'content'
              ? richText 
                ? `<h2>شروط الاستخدام</h2>
                   <p>مرحبًا بك في منصة GPO للتعاون الذكي. باستخدامك لهذه المنصة، فإنك توافق على الالتزام بهذه الشروط والأحكام.</p>
                   <h3>1. استخدام المنصة</h3>
                   <p>يجب استخدام المنصة وفقًا للقوانين المعمول بها وبطريقة لا تضر بمصالح الآخرين.</p>`
                : 'شروط الاستخدام والأحكام العامة للمنصة'
              : 'محتوى افتراضي من Strapi CMS';
            break;
            
          case 'privacy':
            mockContent = field === 'content'
              ? 'تلتزم منصة GPO بحماية خصوصية بياناتك الشخصية وفقًا لسياسة الخصوصية المعتمدة والقوانين المعمول بها.'
              : 'محتوى افتراضي من Strapi CMS';
            break;
            
          default:
            mockContent = 'محتوى افتراضي من Strapi CMS';
        }
        
        setContent(mockContent);
        setError(null);
      } catch (err) {
        console.error('Error fetching Strapi content:', err);
        setError('حدث خطأ أثناء تحميل المحتوى');
        toast({
          title: "خطأ في تحميل المحتوى",
          description: "تعذر الاتصال بنظام إدارة المحتوى",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [contentType, contentId, field, locale, toast, richText]);
  
  if (loading) {
    return (
      <div className={`flex items-center justify-center py-4 ${className}`}>
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        <span className="text-sm text-muted-foreground">جاري تحميل المحتوى...</span>
      </div>
    );
  }
  
  if (error) {
    return <div className={`text-destructive ${className}`}>{error}</div>;
  }
  
  if (richText) {
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
  
  return <div className={className}>{content}</div>;
};

export default StrapiContent;
