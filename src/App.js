import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LanguageProvider } from './context/LanguageContext';
import { useLanguage } from './context/LanguageContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import './App.css';
import { splitLang } from './i18n/paths';
import { metaFor, langPath, SITE_URL, SEO_LANGS, OG_LOCALE } from './seo/meta';
import { PRODUCTS, BLOG_POSTS } from './data/products';

const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));
const HealthBenefits = lazy(() => import('./pages/HealthBenefits'));
const Shipping = lazy(() => import('./pages/Shipping'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Cart = lazy(() => import('./pages/Cart'));


function RTLHandler() {
  const { language } = useLanguage();
  React.useEffect(() => {
    const isRTL = language === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function setTag(selector, create, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) { el = create(); document.head.appendChild(el); }
  el.setAttribute(attr, value);
}

// Title, description, canonical and language alternates for the page being shown,
// in the visitor's language. The same values are written into the HTML at build time.
function RouteSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const { lang, path: rawPath } = splitLang(pathname);
    const path = rawPath !== '/' ? rawPath.replace(/\/$/, '') : '/';
    const meta = metaFor(path, lang, PRODUCTS, BLOG_POSTS);
    if (meta) {
      document.title = meta.title;
      setTag('meta[name="description"]:not([lang])', () => { const m = document.createElement('meta'); m.name = 'description'; return m; }, 'content', meta.description);
      setTag('meta[property="og:title"]', () => document.createElement('meta'), 'content', meta.title);
      setTag('meta[property="og:description"]', () => document.createElement('meta'), 'content', meta.description);
    }
    setTag('meta[name="robots"]', () => { const m = document.createElement('meta'); m.name = 'robots'; return m; }, 'content', meta && !meta.noindex ? 'index, follow' : 'noindex');
    const url = SITE_URL + langPath(path, lang);
    setTag('link[rel="canonical"]', () => { const l = document.createElement('link'); l.rel = 'canonical'; return l; }, 'href', url);
    setTag('meta[property="og:url"]', () => document.createElement('meta'), 'content', url);
    setTag('meta[property="og:locale"]', () => document.createElement('meta'), 'content', OG_LOCALE[lang]);
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((l) => l.remove());
    if (meta && !meta.noindex) {
      [...SEO_LANGS, 'x-default'].forEach((hl) => {
        const l = document.createElement('link');
        l.rel = 'alternate'; l.hreflang = hl;
        l.href = SITE_URL + langPath(path, hl === 'x-default' ? 'fr' : hl);
        document.head.appendChild(l);
      });
    }
  }, [pathname]);
  return null;
}

const PAGE_ROUTES = [
  ['', Home], ['products', Products], ['products/:id', ProductDetail], ['about', About],
  ['health-benefits', HealthBenefits], ['shipping', Shipping], ['faq', FAQ], ['contact', Contact],
  ['blog', Blog], ['blog/:slug', BlogPost], ['cart', Cart],
];

function App() {
  return (
    <BrowserRouter>
    <LanguageProvider>
      <CurrencyProvider>
        <CartProvider>
            <ScrollToTop />
            <RouteSeo />
        <RTLHandler />
            <div className="App min-h-screen" style={{ backgroundColor: '#FDFBF7' }}>
              <Header />
              <main>
                <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div></div>}>
                <Routes>
                  {['', '/en', '/ar'].flatMap((prefix) => PAGE_ROUTES.map(([path, Page]) => (
                    <Route key={`${prefix}/${path}`} path={`${prefix}/${path}` || '/'} element={<Page />} />
                  )))}
                </Routes>
                </Suspense>
              </main>
              <Footer />
              <WhatsAppButton />
              <CartDrawer />
              <Toaster
              position="top-right"
              duration={1000}
              toastOptions={{
                style: {
                  background: '#1A1713',
                  color: '#FDFBF7',
                  border: '1px solid #D4AF37',
                },
              }}
            />
          </div>
      </CartProvider>
    </CurrencyProvider>
  </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
