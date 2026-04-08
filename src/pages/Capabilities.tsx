import { motion } from 'motion/react';
import { ArrowRight, BookOpen, LayoutGrid, CheckCircle2 } from 'lucide-react';

export function Capabilities() {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mb-6">Core Capabilities</h1>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight max-w-3xl">
            How we help bridge the gap between policy and implementation.
          </h2>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Implementation Science & Systems Optimization",
                desc: "Strategic guidance on optimizing complex government systems. We bridge the gap between written regulations and operational realities, ensuring that administrative systems achieve intended policy outcomes.",
                icon: <BookOpen className="text-brand-jade" size={28} strokeWidth={1.5} />,
                tip: "Systems Optimization"
              },
              {
                title: "Compliance Diagnostics & Error Mitigation",
                desc: "Designing strategies to address state-level payment error rates (SNAP). We utilize historical data to conceptualize real-time flagging mechanisms that allow for intervention prior to finalization.",
                icon: <LayoutGrid className="text-brand-jade" size={28} strokeWidth={1.5} />,
                tip: "Error Mitigation"
              },
              {
                title: "Interagency Data Sharing Architectures",
                desc: "Structural expertise in conceptualizing data-sharing models between tax and human services, securely cross-referencing non-filer data to maximize benefit uptake without compromising PII.",
                icon: <CheckCircle2 className="text-brand-jade" size={28} strokeWidth={1.5} />,
                tip: "Data Architecture"
              },
              {
                title: "System Architecture & Eligibility Evaluation",
                desc: "Evaluating the structural design of automated eligibility platforms. We focus on 'Rules-as-Code' architectures that enforce compliance and ensure maximum accessibility for frontline navigators.",
                icon: <ArrowRight className="text-brand-jade" size={28} strokeWidth={1.5} />,
                tip: "System Evaluation"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 dark:bg-slate-900 p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:border-brand-jade/10 transition-all duration-500 group"
              >
                <div className="relative inline-block mb-8">
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm group-hover:bg-brand-jade group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-10">
                    {item.tip}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">{item.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mb-6">Direct Execution</h2>
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Past Performance & Case Studies.</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Municipal Tax Credit Expansion",
                framework: "City of Philadelphia Department of Revenue",
                challenge: "Low municipal uptake of the Earned Income Tax Credit (EITC) among eligible populations.",
                execution: "Directed the 'You Earned It Philly' initiative, a targeted, multi-channel outreach and administrative support program.",
                impact: "Returned over $44 million in tax credits to 26,000 Philadelphia residents."
              },
              {
                title: "Civic Technology Integration",
                framework: "Campaign for Working Families & Code for America",
                challenge: "Sustaining high-volume VITA/TCE tax preparation operations during pandemic-induced closures.",
                execution: "Architected a rapid digital transformation strategy and secured a formal operational partnership with Code for America.",
                impact: "Preserved frontline tax services for vulnerable populations while raising over $2.2 million in grant infrastructure."
              }
            ].map((study, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-12 rounded-[3rem] border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-jade" />
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{study.title}</h4>
                <p className="text-brand-jade font-bold text-sm uppercase tracking-wider mb-8">{study.framework}</p>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">The Challenge</p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">The Execution</p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{study.execution}</p>
                  </div>
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">The Impact</p>
                    <p className="text-slate-900 dark:text-slate-100 font-bold text-lg leading-relaxed">{study.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-brand-jade mb-6">Our Methodology</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">The Glass-Box Framework.</h3>
            <p className="text-xl text-slate-400 leading-relaxed">
              We replace opaque "black-box" vendor solutions with transparent, auditable, and mathematically deterministic systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Statutory Translation",
                desc: "We translate subjective legislative text into strict logical requirements, removing ambiguity before a single line of code is written."
              },
              {
                step: "02",
                title: "Deterministic Design",
                desc: "We provide the exact mathematical blueprints (Rules as Code) required for technology vendors to build compliant and unbiased systems."
              },
              {
                step: "03",
                title: "Empirical Validation",
                desc: "We use randomized control trials and predictive analytics to verify that the system achieves the intended policy fidelity."
              }
            ].map((item, i) => (
              <div key={i} className="p-10 border border-white/10 rounded-[2.5rem] bg-white/5 backdrop-blur-sm relative group hover:bg-white/10 transition-all duration-500">
                <div className="text-6xl font-black text-white/5 absolute top-6 right-10 group-hover:text-brand-jade/20 transition-colors">{item.step}</div>
                <h4 className="text-2xl font-bold mb-6 text-white">{item.title}</h4>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
