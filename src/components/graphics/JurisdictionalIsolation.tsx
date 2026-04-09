import { motion } from 'motion/react';
import { Shield, Globe, Lock, CheckCircle2 } from 'lucide-react';

export default function JurisdictionalIsolation() {
  return (
    <div className="p-8 h-full flex flex-col items-center justify-center">
      <div className="relative w-full max-w-md h-full flex items-center justify-center">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] text-slate-900 dark:text-white" 
             style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="relative flex items-center justify-center">
          {/* Federal Node */}
          <motion.div 
            className="relative z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-24 h-24 rounded-[2rem] bg-brand-jade flex flex-col items-center justify-center shadow-2xl shadow-brand-jade/40 border-4 border-white dark:border-slate-800">
              <Shield className="text-white mb-1" size={32} strokeWidth={1.5} />
              <span className="text-[8px] font-black text-white uppercase tracking-tighter">FEDERAL</span>
            </div>
            {/* Pulse Effect */}
            <motion.div 
              className="absolute inset-0 rounded-[2rem] bg-brand-jade/20 -z-10"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Connection Lines with Data Packets */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <div key={angle} className="absolute" style={{ transform: `rotate(${angle}deg) translateX(80px)` }}>
                <div className="w-16 h-px bg-slate-200 dark:bg-slate-800 relative">
                  <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-jade/40"
                    animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: angle / 100 }}
                  />
                  {/* Isolation Barrier */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-slate-400 dark:bg-slate-600 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* State Nodes */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div 
                key={angle}
                className="absolute"
                style={{ transform: `rotate(${angle}deg) translateX(140px) rotate(-${angle}deg)` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col items-center justify-center group-hover/window:border-brand-jade/30 transition-colors relative">
                  <Globe className="text-slate-400 dark:text-slate-600 mb-1" size={18} strokeWidth={1.5} />
                  <span className="text-[6px] font-bold text-slate-400 uppercase tracking-widest">STATE {i + 1}</span>
                  {/* Lock Icon Overlay */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm border-2 border-white dark:border-slate-900">
                    <Lock size={10} strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend/Status Bar */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-jade" />
            <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Federal Baseline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Isolated Environment</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
          <CheckCircle2 size={10} className="text-emerald-500" />
          <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400">JURISDICTIONAL_LOCK: ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
