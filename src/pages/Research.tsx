import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Database, Box, Lock, ChevronUp, ChevronDown, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function Insights() {
  const { t } = useTranslation();
  const [expandedDocs, setExpandedDocs] = useState<string[]>([]);

  const researchDocs = useMemo(() => [
    {
      id: 'per',
      title: t('researchPage.docs.per.title'),
      desc: t('researchPage.docs.per.desc'),
      icon: <Database size={24} strokeWidth={1.5} aria-hidden="true" />
    },
    {
      id: 'irc7216',
      title: t('researchPage.docs.irc7216.title'),
      desc: t('researchPage.docs.irc7216.desc'),
      icon: <Lock size={24} strokeWidth={1.5} aria-hidden="true" />
    },
    {
      id: 'glassbox',
      title: t('researchPage.docs.glassbox.title'),
      desc: t('researchPage.docs.glassbox.desc'),
      icon: <Box size={24} strokeWidth={1.5} aria-hidden="true" />
    }
  ], [t]);

  const toggleDoc = (id: string) => {
    setExpandedDocs(prev => 
      prev.includes(id) ? prev.filter(docId => docId !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <Helmet>
        <title>{t('routes.insights.label')} | Applied Policy Systems</title>
        <meta name="description" content={t('routes.insights.description')} />
      </Helmet>

      {/* Hero Section - Now aligned with About/Capabilities styling */}
      <section className="hero-section border-b border-slate-200 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-jade/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="label-uppercase">{t('researchPage.hero.label')}</h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight font-black text-slate-900 dark:text-white">
              {t('researchPage.hero.title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('researchPage.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Documents */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900" aria-label="Research Documents">
        <div className="container-wide max-w-4xl">
          <div className="space-y-6">
            {researchDocs.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleDoc(doc.id)}
                  className="w-full text-left px-8 py-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-jade focus-visible:ring-inset"
                  aria-expanded={expandedDocs.includes(doc.id)}
                  aria-controls={`doc-content-${doc.id}`}
                >
                  <div className="flex items-center gap-6 pr-8">
                    <div className="text-brand-jade shrink-0 bg-brand-jade/10 p-3 rounded-2xl" aria-hidden="true">
                      {doc.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                      {doc.title}
                    </h3>
                  </div>
                  <div className="shrink-0 text-slate-400">
                    {expandedDocs.includes(doc.id) ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </button>
                
                {expandedDocs.includes(doc.id) && (
                  <div 
                    id={`doc-content-${doc.id}`}
                    className="px-8 pb-8 pt-2"
                  >
                    <div className="pl-[4.5rem]">
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-6">
                        {doc.desc}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Field Prototypes Section - Visually harmonized */}
      <section className="section-padding bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center relative overflow-hidden" aria-label="Field Prototypes Access">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-jade/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container-wide relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-slate-900 dark:text-white">
            {t('researchPage.cta.title')}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t('researchPage.cta.subtitle')}
          </p>
          <Link 
            to="/field"
            className="inline-flex px-8 py-4 bg-brand-jade text-white font-bold rounded-xl hover:bg-[#005a62] transition-colors items-center gap-3 shadow-xl shadow-brand-jade/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 focus-visible:ring-brand-jade outline-none group"
          >
            {t('researchPage.cta.button')}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}