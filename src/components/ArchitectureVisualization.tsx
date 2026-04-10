import { motion } from 'motion/react';
import { FileText, Binary, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function ArchitectureVisualization() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      key: "discovery",
      icon: <FileText size={24} />,
      color: "bg-blue-500"
    },
    {
      key: "mapping",
      icon: <Binary size={24} />,
      color: "bg-indigo-500"
    },
    {
      key: "verification",
      icon: <Cpu size={24} />,
      color: "bg-brand-jade"
    },
    {
      key: "certification",
      icon: <CheckCircle2 size={24} />,
      color: "bg-emerald-500"
    }
  ];

  return (
    <div className="relative p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00796b 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      <div className="relative z-10">
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-jade mb-2">{t('expertisePage.lifecycle.title')}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('expertisePage.lifecycle.subtitle')}</p>
        </div>
        <div className="flex justify-between items-center mb-12">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-1 last:flex-none">
              <motion.button
                onClick={() => setActiveStep(index)}
                className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  activeStep === index 
                    ? `${step.color} text-white shadow-lg scale-110` 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {step.icon}
                {activeStep === index && (
                  <motion.div
                    layoutId="active-glow"
                    className={`absolute inset-0 rounded-2xl blur-xl ${step.color} opacity-40 -z-10`}
                  />
                )}
              </motion.button>
              {index < steps.length - 1 && (
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800 mx-4 relative overflow-hidden">
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

        <div className="min-h-[120px]">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-widest ${steps[activeStep].color}`}>
                Phase 0{activeStep + 1}
              </span>
              <h4 className="text-xl font-black text-slate-900 dark:text-white">
                {t(`expertisePage.lifecycle.phases.${steps[activeStep].key}.title`)}
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {t(`expertisePage.lifecycle.phases.${steps[activeStep].key}.desc`)}
            </p>
          </motion.div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
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
            {t('expertisePage.commandCenter.nextPhase')}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
