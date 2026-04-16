import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { path: '/products', label: t('nav.products') },
    { path: '/about', label: t('nav.about') },
    { path: '/health-benefits', label: t('nav.healthBenefits') },
  ];

  const supportLinks = [
    { path: '/shipping', label: t('nav.shipping') },
    { path: '/faq', label: t('nav.faq') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-[#1A1713] text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <div className="flex items-center">
              <img src="/honey-images/miel-du-maroc-logo.png" alt="Miel du Maroc" className="h-16 object-contain rounded" />
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2 text-stone-400">
              <MapPin size={14} className="text-[#D4AF37]" />
              <span className="text-xs tracking-wide uppercase">Marrakech, Morocco</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-medium tracking-widest uppercase text-[#D4AF37] mb-6">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-stone-400 hover:text-[#D4AF37] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading text-sm font-medium tracking-widest uppercase text-[#D4AF37] mb-6">
              {t('footer.support')}
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-stone-400 hover:text-[#D4AF37] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-heading text-sm font-medium tracking-widest uppercase text-[#D4AF37] mb-6">
              {t('footer.followUs')}
            </h4>
            <div className="space-y-4">
              <a
                href="https://wa.me/212676050868?text=Hello%2C+I+am+interested+in+ordering+Moroccan+honey"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-stone-400 hover:text-[#25D366] transition-colors"
                data-testid="footer-whatsapp"
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#25D366] fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span className="text-sm">+212 676 050 868</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-stone-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-500 text-xs tracking-wide">{t('footer.copyright')}</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-stone-600 tracking-wide uppercase">100% Pure Honey</span>
              <span className="text-xs text-stone-700">|</span>
              <span className="text-xs text-stone-600 tracking-wide uppercase">Direct from Morocco</span>
              <span className="text-xs text-stone-700">|</span>
              <span className="text-xs text-stone-600 tracking-wide uppercase">Since 1995</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
