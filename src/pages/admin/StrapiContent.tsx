
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, RefreshCw, Save, Plus } from 'lucide-react';
import StrapiStatus from '@/components/cms/StrapiStatus';

const StrapiContentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { role } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocale, setSelectedLocale] = useState('ar');
  const [selectedContent, setSelectedContent] = useState<any>(null);
  
  // Mock content types
  const contentTypes = [
    { id: 'homepage', name: 'الصفحة الرئيسية' },
    { id: 'about', name: 'من نحن' },
    { id: 'faq', name: 'الأسئلة الشائعة' },
    { id: 'terms', name: 'الشروط والأحكام' },
    { id: 'privacy', name: 'سياسة الخصوصية' },
    { id: 'admin', name: 'لوحة المسؤول' },
  ];
  
  // Mock content entries
  const contentEntries = [
    { id: 1, type: 'homepage', title: 'عنوان الصفحة الرئيسية', updatedAt: '2025-05-15' },
    { id: 2, type: 'homepage', title: 'وصف الموقع', updatedAt: '2025-05-16' },
    { id: 3, type: 'faq', title: 'كيفية إنشاء مجموعة', updatedAt: '2025-05-17' },
    { id: 4, type: 'faq', title: 'كيفية الاشتراك', updatedAt: '2025-05-17' },
    { id: 5, type: 'terms', title: 'الشروط والأحكام', updatedAt: '2025-05-10' },
    { id: 6, type: 'privacy', title: 'سياسة الخصوصية', updatedAt: '2025-05-10' },
    { id: 7, type: 'admin', title: 'عنوان صفحة المسؤول', updatedAt: '2025-05-18' },
    { id: 8, type: 'admin', title: 'وصف صفحة المسؤول', updatedAt: '2025-05-18' },
  ];
  
  // Filter content based on search and type
  const filteredContent = contentEntries.filter(entry => {
    const matchesSearch = entry.title.includes(searchQuery);
    const matchesType = selectedType === 'all' || entry.type === selectedType;
    return matchesSearch && matchesType;
  });
  
  const handleContentSelect = (entry: any) => {
    setIsLoading(true);
    // Simulate API call to get content details
    setTimeout(() => {
      setSelectedContent({
        ...entry,
        content: `محتوى تجريبي للعنصر "${entry.title}"`,
        locale: selectedLocale
      });
      setIsLoading(false);
    }, 800);
  };
  
  const handleContentSave = () => {
    setIsLoading(true);
    // Simulate API call to save content
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "تم حفظ المحتوى",
        description: `تم حفظ التغييرات بنجاح للعنصر "${selectedContent.title}"`,
      });
    }, 1000);
  };
  
  // Check if user is not admin
  if (role !== 'admin') {
    navigate('/');
    return null;
  }
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة محتوى Strapi</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin-access')}
        >
          العودة إلى صفحة المسؤول
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <StrapiStatus />
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>أنواع المحتوى</CardTitle>
              <CardDescription>اختر نوع المحتوى الذي تريد تحريره</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Select 
                value={selectedType} 
                onValueChange={setSelectedType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع المحتوى" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع أنواع المحتوى</SelectItem>
                  {contentTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="mt-4">
                <Select 
                  value={selectedLocale} 
                  onValueChange={setSelectedLocale}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر اللغة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">الإنجليزية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Button className="w-full" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  إنشاء محتوى جديد
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="list">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="list">قائمة المحتوى</TabsTrigger>
              <TabsTrigger value="edit" disabled={!selectedContent}>تحرير المحتوى</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>محتوى Strapi</CardTitle>
                  <CardDescription>عرض وتحرير محتوى نظام إدارة المحتوى</CardDescription>
                  
                  <div className="relative mt-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="البحث عن محتوى..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>العنوان</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>آخر تحديث</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContent.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                            لا توجد نتائج تطابق بحثك
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredContent.map(entry => (
                          <TableRow key={entry.id}>
                            <TableCell>{entry.title}</TableCell>
                            <TableCell>{contentTypes.find(t => t.id === entry.type)?.name || entry.type}</TableCell>
                            <TableCell>{entry.updatedAt}</TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleContentSelect(entry)}
                              >
                                تحرير
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="edit">
              {selectedContent && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>تحرير المحتوى</CardTitle>
                    <CardDescription>
                      {contentTypes.find(t => t.id === selectedContent.type)?.name} - {selectedContent.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">العنوان</label>
                      <Input 
                        value={selectedContent.title} 
                        onChange={(e) => setSelectedContent({...selectedContent, title: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">المحتوى</label>
                      <Textarea 
                        rows={10}
                        value={selectedContent.content}
                        onChange={(e) => setSelectedContent({...selectedContent, content: e.target.value})}
                        className="min-h-[200px]"
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedContent(null)}
                      >
                        إلغاء
                      </Button>
                      <Button 
                        onClick={handleContentSave}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            جاري الحفظ...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            حفظ التغييرات
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StrapiContentPage;
