import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight } from 'lucide-react';

export function About() {
  const { t } = useTranslation();

  const milestones = [
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
  ];

  const partners = ['nava', 'usdr', 'cfa', 'arnold', 'rfa', 'prosperity', 'cwf', 'civilla'];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <Helmet>
        <title>{t('routes.about.label')} | Applied Policy Systems</title>
        <meta name="description" content="Examine our institutional background, federal tech ecosystem partners, and subject matter authority." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-jade/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="container-wide relative text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="label-uppercase">{t('routes.about.label')}</h1>
            <h2 className="max-w-4xl mx-auto lg:mx-0 text-4xl md:text-5xl lg:text-6xl mb-8">
              {t('about.hero.title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
              {t('routes.about.description')}
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
                <h2 className="label-muted">{t('about.founder.title')}</h2>
                <p className="text-2xl font-medium text-slate-900 dark:text-white leading-snug mb-6">
                  {t('about.founder.intro')}
                </p>
                <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>{t('about.founder.p1')}</p>
                  <p>{t('about.founder.p2')}</p>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-8">
              {Object.entries(t('about.impact.stats', { returnObjects: true })).map(([key, stat]: [string, any], i) => (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-t-2 border-slate-200 dark:border-slate-800 pt-6"
                >
                  <div className="text-4xl font-bold text-brand-jade mb-2">{stat.value}</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white mb-1">{stat.label}</div>
                  <p className="text-slate-600 dark:text-slate-400">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Career Journey - Flattened Timeline */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h2 className="label-muted">{t('about.journey.label')}</h2>
            <h3 className="tracking-tight">{t('about.journey.title')}</h3>
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
                <div className="text-brand-jade font-mono font-bold text-xl">{milestone.year}</div>
                <div>
                  <h4 className="text-2xl font-bold mb-2">{milestone.title}</h4>
                  <div className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                    {milestone.role} — <span className="text-slate-500">{milestone.org}</span>
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

      {/* Ecosystem & Partners - Top Bordered Directory */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h2 className="label-muted">{t('about.ecosystem.label')}</h2>
            <h3 className="tracking-tight">{t('about.ecosystem.title')}</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mt-4">
              {t('about.ecosystem.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 border-t border-slate-200 dark:border-slate-700 pt-8">
            {partners.map((partner, i) => (
              <motion.div 
                key={partner}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group block border-t-2 border-slate-200 dark:border-slate-800 pt-6 hover:border-brand-jade transition-colors"
              >
                <h4 className="text-xl font-bold mb-4 flex items-center justify-between">
                  {t(`about.ecosystem.partners.${partner}.name`)}
                  <ArrowUpRight size={20} className="text-brand-jade opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300" />
                </h4>
                <div className="text-brand-jade font-mono text-xs uppercase tracking-wider mb-3">
                  {t(`about.ecosystem.partners.${partner}.focus`)}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t(`about.ecosystem.partners.${partner}.context`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
