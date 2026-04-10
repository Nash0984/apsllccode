import React, { useState } from 'react';
import { UserCircle, ChevronRight, BookOpen, FileText, BarChart3, Network, ArrowRight, ChevronDown, ChevronUp, GraduationCap, Shield, Database, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';

export function About() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
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

  const experience = [
    {
      id: 'federal',
      label: 'Federal Advisory',
      title: 'Federal Advisory Leadership',
      content: 'Appointed member of a federal advisory committee focused on electronic tax administration. Advises Congress and the IRS on the future of code simplification, digital taxpayer experience, and statutory modernization.'
    },
    {
      id: 'state',
      label: 'State Operations',
      title: 'State Operations Leadership',
      content: 'Former Director for a mid-Atlantic state human services agency. Evaluated and guided modernization strategies for benefits access, translating complex legislative mandates into operational eligibility systems.'
    },
    {
      id: 'national',
      label: 'National Strategy',
      title: 'National Policy Strategy',
      content: 'Served as Tax Administration Policy Strategist at Prosperity Now. Acted as a national liaison for integrating federal tax administration programs into community-based infrastructure.'
    }
  ];

  const timelineMilestones = [
    {
      year: '2011',
      title: 'Municipal Impact',
      organization: 'City of Philadelphia',
      role: 'Administrator of Taxpayer Assistance',
      description: 'Directed the "You Earned It Philly" EITC initiative, returning over $44 million to 26,000 residents and establishing a model for municipal tax credit outreach.',
      icon: '🏛️'
    },
    {
      year: '2016',
      title: 'National Strategy',
      organization: 'Prosperity Now',
      role: 'Policy Strategist',
      description: 'Acted as a national liaison for tax administration programs, integrating federal financial regulations into community-based infrastructure across the U.S.',
      icon: '🌐'
    },
    {
      year: '2019',
      title: 'State Operations',
      organization: 'Maryland DHS',
      role: 'Director of Operations',
      description: 'Evaluated and guided modernization strategies for benefits access, focusing on human-centered design and translating legislative mandates into operational systems.',
      icon: '🛡️'
    },
    {
      year: '2023',
      title: 'Federal Advisory',
      organization: 'Applied Policy Systems',
      role: 'Founder & Federal Advisor',
      description: 'Founded APS to bridge the policy-implementation gap. Appointed to a federal advisory committee advising Congress and the IRS on electronic tax administration.',
      icon: '💎'
    }
  ];

  const [activeMilestone, setActiveMilestone] = useState(timelineMilestones.length - 1);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <Helmet>
        <title>About Graham O'Neill | Applied Policy Systems LLC</title>
        <meta name="description" content="Learn about Graham O'Neill, founder of Applied Policy Systems. A public sector innovator with 15+ years of experience in government system optimization, tax administration, and legislative mandate translation." />
        <meta name="keywords" content="Graham O'Neill, Applied Policy Systems, public sector innovation, government technology, tax administration, policy implementation" />
      </Helmet>
      {/* Header */}
      <section className="hero-section">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-jade/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="container-wide relative">
          <h1 className="label-uppercase">{t('about.hero.label')}</h1>
          <h2 className="max-w-4xl">
            {t('about.hero.title').split(' ').slice(0, -1).join(' ')} <br />
            <span className="text-brand-jade">{t('about.hero.title').split(' ').slice(-1)}</span>
          </h2>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 md:p-24 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-jade/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            
            <div className="relative grid lg:grid-cols-12 gap-20 items-start">
              <div className="lg:col-span-2 sticky top-32 flex flex-col items-center text-center">
                <div className="w-full aspect-square bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700 overflow-hidden relative group shadow-xl shadow-slate-200/50 mb-6">
                  <img 
                    src="/graham-oneill.jpg" 
                    alt="Graham F. O'Neill" 
                    className="w-full h-full object-cover object-center transition-all duration-700 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80";
                    }}
                  />
                </div>
                <div className="relative">
                  <p className="text-slate-900 dark:text-white font-bold text-lg tracking-tight">Graham F. O'Neill</p>
                  <p className="text-brand-jade text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Principal</p>
                </div>
              </div>
              
              <div className="lg:col-span-10">
                <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-12 tracking-tight">{t('about.founder.title')}</h3>
                <div className="prose prose-slate prose-xl max-w-none text-slate-600 dark:text-slate-400 leading-relaxed space-y-8">
                  <p className="text-xl text-slate-900 dark:text-slate-100 font-medium border-l-4 border-brand-jade pl-8">
                    {t('about.founder.intro')}
                  </p>
                  <p>
                    {t('about.founder.p1')}
                  </p>
                  <p>
                    {t('about.founder.p2')}
                  </p>

                  {/* Experience Tabs */}
                  <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex flex-wrap gap-3 mb-12 relative" role="tablist" aria-label="Graham O'Neill's Experience">
                      {experience.map((item, i) => (
                        <button
                          key={item.id}
                          id={`tab-${item.id}`}
                          role="tab"
                          aria-selected={activeTab === i}
                          aria-controls={`panel-${item.id}`}
                          onClick={() => setActiveTab(i)}
                          className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative z-10 ${
                            activeTab === i 
                              ? 'text-white' 
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                          }`}
                        >
                          {activeTab === i && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute inset-0 bg-brand-jade rounded-xl shadow-lg shadow-brand-jade/20"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          <span className="relative z-10">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    <motion.div 
                      layout
                      className="relative min-h-[250px] overflow-hidden"
                      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          id={`panel-${experience[activeTab].id}`}
                          role="tabpanel"
                          aria-labelledby={`tab-${experience[activeTab].id}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ 
                            duration: 0.5, 
                            ease: [0.22, 1, 0.36, 1] 
                          }}
                          className="bg-slate-50 dark:bg-slate-800 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm"
                        >
                          <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <ChevronRight className="text-brand-jade" size={24} />
                            {experience[activeTab].title}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                            {experience[activeTab].content}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Journey Timeline */}
      <section className="section-padding bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
            backgroundSize: '100px 100px' 
          }} 
        />
        
        <div className="container-wide relative">
          <div className="text-center mb-24">
            <h2 className="label-uppercase">Career Journey</h2>
            <h3 className="tracking-tight text-white">A Legacy of Systems Optimization.</h3>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Timeline Visualization */}
            <div className="lg:col-span-5 relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-800" />
              
              <div className="space-y-12 relative">
                {timelineMilestones.map((milestone, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveMilestone(i)}
                    className="flex items-center gap-8 w-full text-left group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                      activeMilestone === i 
                        ? 'bg-brand-jade border-brand-jade shadow-[0_0_30px_rgba(0,163,174,0.3)]' 
                        : 'bg-slate-900 border-slate-800 group-hover:border-slate-700'
                    }`}>
                      <span className="text-2xl">{milestone.icon}</span>
                    </div>
                    
                    <div>
                      <div className={`text-sm font-bold tracking-widest uppercase mb-1 transition-colors ${
                        activeMilestone === i ? 'text-brand-jade' : 'text-slate-500'
                      }`}>
                        {milestone.year}
                      </div>
                      <div className={`text-xl font-bold transition-colors ${
                        activeMilestone === i ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                      }`}>
                        {milestone.title}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Detail Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-slate-800/50 backdrop-blur-xl border border-white/10 p-12 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-12 text-8xl opacity-5 pointer-events-none font-bold italic">
                    {timelineMilestones[activeMilestone].year}
                  </div>
                  
                  <div className="relative">
                    <div className="inline-block px-4 py-1.5 bg-brand-jade/10 text-brand-jade text-xs font-bold uppercase tracking-widest rounded-full border border-brand-jade/20 mb-8">
                      {timelineMilestones[activeMilestone].organization}
                    </div>
                    
                    <h4 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                      {timelineMilestones[activeMilestone].role}
                    </h4>
                    
                    <p className="text-xl text-slate-300 leading-relaxed mb-8">
                      {timelineMilestones[activeMilestone].description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-brand-jade font-bold group cursor-pointer">
                      <span className="text-sm uppercase tracking-widest">Explore Impact</span>
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Impact Section */}
      <section className="section-padding bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800">
        <div className="container-wide">
          <div className="text-center mb-20">
            <h2 className="label-muted">Measurable Impact</h2>
            <h3 className="tracking-tight">Proven Results in Public Administration.</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                value: "$44M+",
                label: "Direct Citizen Benefit",
                desc: "Tax credits returned to Philadelphia residents through the 'You Earned It Philly' initiative.",
                icon: "💰"
              },
              {
                value: "$2M",
                label: "Modernization Funding",
                desc: "Federal & Philanthropic funding secured for SNAP Payment Error Rate reduction initiatives.",
                icon: "📉"
              },
              {
                value: "15+",
                label: "Years of Execution",
                desc: "A career dedicated to optimizing public systems at municipal, state, and federal levels.",
                icon: "🏛️"
              }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center card-base"
              >
                <div className="text-4xl mb-6">{stat.icon}</div>
                <div className="text-5xl font-extrabold text-brand-jade mb-4 tracking-tighter">{stat.value}</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white mb-4">{stat.label}</div>
                <p className="leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Performance Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container-wide">
          <div className="text-center mb-20">
            <h2 className="label-muted">{t('about.performance.label')}</h2>
            <h3 className="tracking-tight">{t('about.performance.title')}</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "SNAP Payment Error Rate Reduction",
                framework: "State-Level Human Services",
                challenge: "High error rates in SNAP eligibility determinations leading to federal sanctions.",
                execution: "Implemented real-time data cross-referencing and automated income verification workflows.",
                impact: "Identified systemic root causes and secured $2M in funding for corrective action infrastructure."
              },
              {
                title: "Civic Technology Integration",
                framework: "Campaign for Working Families",
                challenge: "Sustaining high-volume tax preparation operations during pandemic-induced closures.",
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

      {/* Research & Insights Section */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="label-muted">{t('about.research.label')}</h2>
              <h3 className="tracking-tight mb-8">{t('about.research.title')}</h3>
              <p className="text-xl leading-relaxed mb-12">
                Our methodology is rooted in rigorous data analysis and historical context. We publish frameworks that bridge the gap between legislative intent and administrative reality.
              </p>
              
              <div className="space-y-6">
                {researchDocs.map((doc, i) => {
                  const isExpanded = expandedDocs.includes(i);
                  return (
                    <div key={i} className="card-base p-8 relative overflow-hidden group">
                      <div className="flex gap-6">
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-brand-jade border border-slate-100 dark:border-slate-800">
                          {doc.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold mb-2">{doc.title}</h4>
                          <motion.div
                            animate={{ height: isExpanded ? 'auto' : '3rem' }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                              {doc.desc}
                            </p>
                          </motion.div>
                          <button
                            onClick={(e) => toggleExpand(i, e)}
                            className="mt-4 text-brand-jade font-bold text-xs uppercase tracking-widest flex items-center gap-2"
                          >
                            {isExpanded ? 'Read Less' : 'Read More'}
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="relative hidden lg:block">
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

      {/* Ecosystem & Strategic Engagements Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="container-wide">
          <div className="text-center mb-20">
            <h2 className="label-muted">Ecosystem & Strategic Engagements</h2>
            <h3 className="tracking-tight">Graham's History of Collaboration with National Leaders.</h3>
            <p className="mt-6 text-lg max-w-2xl mx-auto">
              The following descriptions outline the operational expertise and network collaborations of the firm's Principal Consultant.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                name: "Nava PBC", 
                focus: "Technical Architecture",
                context: "Coordinated technical planning for AI-powered software and real-time dashboards within state benefit systems, focusing on synthetic data environments and statutory verification."
              },
              { 
                name: "U.S. Digital Response (USDR)", 
                focus: "Root Cause Analysis",
                context: "Managed discovery sprints and root cause analysis to reduce SNAP Payment Error Rates (PER) and mitigate recertification churn in public benefit systems."
              },
              { 
                name: "Code for America", 
                focus: "Civic Tech Integration",
                context: "Secured operational partnerships to deploy virtual tax software and collaborated on human-centered design for public benefit notices and caseworker analytics."
              },
              { 
                name: "Arnold Ventures", 
                focus: "Project Architecture",
                context: "Authored foundational proposals for multi-stakeholder data science initiatives, establishing pathways to address SNAP accuracy through predictive modeling."
              },
              { 
                name: "Results for America", 
                focus: "Evidence-Based Evaluation",
                context: "Oversaw randomized controlled trial evaluations for municipal program performance, aligning local initiatives with evidence-based policy standards."
              },
              { 
                name: "Prosperity Now", 
                focus: "National Policy Strategy",
                context: "Served as a national policy liaison to the IRS, FDIC, and CFPB, integrating federal tax programs into local financial infrastructure."
              },
              { 
                name: "Campaign for Working Families", 
                focus: "Strategic Development",
                context: "Directed operational partnerships and secured over $2.2 million in grant funding to scale community-based financial services and civic technology."
              },
              { 
                name: "Civilla", 
                focus: "Service Design",
                context: "Applied service design research and digital identity patterns to inform system architecture evaluations and human-centered public benefit forms."
              }
            ].map((partner, i) => (
              <div key={i} className="card-base card-hover flex flex-col group">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-2xl font-bold group-hover:text-brand-jade transition-colors">{partner.name}</div>
                  <div className="px-4 py-1.5 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-full border border-slate-100 dark:border-slate-800">
                    {partner.focus}
                  </div>
                </div>
                <p className="text-sm">
                  {partner.context}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-24 p-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[3rem] shadow-sm">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "Applied Policy Systems LLC is built on a foundation of deep professional history. Throughout his career, Graham has collaborated with national experts in implementation, evaluation, and design, ensuring that our methodology is informed by the collective intelligence of the civic tech ecosystem."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
