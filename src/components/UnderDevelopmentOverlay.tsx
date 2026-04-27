import React from 'react';
import { RefreshCcw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UnderDevelopmentOverlay() {
  return (
    <div className="absolute inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/40 backdrop-blur-[2px]" />
      <div className="relative rotate-[-12deg] border-y-4 border-brand-jade/30 py-4 w-[150%] text-center bg-brand-jade/10">
        <div className="flex items-center justify-center gap-8 animate-marquee whitespace-nowrap">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <RefreshCcw className="text-brand-jade animate-spin-slow" size={24} />
              <span className="text-3xl font-black tracking-tighter text-brand-jade opacity-60">
                SYSTEM UPDATE IN PROGRESS // ARCHITECTURAL REFINEMENT
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Centered Badge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <div className="bg-white dark:bg-slate-900 border-2 border-brand-jade p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-6 transform transition-transform hover:scale-105 max-w-sm w-full text-center">
          <div className="bg-brand-jade/10 p-5 rounded-full">
            <RefreshCcw className="text-brand-jade animate-spin-slow" size={64} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">SYSTEM UPDATE</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              This module is currently undergoing a scheduled architectural refresh to ensure maximum statutory compliance.
            </p>
          </div>
          <Link 
            to="/" 
            className="w-full py-4 bg-brand-navy dark:bg-white text-white dark:text-brand-navy rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#001a1d] dark:hover:bg-slate-100 transition-colors shadow-lg"
          >
            <ArrowLeft size={20} />
            Return to Homepage
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
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
