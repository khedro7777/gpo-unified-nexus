import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { File, AlertTriangle, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DisputeFormProps {
  onSubmit: (data: any) => void;
  groupId?: string;
  contractId?: string;
}

const DisputeForm: React.FC<DisputeFormProps> = ({ onSubmit, groupId, contractId }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    requestedResolution: '',
    attachFile: null as File | null,
    preferredResolution: 'human',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, attachFile: e.target.files![0] }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.type || !formData.description) {
      toast({
        title: "بيانات غير مكتملة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Generate a unique dispute ID
    const disputeId = `ORDA-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Submit the dispute with metadata
    const disputeData = {
      ...formData,
      id: disputeId,
      groupId,
      contractId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      fileUrl: formData.attachFile ? URL.createObjectURL(formData.attachFile) : null
    };
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(disputeData);
      
      toast({
        title: "تم إنشاء النزاع",
        description: `تم إنشاء النزاع برقم ${disputeId}`,
      });
      
      // Reset form
      setFormData({
        title: '',
        type: '',
        description: '',
        requestedResolution: '',
        attachFile: null,
        preferredResolution: 'human',
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>إنشاء نزاع جديد (ORDA)</CardTitle>
        <CardDescription>استخدم نظام تسوية المنازعات عبر الإنترنت (ORDA) للمساعدة في حل أي خلافات</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان النزاع</Label>
            <Input 
              id="title" 
              name="title" 
              placeholder="أدخل عنوانًا موجزًا للنزاع" 
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">نوع النزاع</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع النزاع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payment">نزاع دفع</SelectItem>
                <SelectItem value="service">نزاع خدمة</SelectItem>
                <SelectItem value="contract">نزاع عقد</SelectItem>
                <SelectItem value="quality">نزاع جودة</SelectItem>
                <SelectItem value="delivery">نزاع تسليم</SelectItem>
                <SelectItem value="other">أخرى</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">وصف النزاع</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="اشرح تفاصيل النزاع بوضوح" 
              value={formData.description}
              onChange={handleChange}
              className="min-h-[120px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="requestedResolution">الحل المطلوب</Label>
            <Textarea 
              id="requestedResolution" 
              name="requestedResolution" 
              placeholder="صف الحل الذي تفضله لهذا النزاع" 
              value={formData.requestedResolution}
              onChange={handleChange}
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preferredResolution">نوع الحل المفضل</Label>
            <Select
              value={formData.preferredResolution}
              onValueChange={(value) => setFormData(prev => ({ ...prev, preferredResolution: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر طريقة الحل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="human">تحكيم يدوي (أشخاص)</SelectItem>
                <SelectItem value="auto">تحكيم آلي (MCP)</SelectItem>
                <SelectItem value="dao">تحكيم DAO (تصويت)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">اختر الطريقة المفضلة لحل النزاع</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="attachFile">إرفاق مستندات</Label>
            <div className="border rounded-lg p-4 text-center">
              <Label 
                htmlFor="fileUpload" 
                className="flex flex-col items-center cursor-pointer gap-2"
              >
                <File className="h-8 w-8 text-muted-foreground" />
                <span className="font-medium">انقر لإرفاق ملف</span>
                <span className="text-xs text-muted-foreground">أو اسحب الملف وأفلته هنا</span>
              </Label>
              <Input 
                id="fileUpload" 
                type="file" 
                className="hidden" 
                onChange={handleFileChange}
              />
              
              {formData.attachFile && (
                <div className="mt-4 p-2 bg-muted rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <Upload className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm truncate max-w-[250px]">{formData.attachFile.name}</span>
                  </div>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, attachFile: null }))}
                  >
                    إزالة
                  </Button>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">يمكنك إرفاق مستندات داعمة مثل الصور، العقود، المراسلات، إلخ</p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800">ملاحظة مهمة</p>
              <p className="text-yellow-700">بمجرد إنشاء النزاع، سيتم إخطار جميع الأطراف المعنية وسيتم حفظ جميع البيانات بشكل آمن في النظام.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'جاري إنشاء النزاع...' : 'إنشاء النزاع'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DisputeForm;
