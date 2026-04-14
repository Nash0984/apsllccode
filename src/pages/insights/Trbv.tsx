import { motion } from 'motion/react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Trbv() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-white dark:bg-slate-950">
      <div className="container-wide">
        <Link to="/insights" className="inline-flex items-center gap-2 text-brand-jade font-bold mb-12 hover:gap-3 transition-all">
          <ArrowLeft size={16} />
          Back to Insights
        </Link>
        
        <div className="max-w-4xl">
          <div className="w-16 h-16 rounded-2xl bg-brand-jade/10 flex items-center justify-center text-brand-jade mb-8">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Trust-Based Verification (TRBV)
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
            A framework for balancing security and accessibility in public service delivery.
          </p>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Security Architecture</h2>
            <p className="mb-6">
              TRBV leverages cryptographic proofs and zero-knowledge protocols to verify eligibility 
              without exposing sensitive personal identifiable information (PII).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
