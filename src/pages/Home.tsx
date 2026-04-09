import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, BookOpen, Cpu, Sparkles, Send, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { getChatResponse } from '../services/gemini';

export function Home() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  // Sandbox State Management
  const [sandboxInput, setSandboxInput] = useState('');
  const [sandboxOutput, setSandboxOutput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const examplePrompts = [
    "Simulate a Rules-as-Code (RaC) validation for SNAP Standard Utility Allowance against 7 CFR 273.",
    "Define a neuro-symbolic architecture to mitigate Payment Error Rate (PER) risk in legacy mainframe migrations.",
    "Generate a Human-in-the-Loop (HITL) compliance protocol for automated income verification adhering to IRS Pub 1075."
  ];

  const handleAnalyze = async (text: string) => {
    if (!text.trim() || isAnalyzing) return;
    setSandboxInput(text);
    setIsAnalyzing(true);
    setSandboxOutput('');
    
    try {
      const result = await getChatResponse(`Analyze this policy/technical prompt from a GovTech architecture perspective: ${text}`);
      setSandboxOutput(result);
    } catch (error) {
      setSandboxOutput("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Applied Policy Systems | Public Sector Strategy & Modernization</title>
        <meta name="description" content="Applied Policy Systems LLC bridges the disconnect in public administration by translating legislative mandates into actionable digital infrastructure." />
      </Helmet>
      {/* Hero Section */}
      <section className="hero-section">
        {/* Subtle Technical Pattern with Parallax */}
        <motion.div 
          style={{ 
            y,
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '100px 100px' 
          }}
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] dark:invert pointer-events-none" 
        />
        
        <div className="container-wide relative">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="mb-8">
                {t('home.hero.title')}
              </h1>
              <p className="text-lg md:text-xl mb-12 max-w-3xl">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-6">
                <Link 
                  to="/capabilities" 
                  aria-label="Learn more about our capabilities"
                  className="px-12 py-6 bg-brand-jade text-white text-xl font-bold rounded-2xl hover:bg-[#005a62] hover:scale-[1.02] transition-all shadow-2xl shadow-brand-jade/30 flex items-center gap-4 group"
                >
                  {t('home.hero.cta')}
                  <ArrowRight size={24} strokeWidth={1.5} className="group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Section - Compact */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="label-muted">{t('home.challenge.label')}</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">{t('home.challenge.title')}</h3>
              <p className="text-lg leading-relaxed mb-8">
                {t('home.challenge.text')}
              </p>
            </div>
            <div className="relative p-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-card shadow-xl">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-jade rounded-l-card" />
              <p className="font-medium text-slate-900 dark:text-slate-100 italic leading-relaxed text-xl">
                {t('home.challenge.solution')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Sandbox Section */}
      <section className="section-padding bg-slate-950 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#006D77_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="text-brand-jade" size={24} />
                <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-brand-jade">Technical Demonstration</h2>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">Interactive Policy Analysis Sandbox</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                Evaluate our integration of deterministic logic and generative AI. Select a technical prompt below or input a custom parameter to test the model's capacity for Rules-as-Code translation, compliance auditing, and structural comprehension. Note: This environment is sanitized; do not input live PII or restricted agency data.
              </p>
              
              <div className="space-y-4">
                {examplePrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnalyze(prompt)}
                    className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-brand-jade/50 transition-all text-sm text-slate-300 group flex justify-between items-center"
                  >
                    {prompt}
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-jade" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative">
              <div className="absolute top-4 right-8 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
              
              <div className="mb-8">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Input Parameter</label>
                <div className="relative">
                  <textarea
                    value={sandboxInput}
                    onChange={(e) => setSandboxInput(e.target.value)}
                    placeholder="Enter policy text or technical requirement..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white text-sm min-h-[120px] focus:ring-2 focus:ring-brand-jade outline-none transition-all"
                  />
                  <button
                    onClick={() => handleAnalyze(sandboxInput)}
                    disabled={isAnalyzing || !sandboxInput.trim()}
                    className="absolute bottom-4 right-4 p-3 bg-brand-jade text-white rounded-xl hover:bg-[#005a62] transition-all disabled:opacity-50"
                  >
                    {isAnalyzing ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Architectural Analysis</label>
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 min-h-[200px] relative overflow-hidden">
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center z-10">
                      <div className="flex flex-col items-center gap-4">
                        <Sparkles className="text-brand-jade animate-pulse" size={32} />
                        <span className="text-xs font-bold text-brand-jade animate-pulse">Processing Logic...</span>
                      </div>
                    </div>
                  )}
                  
                  {sandboxOutput ? (
                    <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {sandboxOutput}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-600 italic text-sm">
                      Output will appear here after analysis...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Highlight Section - Compact */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-wide">
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-jade/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="label-uppercase">{t('home.infrastructure.label')}</h2>
                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-8">
                  {t('home.infrastructure.title')}
                </h3>
                <p className="text-lg text-slate-400 leading-relaxed mb-10">
                  {t('home.infrastructure.text')}
                </p>
                <Link 
                  to="/platform" 
                  className="inline-flex items-center gap-4 px-8 py-4 bg-brand-jade text-white font-bold rounded-xl shadow-2xl shadow-brand-jade/20 hover:bg-[#005a62] transition-all group"
                >
                  {t('home.infrastructure.cta')}
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              <div className="relative aspect-video bg-white/5 rounded-[2rem] border border-white/10 p-8 flex items-center justify-center overflow-hidden">
                <div className="grid grid-cols-2 gap-6 w-full h-full opacity-20">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="border border-brand-jade rounded-2xl flex items-center justify-center">
                      <div className="w-12 h-12 bg-brand-jade/20 rounded-full animate-pulse" />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-brand-jade/30 rounded-full animate-[spin_30s_linear_infinite]" />
                  <div className="absolute w-48 h-48 border-2 border-brand-jade/50 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                  <div className="absolute p-8 bg-slate-900 border border-brand-jade rounded-3xl shadow-2xl">
                    <BookOpen size={48} className="text-brand-jade" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: t('home.quickLinks.advisory.title'), path: '/capabilities', desc: t('home.quickLinks.advisory.desc'), action: t('home.quickLinks.advisory.action') },
              { name: t('home.quickLinks.architecture.title'), path: '/platform', desc: t('home.quickLinks.architecture.desc'), action: t('home.quickLinks.architecture.action') },
              { name: t('home.quickLinks.insights.title'), path: '/research', desc: t('home.quickLinks.insights.desc'), action: t('home.quickLinks.insights.action') }
            ].map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className="card-base card-hover group"
              >
                <h3 className="mb-4 group-hover:text-brand-jade transition-colors">{item.name}</h3>
                <p className="mb-6">{item.desc}</p>
                <div className="flex items-center gap-2 text-brand-jade font-bold">
                  {item.action} <ArrowRight size={18} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
