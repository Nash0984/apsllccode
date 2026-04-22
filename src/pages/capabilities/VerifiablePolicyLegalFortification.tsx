import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Binary, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function VerifiablePolicyLegalFortification() {
  const { t } = useTranslation();
  const tags = ["SMT-LIB SOLVERS", "FORMAL VERIFICATION", "ADMINISTRATIVE LAW"];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Applied Policy Systems | Verifiable Policy & Legal Fortification</title>
        <meta name="description" content="Bridging deterministic engineering and administrative law via mathematical provers and empirical Time Tax audits." />
      </Helmet>

      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-6 py-4">
        <div className="container-wide">
          <Link to="/capabilities" className="inline-flex items-center text-sm font-bold text-brand-jade hover:text-brand-jade/80 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            {t('common.returnToCapabilities', 'Return to Capabilities')}
          </Link>
        </div>
      </div>

      <section className="section-padding pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-jade/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="container-wide relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="label-uppercase mb-4">Architectural Rescue</h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-8 max-w-4xl">
              {t('capabilitiesPage.cards.statutory.title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mb-8">
              {t('capabilitiesPage.cards.statutory.text')}
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
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Deterministic Compliance</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  We deploy mathematical theorem provers to verify that eligibility logic is a 1:1 reflection of statutory requirements.
                </p>
                <ul className="space-y-3">
                   {(t('capabilitiesPage.cards.statutory.features', { returnObjects: true }) as string[]).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 bg-brand-jade rounded-full shrink-0 mt-1.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-8 prose prose-slate dark:prose-invert max-w-none">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <Scale className="text-brand-jade shrink-0" size={32} />
                  <h3 className="text-2xl font-black m-0 tracking-tight">Legal Fortification</h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  Administrative law is shifting. Post-Loper Bright, qualitiative policy defenses are no longer sufficient. We provide the empirical data shields—like automated Time Tax audits—required to legally defend state policy choices and challenge unfunded federal mandates.
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <Binary className="text-brand-jade shrink-0" size={32} />
                  <h3 className="text-2xl font-black m-0 tracking-tight">Rules-as-Code (RaC) Verification</h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  We translate legislative mandates into SMT-LIB compliant models, allowing agencies to stress-test their logic against millions of synthetic edge cases in seconds. This ensures that "Policy as Code" is a verifiable architectural standard, not a marketing term.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
