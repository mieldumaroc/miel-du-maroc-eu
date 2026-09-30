import React, { createContext, useContext } from 'react';
import { useLanguage } from './LanguageContext';

// The shop now sells only in Morocco, so every price is shown in Moroccan dirhams.
const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const { language } = useLanguage();
  const unit = language === 'ar' ? 'درهم' : 'DH';

  const formatPrice = (priceInMAD) => `${priceInMAD} ${unit}`;

  // Kept under the old names so every page keeps working without changes
  const formatPriceWithMAD = formatPrice;
  const formatCartTotal = formatPrice;
  const convertPrice = (priceInMAD) => priceInMAD;
  const setCurrencyFromLanguage = () => {};

  return (
    <CurrencyContext.Provider value={{
      currency: 'MAD',
      unit,
      setCurrencyFromLanguage,
      convertPrice,
      formatPrice,
      formatPriceWithMAD,
      formatCartTotal,
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within a CurrencyProvider');
  return context;
};
