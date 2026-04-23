import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STATE_RULES_ONTOLOGY } from '../../config/ontology';
import { ShieldCheck, Scale, Binary } from 'lucide-react';

interface StatuteTooltipProps {
  statuteId: string;
  children: React.ReactNode;
}

export function StatuteTooltip({ statuteId, children }: StatuteTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rule = STATE_RULES_ONTOLOGY[statuteId];

  if (!rule) return <>{children}</>;

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="cursor-help border-b border-dotted border-brand-jade text-brand-jade font-medium">
        {children}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl pointer-events-none"
          >
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
              <ShieldCheck size={16} className="text-brand-jade" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                Deterministic Authority
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-jade mb-1">
                  <Scale size={12} /> Statutory Citation
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {rule.statute}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-jade mb-1">
                  <Binary size={12} /> Procedural Axiom
                </div>
                <div className="text-[10px] leading-relaxed text-slate-600 dark:text-slate-400 italic">
                  {rule.explanation}
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-slate-900 border-r border-b border-slate-200 dark:border-slate-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
