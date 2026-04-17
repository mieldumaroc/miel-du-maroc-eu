import React, { useEffect } from 'react';
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
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import HealthBenefits from './pages/HealthBenefits';
import Shipping from './pages/Shipping';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import './App.css';


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

function App() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
        <RTLHandler />
            <div className="App min-h-screen" style={{ backgroundColor: '#FDFBF7' }}>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/health-benefits" element={<HealthBenefits />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
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
        </BrowserRouter>
      </CartProvider>
    </CurrencyProvider>
  </LanguageProvider>
  );
}

export default App;
