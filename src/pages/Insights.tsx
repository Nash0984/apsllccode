import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Shield, 
  Box, 
  Lock, 
  ChevronUp, 
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Sandbox } from '../components/Sandbox';
import { PolicyManual } from '../components/PolicyManual';

export function Insights() {
  const { t } = useTranslation();
  const [expandedDocs, setExpandedDocs] = useState<string[]>([]);

  const researchDocs = useMemo(() => [
    {
      id: 'per',
      title: t('about.research.docs.per.title'),
      desc: t('about.research.docs.per.desc'),
      icon: <Database size={24} strokeWidth={1.5} />
    },
    {
      id: 'trbv',
      title: t('about.research.docs.trbv.title'),
      desc: t('about.research.docs.trbv.desc'),
      icon: <Shield size={24} strokeWidth={1.5} />
    },
    {
      id: 'glassbox',
      title: t('about.research.docs.glassbox.title'),
      desc: t('about.research.docs.glassbox.desc'),
      icon: <Box size={24} strokeWidth={1.5} />
    },
    {
      id: 'irc7216',
      title: t('about.research.docs.irc7216.title'),
      desc: t('about.research.docs.irc7216.desc'),
      icon: <Lock size={24} strokeWidth={1.5} />
    }
  ], [t]);

  const toggleDoc = (id: string) => {
    setExpandedDocs(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <Helmet>
        <title>{t('insightsPage.hero.title')} | Applied Policy Systems</title>
        <meta name="description" content={t('insightsPage.hero.subtitle')} />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-jade/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="container-wide relative text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="label-uppercase">{t('insightsPage.hero.label')}</h1>
            <h2 className="max-w-4xl mx-auto lg:mx-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8">
              {t('insightsPage.hero.title').split(' ').slice(0, -1).join(' ')} <br />
              <span className="text-brand-jade">{t('insightsPage.hero.title').split(' ').slice(-1)}</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t('insightsPage.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Executive Briefs Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h2 className="label-muted">{t('about.research.label')}</h2>
            <h3 className="tracking-tight">{t('about.research.title')}</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {researchDocs.map((doc, i) => {
              const isExpanded = expandedDocs.includes(doc.id);
              return (
                <motion.div 
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-base p-8 relative overflow-hidden group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                >
                  <div className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-brand-jade border border-slate-100 dark:border-slate-800">
                      {doc.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold mb-2">{doc.title}</h4>
                      <motion.div
                        animate={{ height: isExpanded ? 'auto' : '3rem' }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                          {doc.desc}
                        </p>
                      </motion.div>
                      <button
                        onClick={() => toggleDoc(doc.id)}
                        className="mt-4 text-brand-jade font-bold text-xs uppercase tracking-widest flex items-center gap-2"
                      >
                        {isExpanded ? 'Read Less' : 'Read More'}
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Blueprints Section */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-wide">
          <div className="max-w-3xl mb-24">
            <h2 className="label-muted">{t('insightsPage.blueprints.label')}</h2>
            <h3 className="tracking-tight">{t('insightsPage.blueprints.title')}</h3>
          </div>

          <div className="space-y-32">
            {/* Demonstrator 01 */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-jade mb-6">
                  {t('insightsPage.blueprints.documentTool.label')}
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                  {t('insightsPage.blueprints.documentTool.title')}
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  {t('insightsPage.blueprints.documentTool.desc')}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-950 rounded-[2.5rem] p-8 shadow-2xl border border-slate-900"
              >
                <Sandbox />
              </motion.div>
            </div>

            {/* Demonstrator 02 */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:order-2"
              >
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-jade mb-6">
                  {t('insightsPage.blueprints.policyManual.label')}
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                  {t('insightsPage.blueprints.policyManual.title')}
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  {t('insightsPage.blueprints.policyManual.desc')}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:order-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 dark:border-slate-800"
              >
                <PolicyManual />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <div className="container-wide text-center">
          <h3 className="text-3xl font-black mb-8">Ready to explore these models in your context?</h3>
          <a 
            href="https://calendar.app.google/WiXHqdGmWaG5kxJQ7" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-12 py-6 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold rounded-[2rem] hover:scale-105 transition-transform items-center gap-4 shadow-2xl"
          >
            Technical Consultation
            <ArrowRight size={24} />
          </a>
        </div>
      </section>
    </div>
  );
}
