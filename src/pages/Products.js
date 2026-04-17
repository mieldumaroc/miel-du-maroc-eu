import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

const Products = () => {
  useEffect(() => {
    document.title = `Acheter Miel Pur Maroc en Ligne | Origan Thym Nigelle Capre Romarin`;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', `Achetez nos 13 varietes de miel pur du Maroc: miel d'origan, thym, nigelle, capre, romarin sauvage, jujubier, eucalyptus. Livraison Europe.`);
  }, []);

  const { t, getProductName } = useLanguage();
  const { formatPrice } = useCurrency();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [loading, setLoading] = useState(true);

  const tags = ['All', 'Immunity', 'Respiratory', 'Digestion', 'Energy', 'Calming', 'Rare', 'Liver Health', 'General Health', 'Wellness', 'Warming'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedTag, products]);

  const fetchProducts = () => {
    setProducts(PRODUCTS);
    setFilteredProducts(PRODUCTS);
    setLoading(false);
  };

  const filterProducts = () => {
    let filtered = products;
    if (selectedTag !== 'All') {
      filtered = filtered.filter(p => p.tag === selectedTag);
    }
    if (searchTerm) {
      filtered = filtered.filter(p =>
        getProductName(p).toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  };

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
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-4">Collection</p>
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
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5C5449]" size={16} />
            <input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm bg-transparent border border-[#E8E2D2] focus:border-[#D4AF37] focus:outline-none transition-colors"
              data-testid="products-search-input"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`px-4 py-2 text-xs tracking-wide uppercase transition-colors ${
                  selectedTag === tag
                    ? 'bg-[#1A1713] text-[#FDFBF7]'
                    : 'border border-[#E8E2D2] text-[#5C5449] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
                onClick={() => setSelectedTag(tag)}
                data-testid={`filter-tag-${tag.toLowerCase().replace(' ', '-')}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-[#F7F4EB] animate-pulse"></div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#5C5449] text-base">No products found.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
