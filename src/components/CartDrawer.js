import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';


const CartDrawer = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, totalPriceMAD } = useCart();
  const { language, t } = useLanguage();
  const { formatPriceWithMAD, formatCartTotal } = useCurrency();

  const getItemName = (item) => {
    if (language === 'en') return item.name;
    const key = `name_${language}`;
    return item[key] || item.name_fr || item.name;
  };

  const navigate = useNavigate();

  // The drawer is a quick preview; the full checkout (customer details + WhatsApp) lives on /cart
  const handleCheckout = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={closeCart}
            data-testid="cart-backdrop"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col"
            data-testid="cart-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E2D2]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[#D4AF37]" />
                <h2 className="font-heading text-xl font-medium text-[#1A1713]">
                  {language === 'fr' ? 'Panier' : language === 'ar' ? 'سلة التسوق' : 'Cart'}
                  <span className="ml-2 text-sm text-[#5C5449]">({items.length})</span>
                </h2>
              </div>
              <button onClick={closeCart} className="p-2 text-[#5C5449] hover:text-[#1A1713] transition-colors" data-testid="cart-close-btn">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center" data-testid="cart-empty">
                  <ShoppingBag size={48} className="text-[#E8E2D2] mb-4" />
                  <p className="text-[#5C5449] text-sm">
                    {language === 'fr' ? 'Votre panier est vide' : language === 'ar' ? 'سلة التسوق فارغة' : 'Your cart is empty'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-4 p-4 bg-[#F7F4EB] border border-[#E8E2D2]"
                      data-testid={`cart-item-${item.productId}-${item.size}`}
                    >
                      {/* Image */}
                      <div className="w-20 h-20 flex-shrink-0 bg-white overflow-hidden">
                        <img src={item.image} alt={getItemName(item)} className="w-full h-full object-cover" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-medium text-[#1A1713] text-sm truncate">{getItemName(item)}</h4>
                        <p className="text-xs text-[#5C5449] mt-0.5">{item.size}</p>
                        <p className="text-sm font-medium text-[#1A1713] mt-1">{formatPriceWithMAD(item.price)}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center border border-[#E8E2D2] text-[#5C5449] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                            data-testid={`cart-decrease-${item.productId}-${item.size}`}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium text-[#1A1713] w-6 text-center" data-testid={`cart-qty-${item.productId}-${item.size}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center border border-[#E8E2D2] text-[#5C5449] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                            data-testid={`cart-increase-${item.productId}-${item.size}`}
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.productId, item.size)}
                            className="ml-auto p-1 text-[#5C5449] hover:text-red-500 transition-colors"
                            data-testid={`cart-remove-${item.productId}-${item.size}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Clear Cart */}
                  <button
                    onClick={clearCart}
                    className="text-xs text-[#5C5449] hover:text-red-500 transition-colors tracking-wide uppercase"
                    data-testid="cart-clear-btn"
                  >
                    {language === 'fr' ? 'Vider le panier' : language === 'ar' ? 'إفراغ السلة' : 'Clear cart'}
                  </button>
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="border-t border-[#E8E2D2] px-6 py-5 space-y-4">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#5C5449] uppercase tracking-wide">
                      {language === 'ar' ? 'المجموع' : 'Total'}
                    </span>
                    <span className="font-heading text-2xl font-medium text-[#1A1713]" data-testid="cart-total">
                      {formatCartTotal(totalPriceMAD)}
                    </span>
                  </div>
                  <p className="text-end text-sm text-[#5C5449] mt-1" data-testid="cart-delivery-fee">
                    {language === 'fr' ? '+ frais de livraison' : language === 'ar' ? '+ رسوم التوصيل' : '+ delivery fee'}
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#1A1713] text-[#FDFBF7] py-4 text-sm font-medium tracking-wide uppercase hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2"
                  data-testid="cart-checkout-whatsapp"
                >
                  <ArrowRight size={16} className="rtl:rotate-180" />
                  {t('cart.checkout')}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
