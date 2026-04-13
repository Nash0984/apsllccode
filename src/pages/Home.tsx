import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, CheckCircle2, ArrowUpRight } from 'lucide-react';
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
        <title>Applied Policy Systems | Human-Centered Access. Deterministic Compliance.</title>
        <meta name="description" content="We believe the foundation of public benefits access is built at the business rules layer. Applied Policy Systems translates strict federal statutes into plain-language, low-friction digital infrastructure that protects both the resident and the agency budget." />
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
        
        <div className="container-wide relative text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
                {t('home.hero.title')}
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-12 max-w-3xl mx-auto lg:mx-0">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                <Link 
                  to="/expertise" 
                  aria-label="Learn more about our expertise"
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

      {/* Compliance Trust Bar */}
      <div className="border-y border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 py-4 sm:py-6">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 container-wide">
          {(t('home.trustBar', { returnObjects: true }) as string[]).map((acronym) => (
            <span key={acronym} className="font-mono text-xs sm:text-sm tracking-widest text-slate-500 dark:text-slate-400 font-bold uppercase">
              {acronym}
            </span>
          ))}
        </div>
      </div>

      {/* The Problem & Solution Section - Compact */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <h2 className="label-muted">{t('home.challenge.label')}</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">{t('home.challenge.title')}</h3>
              <p className="text-base sm:text-lg leading-relaxed mb-8">
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
              <p className="text-sm mb-4 opacity-90">
                {t('home.challenge.outputsLead')}
              </p>
              <ul className="flex flex-col gap-3">
                {(t('home.challenge.outputs', { returnObjects: true }) as string[]).map((output) => (
                  <li key={output} className="flex items-start gap-3 text-sm sm:text-base font-medium">
                    <CheckCircle2 size={18} className="text-white/80 shrink-0 mt-0.5" />
                    {output}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Access Transition Bar */}
      <div className="border-y border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 py-4 sm:py-6 mt-16 sm:mt-24">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 container-wide">
          {(t('home.accessBar', { returnObjects: true }) as string[]).map((standard) => (
            <span key={standard} className="font-mono text-xs sm:text-sm tracking-widest text-slate-500 dark:text-slate-400 font-bold uppercase">
              {standard}
            </span>
          ))}
        </div>
      </div>

      {/* Homepage Directory */}
      <section className="bg-white dark:bg-slate-950">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 py-16 sm:py-24">
            {[
              { key: 'expertise', path: '/expertise' },
              { key: 'about', path: '/about' },
              { key: 'contact', path: '/contact' }
            ].map((item) => (
              <Link 
                key={item.key} 
                to={item.path}
                className="group block border-t-2 border-slate-200 dark:border-slate-800 pt-6 hover:border-brand-jade transition-colors"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-3 flex items-center justify-between">
                  {t(`routes.${item.key}.label`)}
                  <ArrowUpRight size={24} className="text-brand-jade opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300" />
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  {t(`routes.${item.key}.description`)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
