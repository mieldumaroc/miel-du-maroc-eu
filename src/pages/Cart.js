import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Banknote } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

const WHATSAPP_NUMBER = '212676050868';
const CUSTOMER_KEY = 'mdm-customer';
const EMPTY_FORM = { firstName: '', lastName: '', phone: '', address: '', note: '' };

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const QuantityControl = ({ item, updateQuantity }) => (
  <div className="inline-flex items-center border border-[#E8E2D2] bg-[#FDFBF7]">
    <button
      onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
      className="w-8 h-8 flex items-center justify-center text-[#5C5449] hover:text-[#D4AF37] transition-colors"
      aria-label="-"
      data-testid={`checkout-decrease-${item.productId}-${item.size}`}
    >
      <Minus size={12} />
    </button>
    <span className="w-9 text-center text-sm font-medium text-[#1A1713]" data-testid={`checkout-qty-${item.productId}-${item.size}`}>
      {String(item.quantity).padStart(2, '0')}
    </span>
    <button
      onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
      className="w-8 h-8 flex items-center justify-center text-[#5C5449] hover:text-[#D4AF37] transition-colors"
      aria-label="+"
      data-testid={`checkout-increase-${item.productId}-${item.size}`}
    >
      <Plus size={12} />
    </button>
  </div>
);

const Field = ({ id, label, required, error, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-[#1A1713] mb-2">
      {label}{required && <span className="text-[#D4AF37]">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-red-600 mt-1.5" data-testid={`error-${id}`}>{error}</p>}
  </div>
);

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, totalPriceMAD } = useCart();
  const { t, getProductName } = useLanguage();
  const { formatPrice } = useCurrency();

  const [form, setForm] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CUSTOMER_KEY) || 'null');
      return saved ? { ...EMPTY_FORM, ...saved, note: '' } : EMPTY_FORM;
    } catch { return EMPTY_FORM; }
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = 'Panier | Miel du Maroc';
    window.scrollTo(0, 0);
  }, []);

  const itemName = (item) => getProductName({ name: item.name, name_fr: item.name_fr, name_ar: item.name_ar });

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const er = {};
    ['firstName', 'lastName', 'phone', 'address'].forEach((k) => {
      if (!form[k].trim()) er[k] = t('cart.required');
    });
    const digits = form.phone.replace(/\D/g, '');
    if (!er.phone && (digits.length < 9 || digits.length > 15)) er.phone = t('cart.phoneInvalid');
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const buildMessage = () => {
    let msg = `${t('cart.msgHello')}\n\n`;
    items.forEach((item, i) => {
      msg += `${i + 1}. ${itemName(item)} (${item.size}) x${item.quantity} — ${item.price * item.quantity} DH\n`;
    });
    msg += `\n${t('cart.msgSubtotal')}: ${totalPriceMAD} DH + ${t('cart.msgFee')}`;
    msg += `\n(${t('cart.msgPay')})`;
    msg += `\n\n${t('cart.msgName')}: ${form.firstName.trim()} ${form.lastName.trim()}`;
    msg += `\n${t('cart.msgPhone')}: ${form.phone.trim()}`;
    msg += `\n${t('cart.msgAddress')}: ${form.address.trim()}`;
    if (form.note.trim()) msg += `\n${t('cart.msgNote')}: ${form.note.trim()}`;
    msg += `\n\n${t('cart.msgThanks')}`;
    return msg;
  };

  const handleOrder = () => {
    if (!validate()) {
      const first = document.querySelector('[data-invalid="true"]');
      if (first) first.focus();
      return;
    }
    try {
      const { note, ...keep } = form;
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(keep));
    } catch { /* storage unavailable: nothing to remember */ }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`, '_blank');
    toast.success(t('cart.opened'));
  };

  const inputClass = (key) =>
    `w-full px-4 py-3 text-sm text-[#1A1713] bg-[#FAF6EC] border ${errors[key] ? 'border-red-400' : 'border-[#E8E2D2]'} placeholder:text-[#A69E8F] focus:outline-none focus:border-[#D4AF37] focus:bg-[#FDFBF7] transition-colors`;

  // ---------- empty state ----------
  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16" data-testid="checkout-page">
        <div className="max-w-xl mx-auto px-6 text-center" data-testid="checkout-empty">
          <ShoppingBag size={56} className="text-[#E8E2D2] mx-auto mb-6" />
          <h1 className="font-heading text-3xl font-light text-[#1A1713] mb-6">{t('cart.empty')}</h1>
          <Link to="/products" className="inline-block bg-[#1A1713] text-[#FDFBF7] px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-[#D4AF37] transition-colors">
            {t('cart.emptyCta')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20" data-testid="checkout-page">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-[#FDFBF7] border border-[#E8E2D2] p-5 sm:p-8 lg:p-10">
          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl font-medium text-[#1A1713] mb-8">
            {t('cart.titleA')} <span className="text-[#D4AF37]">{t('cart.titleB')}</span>
          </h1>

          {/* Products table */}
          <div className="border border-[#E8E2D2]" data-testid="checkout-table">
            {/* Header row (desktop) */}
            <div className="hidden md:grid grid-cols-[2.4fr_1fr_1.2fr_1fr_40px] items-center gap-4 px-6 py-4 bg-[#F3EAD0] text-sm font-semibold text-[#1A1713]">
              <span>{t('cart.product')}</span>
              <span className="text-center">{t('cart.price')}</span>
              <span className="text-center">{t('cart.quantity')}</span>
              <span className="text-center">{t('cart.subtotal')}</span>
              <span />
            </div>

            <div className="divide-y divide-[#E8E2D2] bg-[#FAF6EC]">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="grid grid-cols-[64px_1fr] md:grid-cols-[2.4fr_1fr_1.2fr_1fr_40px] items-center gap-4 px-4 md:px-6 py-5"
                  data-testid={`checkout-row-${item.productId}-${item.size}`}
                >
                  {/* Product */}
                  <div className="contents md:flex md:items-center md:gap-4">
                    <Link to={`/products/${item.productId}`} className="w-16 h-16 bg-white border border-[#E8E2D2] overflow-hidden flex-shrink-0 row-span-2 md:row-span-1">
                      <img src={item.image} alt={itemName(item)} className="w-full h-full object-cover" />
                    </Link>
                    <div className="min-w-0">
                      <Link to={`/products/${item.productId}`} className="font-heading font-semibold text-[#1A1713] hover:text-[#D4AF37] transition-colors">
                        {itemName(item)}
                      </Link>
                      <p className="text-xs text-[#5C5449] mt-0.5">{item.size}</p>
                      <p className="md:hidden text-sm text-[#5C5449] mt-1">{formatPrice(item.price)}</p>
                    </div>
                  </div>

                  {/* Price (desktop) */}
                  <span className="hidden md:block text-center text-sm text-[#5C5449] whitespace-nowrap">{formatPrice(item.price)}</span>

                  {/* Quantity + subtotal (mobile shares one line) */}
                  <div className="col-start-2 md:col-start-auto flex items-center justify-between md:justify-center gap-3">
                    <QuantityControl item={item} updateQuantity={updateQuantity} />
                    <span className="md:hidden text-sm font-semibold text-[#1A1713] whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
                    <button
                      onClick={() => removeItem(item.productId, item.size)}
                      className="md:hidden p-2 text-[#5C5449] hover:text-red-500 transition-colors"
                      aria-label={t('cart.remove')}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <span className="hidden md:block text-center text-sm font-semibold text-[#1A1713] whitespace-nowrap" data-testid={`checkout-subtotal-${item.productId}-${item.size}`}>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeItem(item.productId, item.size)}
                    className="hidden md:flex p-2 text-[#5C5449] hover:text-red-500 transition-colors justify-center"
                    aria-label={t('cart.remove')}
                    data-testid={`checkout-remove-${item.productId}-${item.size}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions + Totals */}
          <div className="mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm border border-[#E8E2D2] bg-[#FDFBF7] text-[#1A1713] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                data-testid="checkout-continue"
              >
                <ArrowLeft size={14} className="rtl:rotate-180" /> {t('cart.continue')}
              </Link>
              <button
                onClick={clearCart}
                className="px-5 py-2.5 text-sm bg-[#1A1713] text-[#FDFBF7] hover:bg-red-600 transition-colors"
                data-testid="checkout-clear"
              >
                {t('cart.clear')}
              </button>
            </div>

            <div className="w-full md:w-80 border border-[#E8E2D2]" data-testid="checkout-totals">
              <div className="px-5 py-3.5 bg-[#F3EAD0] font-semibold text-[#1A1713]">{t('cart.totals')}</div>
              <div className="bg-[#FAF6EC] px-5">
                <div className="flex justify-between py-3.5 border-b border-[#E8E2D2] text-sm text-[#5C5449]">
                  <span>{t('cart.subtotal')}</span>
                  <span className="text-[#1A1713]">{formatPrice(totalPriceMAD)}</span>
                </div>
                <div className="flex justify-between gap-4 py-3.5 border-b border-[#E8E2D2] text-sm text-[#5C5449]">
                  <span>{t('cart.delivery')}</span>
                  <span className="text-end text-[#1A1713]">{t('cart.deliveryValue')}</span>
                </div>
                <div className="flex justify-between items-baseline py-4">
                  <span className="font-bold text-[#1A1713]">{t('cart.total')}</span>
                  <div className="text-end">
                    <span className="font-heading text-2xl font-semibold text-[#1A1713]" data-testid="checkout-total">{formatPrice(totalPriceMAD)}</span>
                    <p className="text-xs text-[#5C5449]">{t('cart.plusDelivery')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer details */}
          <div className="mt-10 space-y-5" data-testid="checkout-form">
            <h2 className="font-heading text-2xl font-medium text-[#1A1713]">{t('cart.details')}</h2>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field id="firstName" label={t('cart.firstName')} required error={errors.firstName}>
                <input id="firstName" value={form.firstName} onChange={update('firstName')} autoComplete="given-name"
                  className={inputClass('firstName')} data-invalid={!!errors.firstName} data-testid="input-firstName" />
              </Field>
              <Field id="lastName" label={t('cart.lastName')} required error={errors.lastName}>
                <input id="lastName" value={form.lastName} onChange={update('lastName')} autoComplete="family-name"
                  className={inputClass('lastName')} data-invalid={!!errors.lastName} data-testid="input-lastName" />
              </Field>
            </div>

            <Field id="phone" label={t('cart.phone')} required error={errors.phone}>
              <input id="phone" type="tel" dir="ltr" value={form.phone} onChange={update('phone')} autoComplete="tel"
                placeholder={t('cart.phonePh')} className={`${inputClass('phone')} rtl:text-right`} data-invalid={!!errors.phone} data-testid="input-phone" />
            </Field>

            <Field id="address" label={t('cart.address')} required error={errors.address}>
              <input id="address" value={form.address} onChange={update('address')} autoComplete="street-address"
                placeholder={t('cart.addressPh')} className={inputClass('address')} data-invalid={!!errors.address} data-testid="input-address" />
            </Field>

            <Field id="note" label={t('cart.note')}>
              <textarea id="note" rows={2} value={form.note} onChange={update('note')}
                placeholder={t('cart.notePh')} className={`${inputClass('note')} resize-none`} data-testid="input-note" />
            </Field>

            <p className="flex items-center gap-2 text-sm text-[#5C5449]">
              <Banknote size={16} className="text-[#D4AF37] flex-shrink-0" /> {t('cart.cashNote')}
            </p>

            <button
              onClick={handleOrder}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-10 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-[#1DA851] transition-colors"
              data-testid="checkout-order-whatsapp"
            >
              <WhatsAppIcon /> {t('cart.order')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
