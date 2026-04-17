import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database, Activity, ShieldCheck } from 'lucide-react';

export default function Per() {
  const tags = ["LONGITUDINAL ANALYSIS", "FISCAL RISK MITIGATION", "EMPIRICAL EVALUATION"];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Applied Policy Systems | SNAP Payment Error Rate Diagnostics</title>
        <meta name="description" content="A longitudinal analysis of SNAP Payment Error Rates, isolating systemic calculation failures and procedural drop-offs." />
        <meta name="keywords" content="SNAP payment error rate, fiscal risk modeling, federal quality control, government sanctions mitigation, Applied Policy Systems" />
      </Helmet>

      {/* Navigation Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-6 py-4">
        <div className="container-wide">
          <Link to="/insights" className="inline-flex items-center text-sm font-bold text-brand-jade hover:text-brand-jade/80 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Return to Insights Library
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-jade/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="container-wide relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="label-uppercase mb-4">Research & Data Assets</h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-8 max-w-4xl">
              Applied Intelligence Analysis
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mb-8">
              A longitudinal analysis of Supplemental Nutrition Assistance Program (SNAP) Payment Error Rates. We evaluate the intersection of strict fiscal compliance tolerances and the administrative burdens that drive systemic failure.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 text-xs font-mono font-bold tracking-widest border border-slate-200 dark:border-slate-700 rounded bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Blocks */}
      <section className="section-padding pt-0">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Left Column: Data Architecture & PII Disclaimer */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="text-brand-jade" size={24} />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Data Integrity & Privacy</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  This dataset is engineered strictly for systemic evaluation and architectural modeling. It contains zero Personally Identifiable Information or protected health data.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 bg-brand-jade rounded-full shrink-0 mt-1.5" />
                    <span>Built exclusively on aggregated state performance metrics and public federal oversight audits.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 bg-brand-jade rounded-full shrink-0 mt-1.5" />
                    <span>No individual resident data or PII is stored, processed, or implied.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Core Narrative */}
            <div className="lg:col-span-8 prose prose-slate dark:prose-invert max-w-none">
              
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <Activity className="text-brand-jade shrink-0" size={32} />
                  <h3 className="text-2xl font-black m-0">The Implementation Gap</h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  High Payment Error Rates in federal programs are rarely the result of intentional mismanagement. They are the systemic output of an implementation gap between rigid legislative mandates and legacy operational software. When state IT systems lack the deterministic logic required to process complex verification schemas, the resulting administrative friction directly causes procedural drop-offs for vulnerable residents and triggers severe fiscal sanctions for the state.
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <Database className="text-brand-jade shrink-0" size={32} />
                  <h3 className="text-2xl font-black m-0">Root Cause Evaluation</h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  Our applied intelligence provides the empirical baseline necessary to identify where modern business rules engines fail. By analyzing 25 years of aggregated federal reporting, we isolate specific nodes of systemic failure—differentiating between errors caused by frontline administrative workflows and errors hardcoded into the business logic layer.
                </p>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mt-4">
                  This data establishes the framework for our Independent Verification and Validation practices. It ensures that prime contractors prioritize human-centered design for data ingestion, ultimately reducing the evidentiary burden on the citizen while maintaining mathematical accuracy for the adjudicator.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}