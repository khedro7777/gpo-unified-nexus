
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import IPFSUpload from '@/components/ipfs/IPFSUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, Globe, Download } from 'lucide-react';

const DocumentManagement = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">إدارة الوثائق</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            رفع وتوثيق وحفظ الملفات بتقنية IPFS اللامركزية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold">آمن ومحمي</h3>
            <p className="text-sm text-muted-foreground">تشفير متقدم</p>
          </Card>
          <Card className="p-4 text-center">
            <Globe className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold">لامركزي</h3>
            <p className="text-sm text-muted-foreground">تقنية IPFS</p>
          </Card>
          <Card className="p-4 text-center">
            <FileText className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <h3 className="font-semibold">مراجعة سهلة</h3>
            <p className="text-sm text-muted-foreground">عرض تفاعلي</p>
          </Card>
          <Card className="p-4 text-center">
            <Download className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <h3 className="font-semibold">متاح دائماً</h3>
            <p className="text-sm text-muted-foreground">وصول سريع</p>
          </Card>
        </div>
        
        <IPFSUpload
          acceptedTypes={['.pdf', '.doc', '.docx', '.txt', '.jpg', '.png']}
          maxSize={50}
          onFileUploaded={(file) => {
            console.log('File uploaded to IPFS:', file);
          }}
        />
      </div>
    </NewMainLayout>
  );
};

export default DocumentManagement;
