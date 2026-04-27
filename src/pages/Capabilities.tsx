import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Scale, ShieldCheck, Landmark, Users, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export function Capabilities() {
  const { t } = useTranslation();

  const capabilities = useMemo(() => [
    {
      slug: 'verifiable-policy-legal-fortification',
      icon: <Scale size={28} strokeWidth={1.5} />,
      title: t('capabilitiesPage.cards.statutory.title'),
      desc: t('capabilitiesPage.cards.statutory.text'),
      deliverables: t('capabilitiesPage.cards.statutory.features', { returnObjects: true }) as string[]
    },
    {
      slug: 'ethical-ai-governance-infrastructure',
      icon: <ShieldCheck size={28} strokeWidth={1.5} />,
      title: t('capabilitiesPage.cards.rulesEngine.title'),
      desc: t('capabilitiesPage.cards.rulesEngine.text'),
      deliverables: t('capabilitiesPage.cards.rulesEngine.features', { returnObjects: true }) as string[]
    },
    {
      slug: 'strategic-procurement-alignment',
      icon: <Landmark size={28} strokeWidth={1.5} />,
      title: t('capabilitiesPage.cards.sanction.title'),
      desc: t('capabilitiesPage.cards.sanction.text'),
      deliverables: t('capabilitiesPage.cards.sanction.features', { returnObjects: true }) as string[]
    },
    {
      slug: 'frontline-operations-human-capital',
      icon: <Users size={28} strokeWidth={1.5} />,
      title: t('capabilitiesPage.cards.data.title'),
      desc: t('capabilitiesPage.cards.data.text'),
      deliverables: t('capabilitiesPage.cards.data.features', { returnObjects: true }) as string[]
    }
  ], [t]);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <Helmet>
        <title>Applied Policy Systems | {t('seo.pages.capabilities.title')}</title>
        <meta name="description" content={t('seo.pages.capabilities.description')} />
        <meta name="keywords" content={`${t('seo.pages.capabilities.keywords')}, ${t('seo.defaultKeywords')}`} />
        <meta property="og:title" content={`Applied Policy Systems | ${t('seo.pages.capabilities.title')}`} />
        <meta property="og:description" content={t('seo.pages.capabilities.description')} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section border-b border-slate-100 dark:border-slate-800" aria-labelledby="capabilities-hero-title">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-jade/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="container-wide relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <h1 className="label-uppercase mb-6">{t('capabilitiesPage.hero.label', 'Capabilities')}</h1>
            <h2 id="capabilities-hero-title" className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 text-slate-900 dark:text-white">
              {t('capabilitiesPage.hero.title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('capabilitiesPage.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid Section - Updated to 2x2 for the 4 Pillars */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900" aria-labelledby="grid-header-title">
        <div className="container-wide">
          <div className="mb-16 text-center md:text-left">
            <h3 className="label-uppercase mb-4">{t('capabilitiesPage.grid.headerLabel', 'The Four Pillars')}</h3>
            <h2 id="grid-header-title" className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('capabilitiesPage.grid.headerTitle', 'Multidisciplinary Domains of Authority')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {capabilities.map((cap, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <article className="h-full">
                  <Link 
                    to={`/capabilities/${cap.slug}`}
                    aria-labelledby={`cap-title-${i}`}
                    className="block h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 hover:border-brand-jade dark:hover:border-brand-jade transition-all shadow-sm hover:shadow-xl group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-jade focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                  >
                    <div className="absolute top-10 right-10 text-brand-jade opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight size={28} aria-hidden="true" />
                    </div>

                    <div className="text-brand-jade mb-8" aria-hidden="true">
                      {cap.icon}
                    </div>
                    <h4 id={`cap-title-${i}`} className="text-2xl md:text-3xl font-black mb-5 text-slate-900 dark:text-white tracking-tight">{cap.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed text-base md:text-lg">
                      {cap.desc}
                    </p>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-8 mt-auto">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
                         {t('capabilitiesPage.grid.deliverablesLabel', 'Core Interventions')}
                      </div>
                      <ul className="space-y-4">
                         {Array.isArray(cap.deliverables) && cap.deliverables.map((item, j) => (
                            <li key={j} className="flex items-start gap-4 text-base font-medium text-slate-700 dark:text-slate-300">
                               <div className="w-2 h-2 rounded-full bg-brand-jade mt-2 shrink-0 transition-transform group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(0,90,98,0.5)]" />
                               {item}
                            </li>
                         ))}
                      </ul>
                    </div>
                  </Link>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models Section */}
      <section className="section-padding bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800" aria-labelledby="engagements-title">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h2 className="label-uppercase mb-4">{t('capabilitiesPage.engagements.title', 'Engagement Models')}</h2>
            <h3 id="engagements-title" className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Strategic Oversight Architectures
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { key: 'sprint', icon: <Scale size={24} /> },
              { key: 'advisory', icon: <ShieldCheck size={24} /> },
              { key: 'integration', icon: <Landmark size={24} /> }
            ].map((model, i) => (
              <motion.div 
                key={model.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-brand-jade/30 transition-all flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-jade/5 flex items-center justify-center text-brand-jade mb-6">
                  {model.icon}
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                  {t(`capabilitiesPage.engagements.${model.key}.title`)}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {t(`capabilitiesPage.engagements.${model.key}.text`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
