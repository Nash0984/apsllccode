import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Network, Search, ShieldAlert } from 'lucide-react';

export default function Glassbox() {
  const tags = ["DATA INTEGRATION", "SYSTEM AUDITABILITY", "IRC § 7216 COMPLIANCE"];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Applied Policy Systems | Glassbox Integration Architecture</title>
        <meta name="description" content="Strict Data Exchange Models (DEM) and payload validation schemas for secure interagency data ingestion, including IRS Publication 1075 compliance." />
        <meta name="keywords" content="glassbox integration, interagency data exchange, federal tax data security, IRS 1075, Applied Policy Systems" />
      </Helmet>

      {/* Navigation Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-6 py-4">
        <div className="container-wide">
          <Link to="/capabilities" className="inline-flex items-center text-sm font-bold text-brand-jade hover:text-brand-jade/80 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Return to Capabilities
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-jade/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="container-wide relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="label-uppercase mb-4">Data Architecture</h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-8 max-w-4xl">
              Secure Data Interoperability
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mb-8">
              Strict Data Exchange Models (DEM) and payload validation schemas for secure interagency data ingestion.
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

      {/* Content Blocks */}
      <section className="section-padding pt-0">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Left Column: Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldAlert className="text-brand-jade" size={24} />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Federal Tax Privacy</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  This framework outlines architectural requirements for managing sensitive interagency data exchanges, specifically regarding tax information.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 bg-brand-jade rounded-full shrink-0 mt-1.5" />
                    <span>Incorporates strict adherence guidelines for IRS Publication 1075 and IRC § 7216.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 bg-brand-jade rounded-full shrink-0 mt-1.5" />
                    <span>Ensures state eligibility systems can map cross-enrollment data securely without exposing raw tax records to unauthorized nodes.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Core Narrative */}
            <div className="lg:col-span-8 prose prose-slate dark:prose-invert max-w-none">
              
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <Network className="text-brand-jade shrink-0" size={32} />
                  <h3 className="text-2xl font-black m-0">Data Provenance & Audit Trails</h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  As state agencies automate verification through external data brokers and interagency APIs, systems often evolve into opaque "black boxes." When a resident is denied benefits based on an automated calculation lacking a decipherable logic path, it creates significant legal and federal audit liabilities.
                </p>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mt-4">
                  Our data exchange models require all data pipelines to map directly to plain-language policy manuals. Every automated decision must generate a definitive, human-readable audit trail that explains precisely which rule and which data point triggered the outcome.
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <Search className="text-brand-jade shrink-0" size={32} />
                  <h3 className="text-2xl font-black m-0">Reducing Administrative Burden</h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  By structuring system architecture around transparency, we simultaneously reduce the burden on both the resident and the administration. Caseworkers are no longer required to reverse-engineer complex system errors, and residents are provided with clear, actionable requirements rather than generic denial codes.
                </p>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mt-4">
                  This approach aligns the rigorous evidentiary requirements of federal oversight with operational efficiency, proving that strict system security and streamlined administrative workflows are not mutually exclusive.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}