import React from 'react';
import { Banknote, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// "Cash on delivery · Delivery all over Morocco", shown next to prices.
const TrustLine = ({ size = 'sm' }) => {
  const { t } = useLanguage();
  const text = size === 'xs' ? 'text-[11px] sm:text-xs' : 'text-sm';
  const icon = size === 'xs' ? 13 : 16;
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[#5C5449] ${text}`} data-testid="trust-line">
      <span className="inline-flex items-center gap-1.5"><Banknote size={icon} className="text-[#B8962E] shrink-0" />{t('products.trustCod')}</span>
      <span className="text-[#D4AF37]" aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1.5"><Truck size={icon} className="text-[#B8962E] shrink-0" />{t('products.trustDelivery')}</span>
    </p>
  );
};

export default TrustLine;
