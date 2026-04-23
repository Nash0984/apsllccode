import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Sandbox } from '../components/Sandbox';
import { PolicyManual } from '../components/PolicyManual';
import { ExtractionEngine } from '../components/ExtractionEngine';
import { Filter, Download, FileJson, ShieldAlert, RefreshCw, AlertTriangle, ShieldCheck as ShieldCheckIcon } from 'lucide-react';
import { useCase } from '../context/CaseContext';
import { useToast } from '../context/ToastContext';

export function Simulators() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { 
    activeCaseId, 
    sessionLog, 
    exportAuditTrail, 
    performIntegrityCheck, 
    integrityReport, 
    isAnalyzingIntegrity,
    setIntegrityReport
  } = useCase();
  const [activeFilter, setActiveFilter] = useState('all');

  const handleIntegrityCheck = async () => {
    try {
      await performIntegrityCheck();
    } catch (error: any) {
      showToast(error.message || "Failed to complete AI integrity audit.", "error");
    }
  };

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
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
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
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeFilter === cat.id
                    ? 'bg-brand-jade border-brand-jade text-white shadow-lg shadow-brand-jade/20'
                    : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 hover:border-brand-jade/50 hover:text-brand-jade'
                }`}
              >
                {cat.label}
              </button>
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

      {/* Floating Audit & Integrity Buttons */}
      <AnimatePresence>
        {activeCaseId && (
          <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
            
            {/* Integrity Check Button */}
            {sessionLog.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <button
                  onClick={handleIntegrityCheck}
                  disabled={isAnalyzingIntegrity}
                  className="bg-brand-navy dark:bg-white text-white dark:text-brand-navy px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform group whitespace-nowrap"
                >
                  {isAnalyzingIntegrity ? (
                    <RefreshCw size={18} className="animate-spin text-brand-jade" />
                  ) : (
                    <ShieldAlert size={18} className={integrityReport?.hasConflicts ? 'text-amber-500' : 'text-brand-jade'} />
                  )}
                  <div className="flex flex-col items-start">
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-70 leading-none mb-1">Verify Session</span>
                    <span className="text-xs font-bold leading-none">AI Integrity Audit</span>
                  </div>
                </button>
              </motion.div>
            )}

            {/* Export Audit Button */}
            {sessionLog.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <button
                  onClick={exportAuditTrail}
                  className="bg-slate-900/10 dark:bg-white/10 backdrop-blur-md text-slate-900 dark:text-white p-4 rounded-full shadow-lg border border-slate-200 dark:border-white/10 flex items-center gap-3 hover:bg-slate-900/20 dark:hover:bg-white/20 transition-all group"
                  title="Export Forensic Audit Trail"
                >
                  <div className="bg-brand-navy dark:bg-brand-jade p-2 rounded-full text-white dark:text-brand-navy">
                    <FileJson size={18} />
                  </div>
                  <div className="flex flex-col items-start pr-2">
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-70 leading-none mb-1">Audit Trail</span>
                    <span className="text-xs font-bold leading-none">{activeCaseId}</span>
                  </div>
                  <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                </button>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>

      {/* Integrity Report Modal/Overlay */}
      <AnimatePresence>
        {integrityReport && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${integrityReport.hasConflicts ? 'bg-amber-500/10 text-amber-500' : 'bg-brand-jade/10 text-brand-jade'}`}>
                    {integrityReport.hasConflicts ? <AlertTriangle size={32} /> : <ShieldCheckIcon size={32} />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                      {integrityReport.hasConflicts ? 'Conflicts Detected' : 'Operational Session Verified'}
                    </h3>
                    <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">
                      Session Integrity Audit Report
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-8 max-h-[60vh] overflow-y-auto space-y-6">
                {integrityReport.hasConflicts ? (
                  integrityReport.conflicts.map((conflict: any, idx: number) => (
                    <div key={idx} className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-1 bg-amber-500 text-white text-[10px] font-black uppercase rounded">
                          {conflict.severity}
                        </span>
                        <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                          Statutory Inconsistency
                        </h4>
                      </div>
                      <p className="text-sm text-amber-800/80 dark:text-amber-200/60 leading-relaxed mb-4 italic">
                        "{conflict.description}"
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {conflict.eventsAffected.map((ev: string, eIdx: number) => (
                          <span key={eIdx} className="text-[9px] font-mono font-bold bg-amber-500/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded">
                            {ev}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                     <ShieldCheckIcon size={64} className="mx-auto text-brand-jade/20 mb-6" />
                     <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                        No contradictory paths detected. All session events remain consistent with the active statutory ontology and active case parameters.
                     </p>
                  </div>
                )}
              </div>

              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
                <button 
                  onClick={() => setIntegrityReport(null)}
                  className="px-8 py-3 bg-brand-navy dark:bg-white text-white dark:text-brand-navy rounded-xl font-bold text-sm hover:scale-105 transition-all"
                >
                  Close Audit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
