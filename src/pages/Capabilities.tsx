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
      <section className="section-padding bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 relative overflow-hidden" aria-labelledby="engagements-title">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-jade/[0.02] dark:bg-brand-jade/[0.03] blur-[100px] pointer-events-none" />
        
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mb-16">
            <h2 className="label-uppercase mb-4">{t('capabilitiesPage.engagements.title')}</h2>
            <h3 id="engagements-title" className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
              A Strategic Engagement Ladder
            </h3>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {t('capabilitiesPage.engagements.subtitle')}
            </p>
          </div>
 
          <div className="grid lg:grid-cols-3 gap-8 mb-20 relative">
            {/* Connection line for desktop */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-px border-t border-dashed border-slate-200 dark:border-slate-800 z-0" />

            {[
              { 
                key: 'phase1', 
                icon: <ShieldCheck size={28} />, 
                highlight: true 
              },
              { 
                key: 'phase2', 
                icon: <Scale size={28} />, 
                highlight: false 
              },
              { 
                key: 'phase3', 
                icon: <Landmark size={28} />, 
                highlight: false 
              }
            ].map((model, i) => (
              <motion.div 
                key={model.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative z-10 flex flex-col p-8 md:p-10 rounded-[2.5rem] border transition-all duration-500 ${
                  model.highlight 
                    ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white shadow-2xl shadow-slate-900/20 dark:shadow-white/5 transform lg:-translate-y-4' 
                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-brand-jade/30 shadow-sm'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner ${
                  model.highlight 
                    ? 'bg-brand-jade text-white' 
                    : 'bg-brand-jade/10 text-brand-jade'
                }`}>
                  {model.icon}
                </div>

                <div className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${
                  model.highlight ? 'text-brand-jade' : 'text-slate-400'
                }`}>
                  {t(`capabilitiesPage.engagements.${model.key}.tag`)}
                </div>

                <h4 className={`text-xl md:text-2xl font-black mb-6 tracking-tight leading-tight ${
                  model.highlight ? 'text-white dark:text-slate-900' : 'text-slate-900 dark:text-white'
                }`}>
                  {t(`capabilitiesPage.engagements.${model.key}.title`)}
                </h4>
                
                <p className={`text-sm md:text-base leading-relaxed font-medium ${
                  model.highlight ? 'text-slate-300 dark:text-slate-600' : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {t(`capabilitiesPage.engagements.${model.key}.text`)}
                </p>

                {model.highlight && (
                  <div className="absolute -top-3 left-10 px-4 py-1 bg-brand-jade text-[10px] font-black text-white uppercase tracking-widest rounded-full shadow-lg">
                    Immediate Entry Point
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              to="/contact"
              className="inline-flex px-10 py-5 bg-brand-jade text-white font-black rounded-2xl hover:bg-[#005a62] transition-all items-center gap-3 shadow-2xl shadow-brand-jade/30 group transform hover:-translate-y-1 active:scale-95"
            >
              {t('capabilitiesPage.engagements.cta.button')}
              <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
