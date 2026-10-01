import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS } from '../data/products';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const WHATSAPP_LINK = "https://wa.me/212676050868?text=";

const ProductDetail = () => {
  const { id } = useParams();
  const { t, getProductName, getProductDescription, getProductBenefits, getTagLabel } = useLanguage();
  const { formatPriceWithMAD } = useCurrency();
  const { addItem, items } = useCart();
  const cartCount = items.reduce((n, i) => n + i.quantity, 0);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('500g');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = PRODUCTS.find(p => p.id === id);
    setProduct(found || null);
    if (found?.sizes?.length) setSelectedSize(found.sizes[0].size);
    setLoading(false);
    if (found) {
      document.title = `${found.name_fr || found.name} | Livraison à Marrakech | Miel du Maroc`;
      const m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute('content', `${found.description_fr || found.description} Commandez sur WhatsApp, livraison à domicile à Marrakech, paiement à la livraison.`);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-[#5C5449]">
            {t('products.notFound')}
          </p>
          <Link to="/products" className="inline-flex items-center gap-2 text-[#D4AF37] hover:underline text-sm">
            <ArrowLeft size={16} />
            {t('common.viewAll')}
          </Link>
        </div>
      </div>
    );
  }

  const selectedSizeData = product.sizes?.find(s => s.size === selectedSize) || product.sizes?.[0];
  const currentPrice = selectedSizeData?.price || product.price;
  const currentImage = selectedSizeData?.image || product.image;
  const productName = getProductName(product);
  const questionMessage = encodeURIComponent(`${t('products.questionMsg')} ${productName}`);

  return (
    <div className="min-h-screen pt-24 pb-16" data-testid="product-detail-page">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Back link */}
        <Link to="/products" className="inline-flex items-center gap-2 text-[#5C5449] hover:text-[#D4AF37] transition-colors text-sm tracking-wide mb-8" data-testid="back-to-products">
          <ArrowLeft size={16} />
          {t('common.viewAll')}
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#F7F4EB] aspect-square overflow-hidden"
          >
            {currentImage ? (
              <img
                src={currentImage}
                alt={productName}
                className="w-full h-full object-cover"
                data-testid="product-detail-image"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" data-testid="product-detail-image">
                <div className="text-center text-[#D4AF37]/40">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  <span className="text-sm uppercase tracking-widest">Image Coming Soon</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-3">{getTagLabel(product.tag)}</p>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1713] tracking-tight" data-testid="product-detail-name">
                {productName}
              </h1>
            </div>

            <p className="text-[#5C5449] leading-relaxed" data-testid="product-detail-description">
              {getProductDescription(product)}
            </p>

            {/* Size Selection */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#5C5449] font-medium mb-3">{t('products.selectSize')}</p>
              <div className="flex gap-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size.size)}
                    className={`px-6 py-3 text-sm tracking-wide transition-colors ${
                      selectedSize === size.size
                        ? 'bg-[#1A1713] text-[#FDFBF7]'
                        : 'border border-[#E8E2D2] text-[#5C5449] hover:border-[#D4AF37]'
                    }`}
                    data-testid={`size-${size.size}`}
                  >
                    {size.size} — {formatPriceWithMAD(size.price)}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-3xl font-light tracking-wide text-[#1A1713]" data-testid="product-detail-price">
                {formatPriceWithMAD(currentPrice)}
              </p>
            </div>

            {/* Add to cart (main action), then checkout once something is in the cart */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  addItem(product, selectedSize, currentPrice);
                  toast.success(`${productName} (${selectedSize}) ${t('products.addedToCart')}`);
                }}
                className="w-full bg-[#1A1713] text-[#FDFBF7] px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-[#D4AF37] hover:text-[#1A1713] transition-colors flex items-center justify-center gap-2"
                data-testid="add-to-cart-button"
              >
                <ShoppingBag size={16} />
                {t('products.addToCart')}
              </button>

              {cartCount > 0 && (
                <Link
                  to="/cart"
                  className="w-full border border-[#1A1713] text-[#1A1713] px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-[#1A1713] hover:text-[#FDFBF7] transition-colors flex items-center justify-center gap-2"
                  data-testid="checkout-now-button"
                >
                  {t('products.checkoutNow')}
                  <span className="normal-case tracking-normal font-normal text-xs opacity-80">({cartCount} {t('products.inCart')})</span>
                  <ArrowRight size={16} className="rtl:rotate-180" />
                </Link>
              )}

              <p className="text-sm text-[#5C5449] pt-1">
                {t('products.question')}{' '}
                <a
                  href={`${WHATSAPP_LINK}${questionMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1DA851] font-medium underline underline-offset-4 hover:text-[#25D366]"
                  data-testid="whatsapp-question-link"
                >
                  {t('products.askWhatsApp')}
                </a>
              </p>
            </div>

            {/* Health Benefits */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#5C5449] font-medium mb-4">{t('products.healthBenefits')}</p>
              <ul className="space-y-3">
                {getProductBenefits(product)?.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3" data-testid={`benefit-${index}`}>
                    <Check size={14} className="text-[#D4AF37]" />
                    <span className="text-[#5C5449] text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
