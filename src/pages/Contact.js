import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'sonner';


const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSending(true);
    try {
      await axios.post(`${API}/contact?name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}&message=${encodeURIComponent(form.message)}`);
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16" data-testid="contact-page">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-4">Contact</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1713] tracking-tight mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-[#5C5449] text-base">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <a
              href="https://wa.me/212676050868?text=Hello%2C+I+have+a+question"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-[#F7F4EB] border border-[#E8E2D2] hover:border-[#25D366]/30 transition-colors"
              data-testid="contact-whatsapp"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#25D366] fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <h3 className="font-heading font-medium text-[#1A1713]">{t('contact.whatsapp')}</h3>
              </div>
              <p className="text-[#5C5449] text-sm">{t('contact.whatsappText')}</p>
              <p className="text-[#D4AF37] text-sm mt-2">+212 676 050 868</p>
            </a>

            <div className="p-6 bg-[#F7F4EB] border border-[#E8E2D2]">
              <div className="flex items-center gap-3 mb-2">
                <Mail size={18} className="text-[#D4AF37]" />
                <h3 className="font-heading font-medium text-[#1A1713]">{t('contact.email')}</h3>
              </div>
              <p className="text-[#5C5449] text-sm">{t('contact.emailText')}</p>
              <p className="text-[#D4AF37] text-sm mt-2">contact@mieldumaroc.com</p>
            </div>

            <div className="p-6 bg-[#F7F4EB] border border-[#E8E2D2]">
              <div className="flex items-center gap-3 mb-2">
                <MapPin size={18} className="text-[#D4AF37]" />
                <h3 className="font-heading font-medium text-[#1A1713]">{t('contact.location')}</h3>
              </div>
              <p className="text-[#5C5449] text-sm">{t('contact.locationText')}</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-[#5C5449] font-medium mb-2 block">{t('contact.form.name')}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-[#E8E2D2] focus:border-[#D4AF37] focus:outline-none text-sm transition-colors"
                  data-testid="contact-name-input"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-[#5C5449] font-medium mb-2 block">{t('contact.form.email')}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-[#E8E2D2] focus:border-[#D4AF37] focus:outline-none text-sm transition-colors"
                  data-testid="contact-email-input"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-[#5C5449] font-medium mb-2 block">{t('contact.form.message')}</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-[#E8E2D2] focus:border-[#D4AF37] focus:outline-none text-sm transition-colors resize-none"
                  data-testid="contact-message-input"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[#1A1713] text-[#FDFBF7] px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-[#D4AF37] transition-colors disabled:opacity-50"
                data-testid="contact-submit-btn"
              >
                {sending ? '...' : t('contact.form.send')}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
