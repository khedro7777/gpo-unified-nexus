
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, MessageSquare, Hand, Bot, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type MCPMode = 'auto' | 'ask' | 'manual';

interface MCPModeSelectorProps {
  currentMode: MCPMode;
  onModeChange: (mode: MCPMode) => void;
  serverStatus: 'online' | 'offline';
}

const MCPModeSelector: React.FC<MCPModeSelectorProps> = ({ 
  currentMode, 
  onModeChange, 
  serverStatus 
}) => {
  const modes = [
    {
      id: 'auto' as MCPMode,
      title: 'التنفيذ التلقائي',
      description: 'MCP ينفذ المهام تلقائياً بعد الموافقة',
      icon: Zap,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      disabled: serverStatus === 'offline'
    },
    {
      id: 'ask' as MCPMode,
      title: 'وضع الاستشارة',
      description: 'MCP يقدم اقتراحات ونصائح فقط',
      icon: MessageSquare,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      disabled: serverStatus === 'offline'
    },
    {
      id: 'manual' as MCPMode,
      title: 'التنفيذ اليدوي',
      description: 'أنت تتحكم في كل شيء يدوياً',
      icon: Hand,
      color: 'bg-gray-500',
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      disabled: false
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">أوضاع MCP</h3>
        <Badge 
          variant={serverStatus === 'online' ? 'default' : 'destructive'}
          className="flex items-center gap-1"
        >
          {serverStatus === 'online' ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <AlertTriangle className="h-3 w-3" />
          )}
          {serverStatus === 'online' ? 'متصل' : 'غير متصل'}
        </Badge>
      </div>

      <div className="grid gap-3">
        {modes.map((mode) => (
          <Card 
            key={mode.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              currentMode === mode.id ? `${mode.bgColor} ${mode.borderColor} border-2` : "hover:bg-gray-50",
              mode.disabled ? "opacity-50 cursor-not-allowed" : ""
            )}
            onClick={() => !mode.disabled && onModeChange(mode.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    currentMode === mode.id ? mode.color : 'bg-gray-100'
                  )}>
                    <mode.icon className={cn(
                      "h-4 w-4",
                      currentMode === mode.id ? 'text-white' : 'text-gray-600'
                    )} />
                  </div>
                  <div>
                    <CardTitle className={cn(
                      "text-base",
                      currentMode === mode.id ? mode.textColor : 'text-gray-900'
                    )}>
                      {mode.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {mode.description}
                    </CardDescription>
                  </div>
                </div>
                {currentMode === mode.id && (
                  <Badge variant="default" className="bg-primary">
                    نشط
                  </Badge>
                )}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {serverStatus === 'offline' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">خادم MCP غير متصل</span>
          </div>
          <p className="text-sm text-red-600 mt-1">
            الوضع اليدوي فقط متاح حالياً. سيتم استعادة الأوضاع الأخرى عند عودة الاتصال.
          </p>
        </div>
      )}
    </div>
  );
};

export default MCPModeSelector;
