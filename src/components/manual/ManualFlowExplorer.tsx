
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  UserPlus, 
  ShoppingCart, 
  Upload, 
  Vote, 
  Wallet, 
  MessageSquare, 
  CheckCircle, 
  Circle,
  ArrowRight,
  ArrowLeft,
  PlayCircle,
  Target,
  FileText
} from 'lucide-react';

const ManualFlowExplorer = () => {
  const { t, i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const isRTL = i18n.language === 'ar';

  const flowSteps = [
    {
      id: 1,
      title: t('createGroup'),
      description: isRTL ? 'إنشاء مجموعة جديدة أو الانضمام لمجموعة موجودة' : 'Create a new group or join an existing one',
      icon: Users,
      color: 'bg-blue-500',
      estimatedTime: isRTL ? '5 دقائق' : '5 minutes',
      difficulty: isRTL ? 'سهل' : 'Easy',
      action: () => {
        console.log('Create Group action');
        markStepCompleted(0);
      }
    },
    {
      id: 2,
      title: t('joinGroup'),
      description: isRTL ? 'انضم للمجموعة واختر نوع مشاركتك' : 'Join the group and choose your participation type',
      icon: UserPlus,
      color: 'bg-green-500',
      estimatedTime: isRTL ? '3 دقائق' : '3 minutes',
      difficulty: isRTL ? 'سهل' : 'Easy',
      action: () => {
        console.log('Join Group action');
        markStepCompleted(1);
      }
    },
    {
      id: 3,
      title: t('sendOffer'),
      description: isRTL ? 'أرسل عرضك أو طلبك للمجموعة' : 'Send your offer or request to the group',
      icon: ShoppingCart,
      color: 'bg-purple-500',
      estimatedTime: isRTL ? '10 دقائق' : '10 minutes',
      difficulty: isRTL ? 'متوسط' : 'Medium',
      action: () => {
        console.log('Send Offer action');
        markStepCompleted(2);
      }
    },
    {
      id: 4,
      title: t('uploadProof'),
      description: isRTL ? 'ارفع إثباتات الدفع أو المستندات المطلوبة' : 'Upload payment proofs or required documents',
      icon: Upload,
      color: 'bg-orange-500',
      estimatedTime: isRTL ? '5 دقائق' : '5 minutes',
      difficulty: isRTL ? 'سهل' : 'Easy',
      action: () => {
        console.log('Upload Proof action');
        markStepCompleted(3);
      }
    },
    {
      id: 5,
      title: t('vote'),
      description: isRTL ? 'شارك في التصويت على القرارات المهمة' : 'Participate in voting on important decisions',
      icon: Vote,
      color: 'bg-red-500',
      estimatedTime: isRTL ? '7 دقائق' : '7 minutes',
      difficulty: isRTL ? 'متوسط' : 'Medium',
      action: () => {
        console.log('Vote action');
        markStepCompleted(4);
      }
    },
    {
      id: 6,
      title: t('withdrawEarnings'),
      description: isRTL ? 'اسحب أرباحك أو مستحقاتك المالية' : 'Withdraw your earnings or financial dues',
      icon: Wallet,
      color: 'bg-emerald-500',
      estimatedTime: isRTL ? '3 دقائق' : '3 minutes',
      difficulty: isRTL ? 'سهل' : 'Easy',
      action: () => {
        console.log('Withdraw Earnings action');
        markStepCompleted(5);
      }
    },
    {
      id: 7,
      title: t('startDispute'),
      description: isRTL ? 'ابدأ نزاع في حالة وجود مشكلة' : 'Start a dispute if there\'s an issue',
      icon: MessageSquare,
      color: 'bg-yellow-500',
      estimatedTime: isRTL ? '15 دقيقة' : '15 minutes',
      difficulty: isRTL ? 'صعب' : 'Hard',
      action: () => {
        console.log('Start Dispute action');
        markStepCompleted(6);
      }
    }
  ];

  const markStepCompleted = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const isStepCompleted = (stepIndex: number) => {
    return completedSteps.includes(stepIndex);
  };

  const progressPercentage = (completedSteps.length / flowSteps.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Easy' || difficulty === 'سهل') return 'bg-green-100 text-green-800';
    if (difficulty === 'Medium' || difficulty === 'متوسط') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Target className="h-6 w-6 text-primary" />
            {t('manualFlow')}
          </CardTitle>
          <CardDescription className="text-base">
            {isRTL 
              ? 'دليل شامل لجميع خطوات استخدام المنصة' 
              : 'Complete guide for all platform usage steps'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">
                {isRTL ? 'التقدم الإجمالي' : 'Overall Progress'}
              </span>
              <span className="font-bold text-primary">
                {completedSteps.length}/{flowSteps.length} ({Math.round(progressPercentage)}%)
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Flow Steps */}
      <div className="space-y-4">
        {flowSteps.map((step, index) => {
          const StepIcon = step.icon;
          const isCompleted = isStepCompleted(index);
          const isCurrent = currentStep === index;
          
          return (
            <Card 
              key={step.id} 
              className={`transition-all duration-300 hover:shadow-md ${
                isCurrent 
                  ? 'ring-2 ring-primary shadow-lg' 
                  : isCompleted 
                    ? 'bg-green-50 border-green-200' 
                    : 'hover:shadow-sm'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Step Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-500' 
                      : isCurrent 
                        ? step.color 
                        : 'bg-gray-200'
                  } transition-colors`}>
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-white" />
                    ) : (
                      <StepIcon className={`h-6 w-6 ${
                        isCurrent ? 'text-white' : 'text-gray-500'
                      }`} />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-semibold ${
                        isCurrent ? 'text-primary' : isCompleted ? 'text-green-700' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className={getDifficultyColor(step.difficulty)}
                      >
                        {step.difficulty}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Circle className="h-3 w-3" />
                          {step.estimatedTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isCompleted && (
                          <Button 
                            size="sm" 
                            onClick={() => {
                              setCurrentStep(index);
                              step.action();
                            }}
                            className="flex items-center gap-1"
                          >
                            <PlayCircle className="h-3 w-3" />
                            {isRTL ? 'بدء' : 'Start'}
                          </Button>
                        )}
                        
                        {isCompleted && (
                          <Badge className="bg-green-500 text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {isRTL ? 'مكتمل' : 'Completed'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step Navigator */}
                {isCurrent && (
                  <>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentStep(Math.max(0, index - 1))}
                        disabled={index === 0}
                        className="flex items-center gap-1"
                      >
                        {isRTL ? <ArrowRight className="h-3 w-3" /> : <ArrowLeft className="h-3 w-3" />}
                        {isRTL ? 'السابق' : 'Previous'}
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        {flowSteps.map((_, i) => (
                          <div 
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i === index 
                                ? 'bg-primary' 
                                : isStepCompleted(i) 
                                  ? 'bg-green-500' 
                                  : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentStep(Math.min(flowSteps.length - 1, index + 1))}
                        disabled={index === flowSteps.length - 1}
                        className="flex items-center gap-1"
                      >
                        {isRTL ? 'التالي' : 'Next'}
                        {isRTL ? <ArrowLeft className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              <Users className="h-4 w-4 mr-2" />
              {isRTL ? 'عرض جميع المجموعات' : 'View All Groups'}
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Wallet className="h-4 w-4 mr-2" />
              {isRTL ? 'فتح المحفظة' : 'Open Wallet'}
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <MessageSquare className="h-4 w-4 mr-2" />
              {isRTL ? 'مركز الدعم' : 'Support Center'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManualFlowExplorer;
