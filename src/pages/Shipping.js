import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Banknote, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WHATSAPP_NUMBER = '212676050868';

const Shipping = () => {
  useEffect(() => {
    document.title = `Livraison à Domicile à Marrakech | Paiement à la Livraison | Miel du Maroc`;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', `Commandez votre miel pur et votre huile d'olive sur WhatsApp : notre livreur vous les apporte chez vous à Marrakech. Paiement en espèces à la livraison.`);
  }, []);

  const { t } = useLanguage();

  const features = [
    { icon: Truck, title: t('shipping.delivery'), text: t('shipping.deliveryText') },
    { icon: Banknote, title: t('shipping.cash'), text: t('shipping.cashText') },
    { icon: Package, title: t('shipping.packaging'), text: t('shipping.packagingText') },
  ];

  const steps = [1, 2, 3, 4].map(n => ({ n, title: t(`payment.stepTitle${n}`), text: t(`payment.step${n}`) }));

  return (
    <div className="min-h-screen pt-24 pb-16" data-testid="shipping-page">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-4">{t('products.delivery')}</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1713] tracking-tight mb-4">
            {t('shipping.title')}
          </h1>
          <p className="text-[#5C5449] text-base max-w-2xl mx-auto">
            {t('shipping.info')}
          </p>
        </motion.div>

        {/* Key features */}
        <div className="grid sm:grid-cols-3 gap-6 mb-20">
          {features.map((item, index) => (
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

        {/* How it works */}
        <div className="mb-20">
          <h2 className="font-heading text-3xl font-light text-[#1A1713] text-center mb-10">{t('payment.title')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, index) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-[#FDFBF7] border border-[#E8E2D2] p-6 text-center"
                data-testid={`delivery-step-${s.n}`}
              >
                <div className="text-[#D4AF37] font-heading text-4xl font-light mb-3">0{s.n}</div>
                <h3 className="font-heading font-medium text-[#1A1713] mb-2">{s.title}</h3>
                <p className="text-[#5C5449] text-sm leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#F7F4EB] border border-[#E8E2D2] p-8 lg:p-12"
        >
          <h2 className="font-heading text-2xl font-light text-[#1A1713] mb-6 flex items-center gap-3">
            <MapPin size={20} className="text-[#D4AF37]" strokeWidth={1.5} />
            {t('shipping.infoTitle')}
          </h2>
          <div className="space-y-4 text-[#5C5449] text-sm leading-relaxed">
            <p>{t('shipping.countries')}</p>
            <p>{t('shipping.courier')}</p>
            <p>{t('shipping.processing')}</p>
            <p>{t('shipping.inquiries')}</p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-[#25D366] text-white px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-[#1DA851] transition-colors"
            data-testid="shipping-whatsapp"
          >
            {t('products.chatWhatsApp')}
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Shipping;
