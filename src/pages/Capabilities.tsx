import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Shield, Network, BarChart3, Database, FileSearch, BookOpen } from 'lucide-react';

export function Capabilities() {
  const { t } = useTranslation();

  // Maps the JSON keys to your existing routing slugs and icons
  const capabilityMap = [
    { id: 'payload', slug: 'verifiable-payloads', icon: <Shield className="text-brand-jade mb-6" size={32} /> },
    { id: 'rules', slug: 'hybrid-engine', icon: <Network className="text-brand-jade mb-6" size={32} /> },
    { id: 'intelligence', slug: 'payment-error-rate', icon: <BarChart3 className="text-brand-jade mb-6" size={32} /> },
    { id: 'exchange', slug: 'glassbox-integration', icon: <Database className="text-brand-jade mb-6" size={32} /> },
    { id: 'advisory', slug: 'pre-procurement', icon: <FileSearch className="text-brand-jade mb-6" size={32} /> },
    { id: 'translation', slug: 'operational-translation', icon: <BookOpen className="text-brand-jade mb-6" size={32} /> }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <Helmet>
        <title>{t('routes.expertise.label')} | Applied Policy Systems</title>
        <meta name="description" content={t('routes.expertise.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section border-b border-slate-200 dark:border-slate-800">
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="label-uppercase">{t('expertisePage.hero.label')}</h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight font-black text-slate-900 dark:text-white">
              {t('expertisePage.hero.title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('expertisePage.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900/50 pb-24 md:pb-32">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h2 className="label-muted">{t('expertisePage.expertise.label')}</h2>
            <h3 className="tracking-tight">{t('expertisePage.expertise.title')}</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {capabilityMap.map((cap, i) => {
              const deliverables = t(`expertisePage.services.${cap.id}.deliverables`, { returnObjects: true }) as string[];
              
              return (
                <motion.div
                  key={cap.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={`/capabilities/${cap.slug}`}
                    className="group block h-full bg-white dark:bg-slate-950 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:border-brand-jade focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-jade outline-none"
                  >
                    {cap.icon}
                    <h4 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-brand-jade transition-colors flex items-center justify-between">
                      {t(`expertisePage.services.${cap.id}.title`)}
                      <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300" />
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                      {t(`expertisePage.services.${cap.id}.desc`)}
                    </p>
                    
                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800/50">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                        {t(`expertisePage.services.${cap.id}.deliverablesLabel`)}
                      </div>
                      <ul className="space-y-3">
                        {Array.isArray(deliverables) && deliverables.map((deliverable, index) => (
                          <li key={index} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                            <span className="w-1.5 h-1.5 bg-brand-jade rounded-full mt-2 mr-3 shrink-0" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}