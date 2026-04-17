import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export function Privacy() {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Applied Policy Systems | {t('seo.pages.privacy.title')}</title>
        <meta name="description" content={t('seo.pages.privacy.description')} />
        <meta name="keywords" content={`${t('seo.pages.privacy.keywords')}, ${t('seo.defaultKeywords')}`} />
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Privacy Policy</h2>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <div className="space-y-12 text-slate-600 dark:text-slate-400 leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Commitment</h3>
              <p>Applied Policy Systems LLC is committed to protecting your privacy. This policy outlines how we handle information in the context of our consulting and advisory services.</p>
              <p>We operate with a "privacy-by-design" philosophy, ensuring that any data handled during our IV&V or SME advisory processes is treated with the highest level of security and statutory compliance.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Information Collection</h3>
              <p>We only collect information that is voluntarily provided to us through our contact forms, consultation requests, or during the course of a professional engagement.</p>
              <p>This may include your name, email address, organization, and any details you provide regarding your modernization strategy or policy requirements.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Data Usage</h3>
              <p>We do not sell, rent, or share your personal information with third parties for marketing purposes. Information provided is used solely to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your inquiries and consultation requests.</li>
                <li>Provide strategic advisory and technical services.</li>
                <li>Ensure compliance with federal and state mandates (e.g., IRS Pub 1075, IRC § 7216).</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Security Standards</h3>
              <p>We implement industry-standard security measures to protect your data. Given our expertise in federal tax data and welfare program compliance, we maintain strict internal protocols for data handling and jurisdictional isolation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
