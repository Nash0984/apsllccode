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
      <section className="relative pt-32 pb-40 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
        {/* Subtle Technical Pattern with Parallax */}
        <motion.div 
          style={{ 
            y,
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '100px 100px' 
          }}
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] dark:invert pointer-events-none" 
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.2]">
                {t('home.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed max-w-3xl">
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

      {/* The Problem & Solution Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mb-6">{t('home.challenge.label')}</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-10 tracking-tight leading-tight">{t('home.challenge.title')}</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-8 text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-left">
                <p>
                  {t('home.challenge.text')}
                </p>
              </div>
              <div className="relative p-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] shadow-xl">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-jade rounded-l-[2.5rem]" />
                <p className="font-medium text-slate-900 dark:text-slate-100 italic leading-relaxed text-xl">
                  {t('home.challenge.solution')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Capabilities', path: '/capabilities', desc: 'Precision-engineered frameworks for complex administrative systems.', action: 'See how we help' },
              { name: 'Audiences', path: '/audiences', desc: 'Strategic partnerships across government, tech, and community sectors.', action: 'Who we work with' },
              { name: 'Research', path: '/research', desc: 'Empirical policy evaluation and historical pattern analysis.', action: 'Explore our insights' }
            ].map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className="p-10 border border-slate-100 dark:border-slate-800 rounded-[2rem] bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:border-brand-jade/10 transition-all duration-500 group"
              >
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight group-hover:text-brand-jade transition-colors">{item.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{item.desc}</p>
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
