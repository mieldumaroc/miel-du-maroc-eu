import React from 'react';
import { useLanguage } from '../context/LanguageContext';

// Round gold "100% pur – garanti" seal shown over product photos.
// Sits top right, or top left on the Arabic pages.
const PuritySeal = ({ className = 'w-[68px] sm:w-20', oil = false }) => {
  const { t, language } = useLanguage();
  const ar = language === 'ar';
  const k = oil ? 'Oil' : '';
  return (
    <span
      className={`pointer-events-none absolute top-3 right-3 rtl:right-auto rtl:left-3 drop-shadow-md ${className}`}
      role="img"
      aria-label={t(`products.sealAlt${k}`)}
      data-testid="purity-seal"
    >
      <svg viewBox="0 0 100 100" className="w-full h-auto block" aria-hidden="true">
        <circle cx="50" cy="50" r="48" fill="#1A1713" fillOpacity="0.93" />
        <circle cx="50" cy="50" r="45.5" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#D4AF37" strokeWidth="0.7" strokeDasharray="1.2 2.2" />
        <text x="50" y="46" textAnchor="middle" fill="#D4AF37" fontSize="23" fontWeight="700" fontFamily="'Cormorant Garamond', Georgia, serif">100%</text>
        <line x1="30" y1="52" x2="70" y2="52" stroke="#D4AF37" strokeWidth="0.7" />
        {ar ? (
          <text x="50" y="72" textAnchor="middle" fill="#E9D9A6" fontSize={oil ? 11.5 : 15} fontWeight="700" fontFamily="Arial, sans-serif" direction="rtl">{t(`products.sealCenter${k}`)}</text>
        ) : (
          <>
            <text x="50" y="64.5" textAnchor="middle" fill="#E9D9A6" fontSize="11" fontWeight="700" letterSpacing="2.2" fontFamily="Manrope, Arial, sans-serif">{t(`products.sealCenter${k}`)}</text>
            <text x="50" y="76" textAnchor="middle" fill="#D4AF37" fontSize="8.6" fontWeight="700" letterSpacing="0.9" fontFamily="Manrope, Arial, sans-serif">{t(`products.sealGuarantee${k}`)}</text>
          </>
        )}
      </svg>
    </span>
  );
};

export default PuritySeal;
