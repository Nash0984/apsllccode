import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';

export function Terms() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Terms of Service | Applied Policy Systems</title>
        <meta name="description" content="Applied Policy Systems Terms of Service and professional engagement framework." />
      </Helmet>

      <section className="hero-section">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-jade/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="label-muted">Legal</h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Terms of Service</h2>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <div className="space-y-12 text-slate-600 dark:text-slate-400 leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Acceptance of Terms</h3>
              <p>By accessing this website or engaging with our consulting services, you agree to be bound by these Terms of Service. All content provided on this site is for informational purposes related to the professional services of Applied Policy Systems LLC.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Professional Services</h3>
              <p>Applied Policy Systems provides Independent Verification & Validation (IV&V), SME Advisory, and Technical Strategy for public sector modernization. Our engagements are governed by specific Statements of Work (SOWs) and professional services agreements that supersede these general website terms.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Intellectual Property</h3>
              <p>The methodologies, frameworks, and "Rules-as-Code" ontologies presented on this site are the intellectual property of Applied Policy Systems LLC, unless otherwise noted. Unauthorized reproduction or distribution of our proprietary materials is prohibited.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Disclaimer</h3>
              <p>While we strive for absolute statutory fidelity in our advisory, the information on this website does not constitute legal advice. Agencies and organizations should consult with their own legal counsel regarding specific legislative interpretations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
