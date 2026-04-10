import React, { useState } from 'react';
import { BookOpen, FileText, BarChart3, Network, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Research() {
  const [expandedDocs, setExpandedDocs] = useState<number[]>([]);

  const toggleExpand = (index: number, e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setExpandedDocs(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const researchDocs = [
    {
      title: "Rules as Code (RaC) Implementation",
      desc: "A technical guide on translating subjective policy into deterministic logic. This framework covers the entire lifecycle from legislative analysis to rigorous logic testing, ensuring legislative intent is preserved through digital transformation.",
      icon: <FileText size={24} strokeWidth={1.5} />
    },
    {
      title: "SNAP Payment Error Rate Mitigation",
      desc: "Root cause analysis and operational frameworks to improve payment accuracy and audit compliance. Our research identifies key friction points in eligibility reviews and provides evidence-based recommendations for reducing churn.",
      icon: <BarChart3 size={24} strokeWidth={1.5} />
    },
    {
      title: "VITA Infrastructure Integration",
      desc: "Designing seamless data flows between tax services and state benefit systems. This study explores technical and policy requirements for real-time data sharing, focusing on privacy-preserving protocols to maximize benefit uptake.",
      icon: <Network size={24} strokeWidth={1.5} />
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <section className="hero-section">
        <div className="container-wide">
          <h1 className="label-muted">Research & Insights</h1>
          <h2>
            Insights to improve service delivery and policy fidelity.
          </h2>
        </div>
      </section>

      {/* Research Content */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-xl leading-relaxed mb-12">
                Our methodology is rooted in rigorous data analysis and historical context. We publish frameworks that bridge the gap between legislative intent and administrative reality.
              </p>
                {/* Research Documents List */}
                <div className="relative space-y-12" role="list" aria-label="Research documents and frameworks">
                  {/* Vertical Connector Line */}
                  <div className="absolute left-7 top-10 bottom-10 w-px border-l border-dashed border-slate-200 dark:border-slate-800 hidden md:block" />

                  {researchDocs.map((doc, i) => {
                    const titleId = `doc-title-${i}`;
                    const descId = `doc-desc-${i}`;
                    const isExpanded = expandedDocs.includes(i);
                    
                    return (
                      <motion.div 
                        key={i} 
                        role="button"
                        tabIndex={0}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ y: -4 }}
                        whileFocus={{ y: -4 }}
                        viewport={{ once: true }}
                        transition={{ 
                          x: { delay: i * 0.1 },
                          y: { type: 'spring', stiffness: 300, damping: 20 }
                        }}
                        aria-labelledby={titleId}
                        aria-describedby={descId}
                        aria-expanded={isExpanded}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            console.log(`Opening document: ${doc.title}`);
                          }
                        }}
                        className={`group card-base card-hover relative overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-brand-jade focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-950 ${
                          i % 2 === 1 
                            ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800/50' 
                            : 'shadow-sm'
                        }`}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-jade/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-brand-jade/10 group-focus:bg-brand-jade/10 transition-colors" />
                        
                        <div className="flex flex-col md:flex-row items-start gap-8 relative">
                          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-brand-jade border border-slate-100 dark:border-slate-700 group-hover:bg-brand-jade group-hover:text-white group-focus:bg-brand-jade group-focus:text-white transition-all duration-300 shrink-0 shadow-sm z-10">
                            {doc.icon}
                          </div>
                          <div className="flex-1">
                            <h4 id={titleId} className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-brand-jade group-focus:text-brand-jade transition-colors">
                              {doc.title}
                            </h4>
                            
                            <div className="relative">
                              <motion.div
                                initial={false}
                                animate={{ height: isExpanded ? 'auto' : '3.5rem' }}
                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                className="overflow-hidden"
                              >
                                <p 
                                  id={descId} 
                                  className={`text-slate-600 dark:text-slate-400 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}
                                >
                                  {doc.desc}
                                </p>
                              </motion.div>
                              
                              <button
                                onClick={(e) => toggleExpand(i, e)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    toggleExpand(i, e);
                                  }
                                }}
                                className="mt-2 text-brand-jade font-semibold text-sm flex items-center gap-1 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-jade focus:ring-offset-2 rounded px-1 transition-all"
                                aria-label={isExpanded ? "Read less" : "Read more about " + doc.title}
                              >
                                {isExpanded ? (
                                  <>Read Less <ChevronUp size={14} /></>
                                ) : (
                                  <>Read More <ChevronDown size={14} /></>
                                )}
                              </button>
                            </div>

                            <div className="flex items-center gap-2 mt-6 text-brand-jade font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 group-focus:translate-x-0">
                              Read Document <ArrowRight size={16} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
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
