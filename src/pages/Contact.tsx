import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Linkedin, ShieldCheck, ArrowRight } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';

export function Contact() {
  const { t } = useTranslation();

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 font-sans">
      
      {/* Background Depth Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-jade/10 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-20" />

      {/* Header Section */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-16 sm:mb-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
          Start a Conversation.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          Whether you are evaluating a state-level modernization effort or navigating federal compliance mandates, our architecture team is available to assist.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Direct Channels */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Direct Channels
            </h3>
            
            <div className="space-y-4">
              {/* Email */}
              <a href="mailto:info@appliedpolicysystems.com" className="group flex items-center p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/50 hover:border-brand-jade/30 dark:hover:border-brand-jade/30 transition-all shadow-sm hover:shadow-md">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-brand-jade/10 transition-colors mr-4 shrink-0">
                  <Mail size={20} className="text-slate-500 dark:text-slate-400 group-hover:text-brand-jade transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">Email</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">info@appliedpolicysystems.com</p>
                </div>
                <ArrowRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-brand-jade opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 shrink-0 ml-2" />
              </a>

              {/* LinkedIn */}
              <a href="https://linkedin.com/company/applied-policy-systems" target="_blank" rel="noopener noreferrer" className="group flex items-center p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/50 hover:border-brand-jade/30 dark:hover:border-brand-jade/30 transition-all shadow-sm hover:shadow-md">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-brand-jade/10 transition-colors mr-4 shrink-0">
                  <Linkedin size={20} className="text-slate-500 dark:text-slate-400 group-hover:text-brand-jade transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">LinkedIn</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Applied Policy Systems</p>
                </div>
                <ArrowRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-brand-jade opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 shrink-0 ml-2" />
              </a>

              {/* Location */}
              <div className="flex items-center p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/50 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mr-4 shrink-0">
                  <MapPin size={20} className="text-slate-500 dark:text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">Location</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Philadelphia, PA</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Security Context Note */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-[#0a1017] border border-slate-200 dark:border-slate-800/50">
            <ShieldCheck size={20} className="text-brand-jade shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              All inquiries are routed securely to our architecture team. Please exclude any sensitive Personally Identifiable Information (PII) or Federal Tax Information (FTI) from initial communications.
            </p>
          </div>
        </div>

        {/* Right Column: Unified Chat Intake */}
        <div className="lg:col-span-7">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-jade/20 to-teal-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-white dark:bg-[#050a0f] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-2xl overflow-hidden ring-1 ring-white/10">
              <ContactForm />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}