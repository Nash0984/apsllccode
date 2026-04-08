import { BookOpen, FileText, BarChart3, Network, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Research() {
  const researchDocs = [
    {
      title: "Rules as Code (RaC) Implementation Frameworks",
      desc: "A technical guide on translating subjective policy into deterministic logic for automated benefit systems.",
      icon: <FileText size={24} strokeWidth={1.5} />
    },
    {
      title: "SNAP Payment Error Rate Mitigation Strategies",
      desc: "Analysis of root causes for payment errors and operational frameworks to improve accuracy and audit compliance.",
      icon: <BarChart3 size={24} strokeWidth={1.5} />
    },
    {
      title: "VITA Infrastructure Integration Models",
      desc: "Designing seamless data flows between tax preparation services and state benefit eligibility systems.",
      icon: <Network size={24} strokeWidth={1.5} />
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mb-6">Research & Insights</h1>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight max-w-3xl">
            Insights to improve service delivery and policy fidelity.
          </h2>
        </div>
      </section>

      {/* Research Content */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
                Our methodology is rooted in rigorous data analysis and historical context. We publish frameworks that bridge the gap between legislative intent and administrative reality.
              </p>
                {/* Research Documents List */}
                <div className="relative space-y-12" role="list" aria-label="Research documents and frameworks">
                  {/* Vertical Connector Line */}
                  <div className="absolute left-7 top-10 bottom-10 w-px border-l border-dashed border-slate-200 dark:border-slate-800 hidden md:block" />

                  {researchDocs.map((doc, i) => (
                    <motion.div 
                      key={i} 
                      role="listitem"
                      tabIndex={0}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      aria-label={`Read document: ${doc.title}`}
                      className={`group p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer relative overflow-hidden ${
                        i % 2 === 1 
                          ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800/50' 
                          : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm'
                      } hover:shadow-2xl hover:border-brand-jade/20`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-jade/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-brand-jade/10 transition-colors" />
                      
                      <div className="flex flex-col md:flex-row items-start gap-8 relative">
                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-brand-jade border border-slate-100 dark:border-slate-700 group-hover:bg-brand-jade group-hover:text-white transition-all duration-300 shrink-0 shadow-sm z-10">
                          {doc.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-brand-jade transition-colors">
                            {doc.title}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                            {doc.desc}
                          </p>
                          <div className="flex items-center gap-2 text-brand-jade font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                            Read Document <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-12 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="h-2 w-24 bg-brand-jade/20 rounded-full" />
                  <div className="h-2 w-48 bg-slate-200 dark:bg-slate-700 rounded-full" />
                  <div className="h-2 w-32 bg-slate-200 dark:bg-slate-700 rounded-full" />
                </div>
                <div className="flex justify-end">
                  <div className="w-32 h-32 border-2 border-brand-jade/10 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 border border-brand-jade/20 rounded-full animate-ping" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full" />
                  <div className="h-2 w-2/3 bg-slate-100 dark:bg-slate-800 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
