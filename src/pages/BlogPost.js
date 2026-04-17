import { BLOG_POSTS } from '../data/products';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';


const BlogPost = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = BLOG_POSTS.find(p => p.slug === slug);
    setPost(found || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-[#5C5449]">Post not found.</p>
      </div>
    );
  }

  const getTitle = () => {
    const key = language === 'en' ? 'title' : `title_${language}`;
    return post[key] || post[`title_${language}`] || post.title;
  };

  const getContent = () => {
    const key = language === 'en' ? 'content' : `content_${language}`;
    return post[key] || post[`content_${language}`] || post.content;
  };

  return (
    <div className="min-h-screen pt-24 pb-16" data-testid="blog-post-page">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#5C5449] hover:text-[#D4AF37] transition-colors text-sm tracking-wide mb-8" data-testid="back-to-blog">
          <ArrowLeft size={16} />
          {t('blog.backToBlog')}
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.15em] text-[#D4AF37] font-medium">{post.category}</span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1713] tracking-tight mt-3 mb-8" data-testid="blog-post-title">
            {getTitle()}
          </h1>

          {post.image && (
            <div className="overflow-hidden bg-[#F7F4EB] mb-12 aspect-video">
              <img src={post.image} alt={getTitle()} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-stone max-w-none" data-testid="blog-post-content">
            {getContent().split('\n').map((paragraph, index) => {
              if (!paragraph.trim()) return null;
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <h3 key={index} className="font-heading text-xl font-medium text-[#1A1713] mt-8 mb-3">{paragraph.replace(/\*\*/g, '')}</h3>;
              }
              if (paragraph.startsWith('- ')) {
                return <li key={index} className="text-[#5C5449] text-sm leading-relaxed ml-4 mb-1">{paragraph.slice(2)}</li>;
              }
              if (paragraph.match(/^\d+\./)) {
                return <li key={index} className="text-[#5C5449] text-sm leading-relaxed ml-4 mb-1 list-decimal">{paragraph.replace(/^\d+\.\s*/, '')}</li>;
              }
              return <p key={index} className="text-[#5C5449] text-sm leading-relaxed mb-4">{paragraph.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
            })}
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPost;
