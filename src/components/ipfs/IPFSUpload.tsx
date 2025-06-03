
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, File, Check, AlertCircle, Download, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  name: string;
  hash: string;
  size: number;
  type: string;
  uploadDate: Date;
  status: 'uploading' | 'completed' | 'error';
}

interface IPFSUploadProps {
  onFileUploaded?: (file: UploadedFile) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
}

const IPFSUpload: React.FC<IPFSUploadProps> = ({ 
  onFileUploaded, 
  acceptedTypes = ['.pdf', '.doc', '.docx', '.txt'],
  maxSize = 10 
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  // Simulate IPFS upload (replace with actual IPFS client)
  const simulateIPFSUpload = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          // Generate mock IPFS hash
          const hash = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
          resolve(hash);
        }
      }, 200);
    });
  };

  const handleFileUpload = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          title: "خطأ في الملف",
          description: `حجم الملف ${file.name} أكبر من ${maxSize}MB`,
          variant: "destructive",
        });
        continue;
      }

      // Validate file type
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!acceptedTypes.includes(fileExtension)) {
        toast({
          title: "نوع ملف غير مدعوم",
          description: `نوع الملف ${fileExtension} غير مدعوم`,
          variant: "destructive",
        });
        continue;
      }

      const newFile: UploadedFile = {
        name: file.name,
        hash: '',
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
        status: 'uploading'
      };

      setUploadedFiles(prev => [...prev, newFile]);

      try {
        const hash = await simulateIPFSUpload(file);
        
        const completedFile = { ...newFile, hash, status: 'completed' as const };
        
        setUploadedFiles(prev => 
          prev.map(f => f.name === file.name ? completedFile : f)
        );
        
        onFileUploaded?.(completedFile);
        
        toast({
          title: "تم رفع الملف بنجاح",
          description: `تم رفع ${file.name} إلى IPFS`,
        });
      } catch (error) {
        setUploadedFiles(prev => 
          prev.map(f => f.name === file.name ? { ...f, status: 'error' } : f)
        );
        
        toast({
          title: "خطأ في الرفع",
          description: `فشل في رفع ${file.name}`,
          variant: "destructive",
        });
      }
      
      setUploadProgress(0);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />;
      case 'completed':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            رفع الملفات إلى IPFS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">اسحب الملفات هنا أو انقر للاختيار</p>
            <p className="text-sm text-muted-foreground mb-4">
              الأنواع المدعومة: {acceptedTypes.join(', ')} | الحد الأقصى: {maxSize}MB
            </p>
            
            <input
              type="file"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                اختيار الملفات
              </label>
            </Button>
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>جاري الرفع...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>الملفات المرفوعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <File className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)} • {file.uploadDate.toLocaleDateString('ar-SA')}
                      </p>
                      {file.hash && (
                        <p className="text-xs font-mono text-blue-600 mt-1">
                          IPFS: {file.hash.substring(0, 20)}...
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(file.status)}
                    
                    {file.status === 'completed' && (
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    
                    <Badge 
                      variant={
                        file.status === 'completed' ? 'default' : 
                        file.status === 'error' ? 'destructive' : 'secondary'
                      }
                      className={file.status === 'completed' ? 'bg-green-500' : ''}
                    >
                      {file.status === 'uploading' ? 'جاري الرفع' : 
                       file.status === 'completed' ? 'مكتمل' : 'خطأ'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IPFSUpload;
