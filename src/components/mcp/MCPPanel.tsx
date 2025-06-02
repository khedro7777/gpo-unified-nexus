
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, MessageSquare, Settings, Activity, RefreshCw } from 'lucide-react';
import MCPModeSelector from './MCPModeSelector';
import RasaChat from '../rasa/RasaChat';
import { useMCP } from '@/hooks/use-mcp';

const MCPPanel: React.FC = () => {
  const { mode, setMode, serverStatus } = useMCP();
  const [activeTab, setActiveTab] = useState('modes');

  const activeTasks = [
    { id: 1, name: "تحليل بيانات المجموعة", status: "running", progress: 75 },
    { id: 2, name: "مراجعة العروض الجديدة", status: "pending", progress: 0 },
    { id: 3, name: "إنشاء تقرير التصويت", status: "completed", progress: 100 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <Badge variant="default" className="bg-blue-500">قيد التنفيذ</Badge>;
      case 'pending':
        return <Badge variant="secondary">قيد الانتظار</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">مكتمل</Badge>;
      default:
        return <Badge variant="secondary">غير معروف</Badge>;
    }
  };

  return (
    <div className="w-full max-w-md bg-white border-l border-gray-200 h-full">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          لوحة MCP
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          نظام المساعدة الذكية والتحكم
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100%-80px)]">
        <TabsList className="grid w-full grid-cols-3 m-4">
          <TabsTrigger value="modes" className="text-xs">الأوضاع</TabsTrigger>
          <TabsTrigger value="chat" className="text-xs">المحادثة</TabsTrigger>
          <TabsTrigger value="tasks" className="text-xs">المهام</TabsTrigger>
        </TabsList>

        <div className="px-4 pb-4 h-[calc(100%-60px)] overflow-hidden">
          <TabsContent value="modes" className="h-full space-y-4 mt-0">
            <MCPModeSelector
              currentMode={mode}
              onModeChange={setMode}
              serverStatus={serverStatus}
            />
          </TabsContent>

          <TabsContent value="chat" className="h-full mt-0">
            <RasaChat />
          </TabsContent>

          <TabsContent value="tasks" className="h-full space-y-4 mt-0 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">المهام النشطة</h3>
              <Button size="sm" variant="outline">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {activeTasks.map((task) => (
                <Card key={task.id} className="p-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium">{task.name}</h4>
                      {getStatusBadge(task.status)}
                    </div>
                    
                    {task.status === 'running' && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>التقدم: {task.progress}%</span>
                      <span>منذ {Math.floor(Math.random() * 10) + 1} دقائق</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Activity className="h-4 w-4" />
                <span className="font-medium">إحصائيات اليوم</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-blue-900">24</div>
                  <div className="text-blue-600">مهمة مكتملة</div>
                </div>
                <div>
                  <div className="font-semibold text-blue-900">3</div>
                  <div className="text-blue-600">مهمة قيد التنفيذ</div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MCPPanel;
