import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

const ProductCard = ({ product, index = 0 }) => {
  const { getProductName, t } = useLanguage();
  const { formatPriceWithMAD } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group"
      data-testid={`product-card-${product.id}`}
    >
      <Link to={`/products/${product.id}`}>
        {/* Image */}
        <div className="relative overflow-hidden bg-[#F7F4EB] mb-4 aspect-square">
          {product.image ? (
            <img
              src={product.image}
              alt={getProductName(product)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-[#D4AF37]/40">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                <span className="text-xs uppercase tracking-widest">Coming Soon</span>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-2">
          <h3 className="font-heading text-lg font-medium text-[#1A1713] group-hover:text-[#D4AF37] transition-colors">
            {getProductName(product)}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-[#5C5449] text-sm">
              {t('products.from')} <span className="font-medium text-[#1A1713]">{formatPriceWithMAD(product.price)}</span>
            </p>
            <ArrowRight size={16} className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
