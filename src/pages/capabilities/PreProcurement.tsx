import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, ShieldCheck, Network } from 'lucide-react';

export default function PreProcurement() {
  const tags = ["RFP DEVELOPMENT", "VENDOR GOVERNANCE", "DATA SHARING AGREEMENTS"];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Pre-Procurement Advisory | Applied Policy Systems</title>
        <meta name="description" content="Technical specifications and legal architecture required before a prime contractor is hired for IT integration tenders." />
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
            <h1 className="label-uppercase mb-4">Strategic Architecture</h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-8 max-w-4xl">
              Pre-Procurement Advisory
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mb-8">
              Subject Matter Expert (S SME) advisory for drafting modernization tenders with absolute policy fidelity.
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
                  <ShieldCheck className="text-brand-jade" size={24} />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Procurement Defenses</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Establishing strict technical parameters before releasing Requests for Proposals (RFPs) limits vendor scope creep and ensures baseline compliance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 bg-brand-jade rounded-full shrink-0 mt-1.5" />
                    <span>Authoring exact business rules and compliance matrices for state RFPs.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 bg-brand-jade rounded-full shrink-0 mt-1.5" />
                    <span>Developing scoring rubrics to evaluate vendor proposals for statutory fidelity.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-8 prose prose-slate dark:prose-invert max-w-none">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <FileText className="text-brand-jade shrink-0" size={32} />
                  <h3 className="text-2xl font-black m-0">Technical SOW Drafting</h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  Agencies frequently release broad requirements that force prime contractors to interpret complex federal mandates. Technical Statement of Work (SOW) drafting converts statutory requirements into strict engineering parameters, ensuring vendors bid on defined, deterministic architecture rather than abstract policy goals.
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <Network className="text-brand-jade shrink-0" size={32} />
                  <h3 className="text-2xl font-black m-0">Interagency Governance</h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  Cross-enrollment systems require distinct legal authorizations. Structuring Data Sharing Agreements (DSAs) prior to vendor onboarding ensures that the data architecture proposed by integrators is legally viable and compliant with regulations regarding interagency data transfers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}