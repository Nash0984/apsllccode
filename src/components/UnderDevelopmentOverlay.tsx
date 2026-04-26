import React from 'react';
import { Construction } from 'lucide-react';

export default function UnderDevelopmentOverlay() {
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/40 backdrop-blur-[2px]" />
      <div className="relative rotate-[-12deg] border-y-4 border-brand-jade/30 py-4 w-[150%] text-center bg-brand-jade/10">
        <div className="flex items-center justify-center gap-8 animate-marquee whitespace-nowrap">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Construction className="text-brand-jade" size={24} />
              <span className="text-3xl font-black tracking-tighter text-brand-jade opacity-60">
                ARCHITECTURAL PREVIEW // UNDER DEVELOPMENT
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Centered Badge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <div className="bg-white dark:bg-slate-900 border-2 border-brand-jade px-8 py-4 rounded-2xl shadow-2xl flex flex-col items-center gap-2 transform transition-transform hover:scale-105">
          <Construction className="text-brand-jade" size={48} />
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">DEVELOPMENT PREVIEW</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">This module is currently being finalized.</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </div>
  );
}
