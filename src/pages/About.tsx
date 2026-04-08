import { UserCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export function About() {
  const [activeTab, setActiveTab] = useState(0);

  const experience = [
    {
      id: 'federal',
      label: 'Federal Advisory',
      title: 'Federal Advisory Leadership',
      content: 'Serves as an appointed member of a federal advisory committee focused on electronic tax administration, advising Congress and the IRS on the future of tax administration, code simplification, and the digital taxpayer experience.'
    },
    {
      id: 'state',
      label: 'State Operations',
      title: 'State Operations Leadership',
      content: 'Formerly served as a Director for a mid-Atlantic state human services agency. In this role, he evaluated and guided modernization strategies for benefits access, focusing on human-centered design principles and the translation of complex legislative mandates into operational eligibility systems.'
    },
    {
      id: 'national',
      label: 'National Strategy',
      title: 'National Policy Strategy',
      content: 'Served as the Taxpayer Assistance & Tax Administration Policy Strategist at Prosperity Now, acting as a national liaison for tax administration programs to integrate them into community-based infrastructure alongside federal financial regulators.'
    },
    {
      id: 'municipal',
      label: 'Municipal Impact',
      title: 'Municipal Impact & Operations',
      content: 'As the Administrator of Taxpayer Assistance and Credit Programs for the City of Philadelphia Department of Revenue, he directed the $1.3 million "You Earned It Philly" EITC initiative, returning over $44 million to 26,000 residents.'
    }
  ];

  const timelineMilestones = [
    {
      year: '2011',
      title: 'Municipal Leadership',
      organization: 'City of Philadelphia',
      role: 'Administrator of Taxpayer Assistance',
      description: 'Directed the $1.3 million "You Earned It Philly" EITC initiative, returning over $44 million to 26,000 residents and establishing a model for municipal tax credit outreach.',
      icon: '🏛️'
    },
    {
      year: '2016',
      title: 'National Policy Strategy',
      organization: 'Prosperity Now',
      role: 'Taxpayer Assistance & Policy Strategist',
      description: 'Acted as a national liaison for tax administration programs, integrating federal financial regulations into community-based infrastructure across the U.S.',
      icon: '🌐'
    },
    {
      year: '2019',
      title: 'State Operations',
      organization: 'Maryland Dept. of Human Services',
      role: 'Director of Operations',
      description: 'Evaluated and guided modernization strategies for benefits access, focusing on human-centered design and translating legislative mandates into operational eligibility systems.',
      icon: '🛡️'
    },
    {
      year: '2023',
      title: 'Federal Advisory & APS',
      organization: 'Applied Policy Systems LLC',
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
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mb-6">About Us</h1>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight max-w-3xl">
            Bridging the Disconnect in Public Administration.
          </h2>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-12 tracking-tight">Graham O'Neill, Founder & Principal Consultant</h3>
                <div className="prose prose-slate prose-xl max-w-none text-slate-600 dark:text-slate-400 leading-relaxed space-y-8">
                  <p className="text-xl text-slate-900 dark:text-slate-100 font-medium border-l-4 border-brand-jade pl-8">
                    Graham O’Neill is a public sector innovator and technology strategist with over 15 years of experience optimizing complex government systems.
                  </p>
                  <p>
                    His career is defined by successfully translating legislative mandates into actionable, compliant digital infrastructure. From municipal revenue operations to federal advisory roles, Graham has consistently focused on making policy work for the people it is intended to serve by bridging the gap between written regulations and operational realities.
                  </p>
                  <p>
                    Before founding Applied Policy Systems LLC, Graham held senior leadership and advisory positions across all levels of government, where he specialized in the structural evaluation of benefits access and the modernization of tax administration programs.
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
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
            backgroundSize: '100px 100px' 
          }} 
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-24">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-brand-jade mb-6">Career Journey</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">A Legacy of Systems Optimization.</h3>
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
      <section className="py-32 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mb-6">Principal's Track Record</h2>
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Measurable Results in Public Administration.</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                value: "$44M+",
                label: "EITC Refunds Returned",
                desc: "Directly returned to Philadelphia residents through the 'You Earned It Philly' initiative directed by Graham.",
                icon: "💰"
              },
              {
                value: "$2M",
                label: "Funding Secured (2025)",
                desc: "Secured from Federal & National Philanthropic Partners for SNAP Payment Error Rate Reduction.",
                icon: "📉"
              },
              {
                value: "15+",
                label: "Years of Execution",
                desc: "A career dedicated to public administration at municipal, state, and federal tiers.",
                icon: "🏛️"
              }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
              >
                <div className="text-4xl mb-6">{stat.icon}</div>
                <div className="text-5xl font-extrabold text-brand-jade mb-4 tracking-tighter">{stat.value}</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white mb-4">{stat.label}</div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem & Strategic Engagements Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mb-6">Ecosystem & Strategic Engagements</h2>
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Graham's History of Collaboration with National Leaders.</h3>
            <p className="mt-6 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              The following descriptions outline the operational expertise and network collaborations of the firm's Principal Consultant.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                name: "Nava PBC", 
                focus: "Implementation & Technical Architecture",
                context: "Coordinated the technical and operational planning for AI-powered software tools and real-time monitoring dashboards within state benefit systems. This included structuring project requirements for synthetic data environments and OCR data extraction capabilities for public benefit verification."
              },
              { 
                name: "U.S. Digital Response (USDR)", 
                focus: "Crisis Response & Root Cause Analysis",
                context: "Managed multi-week discovery sprints focusing on qualitative caseworker interviews and root cause data analysis. This operational partnership targeted the reduction of SNAP Payment Error Rates (PER) and the mitigation of recertification churn in public benefit systems."
              },
              { 
                name: "Code for America", 
                focus: "Civic Technology Integration & Human-Centered Design",
                context: "Secured formal operational partnerships to rapidly deploy virtual tax preparation software during nationwide closures. Collaborated on human-centered design initiatives to redesign public benefit notices and executed data-sharing frameworks to support caseworker analytics."
              },
              { 
                name: "Arnold Ventures", 
                focus: "Philanthropic Project Architecture",
                context: "Authored foundational proposals and structured the operational frameworks for multi-stakeholder data science initiatives. This work established funding and execution pathways for academic and technical partners to address SNAP payment accuracy through predictive modeling and peer learning collaboratives."
              },
              { 
                name: "Results for America", 
                focus: "Evidence-Based Evaluation",
                context: "Collaborated to oversee randomized controlled trial evaluations for municipal program performance improvement, directly aligning local government initiatives with evidence-based policy standards."
              },
              { 
                name: "Prosperity Now", 
                focus: "National Policy Strategy",
                context: "Served as a national policy liaison to the IRS, FDIC, and CFPB. Evaluated and guided the integration of federal tax administration programs into local, community-based financial infrastructure."
              },
              { 
                name: "Campaign for Working Families", 
                focus: "Strategic Development & Funding",
                context: "Directed operational partnerships and managed strategic development. Secured over $2.2 million in grant funding to scale community-based financial services and civic technology deployments."
              },
              { 
                name: "Civilla", 
                focus: "Methodological Alignment & Service Design",
                context: "Actively engaged through the Digital Benefits Network and civic technology communities of practice. Applied Policy Systems LLC utilizes service design research regarding digital identity design patterns and human-centered public benefit forms to inform its system architecture evaluations."
              }
            ].map((partner, i) => (
              <div key={i} className="p-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] flex flex-col group hover:shadow-2xl hover:border-brand-jade/20 transition-all duration-500">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-brand-jade transition-colors">{partner.name}</div>
                  <div className="px-4 py-1.5 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-full border border-slate-100 dark:border-slate-800">
                    {partner.focus}
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
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
