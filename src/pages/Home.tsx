import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export function Home() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  // Safely extract the array from the JSON dictionary
  const technicalDeliverables = t('home.challenge.outputs', { returnObjects: true }) as string[];

  const directoryLinks = useMemo(() => [
    { 
      key: 'capabilities', 
      label: t('routes.expertise.label'),
      path: '/capabilities',
      description: t('routes.expertise.description')
    },
    { 
      key: 'about', 
      label: t('routes.about.label'),
      path: '/about',
      description: t('routes.about.description')
    },
    { 
      key: 'contact', 
      label: t('routes.contact.label'),
      path: '/contact',
      description: t('routes.contact.description')
    }
  ], [t]);

  return (
    <>
      <Helmet>
        <title>Applied Policy Systems | {t('home.hero.title')}</title>
        <meta name="description" content={t('home.hero.subtitle')} />
      </Helmet>
      
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-heading">
        <motion.div 
          style={{ 
            y,
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '100px 100px' 
          }}
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] dark:invert pointer-events-none" 
          aria-hidden="true"
        />
        
        <div className="container-wide relative text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 id="hero-heading" className="mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight">
                {t('home.hero.title')}
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-12 max-w-3xl mx-auto lg:mx-0 text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                <Link 
                  to="/capabilities" 
                  aria-label="View our technical capabilities"
                  className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 bg-brand-jade text-white text-lg sm:text-xl font-bold rounded-2xl hover:bg-[#005a62] hover:scale-[1.02] transition-all shadow-2xl shadow-brand-jade/30 flex items-center justify-center gap-4 group"
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
      <section className="section-padding bg-slate-50 dark:bg-slate-900 relative overflow-hidden border-b border-slate-200 dark:border-slate-800" aria-labelledby="challenge-heading">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <h2 className="label-uppercase mb-4">{t('home.challenge.label')}</h2>
              <h3 id="challenge-heading" className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 tracking-tight leading-tight text-slate-900 dark:text-white">
                {t('home.challenge.title')}
              </h3>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-6">
                {t('home.challenge.text')}
              </p>
            </div>
            
            <div className="relative p-8 sm:p-10 bg-brand-jade text-white rounded-[2rem] shadow-xl">
              <p className="font-medium italic leading-relaxed text-lg sm:text-xl">
                {t('home.challenge.solution')}
              </p>
              <hr className="my-6 border-white/20" />
              <h4 className="text-sm font-bold tracking-widest mb-2 opacity-80 uppercase">
                {t('home.challenge.outputsLabel')}
              </h4>
              <p className="text-sm mb-6 opacity-90">
                {t('home.challenge.outputsLead')}
              </p>
              <ul className="flex flex-col gap-3">
                {Array.isArray(technicalDeliverables) && technicalDeliverables.map((output, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm font-medium">
                    <CheckCircle2 size={18} className="text-white/80 shrink-0 mt-0.5" />
                    {output}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Homepage Directory */}
      <section className="bg-white dark:bg-slate-950">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 py-16 sm:py-24">
            {directoryLinks.map((item) => (
              <Link 
                key={item.key} 
                to={item.path}
                className="group block border-t-2 border-slate-200 dark:border-slate-800 pt-6 hover:border-brand-jade transition-colors"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-3 flex items-center justify-between text-slate-900 dark:text-white">
                  {item.label}
                  <ArrowUpRight size={24} className="text-brand-jade opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300" />
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}