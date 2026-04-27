import { motion } from 'motion/react';
import { ArrowRight, Download, FileText, Calendar, Clock, User, Quote } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function Research() {
  const { t } = useTranslation();

  const articleSections = t('researchPage.article.sections', { returnObjects: true }) as any[];

  return (
    <div className="relative min-h-screen">
      <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
        <Helmet>
          <title>Applied Policy Systems | {t('seo.pages.research.title')}</title>
          <meta name="description" content={t('seo.pages.research.description')} />
          <meta name="keywords" content={`${t('seo.pages.research.keywords')}, ${t('seo.defaultKeywords')}`} />
          <meta property="og:title" content={`Applied Policy Systems | ${t('seo.pages.research.title')}`} />
          <meta property="og:description" content={t('seo.pages.research.description')} />
          <meta property="og:type" content="article" />
        </Helmet>

        {/* Hero Section */}
        <section className="section-padding bg-white dark:bg-slate-950 pt-32 pb-16 border-b border-slate-100 dark:border-slate-800">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="label-uppercase">{t('researchPage.hero.label')}</span>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                  <Calendar size={14} className="text-brand-jade" />
                  <span>March 2026</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                  <Clock size={14} className="text-brand-jade" />
                  <span>6 Min Read</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight font-black text-slate-900 dark:text-white leading-[1.1]">
                {t('researchPage.hero.title')}
              </h1>

              <div className="flex flex-wrap gap-4 items-center">
                <button 
                  className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-3 shadow-lg shadow-slate-900/10 dark:shadow-white/5"
                >
                  <Download size={20} />
                  {t('researchPage.hero.cta')}
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Body */}
        <div className="container-wide py-12 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Table of Contents / Sidebar (Desktop) */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
              <nav aria-label="Table of contents">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Article Outline</h2>
                <ul className="space-y-4">
                  {articleSections.map((section: any) => (
                    <li key={section.id}>
                      <a 
                        href={`#${section.id}`}
                        className="text-sm font-bold text-slate-500 hover:text-brand-jade transition-colors block leading-tight py-1 border-l-2 border-transparent hover:border-brand-jade pl-4 -ml-[2px]"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-9 max-w-3xl">
              
              {/* Executive Summary */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 p-8 md:p-12 bg-brand-jade/5 border-l-4 border-brand-jade rounded-r-3xl"
              >
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
                  {t('researchPage.executiveSummary.title')}
                </h2>
                <p className="text-xl text-slate-800 dark:text-slate-200 leading-relaxed font-medium italic">
                  {t('researchPage.executiveSummary.text')}
                </p>
              </motion.section>

              {/* Sections */}
              <div className="space-y-16">
                {articleSections.map((section: any, i: number) => (
                  <motion.section 
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="group"
                  >
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-brand-jade transition-colors">
                      {section.title}
                    </h2>
                    
                    <div className="prose prose-slate dark:prose-invert max-w-none prose-lg prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:mb-6">
                      <p className="whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>

                    {section.pullQuote && (
                      <div className="my-12 relative p-8 md:p-12 border-y border-slate-100 dark:border-slate-800">
                        <Quote className="absolute top-4 left-4 text-brand-jade/20" size={64} />
                        <blockquote className="relative text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight italic">
                          "{section.pullQuote}"
                        </blockquote>
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
                className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-brand-jade/10 flex items-center justify-center text-brand-jade shrink-0">
                    <User size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                      {t('researchPage.author.name')}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {t('researchPage.author.bio')}
                    </p>
                  </div>
                </div>
              </motion.section>
            </main>
          </div>
        </div>

        {/* CTA Section */}
        <section className="section-padding bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-jade/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="container-wide relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-slate-900 dark:text-white">
              {t('researchPage.cta.title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              {t('researchPage.cta.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                to="/capabilities"
                className="inline-flex px-8 py-4 bg-brand-jade text-white font-bold rounded-xl hover:bg-[#005a62] transition-all items-center gap-3 shadow-xl shadow-brand-jade/20 outline-none group transform hover:-translate-y-1"
              >
                {t('researchPage.cta.button')}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact"
                className="inline-flex px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-jade transition-all items-center gap-3 outline-none transform hover:-translate-y-1"
              >
                Schedule Architecture Audit
                <FileText size={20} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
