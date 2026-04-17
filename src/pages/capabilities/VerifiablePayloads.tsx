import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Binary, FileCode, ShieldCheck } from 'lucide-react';

export default function VerifiablePayloads() {
  const tags = ["STATUTORY FIDELITY", "IV&V COMPLIANCE", "SYSTEM DIAGNOSTICS"];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Applied Policy Systems | Verifiable Payload Architectures</title>
        <meta name="description" content="Independent Verification & Validation (IV&V) frameworks ensuring system logic is a verifiable reflection of statutory requirements." />
        <meta name="keywords" content="verifiable payloads, IV&V frameworks, statutory fidelity, system logic verification, Applied Policy Systems" />
      </Helmet>

      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-6 py-4">
        <div className="container-wide">
          <Link to="/capabilities" className="inline-flex items-center text-sm font-bold text-brand-jade hover:text-brand-jade/80 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Return to Capabilities
          </Link>
        </div>
      </div>

      <section className="section-padding pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-jade/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="container-wide relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="label-uppercase mb-4">Architectural Framework</h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-8 max-w-4xl">
              Verifiable Payload Architectures
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mb-8">
              Independent Verification & Validation (IV&V) frameworks that ensure system logic is a verifiable reflection of statutory requirements.
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
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Synthetic Data Environments</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Our diagnostics are executed exclusively within secure, synthetic testing environments to ensure absolute privacy compliance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 bg-brand-jade rounded-full shrink-0 mt-1.5" />
                    <span>No production databases or live resident data are utilized during diagnostic sprints.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 bg-brand-jade rounded-full shrink-0 mt-1.5" />
                    <span>Payloads are mathematically generated to represent edge-case statutory scenarios without containing PII.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-8 prose prose-slate dark:prose-invert max-w-none">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <Binary className="text-brand-jade shrink-0" size={32} />
                  <h3 className="text-2xl font-black m-0">Isolating Statutory Drift</h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  The translation of complex public policy into operational code is highly susceptible to statutory drift, where the programmed logic subtly deviates from the written law. Unlike standard User Acceptance Testing (UAT) which evaluates the caseworker interface, our methodology bypasses the UI to test the deterministic math layer directly.
                </p>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mt-4">
                  By injecting synthetic, edge-case API payloads into the engine, we isolate whether an eligibility failure is a procedural human error or a hardcoded algorithmic flaw that requires immediate remediation.
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <FileCode className="text-brand-jade shrink-0" size={32} />
                  <h3 className="text-2xl font-black m-0">Defect Remediation & IV&V</h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  When a Business Rules Engine contains statutory drift, the resulting calculation failures disproportionately impact vulnerable residents by improperly denying or delaying benefits. We provide Independent Verification and Validation (IV&V) teams with a mathematically provable framework to identify and eliminate these invisible technical barriers.
                </p>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mt-4">
                  This level of architectural rigor ensures that modernization tenders deliver systems capable of achieving absolute statutory fidelity, protecting both the fiscal integrity of the state and the fundamental rights of the citizen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}