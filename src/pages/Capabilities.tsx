import { motion } from 'motion/react';
import { ArrowRight, BookOpen, LayoutGrid, CheckCircle2 } from 'lucide-react';

export function Capabilities() {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Header - Compact */}
      <section className="hero-section">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="label-uppercase">Consulting Expertise</h1>
            <h2>
              Bridging the gap between policy and implementation.
            </h2>
          </div>
        </div>
      </section>

      {/* Capabilities Grid - Compact */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Strategic Implementation Science",
                desc: "We bridge the gap between legislative intent and operational reality. Our experts optimize complex government workflows to ensure that administrative systems achieve their intended policy outcomes with maximum efficiency.",
                icon: <BookOpen className="text-brand-jade" size={28} strokeWidth={1.5} />,
                tip: "Strategy & Optimization"
              },
              {
                title: "Compliance & Risk Diagnostics",
                desc: "Deep-dive audits of state-level payment error rates (SNAP/Medicaid). We identify systemic vulnerabilities and conceptualize real-time intervention mechanisms to mitigate risks before they trigger federal sanctions.",
                icon: <LayoutGrid className="text-brand-jade" size={28} strokeWidth={1.5} />,
                tip: "Audit & Mitigation"
              },
              {
                title: "Interagency Data Strategy",
                desc: "Architecting secure data-sharing frameworks between tax and human services. We specialize in cross-referencing non-filer data to maximize benefit uptake without compromising PII or system integrity.",
                icon: <CheckCircle2 className="text-brand-jade" size={28} strokeWidth={1.5} />,
                tip: "Data Architecture"
              },
              {
                title: "System Fidelity Evaluation",
                desc: "Independent third-party verification of automated eligibility platforms. We audit 'Rules-as-Code' architectures to ensure absolute statutory compliance and maximum accessibility for frontline navigators.",
                icon: <ArrowRight className="text-brand-jade" size={28} strokeWidth={1.5} />,
                tip: "Fidelity Audit"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-base card-hover group"
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
                <p className="text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container-wide">
          <div className="text-center mb-20">
            <h2 className="label-muted">Direct Execution</h2>
            <h3 className="tracking-tight">Past Performance & Case Studies.</h3>
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

    </div>
  );
}
