import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ShieldCheck, X, Loader2, FileJson, ArrowRight } from 'lucide-react';
import { useCase } from '../context/CaseContext';

interface AuditDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuditDispatchModal({ isOpen, onClose }: AuditDispatchModalProps) {
  const { activeCaseId, dispatchAuditTrail, isDispatching } = useCase();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setStatus('idle');
      await dispatchAuditTrail(email);
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setEmail('');
      }, 2500);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Transmission failed.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-brand-jade/10 p-2 rounded-xl">
                  <ShieldCheck className="text-brand-jade" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Dispatch Audit</h3>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">IMMUTABLE DISPATCH ENGINE</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 pt-4">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-brand-jade/10 text-brand-jade rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Audit Transmission Complete</h4>
                  <p className="text-sm text-slate-500">
                    Your forensic record was successfully dispatched to <span className="font-bold text-slate-700 dark:text-slate-300">{email}</span>.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 mb-6 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-2">
                      <FileJson className="text-brand-jade" size={16} />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Resource</span>
                    </div>
                    <p className="text-sm font-mono font-medium text-slate-600 dark:text-slate-300 truncate">
                      APS_AUDIT_LOG_{activeCaseId}.json
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                        Work Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@agency.gov"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-jade focus:border-brand-jade outline-none transition-all"
                        />
                      </div>
                    </div>

                    {status === 'error' && (
                      <p className="text-xs text-red-500 bg-red-50 dark:bg-red-500/10 p-3 rounded-xl border border-red-100 dark:border-red-500/20">
                        {errorMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isDispatching}
                      className="w-full py-4 bg-brand-navy dark:bg-white text-white dark:text-brand-navy rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-brand-navy/10 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isDispatching ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Dispatching...
                        </>
                      ) : (
                        <>
                          Secure Dispatch
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2">
              <ShieldCheck className="text-brand-jade opacity-50" size={12} />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                End-to-End Secure Forensic Channel
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
