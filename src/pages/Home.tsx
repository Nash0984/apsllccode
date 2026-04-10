import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Sandbox } from '../components/Sandbox';

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
      <section className="section-padding bg-slate-50 dark:bg-slate-900 relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
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

      {/* Capability Demonstrator Section */}
      <section className="section-padding bg-slate-950 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#006D77_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        
        <div className="container-wide relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-brand-jade mb-6">{t('home.sandbox.label')}</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">{t('home.sandbox.title')}</h3>
            <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mx-auto">
              {t('home.sandbox.text')}
            </p>
          </div>
          
          <Sandbox />
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