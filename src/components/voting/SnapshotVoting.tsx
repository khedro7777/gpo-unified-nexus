
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Vote, Timer, Check, Code, FileJson, CloudUpload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface VoteOption {
  id: string;
  title: string;
  votes: number;
}

interface SnapshotVotingProps {
  proposalId: string;
  title: string;
  description: string;
  options: VoteOption[];
  deadline: string;
  spaceId: string;
  ipfsHash?: string;
  totalVotes: number;
  onVote?: (optionId: string) => void;
  verifiable?: boolean;
}

const SnapshotVoting: React.FC<SnapshotVotingProps> = ({
  proposalId,
  title,
  description,
  options,
  deadline,
  spaceId,
  ipfsHash,
  totalVotes,
  onVote,
  verifiable = true
}) => {
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const handleVote = () => {
    if (!selectedOption) {
      toast({
        title: "اختيار مطلوب",
        description: "يرجى اختيار أحد الخيارات قبل التصويت",
        variant: "destructive"
      });
      return;
    }
    
    if (onVote) {
      onVote(selectedOption);
    }
    
    toast({
      title: "تم التصويت بنجاح",
      description: "تم تسجيل صوتك وتخزينه بشكل لامركزي",
    });
  };

  const handleVerify = () => {
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setShowVerification(true);
      
      toast({
        title: "تم التحقق بنجاح",
        description: "تم التحقق من نتائج التصويت على IPFS",
      });
    }, 2000);
  };
  
  const handleExportJSON = () => {
    // Create a sample result object
    const results = {
      proposalId,
      spaceId,
      ipfsHash: ipfsHash || "QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx",
      title,
      options: options.map(opt => ({
        id: opt.id,
        title: opt.title,
        votes: opt.votes,
        percentage: (opt.votes / totalVotes * 100).toFixed(2)
      })),
      totalVotes,
      deadline,
      timestamp: new Date().toISOString()
    };
    
    // Convert to JSON string with pretty formatting
    const jsonString = JSON.stringify(results, null, 2);
    
    // Create a blob and download it
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `snapshot-results-${proposalId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير نتائج التصويت بصيغة JSON"
    });
  };
  
  // Calculate time remaining until deadline
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const timeRemaining = deadlineDate.getTime() - now.getTime();
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">{title}</CardTitle>
              {verifiable && (
                <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                  قابل للتحقق
                </Badge>
              )}
            </div>
            <CardDescription className="flex gap-2 items-center">
              <span>التصويت #{proposalId}</span>
              <span>•</span>
              <span>Space: {spaceId}</span>
              {ipfsHash && (
                <>
                  <span>•</span>
                  <span className="flex items-center">
                    <Code className="h-3 w-3 mr-1" />
                    {ipfsHash.substring(0, 8)}...{ipfsHash.substring(ipfsHash.length - 6)}
                  </span>
                </>
              )}
            </CardDescription>
          </div>
          <div className="flex items-center text-sm bg-muted px-3 py-1 rounded-md">
            <Timer className="h-4 w-4 mr-2" />
            {daysRemaining > 0 ? (
              <span>متبقي {daysRemaining} يوم{daysRemaining !== 1 ? '' : ''} و {hoursRemaining} ساعة</span>
            ) : (
              hoursRemaining > 0 ? (
                <span>متبقي {hoursRemaining} ساعة</span>
              ) : (
                <span className="text-destructive">انتهى التصويت</span>
              )
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-muted-foreground">{description}</p>
        
        <div className="space-y-4">
          {options.map((option) => (
            <div 
              key={option.id} 
              className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                selectedOption === option.id ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground'
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border mr-2 ${
                    selectedOption === option.id ? 'bg-primary border-primary' : 'border-muted-foreground'
                  }`}></div>
                  <h4 className="font-medium">{option.title}</h4>
                </div>
                <span className="text-sm">{option.votes} صوت ({((option.votes / totalVotes) * 100).toFixed(1)}%)</span>
              </div>
              <Progress 
                value={(option.votes / totalVotes) * 100} 
                className="h-2 mt-2" 
              />
            </div>
          ))}
          
          <div className="flex flex-col sm:flex-row gap-2 mt-6">
            <Button 
              className="flex-1" 
              disabled={!selectedOption || daysRemaining < 0 && hoursRemaining < 0}
              onClick={handleVote}
            >
              <Vote className="mr-2 h-4 w-4" />
              تأكيد التصويت
            </Button>
            
            {verifiable && (
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleVerify}
                disabled={isVerifying}
              >
                <Check className="mr-2 h-4 w-4" />
                {isVerifying ? 'جاري التحقق...' : 'التحقق من النتائج'}
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleExportJSON}
            >
              <FileJson className="mr-2 h-4 w-4" />
              تصدير النتائج (JSON)
            </Button>
          </div>
        </div>
        
        {showVerification && (
          <div className="mt-6 p-4 border rounded-lg bg-muted/30">
            <h4 className="font-medium mb-2 flex items-center text-green-600">
              <Check className="h-4 w-4 mr-2" />
              تم التحقق من صحة التصويت
            </h4>
            <div className="text-sm space-y-2">
              <p><span className="font-medium">IPFS CID:</span> {ipfsHash || "QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx"}</p>
              <p><span className="font-medium">Snapshot Space:</span> {spaceId}</p>
              <p><span className="font-medium">تاريخ التحقق:</span> {new Date().toLocaleString('ar')}</p>
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" className="flex items-center text-xs">
                  <CloudUpload className="h-3 w-3 mr-1" />
                  عرض على IPFS
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground border-t pt-4">
        <span>تم إنشاؤه بواسطة Snapshot.js</span>
        <span>{totalVotes} صوت حتى الآن</span>
      </CardFooter>
    </Card>
  );
};

export default SnapshotVoting;
