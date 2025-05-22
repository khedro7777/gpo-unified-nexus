
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const VotingAlert: React.FC = () => {
  return (
    <div className="bg-amber-50 border border-amber-200 p-4 rounded-md flex gap-3 items-start">
      <AlertTriangle className="text-amber-500 mt-1" size={18} />
      <div>
        <p className="text-sm font-medium text-amber-800">تنبيه مهم</p>
        <p className="text-xs text-amber-700">
          تتطلب المشاركة في التصويت امتلاك ما لا يقل عن 100 رمز GPO. تحقق من رصيدك قبل المشاركة.
        </p>
      </div>
    </div>
  );
};

export default VotingAlert;
