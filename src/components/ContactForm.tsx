import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle, AlertCircle, Building2, User, Mail, MessageSquare, ChevronRight, Loader } from 'lucide-react';
import { trackInteraction } from '../services/analytics';

export function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    topic: 'General Inquiry',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const topics = [
    "General Inquiry",
    "Architectural Consultation",
    "IV&V Services",
    "Modernization Strategy",
    "Statutory Logic Extraction"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    trackInteraction('ContactForm', 'Submission Started');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          // Merge topic into message for the backend if needed, 
          // but our backend ContactRequestSchema expects exactly these fields
          // name, email, organization, message
          message: `[Topic: ${formData.topic}]\n\n${formData.message}`
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to submit inquiry");

      setStatus('success');
      trackInteraction('ContactForm', 'Submission Successful');
      setFormData({ name: '', organization: '', email: '', topic: 'General Inquiry', message: '' });
      
    } catch (error) {
      console.error("[CONTACT-SUBMIT-ERROR]", error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : "Service temporarily unavailable.");
      trackInteraction('ContactForm', 'Submission Failed');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 px-8 text-center"
      >
        <div className="w-20 h-20 bg-brand-jade/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-brand-jade" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">{t('contact.form.success').split('.')[0]}</h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-8">
          {t('contact.form.success')}
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="flex items-center gap-2 text-brand-jade font-bold text-sm hover:underline"
        >
          Send another message <ChevronRight size={16} />
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8 font-sans">
      <div className="space-y-6">
        {/* Name & Org Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
              {t('contact.form.name')}
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-jade transition-colors">
                <User size={18} />
              </div>
              <input
                required
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-slate-50 dark:bg-[#0a1017] border border-slate-200 dark:border-slate-800/50 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-jade/50 focus:ring-1 focus:ring-brand-jade/50 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="organization" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
              {t('contact.form.organization')}
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-jade transition-colors">
                <Building2 size={18} />
              </div>
              <input
                required
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Agency or Organization"
                className="w-full bg-slate-50 dark:bg-[#0a1017] border border-slate-200 dark:border-slate-800/50 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-jade/50 focus:ring-1 focus:ring-brand-jade/50 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
            {t('contact.form.email')}
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-jade transition-colors">
              <Mail size={18} />
            </div>
            <input
              required
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@agency.gov"
              className="w-full bg-slate-50 dark:bg-[#0a1017] border border-slate-200 dark:border-slate-800/50 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-jade/50 focus:ring-1 focus:ring-brand-jade/50 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
            />
          </div>
        </div>

        {/* Topic Selection */}
        <div className="space-y-2">
          <label htmlFor="topic" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
            {t('contact.form.inquiryType.label')}
          </label>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-[#0a1017] border border-slate-200 dark:border-slate-800/50 rounded-xl py-3.5 px-4 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-jade/50 focus:ring-1 focus:ring-brand-jade/50 transition-all appearance-none cursor-pointer"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Architectural Consultation">Architectural Consultation</option>
            <option value="IV&V Services">IV&V Services</option>
            <option value="Modernization Strategy">Modernization Strategy</option>
            <option value="Statutory Logic Extraction">Statutory Logic Extraction</option>
          </select>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
            {t('contact.form.message')}
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-5 text-slate-400 group-focus-within:text-brand-jade transition-colors">
              <MessageSquare size={18} />
            </div>
            <textarea
              required
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Please provide details regarding your inquiry..."
              className="w-full bg-slate-50 dark:bg-[#0a1017] border border-slate-200 dark:border-slate-800/50 rounded-xl py-4 pl-12 pr-4 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-jade/50 focus:ring-1 focus:ring-brand-jade/50 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none"
            />
          </div>
        </div>
      </div>

      {status === 'error' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-xs font-bold"
        >
          <AlertCircle size={16} />
          <span>{errorMessage}</span>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="relative w-full group overflow-hidden py-4 bg-brand-jade text-white rounded-xl font-bold transition-all hover:bg-[#005a62] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-brand-jade/10 active:scale-[0.98]"
      >
        <div className="relative z-10 flex items-center justify-center gap-3">
          {status === 'submitting' ? (
            <>
              <Loader size={20} className="animate-spin" />
              <span>SENDING INQUIRY...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>{t('contact.form.submit').toUpperCase()}</span>
            </>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
      </button>

      <p className="text-[10px] text-center text-slate-400 dark:text-slate-600 font-medium">
        By submitting, you agree to our data handling and security protocols.
      </p>
    </form>
  );
}
