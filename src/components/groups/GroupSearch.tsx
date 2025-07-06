
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, MapPin, Building, Users, Clock } from 'lucide-react';

interface SearchFilters {
  gateway: string;
  country: string;
  sector: string;
  status: string;
  search: string;
}

interface GroupSearchProps {
  onFiltersChange: (filters: SearchFilters) => void;
  totalGroups: number;
}

const GroupSearch: React.FC<GroupSearchProps> = ({ onFiltersChange, totalGroups }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    gateway: '',
    country: '',
    sector: '',
    status: '',
    search: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const gateways = [
    { value: 'buying', label: 'الشراء التعاوني' },
    { value: 'marketing', label: 'التسويق التعاوني' },
    { value: 'freelancers', label: 'المستقلون' },
    { value: 'suppliers', label: 'الموردون' },
    { value: 'formation', label: 'تأسيس الشركات' },
    { value: 'investment', label: 'الاستثمار' },
    { value: 'arbitration', label: 'التحكيم' }
  ];

  const countries = [
    'السعودية',
    'الإمارات',
    'الكويت',
    'قطر',
    'البحرين',
    'عمان',
    'الأردن',
    'مصر',
    'المغرب',
    'تونس'
  ];

  const sectors = [
    'تكنولوجيا',
    'تجارة إلكترونية',
    'صحة وطب',
    'تعليم',
    'عقارات',
    'سياحة',
    'مالية',
    'صناعة',
    'خدمات',
    'أخرى'
  ];

  const statuses = [
    { value: 'founding', label: 'تأسيس' },
    { value: 'active', label: 'نشط' },
    { value: 'negotiation', label: 'تفاوض' },
    { value: 'voting', label: 'تصويت' },
    { value: 'completed', label: 'مكتمل' }
  ];

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilter = (key: keyof SearchFilters) => {
    handleFilterChange(key, '');
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      gateway: '',
      country: '',
      sector: '',
      status: '',
      search: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ابحث في المجموعات..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pr-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                فلترة متقدمة
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
              
              {getActiveFiltersCount() > 0 && (
                <Button variant="outline" onClick={clearAllFilters}>
                  <X className="h-4 w-4 mr-2" />
                  مسح الكل
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showAdvanced && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">البوابة</label>
                <Select value={filters.gateway} onValueChange={(value) => handleFilterChange('gateway', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر البوابة" />
                  </SelectTrigger>
                  <SelectContent>
                    {gateways.map((gateway) => (
                      <SelectItem key={gateway.value} value={gateway.value}>
                        {gateway.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الدولة</label>
                <Select value={filters.country} onValueChange={(value) => handleFilterChange('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدولة" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">القطاع</label>
                <Select value={filters.sector} onValueChange={(value) => handleFilterChange('sector', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القطاع" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الحالة</label>
                <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.gateway && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {gateways.find(g => g.value === filters.gateway)?.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => clearFilter('gateway')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {filters.country && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {filters.country}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => clearFilter('country')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {filters.sector && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Building className="h-3 w-3" />
              {filters.sector}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => clearFilter('sector')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {filters.status && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {statuses.find(s => s.value === filters.status)?.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => clearFilter('status')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          تم العثور على {totalGroups} مجموعة
        </p>
      </div>
    </div>
  );
};

export default GroupSearch;
