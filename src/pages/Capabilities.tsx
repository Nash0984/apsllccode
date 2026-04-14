import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, Shield, Binary, Lock, Activity } from 'lucide-react';

// Corrected native default import pattern to prevent module resolution failures
const ArchitectureVisualization = lazy(() => import('../components/ArchitectureVisualization'));

export function Capabilities() {
  const { t } = useTranslation();

  const coreCapabilities = [
    { 
      title: "Hybrid Rules Engine Architecture",
      desc: "Architecting public benefits eligibility and tax filing systems using a hybrid intelligence model. This combines Large Language Models (LLMs) for plain-language triage with deterministic logic engines to ensure mathematical statutory compliance.",
      icon: <Binary className="text-brand-jade mb-6" size={32} />,
      deliverables: ["Deterministic Logic Models", "Rules Engine Architectures", "Hybrid Logic & LLM Architectures"]
    },
    { 
      title: "SNAP PER & Fiscal Risk Mitigation",
      desc: "Root cause analysis and systemic diagnostics for Supplemental Nutrition Assistance Program (SNAP) Payment Error Rates (PER). We identify whether calculation failures originate from administrative workflows or core Business Rules Engine logic to prevent federal sanctions.",
      icon: <Activity className="text-brand-jade mb-6" size={32} />,
      deliverables: ["Evidence Triage Schemas", "Eligibility Logic Workflows"]
    },
    { 
      title: "Federal Tax Data & Privacy Compliance",
      desc: "Architectural blueprinting for the secure integration of tax administration and primary welfare programs. This includes strict adherence to IRS Publication 1075 and IRC § 7216 requirements when handling cross-enrollment data and civic tech integrations.",
      icon: <Lock className="text-brand-jade mb-6" size={32} />,
      deliverables: ["Interagency Data Exchange Models", "System Security Plans (SSP)"]
    },
    { 
      title: "Statutory Verification (IV&V)",
      desc: "Independent Verification and Validation (IV&V) for state IT modernization tenders. We ensure vendor-built logic directly mirrors written legislative mandates, preventing procedural drop-offs and ensuring strict statutory adherence survives the translation to code.",
      icon: <Shield className="text-brand-jade mb-6" size={32} />,
      deliverables: ["Policy Traceability Models", "Algorithmic Bias Diagnostics"]
    }
  ];

  const pathways = ['sprints', 'advisory', 'integration'];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <Helmet>
        <title>{t('routes.expertise.label')} | Applied Policy Systems</title>
        <meta name="description" content="Review our compliance frameworks, technical service models, and standard capability matrices." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-jade/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="container-wide relative text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="label-uppercase">{t('routes.expertise.label')}</h1>
            <h2 className="max-w-4xl mx-auto lg:mx-0 text-4xl md:text-5xl lg:text-6xl mb-8">
              {t('expertisePage.hero.title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
              {t('expertisePage.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Consulting Practice Areas */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h2 className="label-muted">{t('expertisePage.expertise.label')}</h2>
            <h3 className="tracking-tight">{t('expertisePage.expertise.title')}</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 sm:gap-16">
            {coreCapabilities.map((cap, i) => (
              <motion.div 
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-t-2 border-slate-200 dark:border-slate-800 pt-8 flex flex-col h-full"
              >
                <div>
                  {cap.icon}
                  <h4 className="text-2xl font-bold mb-4">{cap.title}</h4>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    {cap.desc}
                  </p>
                </div>
                
                {/* Deliverables Sub-Matrix (Monospace Tags) */}
                <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-brand-jade mb-4">Technical Deliverables</h5>
                  <div className="flex flex-wrap gap-2">
                    {cap.deliverables.map((deliverable) => (
                      <span 
                        key={deliverable} 
                        className="px-2.5 py-1.5 text-xs font-mono font-medium border border-slate-200 dark:border-slate-700 rounded-md bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300"
                      >
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Break: Pipeline Architecture */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-wide">
          <Suspense fallback={<div className="h-[400px] w-full bg-slate-100 dark:bg-slate-900 animate-pulse rounded-[2.5rem]"></div>}>
            <ArchitectureVisualization />
          </Suspense>
        </div>
      </section>

      {/* Procurement Pathways */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h2 className="label-muted">{t('expertisePage.engagements.label')}</h2>
            <h3 className="tracking-tight">{t('expertisePage.engagements.title')}</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 border-t border-slate-200 dark:border-slate-700 pt-8">
            {pathways.map((pathway, i) => (
              <motion.div 
                key={pathway}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group block border-t-2 border-slate-200 dark:border-slate-800 pt-6 hover:border-brand-jade transition-colors"
              >
                <h4 className="text-xl sm:text-2xl font-bold mb-4 flex items-center justify-between">
                  {t(`expertisePage.engagements.pathways.${pathway}.title`)}
                  <ArrowUpRight size={24} className="text-brand-jade opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transform translate-y-0 lg:translate-y-1 lg:group-hover:translate-y-0 transition-all duration-300" />
                </h4>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t(`expertisePage.engagements.pathways.${pathway}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}