import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

const CURRENCY_SYMBOLS = {
  MAD: 'MAD',
  EUR: '€',
  GBP: '£',
};

const LANG_TO_CURRENCY = {
  en: 'GBP',
  fr: 'EUR',
  de: 'EUR',
  nl: 'EUR',
};

const RATES = {
  EUR: 0.092,
  GBP: 0.079,
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('EUR');

  const setCurrencyFromLanguage = (lang) => {
    const mapped = LANG_TO_CURRENCY[lang] || 'EUR';
    setCurrency(mapped);
  };

  const convertPrice = (priceInMAD) => {
    const rate = RATES[currency] || 0.092;
    return Math.round(priceInMAD * rate * 100) / 100;
  };

  // Shows only the local currency (EUR/GBP)
  const formatPrice = (priceInMAD) => {
    const converted = convertPrice(priceInMAD);
    const symbol = CURRENCY_SYMBOLS[currency];
    return `${symbol}${converted.toFixed(2)}`;
  };

  // Shows MAD first, then local currency in brackets
  const formatPriceWithMAD = (priceInMAD) => {
    const converted = convertPrice(priceInMAD);
    const symbol = CURRENCY_SYMBOLS[currency];
    return `${priceInMAD} MAD (${symbol}${converted.toFixed(2)})`;
  };

  // Shows both MAD and local currency for cart total
  const formatCartTotal = (priceInMAD) => {
    const converted = convertPrice(priceInMAD);
    const symbol = CURRENCY_SYMBOLS[currency];
    return `${priceInMAD} MAD / ${symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrencyFromLanguage,
      convertPrice,
      formatPrice,
      formatPriceWithMAD,
      formatCartTotal,
      currencySymbols: CURRENCY_SYMBOLS,
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
