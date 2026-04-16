import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Shield, Network, LineChart, Database, FileText, BookOpen, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export function Capabilities() {
  const { t } = useTranslation();

  const capabilities = useMemo(() => [
    {
      slug: 'verifiable-payloads',
      icon: <Shield size={24} />,
      title: t('capabilitiesPage.cards.statutory.title'),
      desc: t('capabilitiesPage.cards.statutory.desc'),
      deliverables: [
        t('capabilitiesPage.cards.statutory.d1'),
        t('capabilitiesPage.cards.statutory.d2'),
        t('capabilitiesPage.cards.statutory.d3')
      ]
    },
    {
      slug: 'hybrid-engine',
      icon: <Network size={24} />,
      title: t('capabilitiesPage.cards.rulesEngine.title'),
      desc: t('capabilitiesPage.cards.rulesEngine.desc'),
      deliverables: [
        t('capabilitiesPage.cards.rulesEngine.d1'),
        t('capabilitiesPage.cards.rulesEngine.d2'),
        t('capabilitiesPage.cards.rulesEngine.d3')
      ]
    },
    {
      slug: 'payment-error-rate',
      icon: <LineChart size={24} />,
      title: t('capabilitiesPage.cards.sanction.title'),
      desc: t('capabilitiesPage.cards.sanction.desc'),
      deliverables: [
        t('capabilitiesPage.cards.sanction.d1'),
        t('capabilitiesPage.cards.sanction.d2'),
        t('capabilitiesPage.cards.sanction.d3')
      ]
    },
    {
      slug: 'glassbox-integration',
      icon: <Database size={24} />,
      title: t('capabilitiesPage.cards.data.title'),
      desc: t('capabilitiesPage.cards.data.desc'),
      deliverables: [
        t('capabilitiesPage.cards.data.d1'),
        t('capabilitiesPage.cards.data.d2'),
        t('capabilitiesPage.cards.data.d3')
      ]
    },
    {
      slug: 'pre-procurement',
      icon: <FileText size={24} />,
      title: t('capabilitiesPage.cards.advisory.title'),
      desc: t('capabilitiesPage.cards.advisory.desc'),
      deliverables: [
        t('capabilitiesPage.cards.advisory.d1'),
        t('capabilitiesPage.cards.advisory.d2'),
        t('capabilitiesPage.cards.advisory.d3')
      ]
    },
    {
      slug: 'operational-translation',
      icon: <BookOpen size={24} />,
      title: t('capabilitiesPage.cards.translation.title'),
      desc: t('capabilitiesPage.cards.translation.desc'),
      deliverables: [
        t('capabilitiesPage.cards.translation.d1'),
        t('capabilitiesPage.cards.translation.d2'),
        t('capabilitiesPage.cards.translation.d3')
      ]
    }
  ], [t]);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <Helmet>
        <title>{t('capabilitiesPage.hero.label')} | Applied Policy Systems</title>
        <meta name="description" content={t('capabilitiesPage.hero.subtitle')} />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section border-b border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-jade/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="container-wide relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <h1 className="label-uppercase mb-6">{t('capabilitiesPage.hero.label')}</h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 text-slate-900 dark:text-white">
              {t('capabilitiesPage.hero.title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('capabilitiesPage.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container-wide">
          <div className="mb-16">
            <h3 className="label-uppercase mb-4">{t('capabilitiesPage.grid.headerLabel')}</h3>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('capabilitiesPage.grid.headerTitle')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <Link 
                  to={`/capabilities/${cap.slug}`}
                  className="block h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-brand-jade dark:hover:border-brand-jade transition-all shadow-sm hover:shadow-md group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-jade focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                >
                  <div className="absolute top-8 right-8 text-brand-jade opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight size={24} />
                  </div>

                  <div className="text-brand-jade mb-6">
                    {cap.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{cap.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-sm">
                    {cap.desc}
                  </p>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                       {t('capabilitiesPage.grid.deliverablesLabel')}
                    </div>
                    <ul className="space-y-3">
                       {cap.deliverables.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                             <div className="w-1.5 h-1.5 rounded-full bg-brand-jade mt-1.5 shrink-0 transition-transform group-hover:scale-125" />
                             {item}
                          </li>
                       ))}
                    </ul>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}