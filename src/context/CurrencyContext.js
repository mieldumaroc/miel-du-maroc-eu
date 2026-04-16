import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();


const CURRENCY_SYMBOLS = {
  MAD: 'MAD',
  EUR: '\u20ac',
  GBP: '\u00a3',
  USD: '$',
  CHF: 'CHF',
};

const LANG_TO_CURRENCY = {
  en: 'GBP',
  fr: 'EUR',
  de: 'EUR',
  nl: 'EUR',
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('EUR');
  const [rates, setRates] = useState({
    EUR: 0.092,
    GBP: 0.079,
    USD: 0.10,
    CHF: 0.089,
  });

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const response = await axios.get(`${API}/currency/rates`);
      if (response.data && response.data.rates) {
        setRates(response.data.rates);
      }
    } catch (error) {
      console.error('Failed to fetch currency rates:', error);
    }
  };

  const setCurrencyFromLanguage = (lang) => {
    const mapped = LANG_TO_CURRENCY[lang] || 'EUR';
    setCurrency(mapped);
  };

  const convertPrice = (priceInMAD) => {
    if (currency === 'MAD') return priceInMAD;
    const rate = rates[currency] || 0.1;
    return Math.round(priceInMAD * rate * 100) / 100;
  };

  const formatPrice = (priceInMAD) => {
    const converted = convertPrice(priceInMAD);
    const symbol = CURRENCY_SYMBOLS[currency];
    if (currency === 'MAD') return `${converted} ${symbol}`;
    if (['EUR', 'GBP', 'USD'].includes(currency)) return `${symbol}${converted.toFixed(2)}`;
    return `${converted.toFixed(2)} ${symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      rates,
      setCurrencyFromLanguage,
      convertPrice,
      formatPrice,
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
