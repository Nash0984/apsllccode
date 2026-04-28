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
        <section className="relative pt-32 pb-20 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-brand-jade)_0%,transparent_25%)] opacity-[0.03] dark:opacity-[0.05]" />
          <div className="container-wide relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <div className="flex flex-wrap items-center gap-6 mb-10">
                <span className="px-3 py-1 bg-brand-jade/10 text-brand-jade text-xs font-black uppercase tracking-widest rounded-full leading-none">
                  {t('researchPage.hero.label')}
                </span>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  <Calendar size={14} className="text-brand-jade" />
                  <span>March 2026</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  <Clock size={14} className="text-brand-jade" />
                  <span>6 Min Read</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl mb-10 tracking-tight font-black text-slate-900 dark:text-white leading-[1.05]">
                {t('researchPage.hero.title')}
              </h1>

              <div className="flex flex-wrap gap-4 items-center">
                <button 
                  className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black rounded-2xl hover:bg-brand-jade hover:text-white dark:hover:bg-brand-jade dark:hover:text-white transition-all flex items-center gap-3 shadow-2xl shadow-slate-900/20 dark:shadow-white/5 active:scale-95"
                >
                  <Download size={22} className="shrink-0" />
                  {t('researchPage.hero.cta')}
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
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-9 max-w-3xl">
              
              {/* Executive Summary */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20 p-10 md:p-14 bg-brand-jade/[0.03] dark:bg-brand-jade/[0.05] border-l-4 border-brand-jade rounded-r-[2rem] shadow-sm shadow-brand-jade/5"
              >
                <h2 className="text-sm font-black text-brand-jade mb-6 uppercase tracking-[0.2em]">
                  {t('researchPage.executiveSummary.title')}
                </h2>
                <p className="text-xl md:text-2xl text-slate-800 dark:text-slate-100 leading-snug font-bold italic tracking-tight">
                  "{t('researchPage.executiveSummary.text')}"
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
                          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Core Architecture Principle</span>
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
