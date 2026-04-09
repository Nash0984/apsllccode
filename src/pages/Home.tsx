import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function Home() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <>
      <Helmet>
        <title>Applied Policy Systems | Public Sector Strategy & Modernization</title>
        <meta name="description" content="Applied Policy Systems LLC bridges the disconnect in public administration by translating legislative mandates into actionable digital infrastructure." />
      </Helmet>
      {/* Hero Section */}
      <section className="hero-section">
        {/* Subtle Technical Pattern with Parallax */}
        <motion.div 
          style={{ 
            y,
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '100px 100px' 
          }}
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] dark:invert pointer-events-none" 
        />
        
        <div className="container-wide relative">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="mb-8">
                {t('home.hero.title')}
              </h1>
              <p className="text-lg md:text-xl mb-12 max-w-3xl">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-6">
                <Link 
                  to="/capabilities" 
                  aria-label="Learn more about our capabilities"
                  className="px-12 py-6 bg-brand-jade text-white text-xl font-bold rounded-2xl hover:bg-[#005a62] hover:scale-[1.02] transition-all shadow-2xl shadow-brand-jade/30 flex items-center gap-4 group"
                >
                  {t('home.hero.cta')}
                  <ArrowRight size={24} strokeWidth={1.5} className="group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Section - Compact */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="label-muted">{t('home.challenge.label')}</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">{t('home.challenge.title')}</h3>
              <p className="text-lg leading-relaxed mb-8">
                {t('home.challenge.text')}
              </p>
            </div>
            <div className="relative p-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-card shadow-xl">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-jade rounded-l-card" />
              <p className="font-medium text-slate-900 dark:text-slate-100 italic leading-relaxed text-xl">
                {t('home.challenge.solution')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Highlight Section - Compact */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-wide">
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-jade/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="label-uppercase">{t('home.infrastructure.label')}</h2>
                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-8">
                  {t('home.infrastructure.title')}
                </h3>
                <p className="text-lg text-slate-400 leading-relaxed mb-10">
                  {t('home.infrastructure.text')}
                </p>
                <Link 
                  to="/platform" 
                  className="inline-flex items-center gap-4 px-8 py-4 bg-brand-jade text-white font-bold rounded-xl shadow-2xl shadow-brand-jade/20 hover:bg-[#005a62] transition-all group"
                >
                  {t('home.infrastructure.cta')}
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              <div className="relative aspect-video bg-white/5 rounded-[2rem] border border-white/10 p-8 flex items-center justify-center overflow-hidden">
                <div className="grid grid-cols-2 gap-6 w-full h-full opacity-20">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="border border-brand-jade rounded-2xl flex items-center justify-center">
                      <div className="w-12 h-12 bg-brand-jade/20 rounded-full animate-pulse" />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-brand-jade/30 rounded-full animate-[spin_30s_linear_infinite]" />
                  <div className="absolute w-48 h-48 border-2 border-brand-jade/50 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                  <div className="absolute p-8 bg-slate-900 border border-brand-jade rounded-3xl shadow-2xl">
                    <BookOpen size={48} className="text-brand-jade" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: t('home.quickLinks.advisory.title'), path: '/capabilities', desc: t('home.quickLinks.advisory.desc'), action: t('home.quickLinks.advisory.action') },
              { name: t('home.quickLinks.architecture.title'), path: '/platform', desc: t('home.quickLinks.architecture.desc'), action: t('home.quickLinks.architecture.action') },
              { name: t('home.quickLinks.insights.title'), path: '/research', desc: t('home.quickLinks.insights.desc'), action: t('home.quickLinks.insights.action') }
            ].map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className="card-base card-hover group"
              >
                <h3 className="mb-4 group-hover:text-brand-jade transition-colors">{item.name}</h3>
                <p className="mb-6">{item.desc}</p>
                <div className="flex items-center gap-2 text-brand-jade font-bold">
                  {item.action} <ArrowRight size={18} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
