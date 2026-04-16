import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, UserCheck, Binary } from 'lucide-react';

export default function OperationalTranslation() {
  const tags = ["FRONTLINE EXECUTION", "DETERMINISTIC SOPS", "HUMAN-IN-THE-LOOP"];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Operational Translation | Applied Policy Systems</title>
        <meta name="description" content="Converting dense legislative text into plain-language, low-friction digital infrastructure for frontline caseworkers." />
      </Helmet>

      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-6 py-4">
        <div className="container-wide">
          <Link to="/capabilities" className="inline-flex items-center text-sm font-bold text-brand-jade hover:text-brand-jade/80 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Return to Capabilities Matrix
          </Link>
        </div>
      </div>

      <section className="section-padding pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-jade/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="container-wide relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="label-uppercase mb-4">Implementation Delivery</h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-8 max-w-4xl">
              Operational Translation
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mb-8">
              Converting dense legislative text into plain-language, low-friction digital infrastructure for frontline caseworkers.
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

      <section className="section-padding pt-0">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            
            <div className="lg:col-span-4">
              <div className="sticky top-24 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-6">
                  <UserCheck className="text-brand-jade" size={24} />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Caseworker Support</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Automated systems must generate verifiable explanations for eligibility determinations to support administrative justice.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 bg-brand-jade rounded-full shrink-0 mt-1.5" />
                    <span>Mapping deterministic logic models directly to Standard Operating Procedures (SOPs).</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 bg-brand-jade rounded-full shrink-0 mt-1.5" />
                    <span>Eliminating black-box outcomes during the appeals process.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-8 prose prose-slate dark:prose-invert max-w-none">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <Binary className="text-brand-jade shrink-0" size={32} />
                  <h3 className="text-2xl font-black m-0">Deterministic SOPs</h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  When a rules engine denies an application, frontline staff must have the documentation to explain the decision to the applicant. Deterministic Standard Operating Procedures align the agency's operational manuals strictly with the deployed codebase, eliminating discrepancies between what caseworkers are instructed to do and how the system calculates outcomes.
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <BookOpen className="text-brand-jade shrink-0" size={32} />
                  <h3 className="text-2xl font-black m-0">Living Policy Manuals</h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  Static policy documents rapidly become obsolete following system updates. Living Policy Manuals map directly to the active logic pathways. This deployment ensures that adjudicators are continuously referencing the exact parameters the rules engine is executing in production environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}