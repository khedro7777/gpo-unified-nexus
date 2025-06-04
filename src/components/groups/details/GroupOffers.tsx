
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Clock, Star, Plus } from 'lucide-react';

interface Offer {
  id: number;
  supplier: string;
  product: string;
  price: number;
  discount: string;
  delivery: string;
  rating: number;
  status: string;
}

interface GroupOffersProps {
  offers: Offer[];
}

const GroupOffers: React.FC<GroupOffersProps> = ({ offers }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{isRTL ? 'عروض الموردين' : 'Supplier Offers'}</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          {isRTL ? 'طلب عرض' : 'Request Offer'}
        </Button>
      </div>
      
      <div className="grid gap-4">
        {offers.map((offer) => (
          <Card key={offer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{offer.supplier}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{offer.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{offer.product}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      ${offer.price.toLocaleString()}
                    </span>
                    <span className="text-green-600 font-medium">{offer.discount} {isRTL ? 'خصم' : 'discount'}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {offer.delivery}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={offer.status === 'pending' ? 'default' : 'secondary'}>
                    {offer.status === 'pending' ? (isRTL ? 'قيد المراجعة' : 'Pending') : (isRTL ? 'تفاوض' : 'Negotiating')}
                  </Badge>
                  <Button size="sm" variant="outline">
                    {isRTL ? 'عرض التفاصيل' : 'View Details'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GroupOffers;
