import { motion } from 'motion/react';
import { Database, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Per() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-white dark:bg-slate-950">
      <div className="container-wide">
        <Link to="/insights" className="inline-flex items-center gap-2 text-brand-jade font-bold mb-12 hover:gap-3 transition-all">
          <ArrowLeft size={16} />
          Back to Insights
        </Link>
        
        <div className="max-w-4xl">
          <div className="w-16 h-16 rounded-2xl bg-brand-jade/10 flex items-center justify-center text-brand-jade mb-8">
            <Database size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Programmatic Eligibility Rules (PER)
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
            Detailed technical analysis of deterministic eligibility logic in public benefits administration.
          </p>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
            <p className="mb-6">
              This research document outlines the methodology for converting dense legislative text into 
              mathematically verifiable business rules. By establishing a deterministic logic layer, 
              agencies can ensure 100% statutory fidelity while reducing administrative overhead.
            </p>
            
            <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 mb-12">
              <h3 className="text-lg font-bold mb-4">Key Findings</h3>
              <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                <li className="flex gap-3">
                  <span className="text-brand-jade font-bold">•</span>
                  Procedural drop-offs are reduced by 40% when using conversational schemas mapped to PER.
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-jade font-bold">•</span>
                  Audit trails become self-documenting through policy traceability models.
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-jade font-bold">•</span>
                  System maintenance costs decrease as logic is decoupled from legacy codebase.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
