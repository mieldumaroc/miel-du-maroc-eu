import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Award, Users, ChevronRight, Banknote, Truck, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { useCurrency } from '../context/CurrencyContext';

const Home = () => {
  useEffect(() => {
    document.title = `Miel Pur et Huile d'Olive à Marrakech | Livraison à Domicile | Miel du Maroc`;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', `Vrai miel pur de l'Atlas et huile d'olive pure, livrés chez vous à Marrakech par notre livreur. Commande sur WhatsApp, paiement à la livraison. Famille apicultrice depuis 1995.`);
  }, []);

  const { t, getProductName } = useLanguage();
  const { formatPrice } = useCurrency();
  const featuredProducts = PRODUCTS.filter(p => p.category !== 'oil').slice(0, 6);
  const oliveOil = PRODUCTS.find(p => p.category === 'oil');

  const whyUsFeatures = [
    { icon: Shield, title: t('whyUs.authenticity'), text: t('whyUs.authenticityText') },
    { icon: Award, title: t('whyUs.therapeutic'), text: t('whyUs.therapeuticText') },
    { icon: Users, title: t('whyUs.familyBusiness'), text: t('whyUs.familyBusinessText') },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center" data-testid="hero-section">
        <div className="absolute inset-0 z-0">
          <img src="/honey-images/hero-bg.png" alt="Moroccan Honey" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1713]/80 via-[#1A1713]/50 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="max-w-2xl space-y-8">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              {t('hero.tagline')}
            </motion.p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight">{t('hero.title')}</h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-lg">{t('hero.subtitle')}</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/products">
                <button className="bg-[#D4AF37] text-[#1A1713] px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-[#B87333] hover:text-white transition-colors duration-300" data-testid="hero-cta-explore">
                  {t('hero.cta')} <ArrowRight className="ml-2 inline" size={16} />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 lg:py-32" data-testid="featured-products-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-4">{t('hero.tagline')}</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1713] tracking-tight">{t('products.title')}</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-16">
            <Link to="/products">
              <button className="border border-[#1A1713] text-[#1A1713] px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-[#1A1713] hover:text-[#FDFBF7] transition-all duration-300" data-testid="view-all-products">
                {t('common.viewAll')} <ChevronRight className="ml-2 inline" size={16} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Olive Oil Highlight */}
      {oliveOil && (
        <section className="py-20 lg:py-24 bg-[#F4F2E6] border-y border-[#E3E0C8]" data-testid="olive-oil-home">
          <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="aspect-square bg-[#FBF8F0] overflow-hidden">
              <img src={oliveOil.image} alt={getProductName(oliveOil)} className="w-full h-full object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="space-y-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#7A8A2E] font-medium">{t('products.oilLabel')}</p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1713] tracking-tight">{t('products.oilTitle')}</h2>
              <p className="text-[#5C5449] leading-relaxed">{t('products.oilSubtitle')}</p>
              <div className="flex flex-wrap gap-3">
                {oliveOil.sizes.map((s) => (
                  <span key={s.size} className="px-5 py-3 border border-[#D9D5B8] bg-[#FDFBF7] text-sm text-[#1A1713]">
                    {s.size} — <span className="font-medium">{formatPrice(s.price)}</span>
                  </span>
                ))}
              </div>
              <Link to={`/products/${oliveOil.id}`} className="inline-block">
                <button className="bg-[#1A1713] text-[#FDFBF7] px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-[#7A8A2E] transition-colors duration-300" data-testid="olive-oil-home-cta">
                  {t('common.orderNow')} <ArrowRight className="ml-2 inline rtl:rotate-180" size={16} />
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-24 lg:py-32 bg-[#F7F4EB]" data-testid="why-us-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-4">{t('products.excellence')}</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1713] tracking-tight">{t('whyUs.title')}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-8">
            {whyUsFeatures.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }} className="text-center p-8 bg-[#FDFBF7] border border-[#E8E2D2] hover:border-[#D4AF37]/30 transition-colors" data-testid={`why-us-feature-${index}`}>
                <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center">
                  <feature.icon size={24} className="text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-medium text-[#1A1713] text-lg mb-3">{feature.title}</h3>
                <p className="text-[#5C5449] text-sm leading-relaxed">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="py-24 lg:py-32" data-testid="how-to-order-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-4">{t('payment.secure')}</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1713] tracking-tight">{t('payment.title')}</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#F7F4EB] border border-[#E8E2D2] p-8 lg:p-12 mb-12">
            <div className="text-center mb-8">
              <p className="text-[#5C5449] text-sm">{t('payment.methodsText')}</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 md:gap-10">
              {[
                { icon: MessageCircle, label: t('payment.stepTitle2') },
                { icon: Truck, label: t('shipping.delivery') },
                { icon: Banknote, label: t('payment.cod') },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#FDFBF7] border border-[#E8E2D2] flex items-center justify-center mb-3">
                    <Icon size={22} className="text-[#D4AF37]" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-[#1A1713] tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: t('payment.stepTitle1'), desc: t('payment.step1') },
              { step: 2, title: t('payment.stepTitle2'), desc: t('payment.step2') },
              { step: 3, title: t('payment.stepTitle3'), desc: t('payment.step3') },
              { step: 4, title: t('payment.stepTitle4'), desc: t('payment.step4') },
            ].map((item, index) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }} className="relative bg-[#FDFBF7] border border-[#E8E2D2] p-8 text-center" data-testid={`order-step-${item.step}`}>
                <div className="text-[#D4AF37] font-heading text-4xl font-light mb-4">0{item.step}</div>
                <h4 className="font-heading font-medium text-[#1A1713] mb-2">{item.title}</h4>
                <p className="text-[#5C5449] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
