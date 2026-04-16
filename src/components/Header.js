import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, changeLanguage, t } = useLanguage();
  const { setCurrencyFromLanguage } = useCurrency();
  const { totalItems, openCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setCurrencyFromLanguage(lang);
  };

  // Set currency on mount
  useEffect(() => {
    setCurrencyFromLanguage(language);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/products', label: t('nav.products') },
    { path: '/about', label: t('nav.about') },
    { path: '/health-benefits', label: t('nav.healthBenefits') },
    { path: '/shipping', label: t('nav.shipping') },
    { path: '/faq', label: t('nav.faq') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FDFBF7]/95 backdrop-blur-xl border-b border-[#D4AF37]/10 shadow-sm'
          : 'bg-[#FDFBF7]/80 backdrop-blur-md'
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-testid="logo-link">
            <img src="/honey-images/miel-du-maroc-logo.png" alt="Miel du Maroc" className="h-16 object-contain rounded" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.path.replace('/', '') || 'home'}`}
                className={`px-3 py-2 text-xs font-medium tracking-wide uppercase transition-colors ${
                  isActive(link.path)
                    ? 'text-[#D4AF37]'
                    : 'text-[#5C5449] hover:text-[#D4AF37]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger
                className="w-[100px] h-9 text-xs border-[#E8E2D2] bg-transparent tracking-wide"
                data-testid="language-selector"
              >
                <SelectValue>
                  {LANGUAGES.find(l => l.code === language)?.flag} {language.toUpperCase()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} data-testid={`lang-${lang.code}`}>
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-[#5C5449] hover:text-[#D4AF37] transition-colors"
              data-testid="cart-button"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#D4AF37] text-[#1A1713] text-[10px] font-bold rounded-full flex items-center justify-center" data-testid="cart-badge">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1A1713] hover:text-[#D4AF37] transition-colors"
              data-testid="mobile-menu-button"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FDFBF7] border-b border-[#E8E2D2]"
          >
            <nav className="max-w-7xl mx-auto px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-nav-${link.path.replace('/', '') || 'home'}`}
                  className={`block px-4 py-3 text-sm font-medium tracking-wide uppercase transition-colors ${
                    isActive(link.path)
                      ? 'text-[#D4AF37]'
                      : 'text-[#5C5449] hover:text-[#D4AF37]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
