import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Sandbox } from '../components/Sandbox';
import { PolicyManual } from '../components/PolicyManual';
import { ExtractionEngine } from '../components/ExtractionEngine';
import { Filter, Send, ShieldCheck, FileJson } from 'lucide-react';
import UnderDevelopmentOverlay from '../components/UnderDevelopmentOverlay';
import { AuditDispatchModal } from '../components/AuditDispatchModal';
import { useCase } from '../context/CaseContext';

export function Simulators() {
  const { t } = useTranslation();
  const { activeCaseId, sessionLog } = useCase();
  const [activeFilter, setActiveFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const simulators = useMemo(() => [
    {
      id: 'sandbox',
      component: <Sandbox />,
      label: t('simulatorsPage.blueprints.documentTool.label'),
      title: t('simulatorsPage.blueprints.documentTool.title'),
      desc: t('simulatorsPage.blueprints.documentTool.desc'),
      category: 'verification'
    },
    {
      id: 'policy-manual',
      component: <PolicyManual />,
      label: t('simulatorsPage.blueprints.policyManual.label'),
      title: t('simulatorsPage.blueprints.policyManual.title'),
      desc: t('simulatorsPage.blueprints.policyManual.desc'),
      category: 'casework'
    },
    {
      id: 'extraction-engine',
      component: <ExtractionEngine />,
      label: t('simulatorsPage.blueprints.extractionEngine.label'),
      title: t('simulatorsPage.blueprints.extractionEngine.title'),
      desc: t('simulatorsPage.blueprints.extractionEngine.desc'),
      category: 'audit'
    }
  ], [t]);

  const categories = useMemo(() => [
    { id: 'all', label: t('simulatorsPage.categories.all') },
    { id: 'verification', label: t('simulatorsPage.categories.verification') },
    { id: 'casework', label: t('simulatorsPage.categories.casework') },
    { id: 'audit', label: t('simulatorsPage.categories.audit') }
  ], [t]);

  const filteredSimulators = useMemo(() => {
    if (activeFilter === 'all') return simulators;
    return simulators.filter(s => s.category === activeFilter);
  }, [activeFilter, simulators]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <UnderDevelopmentOverlay />
      
      {/* Floating Dispatch Button - Outside of non-interactive layer */}
      <AnimatePresence>
        {activeCaseId && sessionLog.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="fixed bottom-12 right-12 z-[105]"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-navy dark:bg-white text-white dark:text-brand-navy pl-6 pr-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 hover:scale-105 active:scale-95 transition-all group border-b-4 border-black/20"
            >
              <div className="bg-brand-jade/20 p-2 rounded-full ring-2 ring-brand-jade/30">
                <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <div className="text-left">
                <span className="block text-[9px] font-black uppercase tracking-[0.3em] opacity-60 leading-none mb-1">Dispatch Audit</span>
                <span className="block text-sm font-bold leading-none tracking-tight">SECURE DISPATCH ENGINE</span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AuditDispatchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className="bg-white dark:bg-slate-950 transition-colors duration-300 pointer-events-none select-none opacity-50 overflow-hidden">
        <Helmet>
          <title>Applied Policy Systems | {t('seo.pages.field.title')}</title>
          <meta name="description" content={t('seo.pages.field.description')} />
          <meta name="keywords" content={`${t('seo.pages.field.keywords')}, ${t('seo.defaultKeywords')}`} />
          <meta property="og:title" content={`Applied Policy Systems | ${t('seo.pages.field.title')}`} />
          <meta property="og:description" content={t('seo.pages.field.description')} />
          <meta property="og:type" content="website" />
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
              <h1 className="label-uppercase">{t('simulatorsPage.hero.label')}</h1>
              <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight font-black text-slate-900 dark:text-white">
                {t('simulatorsPage.hero.title')}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                {t('simulatorsPage.hero.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 sticky top-20 z-30 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
          <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-slate-400">
              <Filter size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">{t('simulatorsPage.categories.all').split(' ')[0]}</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    activeFilter === cat.id
                      ? 'bg-brand-jade border-brand-jade text-white'
                      : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500'
                  }`}
                >
                  {cat.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Environments */}
        <section className="section-padding bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
          <div className="container-wide">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-32"
              >
                {filteredSimulators.length > 0 ? (
                  filteredSimulators.map((sim, index) => {
                    const isEven = index % 2 === 1;
                    return (
                      <div key={sim.id} className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div 
                          initial={{ opacity: 0, x: isEven ? 30 : -30 }} 
                          whileInView={{ opacity: 1, x: 0 }} 
                          viewport={{ once: true }}
                          className={isEven ? 'lg:order-2' : ''}
                        >
                          <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-jade mb-6">
                            {sim.label}
                          </h2>
                          <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
                            {sim.title}
                          </h3>
                          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                            {sim.desc}
                          </p>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, x: isEven ? -30 : 30 }} 
                          whileInView={{ opacity: 1, x: 0 }} 
                          viewport={{ once: true }} 
                          className={`bg-white dark:bg-slate-950 rounded-[2.5rem] p-4 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-900 ${isEven ? 'lg:order-1' : ''}`}
                        >
                          {sim.component}
                        </motion.div>
                      </div>
                    );
                  })
                ) : (
                  <div className="h-64 flex items-center justify-center text-slate-400 italic">
                    No records found in this category.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}

