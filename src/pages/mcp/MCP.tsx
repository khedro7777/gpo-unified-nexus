
import React from 'react';
import SimplifiedLayout from '@/components/layout/SimplifiedLayout';
import MCPChat from '@/components/chat/MCPChat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bot, Settings, Zap, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const MCP = () => {
  return (
    <SimplifiedLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Left Panel - MCP Status & Controls */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                حالة MCP
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>حالة الخادم</span>
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  متصل
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>وضع التشغيل</span>
                <Badge variant="secondary">تلقائي</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>آخر تحديث</span>
                <span className="text-sm text-muted-foreground">منذ دقيقتين</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>المهام النشطة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "تحليل بيانات المجموعة", status: "running" },
                { name: "مراجعة العروض الجديدة", status: "pending" },
                { name: "إنشاء تقرير التصويت", status: "completed" }
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">{task.name}</span>
                  <Badge variant={
                    task.status === "running" ? "default" : 
                    task.status === "pending" ? "secondary" : "outline"
                  }>
                    {task.status === "running" && <Zap className="h-3 w-3 mr-1" />}
                    {task.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                    {task.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {task.status === "running" ? "قيد التنفيذ" : 
                     task.status === "pending" ? "قيد الانتظار" : "مكتمل"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إعدادات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                إعدادات MCP
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="h-4 w-4 mr-2" />
                عرض السجلات
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - MCP Chat */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>مساعد MCP</CardTitle>
              <CardDescription>
                تفاعل مع مساعد MCP الذكي لتنفيذ المهام وإدارة العمليات
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-120px)] p-0">
              <MCPChat />
            </CardContent>
          </Card>
        </div>
      </div>
    </SimplifiedLayout>
  );
};

export default MCP;
