import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function StrategicProcurementAlignment() {
  const { t } = useTranslation();
  const tags = ["RFP ENGINEERING", "API BOUNDING", "GRANT BRAIDING"];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Applied Policy Systems | Strategic Procurement & Alignment</title>
        <meta name="description" content="Engineering strict API constraints into RFPs and braiding federal seed grants with civic philanthropy." />
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
              {t('capabilitiesPage.cards.sanction.title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mb-8">
              {t('capabilitiesPage.cards.sanction.text')}
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
                  <BookOpen className="text-brand-jade" size={24} />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Procurement Safety</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Legally blocking vendor lock-in before the first line of code is written.
                </p>
                <ul className="space-y-3">
                   {(t('capabilitiesPage.cards.sanction.features', { returnObjects: true }) as string[]).map((feature, idx) => (
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
                  <Layers className="text-brand-jade shrink-0" size={32} />
                  <h3 className="text-2xl font-black m-0 tracking-tight">API Boundary Engineering</h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  We engineer strict API constraints and schema validation requirements directly into state RFPs. This legally mandates true modularity, forcing Tier-1 vendors to deliver decoupled ecosystems rather than tightly coupled monoliths.
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <Zap className="text-brand-jade shrink-0" size={32} />
                  <h3 className="text-2xl font-black m-0 tracking-tight">Venture Capital Funding Model</h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  Public sector innovation often dies in the budget cycle. We deploy a 'Venture Capital' model for government—braiding federal seed grants with targeted civic philanthropy to fund high-risk, high-reward architectural remediation outside of traditional capital windows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
