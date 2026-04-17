import { BLOG_POSTS } from '../data/products';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BLOG_POSTS } from '../data/products';


const Blog = () => {
  useEffect(() => {
    document.title = `Bienfaits Miel Maroc | Origan Thym Nigelle Therapeutique | Blog`;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', `Articles sur les bienfaits du miel pur marocain: miel d'origan, thym, nigelle, romarin sauvage. Conseils pour acheter et utiliser le miel de l'Atlas.`);
  }, []);

  const { t, language } = useLanguage();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(BLOG_POSTS);
  }, []);

  const getTitle = (post) => {
    const key = language === 'en' ? 'title' : `title_${language}`;
    return post[key] || post[`title_${language}`] || post.title;
  };

  const getExcerpt = (post) => {
    const key = language === 'en' ? 'excerpt' : `excerpt_${language}`;
    return post[key] || post[`excerpt_${language}`] || post.excerpt;
  };

  return (
    <div className="min-h-screen pt-24 pb-16" data-testid="blog-page">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-4">Journal</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1713] tracking-tight mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-[#5C5449] text-base">{t('blog.subtitle')}</p>
        </motion.div>

        <div className="space-y-12">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              data-testid={`blog-post-${post.id}`}
            >
              <Link to={`/blog/${post.slug}`} className="group grid md:grid-cols-3 gap-8">
                <div className="overflow-hidden bg-[#F7F4EB] aspect-video md:aspect-square">
                  <img
                    src={post.image}
                    alt={getTitle(post)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col justify-center space-y-3">
                  <span className="text-xs uppercase tracking-[0.15em] text-[#D4AF37] font-medium">{post.category}</span>
                  <h2 className="font-heading text-2xl font-medium text-[#1A1713] group-hover:text-[#D4AF37] transition-colors">
                    {getTitle(post)}
                  </h2>
                  <p className="text-[#5C5449] text-sm leading-relaxed">
                    {getExcerpt(post)}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-[#D4AF37] font-medium">
                    {t('blog.readMore')} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
