
import React, { useState } from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Store, Search, Filter, MapPin, Star, Package, 
  TrendingUp, Users, CheckCircle, Clock, MessageSquare,
  Eye, Plus, FileText, Award, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Suppliers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [activeTab, setActiveTab] = useState('browse');

  // Mock suppliers data
  const suppliers = [
    {
      id: 1,
      name: 'شركة التقنية المتقدمة',
      category: 'تكنولوجيا',
      country: 'السعودية',
      city: 'الرياض',
      rating: 4.8,
      completedOrders: 156,
      responseTime: '2 ساعات',
      verified: true,
      specialties: ['هواتف ذكية', 'أجهزة لوحية', 'إكسسوارات'],
      priceRange: '$$',
      description: 'متخصصون في توريد الأجهزة الذكية والتقنية الحديثة بأفضل الأسعار',
      activeGroups: 3,
      totalSavings: 45000
    },
    {
      id: 2,
      name: 'مؤسسة الإلكترونيات الحديثة',
      category: 'إلكترونيات',
      country: 'الإمارات',
      city: 'دبي',
      rating: 4.6,
      completedOrders: 203,
      responseTime: '4 ساعات',
      verified: true,
      specialties: ['أجهزة منزلية', 'إلكترونيات', 'صوتيات'],
      priceRange: '$$$',
      description: 'موردين معتمدين للأجهزة الإلكترونية والمنزلية عالية الجودة',
      activeGroups: 5,
      totalSavings: 67000
    },
    {
      id: 3,
      name: 'شركة المواد الغذائية الطبيعية',
      category: 'أغذية',
      country: 'مصر',
      city: 'القاهرة',
      rating: 4.7,
      completedOrders: 89,
      responseTime: '1 يوم',
      verified: false,
      specialties: ['أغذية عضوية', 'منتجات طبيعية', 'مكملات'],
      priceRange: '$$',
      description: 'متخصصون في المواد الغذائية الطبيعية والعضوية',
      activeGroups: 2,
      totalSavings: 23000
    }
  ];

  // Mock active RFQs
  const activeRFQs = [
    {
      id: 1,
      title: 'طلب شراء 100 هاتف ذكي',
      group: 'مجموعة التقنية المتقدمة',
      budget: '150,000 ريال',
      deadline: '2024-01-15',
      offers: 8,
      category: 'تكنولوجيا'
    },
    {
      id: 2,
      title: 'معدات مكتبية للشركات الناشئة',
      group: 'تحالف الشركات الصغيرة',
      budget: '75,000 ريال',
      deadline: '2024-01-20',
      offers: 5,
      category: 'مكاتب'
    },
    {
      id: 3,
      title: 'منتجات غذائية عضوية',
      group: 'مجموعة الصحة والعافية',
      budget: '50,000 ريال',
      deadline: '2024-01-18',
      offers: 12,
      category: 'أغذية'
    }
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.specialties.some(s => s.includes(searchQuery));
    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
    const matchesCountry = selectedCountry === 'all' || supplier.country === selectedCountry;
    
    return matchesSearch && matchesCategory && matchesCountry;
  });

  return (
    <NewMainLayout>
      <div className="space-y-8" dir="rtl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Store className="h-8 w-8 text-primary" />
              شبكة الموردين الذكية
            </h1>
            <p className="text-gray-600 mt-1">
              اكتشف وتواصل مع أفضل الموردين المعتمدين في المنطقة
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/suppliers/register">
                <Plus className="h-4 w-4 ml-2" />
                تسجيل كمورد
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/support">
                <MessageSquare className="h-4 w-4 ml-2" />
                المساعدة
              </Link>
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="ابحث عن موردين، منتجات، أو خدمات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
              <div className="flex gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="اختر القطاع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع القطاعات</SelectItem>
                    <SelectItem value="تكنولوجيا">تكنولوجيا</SelectItem>
                    <SelectItem value="إلكترونيات">إلكترونيات</SelectItem>
                    <SelectItem value="أغذية">أغذية</SelectItem>
                    <SelectItem value="مكاتب">مكاتب</SelectItem>
                    <SelectItem value="طبية">طبية</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="اختر الدولة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الدول</SelectItem>
                    <SelectItem value="السعودية">السعودية</SelectItem>
                    <SelectItem value="الإمارات">الإمارات</SelectItem>
                    <SelectItem value="مصر">مصر</SelectItem>
                    <SelectItem value="الكويت">الكويت</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">تصفح الموردين</TabsTrigger>
            <TabsTrigger value="rfqs">طلبات الشراء النشطة</TabsTrigger>
            <TabsTrigger value="my-suppliers">موردينا المفضلون</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSuppliers.map((supplier) => (
                <Card key={supplier.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-500 rounded-lg flex items-center justify-center text-white">
                          <Store className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{supplier.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{supplier.city}, {supplier.country}</span>
                          </div>
                        </div>
                      </div>
                      {supplier.verified && (
                        <Badge className="bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 ml-1" />
                          معتمد
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{supplier.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{supplier.rating}</span>
                        <span className="text-sm text-gray-600">({supplier.completedOrders} طلب)</span>
                      </div>
                      <Badge variant="outline">{supplier.category}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">زمن الاستجابة:</span>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-green-500" />
                          <span className="font-medium">{supplier.responseTime}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">مجموعات نشطة:</span>
                        <div className="flex items-center gap-1 mt-1">
                          <Users className="h-3 w-3 text-blue-500" />
                          <span className="font-medium">{supplier.activeGroups}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {supplier.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1" asChild>
                        <Link to={`/suppliers/${supplier.id}`}>
                          <Eye className="h-4 w-4 ml-1" />
                          عرض الملف
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/suppliers/${supplier.id}/contact`}>
                          <MessageSquare className="h-4 w-4 ml-1" />
                          تواصل
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rfqs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeRFQs.map((rfq) => (
                <Card key={rfq.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{rfq.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {rfq.group}
                        </CardDescription>
                      </div>
                      <Badge>{rfq.category}</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">الميزانية:</span>
                        <p className="font-semibold text-green-600">{rfq.budget}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">الموعد النهائي:</span>
                        <p className="font-semibold text-red-600">{rfq.deadline}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{rfq.offers} عرض مقدم</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/rfq/${rfq.id}`}>
                            <Eye className="h-4 w-4 ml-1" />
                            التفاصيل
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link to={`/rfq/${rfq.id}/submit-offer`}>
                            تقديم عرض
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-suppliers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>موردينا المفضلون</CardTitle>
                <CardDescription>
                  الموردون الذين تتعامل معهم بانتظام
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Store className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">لا توجد موردون مفضلون بعد</h3>
                  <p className="text-gray-600 mb-6">
                    ابدأ بالتعامل مع الموردين وأضفهم إلى قائمة المفضلين
                  </p>
                  <Button asChild>
                    <Link to="/suppliers?tab=browse">
                      استكشف الموردين
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default Suppliers;
