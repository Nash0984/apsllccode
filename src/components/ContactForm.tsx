import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useToast } from '../context/ToastContext';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  organization: z.string().min(2, 'Organization must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setStatus('success');
      showToast(t('contactPage.contactForm.success'), 'success');
      setFormData({ name: '', email: '', organization: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      showToast(t('contactPage.contactForm.error'), 'error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-base bg-brand-jade/5 border-brand-jade/20 p-12 text-center space-y-6"
      >
        <div className="w-20 h-20 bg-brand-jade text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-brand-jade/20">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t('contactPage.contactForm.title')}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          {t('contactPage.contactForm.success')}
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-brand-jade font-bold hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <div className="card-base p-8 sm:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-jade/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {t('contactPage.contactForm.title')}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mb-10 text-sm sm:text-base">
          {t('contactPage.contactForm.desc')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-400">
                {t('contactPage.contactForm.name')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-jade transition-all ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                placeholder="John Doe"
              />
              {errors.name && <p id="name-error" className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400">
                {t('contactPage.contactForm.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-jade transition-all ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                placeholder="john@organization.gov"
              />
              {errors.email && <p id="email-error" className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="organization" className="text-xs font-black uppercase tracking-widest text-slate-400">
              {t('contactPage.contactForm.organization')}
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              required
              aria-required="true"
              aria-invalid={errors.organization ? 'true' : 'false'}
              aria-describedby={errors.organization ? 'organization-error' : undefined}
              value={formData.organization}
              onChange={handleChange}
              className={`w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-jade transition-all ${errors.organization ? 'ring-2 ring-red-500' : ''}`}
              placeholder="Agency or Firm Name"
            />
            {errors.organization && <p id="organization-error" className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.organization}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-slate-400">
              {t('contactPage.contactForm.message')}
            </label>
            <textarea
              id="message"
              name="message"
              required
              aria-required="true"
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-jade transition-all resize-none ${errors.message ? 'ring-2 ring-red-500' : ''}`}
              placeholder="How can we assist with your modernization strategy?"
            />
            {errors.message && <p id="message-error" className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.message}</p>}
          </div>

          <AnimatePresence>
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-xs font-bold"
              >
                <AlertCircle size={16} />
                {t('contactPage.contactForm.error')}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-4 bg-brand-jade text-white font-bold rounded-xl hover:bg-[#005a62] transition-all shadow-lg shadow-brand-jade/20 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                {t('contactPage.contactForm.submitting')}
              </>
            ) : (
              <>
                <Send size={20} />
                {t('contactPage.contactForm.submit')}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
