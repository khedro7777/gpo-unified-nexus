
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Upload, Download, Eye, Share, Trash2, Search, Plus } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'proposal' | 'report' | 'other';
  size: string;
  uploadedBy: string;
  uploadedAt: Date;
  status: 'draft' | 'review' | 'approved' | 'rejected';
  downloadCount: number;
}

interface GroupDocumentsProps {
  groupId: string;
  isAdmin: boolean;
}

const GroupDocuments: React.FC<GroupDocumentsProps> = ({ groupId, isAdmin }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  // Mock documents
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'عقد المجموعة الأساسي.pdf',
      type: 'contract',
      size: '2.3 MB',
      uploadedBy: 'أحمد محمد',
      uploadedAt: new Date(Date.now() - 86400000),
      status: 'approved',
      downloadCount: 15
    },
    {
      id: '2',
      name: 'اقتراح شراء الأجهزة.docx',
      type: 'proposal',
      size: '1.8 MB',
      uploadedBy: 'سارة أحمد',
      uploadedAt: new Date(Date.now() - 172800000),
      status: 'review',
      downloadCount: 8
    },
    {
      id: '3',
      name: 'تقرير الأنشطة الشهري.pdf',
      type: 'report',
      size: '5.1 MB',
      uploadedBy: 'محمد علي',
      uploadedAt: new Date(Date.now() - 259200000),
      status: 'approved',
      downloadCount: 23
    }
  ]);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'contract': return 'عقد';
      case 'proposal': return 'اقتراح';
      case 'report': return 'تقرير';
      case 'other': return 'أخرى';
      default: return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'مسودة';
      case 'review': return 'قيد المراجعة';
      case 'approved': return 'موافق عليه';
      case 'rejected': return 'مرفوض';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return <FileText className="h-8 w-8 text-blue-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">مكتبة الوثائق</h3>
          <p className="text-sm text-muted-foreground">
            إجمالي الوثائق: {documents.length}
          </p>
        </div>
        
        {isAdmin && (
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                رفع وثيقة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>رفع وثيقة جديدة</DialogTitle>
                <DialogDescription>
                  اختر وثيقة لرفعها إلى مكتبة المجموعة
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">اختر الملف</label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      اسحب الملف هنا أو انقر للاختيار
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      اختيار ملف
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">نوع الوثيقة</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الوثيقة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">عقد</SelectItem>
                      <SelectItem value="proposal">اقتراح</SelectItem>
                      <SelectItem value="report">تقرير</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={() => setUploadDialogOpen(false)}>
                  رفع الوثيقة
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث في الوثائق..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            dir="rtl"
          />
        </div>
        
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="فلترة حسب النوع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأنواع</SelectItem>
            <SelectItem value="contract">عقود</SelectItem>
            <SelectItem value="proposal">اقتراحات</SelectItem>
            <SelectItem value="report">تقارير</SelectItem>
            <SelectItem value="other">أخرى</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getFileIcon(doc.name)}
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{doc.name}</h4>
                      <Badge variant="outline">
                        {getDocumentTypeLabel(doc.type)}
                      </Badge>
                      <Badge className={getStatusColor(doc.status)}>
                        {getStatusLabel(doc.status)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>الحجم: {doc.size}</span>
                      <span>رفعه: {doc.uploadedBy}</span>
                      <span>في: {doc.uploadedAt.toLocaleDateString('ar-SA')}</span>
                      <span>تم تحميله: {doc.downloadCount} مرة</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="h-4 w-4" />
                  </Button>
                  {isAdmin && (
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد وثائق</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || typeFilter !== 'all' 
                ? 'لم يتم العثور على وثائق تطابق البحث' 
                : 'لم يتم رفع أي وثائق بعد'
              }
            </p>
            {isAdmin && (
              <Button onClick={() => setUploadDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                رفع أول وثيقة
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Document Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">إحصائيات الوثائق</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {documents.filter(d => d.type === 'contract').length}
              </div>
              <div className="text-sm text-muted-foreground">عقود</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {documents.filter(d => d.type === 'proposal').length}
              </div>
              <div className="text-sm text-muted-foreground">اقتراحات</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {documents.filter(d => d.type === 'report').length}
              </div>
              <div className="text-sm text-muted-foreground">تقارير</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {documents.reduce((sum, doc) => sum + doc.downloadCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">إجمالي التحميلات</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupDocuments;
