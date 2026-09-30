import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

const HONEYS = PRODUCTS.filter(p => p.category !== 'oil');
const OILS = PRODUCTS.filter(p => p.category === 'oil');

// Filter buttons: translation key -> tag value used in products.js
const TAG_FILTERS = [
  { key: 'all', tag: null },
  { key: 'immunity', tag: 'Immunity' },
  { key: 'respiratory', tag: 'Respiratory' },
  { key: 'digestion', tag: 'Digestion' },
  { key: 'energy', tag: 'Energy' },
  { key: 'calming', tag: 'Calming' },
  { key: 'rare', tag: 'Rare' },
  { key: 'powerful', tag: 'Powerful' },
  { key: 'liverHealth', tag: 'Liver Health' },
  { key: 'generalHealth', tag: 'General Health' },
  { key: 'wellness', tag: 'Wellness' },
  { key: 'warming', tag: 'Warming' },
];

const Products = () => {
  useEffect(() => {
    document.title = `Miel Pur et Huile d'Olive à Marrakech | Livraison à Domicile | Miel du Maroc`;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', `15 variétés de miel pur du Maroc et huile d'olive pure (1 L et 5 L). Commande sur WhatsApp, livraison à domicile à Marrakech, paiement à la livraison.`);
  }, []);

  const { t, getProductName, getTagLabel } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKey, setSelectedKey] = useState('all');

  const search = searchTerm.trim().toLowerCase();
  const matchesSearch = (p) =>
    !search ||
    getProductName(p).toLowerCase().includes(search) ||
    p.name.toLowerCase().includes(search) ||
    getTagLabel(p.tag).toLowerCase().includes(search);

  const activeTag = TAG_FILTERS.find(f => f.key === selectedKey)?.tag;
  const filteredHoneys = HONEYS.filter(p => (!activeTag || p.tag === activeTag) && matchesSearch(p));
  // Olive oil stays visible unless a honey-only category filter is chosen
  const filteredOils = activeTag ? [] : OILS.filter(matchesSearch);

  return (
    <div className="min-h-screen pt-24 pb-16" data-testid="products-page">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-4">{t('products.collection')}</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1713] tracking-tight mb-4">
            {t('products.title')}
          </h1>
          <p className="text-[#5C5449] text-base max-w-xl mx-auto">
            {t('products.subtitle')}
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 transform -translate-y-1/2 text-[#5C5449]" size={16} />
            <input
              placeholder={t('products.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-3 text-sm bg-transparent border border-[#E8E2D2] focus:border-[#D4AF37] focus:outline-none transition-colors"
              data-testid="products-search-input"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {TAG_FILTERS.map(({ key }) => (
              <button
                key={key}
                className={`px-4 py-2 text-xs tracking-wide uppercase transition-colors ${
                  selectedKey === key
                    ? 'bg-[#1A1713] text-[#FDFBF7]'
                    : 'border border-[#E8E2D2] text-[#5C5449] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
                onClick={() => setSelectedKey(key)}
                data-testid={`filter-tag-${key}`}
              >
                {t(`tags.${key}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Honey Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        {filteredHoneys.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {filteredHoneys.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : filteredOils.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#5C5449] text-base">{t('products.noResults')}</p>
          </div>
        ) : null}
      </section>

      {/* Olive Oil Section */}
      {filteredOils.length > 0 && (
        <section id="huile-olive" className="mt-24 py-20 bg-[#F4F2E6] border-y border-[#E3E0C8]" data-testid="olive-oil-section">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#7A8A2E] font-medium mb-4">{t('products.oilLabel')}</p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1713] tracking-tight mb-4">
                {t('products.oilTitle')}
              </h2>
              <p className="text-[#5C5449] text-base max-w-xl mx-auto">{t('products.oilSubtitle')}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 justify-items-center">
              {filteredOils.map((product, index) => (
                <div key={product.id} className="w-full sm:col-start-1 sm:col-span-2 lg:col-start-2 lg:col-span-1 max-w-sm">
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Products;
