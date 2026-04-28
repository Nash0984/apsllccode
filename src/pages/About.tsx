import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, ShieldCheck, Scale, Landmark } from 'lucide-react';
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

  const philosophy = useMemo(() => [
    {
      id: "grounding",
      title: t('about.philosophy.pillars.0.title'),
      desc: t('about.philosophy.pillars.0.desc'),
      icon: <Scale size={24} />
    },
    {
      id: "frontline",
      title: t('about.philosophy.pillars.1.title'),
      desc: t('about.philosophy.pillars.1.desc'),
      icon: <ShieldCheck size={24} />
    },
    {
      id: "audit",
      title: t('about.philosophy.pillars.2.title'),
      desc: t('about.philosophy.pillars.2.desc'),
      icon: <Landmark size={24} />
    }
  ], [t]);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <Helmet>
        <title>Applied Policy Systems | {t('seo.pages.about.title')}</title>
        <meta name="description" content={t('seo.pages.about.description')} />
        <meta name="keywords" content={`${t('seo.pages.about.keywords')}, ${t('seo.defaultKeywords')}`} />
        <meta property="og:title" content={`Applied Policy Systems | ${t('seo.pages.about.title')}`} />
        <meta property="og:description" content={t('seo.pages.about.description')} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="about-hero-title">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-jade/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="container-wide relative text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="label-uppercase">{t('about.hero.label')}</h1>
            <h2 id="about-hero-title" className="max-w-4xl mx-auto lg:mx-0 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8">
              {t('about.hero.title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {t('about.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h2 className="label-uppercase mb-4">{t('about.philosophy.label')}</h2>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              {t('about.philosophy.title')}
            </h3>
            <p className="text-xl text-slate-600 dark:text-slate-400 mt-6 leading-relaxed font-medium">
              {t('about.philosophy.desc')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 pt-8">
            {philosophy.map((pillar, i) => (
              <motion.div 
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-950 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-jade transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-jade/5 flex items-center justify-center text-brand-jade mb-8 group-hover:bg-brand-jade group-hover:text-white transition-all duration-500">
                  {pillar.icon}
                </div>
                <h4 className="text-2xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                  {pillar.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-[1.8] font-medium">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Dossier & Verified Metrics */}
      <section className="section-padding bg-white dark:bg-slate-950" aria-label="Founder and Impact Statistics">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="flex flex-col sm:flex-row gap-10 items-center sm:items-start pb-12 border-b border-slate-100 dark:border-slate-800">
                <div className="shrink-0 relative group">
                  <div className="absolute -inset-4 bg-brand-jade/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img 
                    src="/graham-oneill.jpg" 
                    alt="Graham O'Neill" 
                    className="relative w-48 h-64 rounded-2xl object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 border border-slate-200 dark:border-slate-800"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="label-muted mb-4">{t('about.founder.title').toUpperCase()}</h2>
                  <p className="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                    {t('about.founder.intro')}
                  </p>
                </div>
              </div>

              <div className="space-y-8 text-xl text-slate-600 dark:text-slate-400 leading-[1.7] font-medium">
                <p className="first-letter:text-5xl first-letter:font-black first-letter:text-brand-jade first-letter:mr-3 first-letter:float-left">
                  {t('about.founder.p1')}
                </p>
                <p>{t('about.founder.p2')}</p>
              </div>
            </motion.div>

            <div className="grid gap-10 lg:sticky lg:top-32">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800"
              >
                <div className="text-6xl font-black text-brand-jade mb-4 tracking-tighter">{t('about.impact.stats.citizen.value')}</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('about.impact.stats.citizen.label')}</div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{t('about.impact.stats.citizen.desc')}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800"
              >
                <div className="text-6xl font-black text-brand-jade mb-4 tracking-tighter">{t('about.impact.stats.funding.value')}</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('about.impact.stats.funding.label')}</div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{t('about.impact.stats.funding.desc')}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800"
              >
                <div className="text-6xl font-black text-brand-jade mb-4 tracking-tighter">{t('about.impact.stats.execution.value')}</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('about.impact.stats.execution.label')}</div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{t('about.impact.stats.execution.desc')}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Journey */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h2 className="label-uppercase mb-4">{t('about.journey.label')}</h2>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              {t('about.journey.title')}
            </h3>
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-[160px_1fr] gap-8 border-t border-slate-200 dark:border-slate-800 pt-12"
              >
                <div className="text-brand-jade font-mono font-bold text-sm uppercase tracking-[0.2em]">{milestone.year}</div>
                <div>
                  <h4 className="text-2xl md:text-3xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">{milestone.title}</h4>
                  <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-6">
                    {milestone.role} — <span className="text-brand-jade font-black">{milestone.org}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-4xl font-medium">
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
