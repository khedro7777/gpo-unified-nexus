
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload, Download, Eye, Share2, Trash2, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'proposal' | 'report' | 'legal' | 'financial';
  size: string;
  uploadDate: string;
  uploadedBy: string;
  status: 'draft' | 'review' | 'approved' | 'archived';
  tags: string[];
  description: string;
}

const DocumentManagement = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'doc-001',
      name: 'عقد توريد أجهزة حاسب.pdf',
      type: 'contract',
      size: '2.4 MB',
      uploadDate: '2025-05-28',
      uploadedBy: 'أحمد محمد',
      status: 'review',
      tags: ['عقود', 'توريد', 'أجهزة'],
      description: 'عقد توريد أجهزة حاسب محمول للمجموعة'
    },
    {
      id: 'doc-002',
      name: 'تقرير مالي Q1 2025.xlsx',
      type: 'financial',
      size: '1.8 MB',
      uploadDate: '2025-05-27',
      uploadedBy: 'سارة علي',
      status: 'approved',
      tags: ['مالي', 'تقرير', 'ربع سنوي'],
      description: 'التقرير المالي للربع الأول 2025'
    },
    {
      id: 'doc-003',
      name: 'اقتراح شراكة تسويقية.docx',
      type: 'proposal',
      size: '890 KB',
      uploadDate: '2025-05-26',
      uploadedBy: 'محمد حسن',
      status: 'draft',
      tags: ['اقتراح', 'تسويق', 'شراكة'],
      description: 'اقتراح شراكة تسويقية مع الشركات المحلية'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const { toast } = useToast();

  const getStatusBadge = (status: Document['status']) => {
    const variants = {
      draft: { label: 'مسودة', variant: 'secondary' as const },
      review: { label: 'قيد المراجعة', variant: 'outline' as const },
      approved: { label: 'معتمد', variant: 'default' as const },
      archived: { label: 'مؤرشف', variant: 'secondary' as const }
    };
    
    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getTypeLabel = (type: Document['type']) => {
    const labels = {
      contract: 'عقد',
      proposal: 'اقتراح',
      report: 'تقرير',
      legal: 'قانوني',
      financial: 'مالي'
    };
    return labels[type];
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // محاكاة رفع الملف
      const newDoc: Document = {
        id: `doc-${Date.now()}`,
        name: file.name,
        type: 'report',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedBy: 'المستخدم الحالي',
        status: 'draft',
        tags: ['جديد'],
        description: `ملف مرفوع: ${file.name}`
      };

      setDocuments([newDoc, ...documents]);
      toast({
        title: "تم رفع الملف",
        description: `تم رفع ${file.name} بنجاح`
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">إدارة الوثائق</h2>
        <p className="text-muted-foreground">
          إدارة ومشاركة الوثائق والملفات الخاصة بالمجموعات
        </p>
      </div>

      {/* شريط البحث والفلاتر */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في الوثائق..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="نوع الوثيقة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="contract">عقود</SelectItem>
                <SelectItem value="proposal">اقتراحات</SelectItem>
                <SelectItem value="report">تقارير</SelectItem>
                <SelectItem value="legal">قانونية</SelectItem>
                <SelectItem value="financial">مالية</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="draft">مسودة</SelectItem>
                <SelectItem value="review">قيد المراجعة</SelectItem>
                <SelectItem value="approved">معتمد</SelectItem>
                <SelectItem value="archived">مؤرشف</SelectItem>
              </SelectContent>
            </Select>

            <div>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              />
              <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  رفع ملف
                </label>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* قائمة الوثائق */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDocuments.map((document) => (
          <Card key={document.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <FileText className="h-8 w-8 text-blue-500 mt-1" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{document.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {document.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span>{getTypeLabel(document.type)}</span>
                      <span>•</span>
                      <span>{document.size}</span>
                      <span>•</span>
                      <span>{document.uploadDate}</span>
                      <span>•</span>
                      <span>بواسطة: {document.uploadedBy}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusBadge(document.status)}
                      <div className="flex flex-wrap gap-1">
                        {document.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد وثائق</h3>
            <p className="text-muted-foreground">
              لم يتم العثور على وثائق تطابق معايير البحث
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentManagement;
