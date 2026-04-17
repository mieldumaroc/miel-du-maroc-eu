import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Shipping = () => {
  useEffect(() => {
    document.title = `Livraison Miel Maroc France Belgique Pays-Bas Allemagne UK | 7-14 jours`;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', `Livraison de miel pur du Maroc vers toute l'Europe en 7-14 jours. Paiement facile via Wise, Western Union, MoneyGram, Ria, WorldRemit.`);
  }, []);

  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-16" data-testid="shipping-page">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-4">Delivery</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1713] tracking-tight mb-4">
            {t('shipping.title')}
          </h1>
          <p className="text-[#5C5449] text-base max-w-xl mx-auto">
            {t('shipping.info')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8 mb-16">
          {[
            { icon: Package, title: t('shipping.packaging'), text: t('shipping.packagingText') },
            { icon: Clock, title: t('shipping.delivery'), text: t('shipping.deliveryText') },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center p-8 bg-[#F7F4EB] border border-[#E8E2D2]"
              data-testid={`shipping-feature-${index}`}
            >
              <item.icon size={24} className="text-[#D4AF37] mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="font-heading font-medium text-[#1A1713] mb-2">{item.title}</h3>
              <p className="text-[#5C5449] text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#F7F4EB] border border-[#E8E2D2] p-8 lg:p-12"
        >
          <h2 className="font-heading text-2xl font-light text-[#1A1713] mb-6">{t('shipping.infoTitle')}</h2>
          <div className="space-y-4 text-[#5C5449] text-sm leading-relaxed">
            <p>{t('shipping.countries')}</p>
            <p>{t('shipping.courier')}</p>
            <p>{t('shipping.processing')}</p>
            <p>{t('shipping.inquiries')}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Shipping;
