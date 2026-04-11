import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Shield, Lock, BarChart3, Cpu, CheckCircle2, ArrowRight, 
  FileSearch, AlertTriangle, Clock, 
  Gavel, Smartphone, Binary, History, GraduationCap, Globe, 
  RefreshCw, Code2, Eye, Activity, Heart,
  Network, Building2, LayoutGrid, Scale, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ModuleGraphic = lazy(() => import('../components/ModuleGraphics').then(m => ({ default: m.ModuleGraphic })));
const ArchitectureVisualization = lazy(() => import('../components/ArchitectureVisualization').then(m => ({ default: m.ArchitectureVisualization })));

export function Expertise() {
  const { t } = useTranslation();
  const [activePillar, setActivePillar] = useState(0);
  const [activeModule, setActiveModule] = useState(0);

  const pillars = [
    {
      key: 'fidelity',
      icon: <Shield size={20} />,
      modules: [
        { id: "01", key: 'isolation', icon: <Shield className="text-brand-jade" size={32} strokeWidth={1.5} /> },
        { id: "10", key: 'math', icon: <Binary className="text-brand-jade" size={32} strokeWidth={1.5} /> },
        { id: "11", key: 'certification', icon: <History className="text-brand-jade" size={32} strokeWidth={1.5} /> },
        { id: "16", key: 'bias', icon: <Eye className="text-brand-jade" size={32} strokeWidth={1.5} /> }
      ]
    },
    {
      key: 'risk',
      icon: <Scale size={20} />,
      modules: [
        { id: "05", key: 'qc', icon: <FileSearch className="text-brand-jade" size={32} strokeWidth={1.5} /> },
        { id: "06", key: 'per', icon: <AlertTriangle className="text-brand-jade" size={32} strokeWidth={1.5} /> },
        { id: "07", key: 'abawd', icon: <Clock className="text-brand-jade" size={32} strokeWidth={1.5} /> },
        { id: "02", key: 'rbac', icon: <Lock className="text-brand-jade" size={32} strokeWidth={1.5} /> }
      ]
    },
    {
      key: 'intelligence',
      icon: <Activity size={20} />,
      modules: [
        { id: "04", key: 'rac', icon: <Cpu className="text-brand-jade" size={32} strokeWidth={1.5} /> },
        { id: "03", key: 'burden', icon: <BarChart3 className="text-brand-jade" size={32} strokeWidth={1.5} /> },
        { id: "13", key: 'gateway', icon: <Globe className="text-brand-jade" size={32} strokeWidth={1.5} /> },
        { id: "15", key: 'api', icon: <Code2 className="text-brand-jade" size={32} strokeWidth={1.5} /> }
      ]
    },
    {
      key: 'delivery',
      icon: <Heart size={20} />,
      modules: [
        { id: "08", key: 'adjudication', icon: <Gavel className="text-brand-jade" size={32} strokeWidth={1.5} /> },
        { id: "09", key: 'portal', icon: <Smartphone className="text-brand-jade" size={32} strokeWidth={1.5} /> },
        { id: "12", key: 'academy', icon: <GraduationCap className="text-brand-jade" size={32} strokeWidth={1.5} /> },
        { id: "14", key: 'enrollment', icon: <RefreshCw className="text-brand-jade" size={32} strokeWidth={1.5} /> }
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen flex flex-col">
      {/* Hero Section - Enhanced */}
      <section className="hero-section">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-jade/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="label-uppercase">{t('expertisePage.hero.label')}</h1>
              <h2 className="mb-8">
                {t('expertisePage.hero.title').split(' ').slice(0, -1).join(' ')} <br />
                <span className="text-brand-jade">{t('expertisePage.hero.title').split(' ').slice(-1)}</span>
              </h2>
              <p className="text-xl mb-10 max-w-xl">
                We provide Independent Verification & Validation (IV&V) and Subject Matter Expert (SME) advisory to bridge the gap between legislative intent and operational reality.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="px-8 py-4 bg-brand-jade text-white font-bold rounded-xl hover:bg-[#005a62] transition-all shadow-xl shadow-brand-jade/20 flex items-center gap-2">
                  Request Technical Deep-Dive
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <Suspense fallback={<div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 animate-pulse rounded-[2.5rem]" />}>
                <ArchitectureVisualization />
              </Suspense>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-jade/10 rounded-full blur-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modernization Lifecycle Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="label-muted">{t('expertisePage.lifecycle.label')}</h2>
              <h3 className="tracking-tight mb-6">{t('expertisePage.lifecycle.title')}</h3>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                {t('expertisePage.lifecycle.subtitle')}
              </p>
              <div className="space-y-6">
                {[
                  { key: 'discovery', icon: <FileSearch size={20} /> },
                  { key: 'mapping', icon: <Network size={20} /> },
                  { key: 'verification', icon: <Cpu size={20} /> },
                  { key: 'certification', icon: <CheckCircle2 size={20} /> }
                ].map((phase, i) => (
                  <div key={phase.key} className="flex gap-4 items-start">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-brand-jade">
                      {phase.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{t(`expertisePage.lifecycle.phases.${phase.key}.title`)}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t(`expertisePage.lifecycle.phases.${phase.key}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative lg:h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-brand-jade/5 rounded-[3rem] blur-3xl -z-10" />
              <div className="grid grid-cols-2 gap-4 w-full">
                {[
                  { key: 'discovery', color: 'bg-blue-500' },
                  { key: 'mapping', color: 'bg-brand-jade' },
                  { key: 'verification', color: 'bg-purple-500' },
                  { key: 'certification', color: 'bg-emerald-500' }
                ].map((phase, i) => (
                  <motion.div
                    key={phase.key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-lg flex flex-col items-center text-center gap-4"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${phase.color} text-white flex items-center justify-center font-black text-xl shadow-lg`}>
                      {i + 1}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Phase 0{i + 1}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h2 className="label-muted">{t('expertisePage.expertise.label')}</h2>
            <h3 className="tracking-tight">{t('expertisePage.expertise.title')}</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: 'fidelity', icon: <Shield size={24} /> },
              { key: 'risk', icon: <Scale size={24} /> },
              { key: 'intelligence', icon: <Activity size={24} /> },
              { key: 'delivery', icon: <Heart size={24} /> }
            ].map((pillar, i) => (
              <motion.div 
                key={pillar.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-base card-hover group p-8"
              >
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl shadow-sm group-hover:bg-brand-jade group-hover:text-white transition-all duration-500 inline-block mb-6">
                  {pillar.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                  {t(`expertisePage.expertise.pillars.${pillar.key}.title`)}
                </h4>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t(`expertisePage.expertise.pillars.${pillar.key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Command Center */}
      <section className="bg-slate-50 dark:bg-slate-950 py-24 border-t border-slate-100 dark:border-slate-800">
        <div className="container-wide mb-16">
          <h2 className="label-muted">{t('expertisePage.commandCenter.label')}</h2>
          <h3 className="tracking-tight">{t('expertisePage.commandCenter.title')}</h3>
        </div>
        <div className="container-wide flex flex-col lg:flex-row gap-16">
        {/* Sidebar Navigation */}
        <div className="lg:w-96 shrink-0 space-y-12">
          <div className="p-8 rounded-card bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <h3 className="label-muted mb-8">{t('expertisePage.commandCenter.pillars')}</h3>
            <div className="space-y-3">
              {pillars.map((pillar, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActivePillar(index);
                    setActiveModule(0);
                  }}
                  className={`w-full text-left p-5 rounded-2xl transition-all flex items-center gap-5 group ${
                    activePillar === index 
                      ? 'bg-brand-jade text-white shadow-2xl shadow-brand-jade/30 scale-[1.02]' 
                      : 'hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${activePillar === index ? 'bg-white/20 text-white' : 'bg-brand-jade/10 text-brand-jade group-hover:scale-110 transition-transform'}`}>
                    {pillar.icon}
                  </div>
                  <span className="text-sm font-bold leading-tight">
                    {t(`expertisePage.expertise.pillars.${pillar.key}.title`)}
                  </span>
                </button>
              ))}
            </div>
          </div>

            <div className="p-8 rounded-card border border-slate-100 dark:border-slate-800">
              <h3 className="label-muted mb-8">{t('expertisePage.commandCenter.capabilities')}</h3>
              <div className="grid grid-cols-1 gap-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillar}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    {pillars[activePillar].modules.map((module, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveModule(index)}
                        className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between group ${
                          activeModule === index 
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl' 
                            : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono opacity-50">{module.id}</span>
                          <span className="text-xs font-bold">
                            {t(`expertisePage.expertise.pillars.${pillars[activePillar].key}.modules.${module.key}.title`)}
                          </span>
                        </div>
                        <div className={`text-brand-jade ${activeModule === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                          <ArrowRight size={14} />
                        </div>
                      </button>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
        </div>

        {/* Main Display Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activePillar}-${activeModule}`}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.23, 1, 0.32, 1]
              }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[4rem] p-10 md:p-16 shadow-2xl h-full flex flex-col relative overflow-hidden"
            >
              <div className="flex flex-col gap-12 relative z-10 h-full">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-brand-jade/10 flex items-center justify-center text-brand-jade">
                        {pillars[activePillar].modules[activeModule].icon}
                      </div>
                      <div>
                        <div className="label-uppercase mb-1">{t('expertisePage.commandCenter.capabilities')} {pillars[activePillar].modules[activeModule].id}</div>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tight">
                          {t(`expertisePage.expertise.pillars.${pillars[activePillar].key}.modules.${pillars[activePillar].modules[activeModule].key}.title`)}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xl leading-relaxed max-w-2xl">
                      {t(`expertisePage.expertise.pillars.${pillars[activePillar].key}.modules.${pillars[activePillar].modules[activeModule].key}.desc`)}
                    </p>
                  </div>
                  
                  <div className="shrink-0 w-full lg:w-auto">
                    <a 
                      href="https://calendar.app.google/WiXHqdGmWaG5kxJQ7" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full lg:w-auto px-10 py-5 bg-brand-jade text-white font-bold rounded-2xl hover:bg-[#005a62] transition-all shadow-xl shadow-brand-jade/20 flex items-center justify-center gap-3"
                    >
                      {t('expertisePage.commandCenter.consultation')}
                      <ArrowRight size={20} />
                    </a>
                  </div>
                </div>

                {/* Enlarged Module Graphic */}
                <div className="flex-1 min-h-[400px] bg-slate-50/50 dark:bg-slate-950/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-8 relative group/graphic">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full max-w-4xl">
                      <Suspense fallback={
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-12 h-12 border-4 border-brand-jade/20 border-t-brand-jade rounded-full animate-spin" />
                        </div>
                      }>
                        <ModuleGraphic 
                          id={pillars[activePillar].modules[activeModule].id} 
                          title={`gov.systems/${pillars[activePillar].key}/${pillars[activePillar].modules[activeModule].key}`}
                          subtitle={t(`expertisePage.expertise.pillars.${pillars[activePillar].key}.modules.${pillars[activePillar].modules[activeModule].key}.title`)}
                        />
                      </Suspense>
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-8 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-jade animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('expertisePage.commandCenter.simulation')}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {Object.entries(t(`expertisePage.expertise.pillars.${pillars[activePillar].key}.modules.${pillars[activePillar].modules[activeModule].key}.features`, { returnObjects: true }) as Record<string, { name: string, detail: string }>).map(([fKey, feature], fIndex) => (
                    <div key={fKey} className="p-8 bg-white dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 group hover:border-brand-jade/30 transition-all hover:shadow-xl hover:shadow-brand-jade/5">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                        <div className="w-2 h-2 bg-brand-jade rounded-full" />
                        {feature.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {feature.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        </div>
      </section>

      {/* Quick Stats / Footer CTA */}
      <section className="section-padding border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-24 items-center mb-24">
            <div>
              <h2 className="label-muted">{t('expertisePage.audiences.label')}</h2>
              <h3 className="tracking-tight mb-8">{t('expertisePage.audiences.title')}</h3>
              <div className="space-y-8">
                {[
                  {
                    title: t('expertisePage.audiences.agencies.title'),
                    desc: t('expertisePage.audiences.agencies.desc'),
                    icon: <Building2 className="text-brand-jade" size={24} strokeWidth={1.5} />
                  },
                  {
                    title: t('expertisePage.audiences.vendors.title'),
                    desc: t('expertisePage.audiences.vendors.desc'),
                    icon: <LayoutGrid className="text-brand-jade" size={24} strokeWidth={1.5} />
                  },
                  {
                    title: t('expertisePage.audiences.coalitions.title'),
                    desc: t('expertisePage.audiences.coalitions.desc'),
                    icon: <Users className="text-brand-jade" size={24} strokeWidth={1.5} />
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-12 rounded-[3rem] border border-slate-200 dark:border-slate-700 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-jade/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <h4 className="text-brand-jade font-bold text-sm uppercase tracking-widest mb-6">{t('expertisePage.audiences.trusted.label')}</h4>
              <p className="text-xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                {t('expertisePage.audiences.trusted.title')}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['IRS', 'FNS', 'DHS', 'VITA'].map((org) => (
                  <div key={org} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                    <span className="text-lg font-black text-brand-jade">{org}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center pt-24 border-t border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-3xl font-black mb-6">{t('expertisePage.cta.title')}</h3>
              <p className="text-lg mb-8">
                {t('expertisePage.cta.desc')}
              </p>
              <div className="flex gap-12">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t('expertisePage.cta.stats.capabilities')}</p>
                  <p className="text-3xl font-black text-brand-jade">16</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t('expertisePage.cta.stats.pillars')}</p>
                  <p className="text-3xl font-black text-brand-jade">04</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t('expertisePage.cta.stats.compliance')}</p>
                  <p className="text-3xl font-black text-brand-jade">{t('expertisePage.cta.stats.federal')}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <a 
                href="https://calendar.app.google/WiXHqdGmWaG5kxJQ7" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-6 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold rounded-[2rem] hover:scale-105 transition-transform flex items-center gap-4 shadow-2xl"
              >
                {t('expertisePage.cta.action')}
                <ArrowRight size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
