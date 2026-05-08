import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Download, FileText, Calendar, Clock, User, Quote, ChevronRight, BookOpen, Loader } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function Research() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [isDownloading, setIsDownloading] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  const articles = t('researchPage.articles', { returnObjects: true }) as Record<string, any>;
  const articleList = Object.entries(articles).map(([key, value]) => ({
    slug: key,
    ...value
  }));

  const handleDownloadPDF = async () => {
    if (!articleRef.current) return;
    
    setIsDownloading(true);
    try {
      const element = articleRef.current;
      
      // Determine background color safely
      const bgColor = window.getComputedStyle(document.body).backgroundColor;
      const isDark = document.documentElement.classList.contains('dark');
      const isUnsupportedColor = bgColor.includes('oklch') || bgColor.includes('oklab');
      const safeBgColor = isUnsupportedColor ? (isDark ? '#020617' : '#f8fafc') : bgColor;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: safeBgColor,
        onclone: (clonedDoc) => {
          // Remove problematic oklch/oklab colors that html2canvas cannot parse
          const elements = clonedDoc.getElementsByTagName('*');
          for (let i = 0; i < elements.length; i++) {
            const el = elements[i] as HTMLElement;
            const computedStyle = window.getComputedStyle(el);
            
            // Properties to check for unsupported color spaces
            const colorProps = ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor'];
            
            colorProps.forEach(prop => {
              const value = computedStyle.getPropertyValue(prop);
              if (value && (value.includes('oklch') || value.includes('oklab'))) {
                // If it's an unsupported color function, try to provide a safe fallback
                // For brand-jade, we know the hex
                if (el.classList.contains('text-brand-jade') || el.classList.contains('bg-brand-jade')) {
                  el.style.setProperty(prop, '#006D77', 'important');
                } else if (el.classList.contains('text-slate-900') || el.classList.contains('dark:text-white')) {
                  el.style.setProperty(prop, isDark ? '#ffffff' : '#0f172a', 'important');
                } else if (el.classList.contains('text-slate-600') || el.classList.contains('dark:text-slate-400')) {
                  el.style.setProperty(prop, isDark ? '#94a3b8' : '#475569', 'important');
                } else {
                  // Generic fallback for other unsupported colors (like default tailwind slate)
                  el.style.setProperty(prop, isDark ? '#ffffff' : '#000000', 'important');
                }
              }
            });
          }
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`${slug || 'aps-research'}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // If a slug is provided, show the article
  if (slug && articles[slug]) {
    const article = articles[slug];
    const articleSections = article.sections || [];

    return (
      <div className="relative min-h-screen">
        <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
          <Helmet>
            <title>Applied Policy Systems | {article.title}</title>
            <meta name="description" content={article.executiveSummary.text} />
            <link rel="canonical" href={`${window.location.origin}/research/${slug}`} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:title" content={`Applied Policy Systems | ${article.title}`} />
            <meta property="og:description" content={article.executiveSummary.text} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={`${window.location.origin}/research/${slug}`} />
            <meta property="og:image" content={`${window.location.origin}/logo.svg`} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`Applied Policy Systems | ${article.title}`} />
            <meta name="twitter:description" content={article.executiveSummary.text} />
            <meta name="twitter:image" content={`${window.location.origin}/logo.svg`} />
          </Helmet>

          {/* Hero Section */}
          <section className="relative pt-32 pb-20 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-brand-jade)_0%,transparent_25%)] opacity-[0.03] dark:opacity-[0.05]" />
            <div className="container-wide relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl"
              >
                <div className="mb-8">
                  <Link 
                    to="/research"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-jade hover:translate-x-[-4px] transition-transform"
                  >
                    <ArrowLeft size={14} />
                    Back to Research Archive
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-6 mb-10">
                  <span className="px-3 py-1 bg-brand-jade/10 text-brand-jade text-xs font-black uppercase tracking-widest rounded-full leading-none">
                    {article.heroLabel || t('researchPage.hero.label')}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    <Calendar size={14} className="text-brand-jade" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    <Clock size={14} className="text-brand-jade" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-7xl mb-10 tracking-tight font-black text-slate-900 dark:text-white leading-[1.05]">
                  {article.title}
                </h1>

                <div className="flex flex-wrap gap-4 items-center">
                  <button 
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black rounded-2xl hover:bg-brand-jade hover:text-white dark:hover:bg-brand-jade dark:hover:text-white transition-all flex items-center gap-3 shadow-2xl shadow-slate-900/20 dark:shadow-white/5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDownloading ? (
                      <Loader size={22} className="shrink-0 animate-spin" />
                    ) : (
                      <Download size={22} className="shrink-0" />
                    )}
                    {isDownloading ? 'Generating PDF...' : t('researchPage.hero.cta')}
                  </button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Article Body */}
          <div className="container-wide py-16 md:py-24">
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
              
              {/* Table of Contents / Sidebar (Desktop) */}
              <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-32 h-fit">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 py-2 border-b border-slate-100 dark:border-slate-800">
                    Article Navigation
                  </h2>
                  <nav aria-label="Table of contents">
                    <ul className="space-y-1">
                      {articleSections.map((section: any) => (
                        <li key={section.id}>
                          <a 
                            href={`#${section.id}`}
                            className="text-xs font-bold text-slate-500 hover:text-brand-jade transition-all block leading-relaxed py-2 pl-4 border-l border-slate-100 dark:border-slate-800 hover:border-brand-jade -ml-[1px]"
                          >
                            {section.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="mt-16 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white mb-4">Other Research</h3>
                    <div className="space-y-4">
                      {articleList.filter(a => a.slug !== slug).map(a => (
                        <Link 
                          key={a.slug}
                          to={`/research/${a.slug}`}
                          className="block text-xs font-bold text-slate-500 hover:text-brand-jade transition-colors leading-snug"
                        >
                          {a.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main ref={articleRef} className="lg:col-span-9 max-w-3xl">
                
                {/* Executive Summary */}
                <motion.section 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-20 p-10 md:p-14 bg-brand-jade/[0.03] dark:bg-brand-jade/[0.05] border-l-4 border-brand-jade rounded-r-[2rem] shadow-sm shadow-brand-jade/5"
                >
                  <h2 className="text-sm font-black text-brand-jade mb-6 uppercase tracking-[0.2em]">
                    {article.executiveSummary.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-slate-800 dark:text-slate-100 leading-snug font-bold italic tracking-tight">
                    "{article.executiveSummary.text}"
                  </p>
                </motion.section>

                {/* Sections */}
                <div className="space-y-24">
                  {articleSections.map((section: any, i: number) => (
                    <motion.section 
                      key={section.id}
                      id={section.id}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: i === 0 ? 0 : 0.1 }}
                      className="group scroll-mt-32"
                    >
                      <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 group-hover:text-brand-jade transition-colors leading-tight">
                        {section.title}
                      </h2>
                      
                      <div className="prose prose-slate dark:prose-invert max-w-none prose-lg md:prose-xl prose-p:leading-[1.8] prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:mb-8 prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-bold">
                        <div className="whitespace-pre-line">
                          {section.content}
                        </div>
                      </div>

                      {section.pullQuote && (
                        <div className="my-16 relative p-10 md:p-16 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden">
                          <Quote className="absolute -top-4 -left-4 text-brand-jade/10" size={120} />
                          <blockquote className="relative text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-[1.2] italic tracking-tight">
                            "{section.pullQuote}"
                          </blockquote>
                          <div className="mt-8 flex items-center gap-4">
                            <div className="h-px w-12 bg-brand-jade" />
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Core Analysis Perspective</span>
                          </div>
                        </div>
                      )}
                    </motion.section>
                  ))}
                </div>

                {/* Author Block */}
                <motion.section 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-32 pt-16 border-t-2 border-slate-100 dark:border-slate-800"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-8 p-8 md:p-12 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                    <div className="w-24 h-24 rounded-3xl bg-brand-jade/10 flex items-center justify-center text-brand-jade shrink-0 shadow-inner">
                      <User size={48} strokeWidth={1} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                        {t('researchPage.author.name')}
                      </h3>
                      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-bold">
                        {t('researchPage.author.bio')}
                      </p>
                    </div>
                  </div>
                </motion.section>
              </main>
            </div>
          </div>

          {/* CTA Section */}
          <section className="section-padding bg-slate-950 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-jade/10 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="container-wide relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tight">
                {t('researchPage.cta.title')}
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed font-bold">
                {t('researchPage.cta.subtitle')}
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link 
                  to="/capabilities"
                  className="inline-flex px-10 py-5 bg-brand-jade text-white font-black rounded-2xl hover:bg-[#005a62] transition-all items-center gap-3 shadow-2xl shadow-brand-jade/30 outline-none group transform hover:-translate-y-2 active:scale-95"
                >
                  {t('researchPage.cta.button')}
                  <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link 
                  to="/contact"
                  className="inline-flex px-10 py-5 bg-white/10 text-white font-black rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all items-center gap-3 outline-none group transform hover:-translate-y-2 active:scale-95 backdrop-blur-sm"
                >
                  Schedule Architecture Audit
                  <FileText size={22} className="group-hover:rotate-12 transition-transform" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // List View (Research Archive)
  return (
    <div className="relative min-h-screen">
      <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
        <Helmet>
          <title>Applied Policy Systems | {t('seo.pages.research.title')}</title>
          <meta name="description" content={t('seo.pages.research.description')} />
          <meta name="keywords" content={`${t('seo.pages.research.keywords')}, ${t('seo.defaultKeywords')}`} />
          <link rel="canonical" href={`${window.location.origin}/research`} />

          {/* Open Graph / Facebook */}
          <meta property="og:title" content={`Applied Policy Systems | ${t('seo.pages.research.title')}`} />
          <meta property="og:description" content={t('seo.pages.research.description')} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${window.location.origin}/research`} />
          <meta property="og:image" content={`${window.location.origin}/logo.svg`} />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`Applied Policy Systems | ${t('seo.pages.research.title')}`} />
          <meta name="twitter:description" content={t('seo.pages.research.description')} />
          <meta name="twitter:image" content={`${window.location.origin}/logo.svg`} />
        </Helmet>

        {/* List Hero */}
        <section className="relative pt-40 pb-24 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-brand-jade)_0%,transparent_25%)] opacity-[0.03] dark:opacity-[0.05]" />
          <div className="container-wide relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <span className="px-3 py-1 bg-brand-jade/10 text-brand-jade text-xs font-black uppercase tracking-widest rounded-full leading-none mb-8 inline-block">
                Strategic Intelligence
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-8xl mb-8 tracking-tight font-black text-slate-900 dark:text-white leading-none">
                {t('researchPage.list.title')}
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-bold max-w-2xl leading-relaxed">
                {t('researchPage.list.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Feature Article (First in list) */}
        <section className="py-24 border-b border-slate-100 dark:border-slate-800">
          <div className="container-wide">
            {articleList.length > 0 && (
              <Link 
                to={`/research/${articleList[articleList.length - 1].slug}`}
                className="group relative block"
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[2.5rem] bg-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-jade/40 to-teal-900/80 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                      <div className="space-y-6">
                        <FileText size={80} className="mx-auto text-white/20 group-hover:text-white/40 transition-colors" />
                        <span className="block text-xs font-black text-white/60 uppercase tracking-[0.3em]">Latest Publication</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 text-xs font-black text-brand-jade uppercase tracking-widest">
                      <span>{articleList[articleList.length - 1].date}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
                      <span>{articleList[articleList.length - 1].readTime}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white group-hover:text-brand-jade transition-colors leading-[1.1]">
                      {articleList[articleList.length - 1].title}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-bold leading-relaxed">
                      {articleList[articleList.length - 1].executiveSummary.text}
                    </p>
                    <div className="flex items-center gap-3 text-brand-jade font-black uppercase tracking-widest text-sm">
                      {t('researchPage.list.readMore')}
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </section>

        {/* Remaining Articles Grid */}
        <section className="py-24 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="container-wide">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-16">Research Archive</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...articleList].reverse().map((article, i) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={`/research/${article.slug}`}
                    className="group flex flex-col h-full p-10 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] hover:border-brand-jade/30 hover:shadow-2xl hover:shadow-brand-jade/5 transition-all"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-brand-jade transition-colors">
                        <BookOpen size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">
                        {article.date}
                      </span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-brand-jade transition-colors leading-tight">
                      {article.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-bold leading-relaxed mb-8 line-clamp-3">
                      {article.executiveSummary.text}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-jade">
                      Read Analysis <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

