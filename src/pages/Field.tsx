import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Sandbox } from '../components/Sandbox';
import { PolicyManual } from '../components/PolicyManual';
import { ExtractionEngine } from '../components/ExtractionEngine';

export function Field() {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <Helmet>
        <title>Applied Policy Systems | {t('seo.pages.field.title')}</title>
        <meta name="description" content={t('seo.pages.field.description')} />
        <meta name="keywords" content={`${t('seo.pages.field.keywords')}, ${t('seo.defaultKeywords')}`} />
        <meta property="og:title" content={`Applied Policy Systems | ${t('seo.pages.field.title')}`} />
        <meta property="og:description" content={t('seo.pages.field.description')} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section border-b border-slate-200 dark:border-slate-800">
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="label-uppercase">{t('prototypesPage.hero.label')}</h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight font-black text-slate-900 dark:text-white">
              {t('prototypesPage.hero.title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('prototypesPage.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Environments */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
        <div className="container-wide">
          
          {/* Demonstrator 01: Sandbox */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-jade mb-6">
                {t('prototypesPage.blueprints.documentTool.label')}
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
                {t('prototypesPage.blueprints.documentTool.title')}
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                {t('prototypesPage.blueprints.documentTool.desc')}
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white dark:bg-slate-950 rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 dark:border-slate-900">
              <Sandbox />
            </motion.div>
          </div>

          {/* Demonstrator 02: Policy Manual */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:order-2">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-jade mb-6">
                {t('prototypesPage.blueprints.policyManual.label')}
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
                {t('prototypesPage.blueprints.policyManual.title')}
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                {t('prototypesPage.blueprints.policyManual.desc')}
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:order-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
              <PolicyManual />
            </motion.div>
          </div>

          {/* Demonstrator 03: Extraction Engine */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-jade mb-6">
                {t('prototypesPage.blueprints.extractionEngine.label')}
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
                {t('prototypesPage.blueprints.extractionEngine.title')}
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                {t('prototypesPage.blueprints.extractionEngine.desc')}
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white dark:bg-slate-950 rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 dark:border-slate-900">
              <ExtractionEngine />
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
}