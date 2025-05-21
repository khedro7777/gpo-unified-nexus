
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Server, Globe, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface StrapiStatusProps {
  onlyStatus?: boolean;
}

const StrapiStatus: React.FC<StrapiStatusProps> = ({ onlyStatus = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState({
    cms: false,
    api: false,
    content: false
  });
  const { toast } = useToast();

  const checkStatus = async () => {
    setIsLoading(true);
    
    // Simulate API calls to check Strapi status
    // In a real application, these would be actual API calls
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStatus = {
      cms: Math.random() > 0.1, // 90% chance of CMS being online
      api: Math.random() > 0.2, // 80% chance of API being online
      content: Math.random() > 0.15 // 85% chance of content being available
    };
    
    setStatus(newStatus);
    setIsLoading(false);
    
    const allOnline = newStatus.cms && newStatus.api && newStatus.content;
    
    toast({
      title: allOnline ? "جميع الأنظمة متصلة" : "بعض الأنظمة غير متصلة",
      description: allOnline 
        ? "تم التحقق من اتصال جميع أنظمة Strapi بنجاح" 
        : "يوجد مشكلة في بعض أنظمة Strapi، يرجى التحقق",
      variant: allOnline ? "default" : "destructive"
    });
  };
  
  useEffect(() => {
    checkStatus();
  }, []);
  
  if (onlyStatus) {
    return (
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${status.cms ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm font-medium">
          {status.cms ? 'Strapi CMS متصل' : 'Strapi CMS غير متصل'}
        </span>
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex justify-between items-center">
          <span>حالة اتصال Strapi</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={checkStatus} 
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <div className="flex justify-between items-center p-2 border rounded-md">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Strapi CMS</span>
          </div>
          <div>
            {status.cms 
              ? <CheckCircle className="h-4 w-4 text-green-500" /> 
              : <XCircle className="h-4 w-4 text-red-500" />}
          </div>
        </div>
        
        <div className="flex justify-between items-center p-2 border rounded-md">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span>Strapi API</span>
          </div>
          <div>
            {status.api 
              ? <CheckCircle className="h-4 w-4 text-green-500" /> 
              : <XCircle className="h-4 w-4 text-red-500" />}
          </div>
        </div>
        
        <div className="flex justify-between items-center p-2 border rounded-md">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Strapi Content</span>
          </div>
          <div>
            {status.content 
              ? <CheckCircle className="h-4 w-4 text-green-500" /> 
              : <XCircle className="h-4 w-4 text-red-500" />}
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mt-2">
          آخر تحديث: {new Date().toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default StrapiStatus;
