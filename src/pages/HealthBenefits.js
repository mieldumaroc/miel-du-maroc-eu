import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { PRODUCTS } from '../data/products';

const HealthBenefits = () => {
  useEffect(() => {
    document.title = `Bienfaits Miel Pur Maroc | Origan Thym Nigelle Therapeutique`;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', `Decouvrez les bienfaits du vrai miel pur marocain: miel d'origan antibacterien, thym respiratoire, nigelle immunitaire, romarin foie, capre antioxydant.`);
  }, []);

  const { t, language, getProductName } = useLanguage();
  const { formatPriceWithMAD } = useCurrency();

  const getBenefits = (product) => {
    const key = language === 'en' ? 'health_benefits' : `health_benefits_${language}`;
    return product[key] || product.health_benefits;
  };

  return (
    <div className="min-h-screen pt-24 pb-16" data-testid="health-benefits-page">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-4">{t('wellness')}</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1713] tracking-tight mb-4">
            {t('benefits.title')}
          </h1>
          <p className="text-[#5C5449] text-base max-w-xl mx-auto">
            {t('benefits.subtitle')}
          </p>
        </motion.div>

        {/* Comparison Table */}
        <div className="overflow-x-auto mb-16">
          <table className="w-full" data-testid="benefits-table">
            <thead>
              <tr className="border-b border-[#E8E2D2]">
                <th className="px-6 py-4 text-left font-heading font-medium text-[#1A1713] text-sm tracking-wide">{t('tableHoney')}</th>
                <th className="px-6 py-4 text-left font-heading font-medium text-[#1A1713] text-sm tracking-wide">{t('tableCategory')}</th>
                <th className="px-6 py-4 text-left font-heading font-medium text-[#1A1713] text-sm tracking-wide">{t('tableBenefits')}</th>
                <th className="px-6 py-4 text-left font-heading font-medium text-[#1A1713] text-sm tracking-wide">{t('tablePrice')}</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-[#E8E2D2]/50 hover:bg-[#F7F4EB] transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link to={`/products/${product.id}`} className="font-medium text-[#1A1713] hover:text-[#D4AF37] transition-colors text-sm">
                      {getProductName(product)}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs uppercase tracking-wide text-[#D4AF37]">{t(`tags.${product.tag === 'Liver Health' ? 'liverHealth' : product.tag === 'General Health' ? 'generalHealth' : product.tag.toLowerCase()}`)}</span>
                  </td>
                  <td className="px-6 py-4 text-[#5C5449] text-sm">
                    {getBenefits(product)?.slice(0, 2).join(', ')}
                  </td>
                  <td className="px-6 py-4 font-medium text-[#1A1713] text-sm">{formatPriceWithMAD(product.price)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HealthBenefits;
