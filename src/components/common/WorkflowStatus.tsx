
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending' | 'blocked';
  action?: {
    label: string;
    url: string;
  };
}

interface WorkflowStatusProps {
  title: string;
  steps: WorkflowStep[];
  currentStepId?: string;
}

const WorkflowStatus: React.FC<WorkflowStatusProps> = ({ title, steps, currentStepId }) => {
  const getStatusIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'current':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'blocked':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusBadge = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">مكتمل</Badge>;
      case 'current':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">جاري</Badge>;
      case 'blocked':
        return <Badge variant="destructive">محظور</Badge>;
      default:
        return <Badge variant="outline">بانتظار</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{title}</span>
        </CardTitle>
        <CardDescription>
          تتبع تقدم العمليات والخطوات المطلوبة
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(step.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {step.title}
                  </h4>
                  {getStatusBadge(step.status)}
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {step.description}
                </p>
                
                {step.action && step.status === 'current' && (
                  <Button size="sm" className="mt-2" asChild>
                    <a href={step.action.url} className="inline-flex items-center gap-2">
                      {step.action.label}
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowStatus;
