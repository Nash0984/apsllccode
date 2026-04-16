import { motion } from 'motion/react';
import { FileText, Network, Binary, Shield, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ArchitectureVisualization() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      key: "ingestion",
      title: "Statutory Ingestion",
      desc: "Raw legislative text, federal privacy mandates (e.g., IRS Pub 1075), and state policy directives are ingested as the immutable source of truth for deterministic compliance.",
      icon: <FileText size={24} />
    },
    {
      key: "llm",
      title: "Neuro-Symbolic Triage",
      desc: "Large Language Models (LLMs) map dense administrative requirements into plain-language, human-centered conversational schemas, reducing procedural drop-offs.",
      icon: <Network size={24} />
    },
    {
      key: "logic",
      title: "Deterministic Engine",
      desc: "The core verification layer. All conversational inputs are mathematically evaluated against hardcoded business rules to guarantee absolute statutory fidelity and zero hallucination risk.",
      icon: <Binary size={24} />
    },
    {
      key: "output",
      title: "Verifiable Payloads",
      desc: "Verified eligibility outcomes are compiled into secure API payloads, creating an auditable IV&V data trail for longitudinal evaluation and federal compliance.",
      icon: <Shield size={24} />
    }
  ];

  return (
    <div className="relative p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00796b 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      <div className="relative z-10">
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-jade mb-2">Reference Architecture</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Hybrid Rules Engine Data Flow</p>
        </div>

        {/* Scrollable Pipeline Container for Mobile */}
        <div className="w-full overflow-x-auto pb-6 -mb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex justify-between items-center mb-12 min-w-[480px] md:min-w-full">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1 last:flex-none">
                <motion.button
                  onClick={() => setActiveStep(index)}
                  aria-label={`View step ${index + 1}: ${step.title}`}
                  aria-pressed={activeStep === index}
                  className={`relative shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                    activeStep === index 
                      ? `bg-brand-jade text-white shadow-lg scale-110` 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.icon}
                  {activeStep === index && (
                    <motion.div
                      layoutId="active-glow"
                      className="absolute inset-0 rounded-2xl blur-xl bg-brand-jade opacity-40 -z-10"
                    />
                  )}
                </motion.button>
                {index < steps.length - 1 && (
                  <div className="flex-1 min-w-[32px] h-px bg-slate-200 dark:bg-slate-800 mx-3 sm:mx-4 relative overflow-hidden">
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: activeStep > index ? '100%' : '-100%' }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 bg-brand-jade"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-[140px] sm:min-h-[120px] mt-4 sm:mt-0" aria-live="polite">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Responsive Header: Stacks on mobile, inline on desktop */}
            <div className="flex flex-col sm:flex-row sm:items-center items-start gap-2 sm:gap-3">
              <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-widest bg-brand-jade">
                Node 0{activeStep + 1}
              </span>
              <h4 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                {steps[activeStep].title}
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {steps[activeStep].desc}
            </p>
          </motion.div>
        </div>

        <div className="mt-8 pt-6 sm:pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex gap-1">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`h-1.5 rounded-full transition-all ${
                  activeStep === index ? 'w-8 bg-brand-jade' : 'w-2 bg-slate-200 dark:bg-slate-800'
                }`} 
              />
            ))}
          </div>
          <button 
            onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
            className="text-xs font-bold text-brand-jade flex items-center gap-2 hover:gap-3 transition-all"
          >
            Advance Pipeline
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}