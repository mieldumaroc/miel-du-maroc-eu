import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { withLang } from '../i18n/paths';

// Drop-in replacement for react-router's Link that keeps the visitor in their language.
const LocalizedLink = React.forwardRef(({ to, ...props }, ref) => {
  const { language } = useLanguage();
  const target = typeof to === 'string' ? withLang(to, language) : to;
  return <Link ref={ref} to={target} {...props} />;
});

export default LocalizedLink;
