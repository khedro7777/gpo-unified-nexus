
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Folder, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface TreeItemProps {
  label: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
}

const TreeItem: React.FC<TreeItemProps> = ({ label, icon, children, href }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = Boolean(children);

  const handleToggle = (e: React.MouseEvent) => {
    if (!href) {
      e.preventDefault();
    }
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="text-sm">
      <div
        onClick={handleToggle}
        className={cn(
          "flex items-center gap-2 py-1 px-2 rounded-md hover:bg-accent",
          href && "cursor-pointer"
        )}
      >
        {hasChildren ? (
          <div className="w-4 h-4 flex items-center justify-center">
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </div>
        ) : (
          <div className="w-4" />
        )}
        {icon || (hasChildren ? <Folder size={16} /> : <File size={16} />)}
        <span className="truncate">
          {href ? (
            <Link to={href} className="hover:text-primary">
              {label}
            </Link>
          ) : (
            label
          )}
        </span>
      </div>
      {hasChildren && isOpen && <div className="ml-6 mt-1">{children}</div>}
    </div>
  );
};

const ManualFlowExplorer: React.FC = () => {
  return (
    <div className="p-4 h-full overflow-auto">
      <h3 className="font-medium mb-4 text-lg">مسارات النظام</h3>
      
      <div className="space-y-2">
        <TreeItem label="إنشاء المجموعات" icon={<Folder size={16} />}>
          <TreeItem label="إنشاء مجموعة شراء" href="/create-group/buying" />
          <TreeItem label="إنشاء مجموعة تسويق" href="/create-group/marketing" />
          <TreeItem label="إنشاء مجموعة تأسيس" href="/create-group/formation" />
          <TreeItem label="إنشاء مجموعة مستقلين" href="/create-group/freelancers" />
        </TreeItem>
        
        <TreeItem label="الانضمام للمجموعات" icon={<Folder size={16} />}>
          <TreeItem label="الانضمام كعضو" href="/join-group/member" />
          <TreeItem label="الانضمام كمورد" href="/join-group/supplier" />
          <TreeItem label="الانضمام كمستقل" href="/join-group/freelancer" />
        </TreeItem>
        
        <TreeItem label="إدارة العروض" icon={<Folder size={16} />}>
          <TreeItem label="إرسال عرض" href="/offers/send" />
          <TreeItem label="مراجعة العروض" href="/offers/review" />
          <TreeItem label="التصويت على العروض" href="/offers/vote" />
        </TreeItem>
        
        <TreeItem label="المدفوعات" icon={<Folder size={16} />}>
          <TreeItem label="رفع إثبات الدفع" href="/payments/upload-proof" />
          <TreeItem label="سحب الأرباح" href="/payments/withdraw" />
          <TreeItem label="إنشاء فاتورة" href="/payments/create-invoice" />
        </TreeItem>
        
        <TreeItem label="العقود" icon={<Folder size={16} />}>
          <TreeItem label="إنشاء عقد" href="/contracts/create" />
          <TreeItem label="مراجعة عقد" href="/contracts/review" />
          <TreeItem label="توقيع عقد" href="/contracts/sign" />
        </TreeItem>
        
        <TreeItem label="النزاعات" icon={<Folder size={16} />}>
          <TreeItem label="بدء نزاع" href="/disputes/create" />
          <TreeItem label="رفع أدلة" href="/disputes/upload-evidence" />
          <TreeItem label="متابعة نزاع" href="/disputes/track" />
        </TreeItem>
      </div>
    </div>
  );
};

export default ManualFlowExplorer;
