import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Mail, Building2, User, Send, AlertCircle, Linkedin } from 'lucide-react';
import { useState, FormEvent, ChangeEvent } from 'react';

export function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    consultationType: '',
    taxSystemDetails: '',
    benefitReviewDetails: '',
    policyStrategyDetails: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
    if (!formData.consultationType) newErrors.consultationType = 'Please select a consultation type';
    
    if (formData.consultationType === 'Tax System Modernization' && !formData.taxSystemDetails.trim()) {
      newErrors.taxSystemDetails = 'Please specify your current system or challenge';
    }
    if (formData.consultationType === 'Benefit Eligibility Review' && !formData.benefitReviewDetails.trim()) {
      newErrors.benefitReviewDetails = 'Please specify the benefit program';
    }
    if (formData.consultationType === 'Policy Implementation Strategy' && !formData.policyStrategyDetails.trim()) {
      newErrors.policyStrategyDetails = 'Please specify the policy domain';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ 
        name: '', 
        email: '', 
        organization: '', 
        consultationType: '',
        taxSystemDetails: '',
        benefitReviewDetails: '',
        policyStrategyDetails: '',
        message: '' 
      });
    }, 1500);
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-slate-400 mb-6">Contact</h1>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl">
            Start a Strategic Consultation.
          </h2>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div>
              <p className="text-xl text-slate-500 leading-relaxed mb-12">
                Whether you are a government agency looking to ensure policy fidelity or a GovTech vendor seeking system clarity, we are ready to help bridge the disconnect.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-jade group-hover:bg-brand-jade group-hover:text-white transition-all duration-300">
                    <Mail size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email</p>
                    <p className="text-lg font-bold text-slate-900">contact@appliedpolicy.systems</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-jade group-hover:bg-brand-jade group-hover:text-white transition-all duration-300">
                    <Building2 size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Location</p>
                    <p className="text-lg font-bold text-slate-900">Philadelphia, PA | Maryland</p>
                  </div>
                </div>
                <a 
                  href="https://www.linkedin.com/company/applied-policy-systems" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-jade group-hover:bg-brand-jade group-hover:text-white transition-all duration-300">
                    <Linkedin size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">LinkedIn</p>
                    <p className="text-lg font-bold text-slate-900 group-hover:text-brand-jade transition-colors">Follow Applied Policy Systems</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-brand-jade/5 rounded-[3rem] blur-3xl opacity-50" />
              <div className="relative bg-white p-10 md:p-14 rounded-[3rem] border border-slate-200 shadow-2xl min-h-[600px] flex flex-col">
                <AnimatePresence mode="wait">
                  {formStatus === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center py-16 flex-grow flex flex-col justify-center"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                        className="w-24 h-24 bg-brand-jade/10 text-brand-jade rounded-full flex items-center justify-center mx-auto mb-8"
                      >
                        <CheckCircle2 size={48} strokeWidth={1.5} />
                      </motion.div>
                      <h4 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Inquiry Received</h4>
                      <p className="text-slate-500 text-lg leading-relaxed max-w-sm mx-auto">
                        Thank you for reaching out. Our team will review your request and respond within 24-48 hours.
                      </p>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormStatus('idle')}
                        className="mt-12 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg"
                      >
                        Send another message
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="space-y-8"
                      noValidate
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                          <div className="relative">
                            <User className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? 'text-red-400' : 'text-slate-400'}`} size={20} strokeWidth={1.5} aria-hidden="true" />
                            <input 
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              type="text" 
                              placeholder="John Doe"
                              aria-invalid={!!errors.name}
                              aria-describedby={errors.name ? "name-error" : undefined}
                              required
                              className={`w-full pl-14 pr-6 py-5 bg-slate-50/50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-slate-400 ${
                                errors.name 
                                  ? 'border-red-200 focus:ring-red-500/10 focus:border-red-400' 
                                  : 'border-slate-200 focus:ring-brand-jade/10 focus:border-brand-jade focus:bg-white'
                              }`}
                            />
                          </div>
                          {errors.name && (
                            <motion.p id="name-error" role="alert" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs font-bold text-red-500 flex items-center gap-1.5 ml-1">
                              <AlertCircle size={12} /> {errors.name}
                            </motion.p>
                          )}
                        </div>
                        <div className="space-y-3">
                          <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                          <div className="relative">
                            <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-slate-400'}`} size={20} strokeWidth={1.5} aria-hidden="true" />
                            <input 
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              type="email" 
                              placeholder="john@organization.gov"
                              aria-invalid={!!errors.email}
                              aria-describedby={errors.email ? "email-error" : undefined}
                              required
                              className={`w-full pl-14 pr-6 py-5 bg-slate-50/50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-slate-400 ${
                                errors.email 
                                  ? 'border-red-200 focus:ring-red-500/10 focus:border-red-400' 
                                  : 'border-slate-200 focus:ring-brand-jade/10 focus:border-brand-jade focus:bg-white'
                              }`}
                            />
                          </div>
                          {errors.email && (
                            <motion.p id="email-error" role="alert" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs font-bold text-red-500 flex items-center gap-1.5 ml-1">
                              <AlertCircle size={12} /> {errors.email}
                            </motion.p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="organization" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Organization</label>
                        <div className="relative">
                          <Building2 className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${errors.organization ? 'text-red-400' : 'text-slate-400'}`} size={20} strokeWidth={1.5} aria-hidden="true" />
                          <input 
                            id="organization"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            type="text" 
                            placeholder="Agency or Company Name"
                            aria-invalid={!!errors.organization}
                            aria-describedby={errors.organization ? "organization-error" : undefined}
                            required
                            className={`w-full pl-14 pr-6 py-5 bg-slate-50/50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-slate-400 ${
                              errors.organization 
                                ? 'border-red-200 focus:ring-red-500/10 focus:border-red-400' 
                                : 'border-slate-200 focus:ring-brand-jade/10 focus:border-brand-jade focus:bg-white'
                            }`}
                          />
                        </div>
                        {errors.organization && (
                          <motion.p id="organization-error" role="alert" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs font-bold text-red-500 flex items-center gap-1.5 ml-1">
                            <AlertCircle size={12} /> {errors.organization}
                          </motion.p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="consultationType" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Consultation Type</label>
                        <select 
                          id="consultationType"
                          name="consultationType"
                          value={formData.consultationType}
                          onChange={(e) => {
                            const { name, value } = e.target;
                            setFormData(prev => ({ 
                              ...prev, 
                              [name]: value,
                              // Reset sub-fields when type changes
                              taxSystemDetails: '',
                              benefitReviewDetails: '',
                              policyStrategyDetails: ''
                            }));
                            if (errors[name]) {
                              setErrors(prev => {
                                const next = { ...prev };
                                delete next[name];
                                return next;
                              });
                            }
                          }}
                          className={`w-full px-6 py-5 bg-slate-50/50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 appearance-none cursor-pointer ${
                            errors.consultationType 
                              ? 'border-red-200 focus:ring-red-500/10 focus:border-red-400' 
                              : 'border-slate-200 focus:ring-brand-jade/10 focus:border-brand-jade focus:bg-white'
                          }`}
                        >
                          <option value="" disabled>Select a consultation type</option>
                          <option value="Tax System Modernization">Tax System Modernization</option>
                          <option value="Benefit Eligibility Review">Benefit Eligibility Review</option>
                          <option value="Policy Implementation Strategy">Policy Implementation Strategy</option>
                        </select>
                        {errors.consultationType && (
                          <motion.p id="consultationType-error" role="alert" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs font-bold text-red-500 flex items-center gap-1.5 ml-1">
                            <AlertCircle size={12} /> {errors.consultationType}
                          </motion.p>
                        )}
                      </div>

                      <AnimatePresence mode="popLayout">
                        {formData.consultationType === 'Tax System Modernization' && (
                          <motion.div 
                            key="tax-fields"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3 overflow-hidden"
                          >
                            <label htmlFor="taxSystemDetails" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Current System or Challenge</label>
                            <input 
                              id="taxSystemDetails"
                              name="taxSystemDetails"
                              value={formData.taxSystemDetails}
                              onChange={handleChange}
                              type="text" 
                              placeholder="e.g., Legacy COBOL system, Compliance gaps"
                              className={`w-full px-6 py-5 bg-slate-50/50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-slate-400 ${
                                errors.taxSystemDetails 
                                  ? 'border-red-200 focus:ring-red-500/10 focus:border-red-400' 
                                  : 'border-slate-200 focus:ring-brand-jade/10 focus:border-brand-jade focus:bg-white'
                              }`}
                            />
                            {errors.taxSystemDetails && (
                              <motion.p role="alert" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs font-bold text-red-500 flex items-center gap-1.5 ml-1">
                                <AlertCircle size={12} /> {errors.taxSystemDetails}
                              </motion.p>
                            )}
                          </motion.div>
                        )}

                        {formData.consultationType === 'Benefit Eligibility Review' && (
                          <motion.div 
                            key="benefit-fields"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3 overflow-hidden"
                          >
                            <label htmlFor="benefitReviewDetails" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Benefit Program Name</label>
                            <input 
                              id="benefitReviewDetails"
                              name="benefitReviewDetails"
                              value={formData.benefitReviewDetails}
                              onChange={handleChange}
                              type="text" 
                              placeholder="e.g., SNAP, Medicaid, Unemployment Insurance"
                              className={`w-full px-6 py-5 bg-slate-50/50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-slate-400 ${
                                errors.benefitReviewDetails 
                                  ? 'border-red-200 focus:ring-red-500/10 focus:border-red-400' 
                                  : 'border-slate-200 focus:ring-brand-jade/10 focus:border-brand-jade focus:bg-white'
                              }`}
                            />
                            {errors.benefitReviewDetails && (
                              <motion.p role="alert" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs font-bold text-red-500 flex items-center gap-1.5 ml-1">
                                <AlertCircle size={12} /> {errors.benefitReviewDetails}
                              </motion.p>
                            )}
                          </motion.div>
                        )}

                        {formData.consultationType === 'Policy Implementation Strategy' && (
                          <motion.div 
                            key="policy-fields"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3 overflow-hidden"
                          >
                            <label htmlFor="policyStrategyDetails" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Policy Domain</label>
                            <input 
                              id="policyStrategyDetails"
                              name="policyStrategyDetails"
                              value={formData.policyStrategyDetails}
                              onChange={handleChange}
                              type="text" 
                              placeholder="e.g., Environmental Regulation, Healthcare Reform"
                              className={`w-full px-6 py-5 bg-slate-50/50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-slate-400 ${
                                errors.policyStrategyDetails 
                                  ? 'border-red-200 focus:ring-red-500/10 focus:border-red-400' 
                                  : 'border-slate-200 focus:ring-brand-jade/10 focus:border-brand-jade focus:bg-white'
                              }`}
                            />
                            {errors.policyStrategyDetails && (
                              <motion.p role="alert" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs font-bold text-red-500 flex items-center gap-1.5 ml-1">
                                <AlertCircle size={12} /> {errors.policyStrategyDetails}
                              </motion.p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="space-y-3">
                        <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Message</label>
                        <textarea 
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="How can we help you bridge the policy-implementation gap?"
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? "message-error" : undefined}
                          required
                          className={`w-full px-6 py-5 bg-slate-50/50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-slate-400 resize-none ${
                            errors.message 
                              ? 'border-red-200 focus:ring-red-500/10 focus:border-red-400' 
                              : 'border-slate-200 focus:ring-brand-jade/10 focus:border-brand-jade focus:bg-white'
                          }`}
                        ></textarea>
                        {errors.message && (
                          <motion.p id="message-error" role="alert" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs font-bold text-red-500 flex items-center gap-1.5 ml-1">
                            <AlertCircle size={12} /> {errors.message}
                          </motion.p>
                        )}
                      </div>
                      <button 
                        disabled={formStatus === 'submitting'}
                        type="submit"
                        className="w-full py-5 bg-brand-jade text-white font-bold rounded-2xl hover:bg-[#005a62] transition-all shadow-xl shadow-brand-jade/20 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                      >
                        {formStatus === 'submitting' ? (
                          <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            Send Inquiry
                            <Send size={20} strokeWidth={1.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
