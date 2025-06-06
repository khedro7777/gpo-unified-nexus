import React, { useState } from 'react';
import ModernLayout from '@/components/layout/ModernLayout';
import VideoPlayer from '@/components/video/VideoPlayer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, 
  Users, 
  ShoppingCart, 
  FileCheck, 
  Vote, 
  CreditCard, 
  Check, 
  ChevronRight, 
  ChevronLeft,
  Bot,
  Briefcase,
  Scale,
  ArrowRight,
  Workflow
} from 'lucide-react';

const steps = [
  {
    id: 'register',
    title: 'التسجيل والانضمام',
    description: 'إنشاء حساب والتحقق من الهوية',
    icon: <UserPlus />,
    content: (
      <div>
        <p className="text-muted-foreground mb-4">
          الخطوة الأولى هي إنشاء حساب على المنصة. سيتطلب ذلك التحقق من هويتك من خلال عملية KYC بسيطة تشمل:
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-center gap-2">
            <Check size={16} className="text-green-500" />
            <span>تقديم مستندات الهوية الشخصية أو بيانات الشركة</span>
          </li>
          <li className="flex items-center gap-2">
            <Check size={16} className="text-green-500" />
            <span>التحقق من البريد الإلكتروني ورقم الهاتف</span>
          </li>
          <li className="flex items-center gap-2">
            <Check size={16} className="text-green-500" />
            <span>استكمال ملف التعريف الشخصي أو ملف الشركة</span>
          </li>
          <li className="flex items-center gap-2">
            <Check size={16} className="text-green-500" />
            <span>الموافقة على شروط وأحكام المنصة</span>
          </li>
        </ul>
        <div className="bg-muted/40 p-4 rounded-lg">
          <p className="text-sm font-medium">ملاحظة مهمة</p>
          <p className="text-xs text-muted-foreground">
            يستغرق التحقق من البيانات عادة من 1-2 يوم عمل. يمكنك استكشاف المنصة خلال هذه الفترة، لكن بعض الميزات ستكون محدودة حتى اكتمال عملية التحقق.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'explore',
    title: 'استكشاف الخدمات',
    description: 'اكتشاف الخدمات المتاحة وكيفية عملها',
    icon: <Workflow />,
    content: (
      <div>
        <p className="text-muted-foreground mb-4">
          بعد تسجيل الدخول، يمكنك استكشاف مجموعة متنوعة من الخدمات المتاحة على المنصة:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h4 className="font-medium">الشراء التعاوني</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              تجميع المشتريات للحصول على أفضل الأسعار والشروط التعاقدية
            </p>
          </div>
          
          <div className="border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-primary" />
              <h4 className="font-medium">بوابة المستقلين</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              فرص عمل للمستقلين مع إدارة العقود والمدفوعات
            </p>
          </div>
          
          <div className="border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="h-5 w-5 text-primary" />
              <h4 className="font-medium">التحكيم وفض النزاعات</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              حل النزاعات بطرق عادلة وفعالة باستخدام نظام ORDA
            </p>
          </div>
          
          <div className="border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <h4 className="font-medium">تأسيس الشركات والجمعيات</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              إنشاء الكيانات القانونية والتعاونية بسهولة
            </p>
          </div>
        </div>
        
        <p className="text-sm mb-3">
          استخدم البحث المتقدم وفلاتر التصفية للعثور على الخدمات التي تناسب احتياجاتك المحددة:
        </p>
        <ul className="space-y-1 text-sm mb-3 text-muted-foreground">
          <li className="flex items-center gap-1">
            <ArrowRight size={14} />
            <span>فلترة حسب نوع الخدمة (WEB2 / WEB3)</span>
          </li>
          <li className="flex items-center gap-1">
            <ArrowRight size={14} />
            <span>فلترة حسب التصنيف (الحالة / الدولة / النوع)</span>
          </li>
          <li className="flex items-center gap-1">
            <ArrowRight size={14} />
            <span>البحث عن بوابات وخدمات محددة</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'join',
    title: 'الانضمام إلى مجموعة',
    description: 'الانضمام إلى مجموعة قائمة أو إنشاء مجموعة جديدة',
    icon: <Users />,
    content: (
      <div>
        <p className="text-muted-foreground mb-4">
          يمكنك الانضمام إلى مجموعات قائمة أو إنشاء مجموعة جديدة للاستفادة من خدمات المنصة. لكل خدمة مجموعات خاصة بها يمكنك الانضمام إليها.
        </p>
        
        <div className="mb-6">
          <h4 className="font-medium mb-2">الانضمام إلى مجموعة قائمة:</h4>
          <ol className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                1
              </div>
              <span className="text-sm">تصفح المجموعات النشطة من صفحة تفاصيل الخدمة</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                2
              </div>
              <span className="text-sm">اختر المجموعة المناسبة لاحتياجاتك</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                3
              </div>
              <span className="text-sm">انقر على زر "انضمام" واقرأ شروط المجموعة</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                4
              </div>
              <span className="text-sm">أكمل متطلبات الانضمام (إن وجدت)</span>
            </li>
          </ol>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">إنشاء مجموعة جديدة:</h4>
          <ol className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                1
              </div>
              <span className="text-sm">انقر على زر "إنشاء مجموعة جديدة" من صفحة الخدمة</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                2
              </div>
              <span className="text-sm">حدد نوع المجموعة وشروطها</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                3
              </div>
              <span className="text-sm">أضف تفاصيل المشروع أو الاحتياجات</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                4
              </div>
              <span className="text-sm">قم بدعوة مشاركين آخرين (اختياري)</span>
            </li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: 'contract',
    title: 'إنشاء العقد',
    description: 'إنشاء العقد وتحديد الشروط والأحكام',
    icon: <FileCheck />,
    content: (
      <div>
        <p className="text-muted-foreground mb-4">
          بمجرد الانضمام إلى مجموعة أو إنشاء مجموعة جديدة، يمكنك البدء في إنشاء العقد. يوفر نظام MCP الذكي المساعدة في إنشاء العقود وفقًا لاحتياجاتك.
        </p>
        
        <div className="bg-muted/30 p-4 rounded-lg mb-4">
          <div className="flex items-start gap-2">
            <Bot className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium mb-1">مساعدة MCP</h4>
              <p className="text-xs text-muted-foreground">
                يقدم نظام MCP الذكي المساعدة في إنشاء العقود من خلال ثلاثة أوضاع:
              </p>
              <ul className="text-xs space-y-1 mt-2">
                <li className="flex items-center gap-1">
                  <span className="h-4 w-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">A</span>
                  <span>وضع تلقائي: ينفذ العمليات تلقائيًا بعد موافقتك</span>
                </li>
                <li className="flex items-center gap-1">
                  <span className="h-4 w-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">?</span>
                  <span>وضع الاستشارة: يقدم اقتراحات فقط دون تنفيذ</span>
                </li>
                <li className="flex items-center gap-1">
                  <span className="h-4 w-4 rounded-full bg-gray-500 text-white flex items-center justify-center text-[10px]">M</span>
                  <span>وضع يدوي: يتيح لك العمل بنفسك مع إمكانية طلب المساعدة</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <h4 className="font-medium mb-2">خطوات إنشاء العقد:</h4>
        <ol className="space-y-3 mb-4">
          <li className="flex items-start gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <span className="text-sm">حدد نوع العقد ونموذجه</span>
              <p className="text-xs text-muted-foreground mt-0.5">اختر من مكتبة العقود المتاحة أو إنشاء عقد مخصص</p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <span className="text-sm">أضف تفاصيل العقد</span>
              <p className="text-xs text-muted-foreground mt-0.5">حدد الأطراف، والشروط، والمواعيد النهائية، والالتزامات</p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <span className="text-sm">قم بتعيين المشرفين والمستقلين للمراجعة</span>
              <p className="text-xs text-muted-foreground mt-0.5">اختر من قائمة المستقلين المعتمدين أو دعوة مشرفين خارجيين</p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
              4
            </div>
            <div>
              <span className="text-sm">مراجعة العقد والموافقة عليه</span>
              <p className="text-xs text-muted-foreground mt-0.5">مراجعة النسخة النهائية والتوقيع الإلكتروني</p>
            </div>
          </li>
        </ol>
      </div>
    )
  },
  {
    id: 'vote',
    title: 'التصويت والقرارات',
    description: 'عملية التصويت واتخاذ القرارات الجماعية',
    icon: <Vote />,
    content: (
      <div>
        <p className="text-muted-foreground mb-4">
          العديد من الخدمات في المنصة تعتمد على نظام التصويت واتخاذ القرارات الجماعية، خاصة في المشتريات التعاونية والحوكمة.
        </p>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">آلية التصويت:</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-0.5" />
              <div>
                <span className="text-sm">التصويت على المقترحات</span>
                <p className="text-xs text-muted-foreground">مناقشة وتقييم المقترحات المقدمة من أعضاء المجموعة</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-0.5" />
              <div>
                <span className="text-sm">تقييم عروض الموردين</span>
                <p className="text-xs text-muted-foreground">مقارنة وتقييم العروض المقدمة من الموردين</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-0.5" />
              <div>
                <span className="text-sm">حل النزاعات</span>
                <p className="text-xs text-muted-foreground">التصويت على حلول النزاعات المقترحة من نظام ORDA</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-2">نظام التصويت المرجح:</h4>
          <p className="text-sm text-muted-foreground mb-3">
            تعتمد المنصة نظام التصويت المرجح بناءً على عدة عوامل:
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="border rounded-md p-2">
              <span className="font-medium block mb-1">حجم المشاركة</span>
              <span className="text-muted-foreground">وزن التصويت يعتمد على حجم المشاركة في المجموعة</span>
            </div>
            <div className="border rounded-md p-2">
              <span className="font-medium block mb-1">الخبرة والتاريخ</span>
              <span className="text-muted-foreground">سمعة المصوت وتاريخه على المنصة</span>
            </div>
            <div className="border rounded-md p-2">
              <span className="font-medium block mb-1">رموز GPO</span>
              <span className="text-muted-foreground">عدد رموز GPO المملوكة</span>
            </div>
            <div className="border rounded-md p-2">
              <span className="font-medium block mb-1">المؤهلات</span>
              <span className="text-muted-foreground">التخصص والمؤهلات ذات الصلة</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm font-medium mb-2">نتائج التصويت:</p>
        <p className="text-sm text-muted-foreground mb-2">
          عند اكتمال التصويت، يتم تنفيذ القرار بناءً على الأغلبية المطلوبة (عادة 51% أو 66% للقرارات الهامة). يتم توثيق القرار وجميع الأصوات بشكل شفاف.
        </p>
      </div>
    )
  },
  {
    id: 'payment',
    title: 'الفواتير والدفع',
    description: 'إصدار الفواتير وإتمام عمليات الدفع',
    icon: <CreditCard />,
    content: (
      <div>
        <p className="text-muted-foreground mb-4">
          بعد الموافقة على العقود والخدمات، تأتي مرحلة إصدار الفواتير وإتمام عمليات الدفع. توفر المنصة نظامًا متكاملًا للفوترة والدفع.
        </p>
        
        <h4 className="font-medium mb-2">طرق الدفع المتاحة:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="border rounded-md p-3 text-center">
            <h5 className="font-medium mb-1">الدفع الإلكتروني</h5>
            <p className="text-xs text-muted-foreground">بطاقات الائتمان والمحافظ الإلكترونية</p>
          </div>
          <div className="border rounded-md p-3 text-center">
            <h5 className="font-medium mb-1">PayPal</h5>
            <p className="text-xs text-muted-foreground">دفع دولي آمن وسريع</p>
          </div>
          <div className="border rounded-md p-3 text-center">
            <h5 className="font-medium mb-1">Vodafone Cash</h5>
            <p className="text-xs text-muted-foreground">لعملاء الشرق الأوسط وأفريقيا</p>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">عملية الدفع:</h4>
          <ol className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <span className="text-sm">إصدار الفاتورة</span>
                <p className="text-xs text-muted-foreground mt-0.5">يتم إصدار فاتورة تفصيلية تشمل جميع الرسوم والضرائب</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <span className="text-sm">مراجعة واعتماد الفاتورة</span>
                <p className="text-xs text-muted-foreground mt-0.5">مراجعة التفاصيل والموافقة عليها قبل الدفع</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <span className="text-sm">اختيار طريقة الدفع</span>
                <p className="text-xs text-muted-foreground mt-0.5">اختيار الطريقة المناسبة من الخيارات المتاحة</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <span className="text-sm">إتمام عملية الدفع</span>
                <p className="text-xs text-muted-foreground mt-0.5">تأكيد الدفع واستلام إيصال إلكتروني</p>
              </div>
            </li>
          </ol>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="font-medium mb-1">ملاحظات هامة:</h4>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• جميع المعاملات المالية مشفرة ومؤمنة</li>
            <li>• يمكن تقسيم المدفوعات لبعض الخدمات (دفعات مقدمة ومرحلية)</li>
            <li>• تتم مراقبة جميع المعاملات المالية للحماية من الاحتيال</li>
            <li>• يتم توفير سجل كامل للمعاملات المالية في لوحة التحكم</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'execution',
    title: 'تنفيذ العقد',
    description: 'متابعة تنفيذ العقد وإدارة المشروع',
    icon: <Check />,
    content: (
      <div>
        <p className="text-muted-foreground mb-4">
          المرحلة الأخيرة هي تنفيذ العقد ومتابعة سير العمل. توفر المنصة أدوات متقدمة لإدارة المشاريع ومتابعة التنفيذ.
        </p>
        
        <div className="mb-6">
          <h4 className="font-medium mb-2">متابعة سير العمل:</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-0.5" />
              <div>
                <span className="text-sm">لوحة متابعة المشروع</span>
                <p className="text-xs text-muted-foreground mt-0.5">عرض حالة المشروع والمهام والمواعيد النهائية</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-0.5" />
              <div>
                <span className="text-sm">التقارير والإشعارات</span>
                <p className="text-xs text-muted-foreground mt-0.5">تقارير دورية وإشعارات لحظية عن تقدم العمل</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-0.5" />
              <div>
                <span className="text-sm">التواصل مع الأطراف</span>
                <p className="text-xs text-muted-foreground mt-0.5">قنوات تواصل مباشرة مع جميع أطراف العقد</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium mb-2">إنجاز العقد:</h4>
          <ol className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <span className="text-sm">استلام المنتجات أو الخدمات</span>
                <p className="text-xs text-muted-foreground mt-0.5">التحقق من مطابقة المواصفات والجودة</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <span className="text-sm">تأكيد الاستلام</span>
                <p className="text-xs text-muted-foreground mt-0.5">الإقرار باستلام المنتجات أو الخدمات بشكل مرضٍ</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <span className="text-sm">إغلاق العقد</span>
                <p className="text-xs text-muted-foreground mt-0.5">إنهاء العقد وتوثيق جميع المعاملات</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <span className="text-sm">التقييم والمراجعة</span>
                <p className="text-xs text-muted-foreground mt-0.5">تقييم تجربة العمل وتقديم المراجعات</p>
              </div>
            </li>
          </ol>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <Bot className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium mb-1">دور MCP في التنفيذ</h4>
              <p className="text-xs text-muted-foreground">
                يقدم نظام MCP الذكي مساعدة قيمة في مرحلة التنفيذ من خلال:
              </p>
              <ul className="text-xs space-y-1 mt-2">
                <li>• مراقبة سير العمل وتنبيه الأطراف عند وجود مشكلات</li>
                <li>• اقتراح حلول للتحديات التي قد تظهر أثناء التنفيذ</li>
                <li>• توفير تحليلات وتوصيات لتحسين الأداء</li>
                <li>• مساعدة في توثيق جميع الخطوات والإجراءات</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <ModernLayout>
      <div className="space-y-8" dir="rtl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            كيف تعمل المنصة
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            دليل تفاعلي شامل لاستخدام منصة GPO للتعاون الذكي
          </p>
        </div>

        {/* Video Section */}
        <VideoPlayer 
          title="الدليل المرئي لاستخدام المنصة"
          description="شاهد شرحاً مفصلاً عن كيفية الاستفادة من جميع خدمات منصة GPO الذكية"
          className="mb-8"
        />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">مراحل العمل على المنصة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted transform -translate-y-1/2"></div>
              <div className="relative flex justify-between">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(index)}
                    className={`flex flex-col items-center z-10`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === index ? 'bg-primary text-primary-foreground' : 
                      currentStep > index ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      {currentStep > index ? <Check size={16} /> : index + 1}
                    </div>
                    <span className={`text-xs mt-1 text-center hidden sm:block ${
                      currentStep === index ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  {steps[currentStep].icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{steps[currentStep].title}</h3>
                  <p className="text-muted-foreground">{steps[currentStep].description}</p>
                </div>
              </div>
              
              <div className="mt-6">
                {steps[currentStep].content}
              </div>
            </div>
            
            <div className="flex justify-between mt-8 pt-4 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-1"
              >
                <ChevronRight size={16} /> الخطوة السابقة
              </Button>
              <Button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="flex items-center gap-1"
              >
                الخطوة التالية <ChevronLeft size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>استكشاف جميع الميزات</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="portals">
              <TabsList className="mb-4">
                <TabsTrigger value="portals">البوابات الرئيسية</TabsTrigger>
                <TabsTrigger value="mcp">نظام MCP</TabsTrigger>
                <TabsTrigger value="tools">الأدوات والخدمات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="portals" className="space-y-4">
                <p className="text-muted-foreground mb-2">
                  استكشف البوابات الرئيسية المتاحة على المنصة والخدمات التي تقدمها:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border rounded-md p-3 text-center">
                    <ShoppingCart className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium">الشراء التعاوني</h4>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium">بوابة المستقلين</h4>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <Scale className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium">التحكيم</h4>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <Briefcase className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium">تأسيس الشركات</h4>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="mcp" className="space-y-4">
                <p className="text-muted-foreground mb-2">
                  استكشف كيفية استخدام نظام MCP الذكي لتسهيل وتسريع عملك:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">وضع تلقائي</h4>
                    <p className="text-sm text-muted-foreground">
                      ينفذ العمليات تلقائيًا بعد موافقتك. مثالي للمهام المتكررة والروتينية.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">وضع الاستشارة</h4>
                    <p className="text-sm text-muted-foreground">
                      يقدم اقتراحات فقط دون تنفيذ. مناسب عند الحاجة لآراء استشارية.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">وضع يدوي</h4>
                    <p className="text-sm text-muted-foreground">
                      يتيح لك العمل بنفسك مع إمكانية طلب المساعدة. للتحكم الكامل.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tools" className="space-y-4">
                <p className="text-muted-foreground mb-2">
                  استكشف الأدوات والخدمات المساعدة المتاحة على المنصة:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">نظام ORDA لفض النزاعات</h4>
                    <p className="text-sm text-muted-foreground">
                      نظام متكامل لحل النزاعات بطرق عادلة وفعالة باستخدام الذكاء الاصطناعي والتحكيم.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Web3 توثيق العقود</h4>
                    <p className="text-sm text-muted-foreground">
                      خدمات توثيق العقود باستخدام تقنيات blockchain للشفافية والأمان.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">DAO Tools</h4>
                    <p className="text-sm text-muted-foreground">
                      أدوات لإدارة المنظمات اللامركزية وتنظيم التصويت واتخاذ القرارات.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">DeepSeek Cash Memory</h4>
                    <p className="text-sm text-muted-foreground">
                      نظام تحليل ذكي للبيانات والمعاملات المالية وتقديم توصيات.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ModernLayout>
  );
};

export default HowItWorks;
