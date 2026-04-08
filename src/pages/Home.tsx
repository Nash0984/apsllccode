import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <>
      <Helmet>
        <title>Applied Policy Systems | Public Sector Strategy & Modernization</title>
        <meta name="description" content="Applied Policy Systems LLC bridges the disconnect in public administration by translating legislative mandates into actionable digital infrastructure." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-white">
        {/* Subtle Technical Pattern with Parallax */}
        <motion.div 
          style={{ 
            y,
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '100px 100px' 
          }}
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.2]">
                Strategic Advisory for <span className="text-brand-jade">Public Sector Modernization</span>.
              </h1>
              <p className="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed max-w-3xl">
                Applied Policy Systems LLC bridges the gap between written regulations and the operational realities that govern the machinery of government. We provide structural evaluation and strategic guidance to ensure that complex administrative systems achieve policy fidelity, operational efficiency, and equitable access.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link 
                  to="/capabilities" 
                  aria-label="Learn more about our capabilities"
                  className="px-12 py-6 bg-brand-jade text-white text-xl font-bold rounded-2xl hover:bg-[#005a62] hover:scale-[1.02] transition-all shadow-2xl shadow-brand-jade/30 flex items-center gap-4 group"
                >
                  How we can help
                  <ArrowRight size={24} strokeWidth={1.5} className="group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-slate-400 mb-6">The Challenge</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-10 tracking-tight leading-tight">The Implementation Disconnect.</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-8 text-lg text-slate-600 leading-relaxed text-left">
                <p>
                  Public administration often fails at the translation layer. Lawmakers draft subjective statutes, while technology vendors build opaque, black-box software. This creates a gap between written regulations and the operational realities of government.
                </p>
              </div>
              <div className="relative p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-jade rounded-l-[2.5rem]" />
                <p className="font-medium text-slate-900 italic leading-relaxed text-xl">
                  Applied Policy Systems LLC bridges this disconnect. We specialize in optimizing complex government systems by translating deep policy expertise into actionable, deterministic solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Capabilities', path: '/capabilities', desc: 'Precision-engineered frameworks for complex administrative systems.', action: 'See how we help' },
              { name: 'Audiences', path: '/audiences', desc: 'Strategic partnerships across government, tech, and community sectors.', action: 'Who we work with' },
              { name: 'Research', path: '/research', desc: 'Empirical policy evaluation and historical pattern analysis.', action: 'Explore our insights' }
            ].map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className="p-10 border border-slate-100 rounded-[2rem] bg-slate-50 hover:bg-white hover:shadow-2xl hover:border-brand-jade/10 transition-all duration-500 group"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-brand-jade transition-colors">{item.name}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{item.desc}</p>
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
