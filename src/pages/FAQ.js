import { FAQ as FAQ_DATA } from '../data/products';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';


const FAQ = () => {
  useEffect(() => {
    document.title = `Comment Acheter Miel Pur du Maroc en Europe | Questions Reponses`;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', `Comment commander, payer et recevoir du miel pur marocain en Europe. Paiement, livraison, conservation du miel pur des montagnes de l'Atlas.`);
  }, []);

  const { t, language } = useLanguage();
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    setFaqs(FAQ_DATA);
  }, []);

  const getQuestion = (faq) => {
    const key = language === 'en' ? 'question' : `question_${language}`;
    return faq[key] || faq.question;
  };

  const getAnswer = (faq) => {
    const key = language === 'en' ? 'answer' : `answer_${language}`;
    return faq[key] || faq.answer;
  };

  return (
    <div className="min-h-screen pt-24 pb-16" data-testid="faq-page">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-4">{t('faq.support')}</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1713] tracking-tight mb-4">
            {t('faq.title')}
          </h1>
          <p className="text-[#5C5449] text-base">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-[#E8E2D2] bg-[#FDFBF7]"
              data-testid={`faq-item-${index}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
                data-testid={`faq-toggle-${index}`}
              >
                <span className="font-heading font-medium text-[#1A1713] pr-4">{getQuestion(faq)}</span>
                <ChevronDown
                  size={18}
                  className={`text-[#D4AF37] transition-transform flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-[#5C5449] text-sm leading-relaxed">{getAnswer(faq)}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
