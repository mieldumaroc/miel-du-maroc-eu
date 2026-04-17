import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  useEffect(() => {
    document.title = `Miel Artisanal Maroc | Famille Apicultrice depuis 1995 | Atlas`;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', `Famille apicultrice de Marrakech depuis 1995. Miel pur recolte a la main dans les montagnes de l'Atlas, livre directement en Europe.`);
  }, []);

  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-16" data-testid="about-page">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-4">{t('about.subtitle')}</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1713] tracking-tight">
            {t('about.title')}
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1762893134168-840ba7ba2212?crop=entropy&cs=srgb&fm=jpg&w=800&q=80"
              alt="Moroccan landscape"
              className="w-full h-[500px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-[#5C5449] leading-relaxed text-base">
              {t('about.story')}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-[#F7F4EB] border border-[#E8E2D2]">
                <h4 className="font-heading font-medium text-[#1A1713] mb-2">{t('about.tradition')}</h4>
                <p className="text-[#5C5449] text-sm leading-relaxed">{t('about.traditionText')}</p>
              </div>
              <div className="p-6 bg-[#F7F4EB] border border-[#E8E2D2]">
                <h4 className="font-heading font-medium text-[#1A1713] mb-2">{t('about.purity')}</h4>
                <p className="text-[#5C5449] text-sm leading-relaxed">{t('about.purityText')}</p>
              </div>
              <div className="p-6 bg-[#F7F4EB] border border-[#E8E2D2] sm:col-span-2">
                <h4 className="font-heading font-medium text-[#1A1713] mb-2">{t('about.direct')}</h4>
                <p className="text-[#5C5449] text-sm leading-relaxed">{t('about.directText')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
