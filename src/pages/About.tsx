import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  ExternalLink, 
  ChevronRight, 
  Award, 
  Target, 
  Users, 
  Briefcase, 
  TrendingUp,
  Quote,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function About() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('experience');
  const [expandedDocs, setExpandedDocs] = useState<string[]>([]);
  const [activeMilestone, setActiveMilestone] = useState(3);

  const researchDocs = useMemo(() => [
    {
      id: 'rac',
      title: t('about.research.docs.rac.title'),
      desc: t('about.research.docs.rac.desc'),
      icon: <FileText size={24} strokeWidth={1.5} />
    },
    {
      id: 'snap',
      title: t('about.research.docs.snap.title'),
      desc: t('about.research.docs.snap.desc'),
      icon: <Target size={24} strokeWidth={1.5} />
    },
    {
      id: 'vita',
      title: t('about.research.docs.vita.title'),
      desc: t('about.research.docs.vita.desc'),
      icon: <TrendingUp size={24} strokeWidth={1.5} />
    }
  ], [t]);

  const experience = useMemo(() => [
    {
      id: 'm1',
      year: t('about.journey.milestones.m1.year'),
      title: t('about.journey.milestones.m1.title'),
      org: t('about.journey.milestones.m1.org'),
      role: t('about.journey.milestones.m1.role'),
      desc: t('about.journey.milestones.m1.desc'),
      icon: '🏛️'
    },
    {
      id: 'm2',
      year: t('about.journey.milestones.m2.year'),
      title: t('about.journey.milestones.m2.title'),
      org: t('about.journey.milestones.m2.org'),
      role: t('about.journey.milestones.m2.role'),
      desc: t('about.journey.milestones.m2.desc'),
      icon: '🌐'
    },
    {
      id: 'm3',
      year: t('about.journey.milestones.m3.year'),
      title: t('about.journey.milestones.m3.title'),
      org: t('about.journey.milestones.m3.org'),
      role: t('about.journey.milestones.m3.role'),
      desc: t('about.journey.milestones.m3.desc'),
      icon: '🛡️'
    },
    {
      id: 'm4',
      year: t('about.journey.milestones.m4.year'),
      title: t('about.journey.milestones.m4.title'),
      org: t('about.journey.milestones.m4.org'),
      role: t('about.journey.milestones.m4.role'),
      desc: t('about.journey.milestones.m4.desc'),
      icon: '💎'
    }
  ], [t]);

  const impactStats = useMemo(() => [
    {
      id: 'citizen',
      value: t('about.impact.stats.citizen.value'),
      label: t('about.impact.stats.citizen.label'),
      desc: t('about.impact.stats.citizen.desc'),
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 'funding',
      value: t('about.impact.stats.funding.value'),
      label: t('about.impact.stats.funding.label'),
      desc: t('about.impact.stats.funding.desc'),
      icon: <Award className="w-6 h-6" />
    },
    {
      id: 'execution',
      value: t('about.impact.stats.execution.value'),
      label: t('about.impact.stats.execution.label'),
      desc: t('about.impact.stats.execution.desc'),
      icon: <Briefcase className="w-6 h-6" />
    }
  ], [t]);

  const ecosystemPartners = useMemo(() => [
    { id: 'nava', name: t('about.ecosystem.partners.nava.name'), focus: t('about.ecosystem.partners.nava.focus'), context: t('about.ecosystem.partners.nava.context') },
    { id: 'usdr', name: t('about.ecosystem.partners.usdr.name'), focus: t('about.ecosystem.partners.usdr.focus'), context: t('about.ecosystem.partners.usdr.context') },
    { id: 'cfa', name: t('about.ecosystem.partners.cfa.name'), focus: t('about.ecosystem.partners.cfa.focus'), context: t('about.ecosystem.partners.cfa.context') },
    { id: 'arnold', name: t('about.ecosystem.partners.arnold.name'), focus: t('about.ecosystem.partners.arnold.focus'), context: t('about.ecosystem.partners.arnold.context') },
    { id: 'rfa', name: t('about.ecosystem.partners.rfa.name'), focus: t('about.ecosystem.partners.rfa.focus'), context: t('about.ecosystem.partners.rfa.context') },
    { id: 'prosperity', name: t('about.ecosystem.partners.prosperity.name'), focus: t('about.ecosystem.partners.prosperity.focus'), context: t('about.ecosystem.partners.prosperity.context') },
    { id: 'cwf', name: t('about.ecosystem.partners.cwf.name'), focus: t('about.ecosystem.partners.cwf.focus'), context: t('about.ecosystem.partners.cwf.context') },
    { id: 'civilla', name: t('about.ecosystem.partners.civilla.name'), focus: t('about.ecosystem.partners.civilla.focus'), context: t('about.ecosystem.partners.civilla.context') }
  ], [t]);

  const toggleDoc = (id: string) => {
    setExpandedDocs(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <Helmet>
        <title>{t('about.hero.title')} | Applied Policy Systems</title>
        <meta name="description" content={t('about.founder.intro')} />
      </Helmet>

      {/* Hero Section */}
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
              <div className="lg:col-span-3 sticky top-32 flex flex-col items-center text-center">
                <div className="w-full aspect-square bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700 overflow-hidden relative group shadow-xl shadow-slate-200/50 mb-6">
                  <img 
                    src="/graham-oneill.jpg" 
                    alt="Graham F. O'Neill" 
                    className="w-full h-full object-cover object-center transition-all duration-700 scale-105 group-hover:scale-100 grayscale hover:grayscale-0"
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
              
              <div className="lg:col-span-9">
                <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-12 tracking-tight">{t('about.founder.title')}</h3>
                <div className="prose prose-slate prose-xl max-w-none text-slate-600 dark:text-slate-400 leading-relaxed space-y-8">
                  <p className="text-xl text-slate-900 dark:text-slate-100 font-medium border-l-4 border-brand-jade pl-8">
                    {t('about.founder.intro')}
                  </p>
                  <p>{t('about.founder.p1')}</p>
                  <p>{t('about.founder.p2')}</p>
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
            <h2 className="label-uppercase">{t('about.journey.label')}</h2>
            <h3 className="tracking-tight text-white">{t('about.journey.title')}</h3>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Timeline Visualization */}
            <div className="lg:col-span-5 relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-800" />
              
              <div className="space-y-12 relative">
                {experience.map((milestone, i) => (
                  <motion.button
                    key={milestone.id}
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
                    {experience[activeMilestone].year}
                  </div>
                  
                  <div className="relative">
                    <div className="inline-block px-4 py-1.5 bg-brand-jade/10 text-brand-jade text-xs font-bold uppercase tracking-widest rounded-full border border-brand-jade/20 mb-8">
                      {experience[activeMilestone].org}
                    </div>
                    
                    <h4 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                      {experience[activeMilestone].role}
                    </h4>
                    
                    <p className="text-xl text-slate-300 leading-relaxed mb-8">
                      {experience[activeMilestone].desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section-padding bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800">
        <div className="container-wide">
          <div className="text-center mb-20">
            <h2 className="label-muted">{t('about.impact.label')}</h2>
            <h3 className="tracking-tight">{t('about.impact.title')}</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {impactStats.map((stat, i) => (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center card-base"
              >
                <div className="w-12 h-12 bg-brand-jade text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-jade/20">
                  {stat.icon}
                </div>
                <div className="text-5xl font-extrabold text-brand-jade mb-4 tracking-tighter">{stat.value}</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white mb-4">{stat.label}</div>
                <p className="leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Insights Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="label-muted">{t('about.research.label')}</h2>
              <h3 className="tracking-tight mb-8">{t('about.research.title')}</h3>
              <p className="text-xl leading-relaxed mb-12">
                {t('about.research.text')}
              </p>
              
              <div className="space-y-6">
                {researchDocs.map((doc) => {
                  const isExpanded = expandedDocs.includes(doc.id);
                  return (
                    <div key={doc.id} className="card-base p-8 relative overflow-hidden group bg-white dark:bg-slate-800">
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
                            onClick={() => toggleDoc(doc.id)}
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
              <div className="aspect-square bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-12 flex flex-col justify-between shadow-xl">
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

      {/* Ecosystem Section */}
      <section className="section-padding bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#006D77_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <span className="text-brand-jade font-bold tracking-widest uppercase text-sm mb-6 block">
                {t('about.ecosystem.label')}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                {t('about.ecosystem.title')}
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                {t('about.ecosystem.desc')}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-card border border-white/10">
              <Quote className="text-brand-jade mb-6 w-10 h-10" />
              <p className="text-xl italic text-slate-200 leading-relaxed mb-8">
                {t('about.ecosystem.quote')}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-jade rounded-full" />
                <div>
                  <div className="font-bold">Graham O'Neill</div>
                  <div className="text-slate-400 text-sm">Founder & Principal Consultant</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ecosystemPartners.map((partner) => (
              <div
                key={partner.id}
                className="p-6 rounded-xl border bg-white/5 border-white/10 hover:border-brand-jade/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-lg group-hover:text-brand-jade transition-colors">{partner.name}</h4>
                </div>
                <div className="text-sm font-bold mb-4 text-brand-jade">
                  {partner.focus}
                </div>
                <p className="text-sm text-white/70 leading-relaxed">
                  {partner.context}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
