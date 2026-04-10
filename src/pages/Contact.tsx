import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Mail, Linkedin, MapPin, MessageSquare, ArrowRight, Bot } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ChatWidget } from '../components/ChatWidget';

export function Contact() {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <Helmet>
        <title>Contact | Applied Policy Systems</title>
        <meta name="description" content="Get in touch with Applied Policy Systems for strategic consulting on platform architecture and public sector modernization." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-wide">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="label-uppercase">{t('contactPage.hero.label')}</h1>
              <h2 className="mb-10">
                {t('contactPage.hero.title')}
              </h2>
              <p className="text-2xl leading-relaxed">
                {t('contactPage.hero.subtitle')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Chat Interface */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                  <Bot className="text-brand-jade" />
                  {t('contactPage.ai.title')}
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  {t('contactPage.ai.desc')}
                </p>
              </div>
              <ChatWidget embedded={true} />
            </motion.div>

            {/* Direct Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-12"
            >
              <div>
                <h3 className="label-muted mb-8">{t('contactPage.direct.label')}</h3>
                <div className="grid gap-6">
                  <a 
                    href="mailto:graham@appliedpolicysystems.com" 
                    className="group card-base card-hover flex items-center gap-6"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-brand-jade/10 flex items-center justify-center text-brand-jade group-hover:bg-brand-jade group-hover:text-white transition-all">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('contactPage.direct.email')}</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">graham@appliedpolicysystems.com</p>
                    </div>
                  </a>

                  <a 
                    href="https://www.linkedin.com/company/applied-policy-systems" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group card-base card-hover flex items-center gap-6"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-brand-jade/10 flex items-center justify-center text-brand-jade group-hover:bg-brand-jade group-hover:text-white transition-all">
                      <Linkedin size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('contactPage.direct.linkedin')}</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">Applied Policy Systems</p>
                    </div>
                  </a>

                  <div className="card-base flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-jade/10 flex items-center justify-center text-brand-jade">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('contactPage.direct.location')}</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">Philadelphia, PA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-brand-jade rounded-card text-white shadow-2xl shadow-brand-jade/20">
                <h4 className="text-2xl font-bold mb-4">{t('contactPage.cta.title')}</h4>
                <p className="opacity-90 mb-8 leading-relaxed">
                  {t('contactPage.cta.desc')}
                </p>
                <a 
                  href="https://calendar.app.google/WiXHqdGmWaG5kxJQ7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-white text-brand-jade font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                >
                  {t('contactPage.cta.action')}
                  <ArrowRight size={20} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
