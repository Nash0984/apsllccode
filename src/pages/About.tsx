import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export function About() {
  const { t } = useTranslation();

  const milestones = useMemo(() => [
    {
      year: t('about.journey.milestones.m1.year'),
      title: t('about.journey.milestones.m1.title'),
      org: t('about.journey.milestones.m1.org'),
      role: t('about.journey.milestones.m1.role'),
      desc: t('about.journey.milestones.m1.desc')
    },
    {
      year: t('about.journey.milestones.m2.year'),
      title: t('about.journey.milestones.m2.title'),
      org: t('about.journey.milestones.m2.org'),
      role: t('about.journey.milestones.m2.role'),
      desc: t('about.journey.milestones.m2.desc')
    },
    {
      year: t('about.journey.milestones.m3.year'),
      title: t('about.journey.milestones.m3.title'),
      org: t('about.journey.milestones.m3.org'),
      role: t('about.journey.milestones.m3.role'),
      desc: t('about.journey.milestones.m3.desc')
    },
    {
      year: t('about.journey.milestones.m4.year'),
      title: t('about.journey.milestones.m4.title'),
      org: t('about.journey.milestones.m4.org'),
      role: t('about.journey.milestones.m4.role'),
      desc: t('about.journey.milestones.m4.desc')
    },
    {
      year: t('about.journey.milestones.m5.year'),
      title: t('about.journey.milestones.m5.title'),
      org: t('about.journey.milestones.m5.org'),
      role: t('about.journey.milestones.m5.role'),
      desc: t('about.journey.milestones.m5.desc')
    },
    {
      year: t('about.journey.milestones.m6.year'),
      title: t('about.journey.milestones.m6.title'),
      org: t('about.journey.milestones.m6.org'),
      role: t('about.journey.milestones.m6.role'),
      desc: t('about.journey.milestones.m6.desc')
    }
  ], [t]);

  const macroEcosystems = useMemo(() => [
    {
      id: "government",
      title: t('about.macroEcosystems.government.title'),
      focus: t('about.macroEcosystems.government.focus'),
      desc: t('about.macroEcosystems.government.desc'),
      nodes: [
        {
          name: t('about.macroEcosystems.government.nodes.n1.name'),
          context: t('about.macroEcosystems.government.nodes.n1.context')
        },
        {
          name: t('about.macroEcosystems.government.nodes.n2.name'),
          context: t('about.macroEcosystems.government.nodes.n2.context')
        },
        {
          name: t('about.macroEcosystems.government.nodes.n3.name'),
          context: t('about.macroEcosystems.government.nodes.n3.context')
        }
      ]
    },
    {
      id: "technology",
      title: t('about.macroEcosystems.technology.title'),
      focus: t('about.macroEcosystems.technology.focus'),
      desc: t('about.macroEcosystems.technology.desc'),
      nodes: [
        {
          name: t('about.macroEcosystems.technology.nodes.n1.name'),
          context: t('about.macroEcosystems.technology.nodes.n1.context')
        },
        {
          name: t('about.macroEcosystems.technology.nodes.n2.name'),
          context: t('about.macroEcosystems.technology.nodes.n2.context')
        },
        {
          name: t('about.macroEcosystems.technology.nodes.n3.name'),
          context: t('about.macroEcosystems.technology.nodes.n3.context')
        }
      ]
    },
    {
      id: "oversight",
      title: t('about.macroEcosystems.oversight.title'),
      focus: t('about.macroEcosystems.oversight.focus'),
      desc: t('about.macroEcosystems.oversight.desc'),
      nodes: [
        {
          name: t('about.macroEcosystems.oversight.nodes.n1.name'),
          context: t('about.macroEcosystems.oversight.nodes.n1.context')
        },
        {
          name: t('about.macroEcosystems.oversight.nodes.n2.name'),
          context: t('about.macroEcosystems.oversight.nodes.n2.context')
        }
      ]
    }
  ], [t]);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <Helmet>
        <title>{t('routes.about.label')} | Applied Policy Systems</title>
        <meta name="description" content={t('about.hero.subtitle')} />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-jade/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="container-wide relative text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="label-uppercase">{t('about.hero.label')}</h1>
            <h2 className="max-w-4xl mx-auto lg:mx-0 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8">
              {t('about.hero.title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
              {t('about.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Dossier & Verified Metrics */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="label-muted">{t('about.founder.title').toUpperCase()}</h2>
                <p className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-snug mb-6">
                  {t('about.founder.intro')}
                </p>
                <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>{t('about.founder.p1')}</p>
                  <p>{t('about.founder.p2')}</p>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="border-t-2 border-slate-200 dark:border-slate-800 pt-6"
              >
                <div className="text-4xl font-black text-brand-jade mb-2">{t('about.impact.stats.citizen.value')}</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t('about.impact.stats.citizen.label')}</div>
                <p className="text-slate-600 dark:text-slate-400">{t('about.impact.stats.citizen.desc')}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="border-t-2 border-slate-200 dark:border-slate-800 pt-6"
              >
                <div className="text-4xl font-black text-brand-jade mb-2">{t('about.impact.stats.funding.value')}</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t('about.impact.stats.funding.label')}</div>
                <p className="text-slate-600 dark:text-slate-400">{t('about.impact.stats.funding.desc')}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="border-t-2 border-slate-200 dark:border-slate-800 pt-6"
              >
                <div className="text-4xl font-black text-brand-jade mb-2">{t('about.impact.stats.execution.value')}</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t('about.impact.stats.execution.label')}</div>
                <p className="text-slate-600 dark:text-slate-400">{t('about.impact.stats.execution.desc')}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Macro Ecosystem Integrations */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h2 className="label-uppercase mb-4">{t('about.macroEcosystems.label')}</h2>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">{t('about.macroEcosystems.title')}</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
              {t('about.macroEcosystems.desc')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 border-t border-slate-200 dark:border-slate-700 pt-8">
            {macroEcosystems.map((macro, i) => (
              <motion.div 
                key={macro.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="text-brand-jade font-mono text-xs font-bold uppercase tracking-widest mb-4">
                  {macro.focus}
                </div>
                <h4 className="text-2xl font-black mb-4 text-slate-900 dark:text-white">
                  {macro.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  {macro.desc}
                </p>
                
                <div className="space-y-6">
                  {macro.nodes.map((node) => (
                    <div key={node.name} className="relative">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-brand-jade shrink-0 mt-1" />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white mb-1">{node.name}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{node.context}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Journey */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h2 className="label-uppercase mb-4">{t('about.journey.label')}</h2>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">{t('about.journey.title')}</h3>
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-[120px_1fr] gap-8 border-t border-slate-100 dark:border-slate-800 pt-8"
              >
                <div className="text-brand-jade font-mono font-bold text-sm uppercase tracking-widest">{milestone.year}</div>
                <div>
                  <h4 className="text-2xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">{milestone.title}</h4>
                  <div className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    {milestone.role} — <span className="text-slate-500 font-medium">{milestone.org}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                    {milestone.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}