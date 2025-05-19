
import React from 'react';
import { AlertTriangle, Shield, Eye, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ObserverPanelProps {
  visible?: boolean;
}

const ObserverPanel: React.FC<ObserverPanelProps> = ({ visible = true }) => {
  const { toast } = useToast();
  
  const handleIntervene = () => {
    toast({
      title: "تم تقديم طلب التدخل",
      description: "سيتم مراجعة الطلب من قبل فريق الدعم",
    });
  };
  
  const handleToggleWatch = (isWatching: boolean) => {
    toast({
      title: isWatching ? "تم تفعيل المراقبة" : "تم إيقاف المراقبة",
      description: isWatching ? 
        "ستتلقى تنبيهات عن أي مشاكل أمنية" : 
        "لن تتلقى تنبيهات عن المشاكل الأمنية",
    });
  };
  
  if (!visible) return null;
  
  return (
    <Card className="border-l-4 border-l-amber-500">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-base">وضع المراقب العام</CardTitle>
          </div>
          <Badge variant="outline" className="font-normal">مراقبة فقط</Badge>
        </div>
        <CardDescription>
          أنت في وضع مراقبة النظام. يمكنك الاطلاع دون المشاركة في التصويت أو التشغيل.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          <div className="bg-muted p-3 rounded-md">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> حالات التدخل المسموح بها:
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• حالات أمنية طارئة</li>
              <li>• أخطاء حرجة تؤثر على النظام</li>
              <li>• طلبات الدعم اليدوي للعملاء</li>
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => handleToggleWatch(true)}
            >
              <Eye className="h-4 w-4" /> تفعيل المراقبة
            </Button>
            
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleIntervene}
            >
              طلب التدخل
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => handleToggleWatch(false)}
            >
              <User className="h-4 w-4" /> إيقاف المراقبة
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ObserverPanel;
