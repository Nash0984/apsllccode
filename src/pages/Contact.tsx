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
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-jade/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        
        <div className="container-wide relative">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="label-uppercase">{t('contactPage.hero.label')}</h1>
              <h2 className="mb-8">
                {t('contactPage.hero.title').split(' ')[0]} <br />
                <span className="text-brand-jade">{t('contactPage.hero.title').split(' ').slice(1).join(' ')}</span>
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed text-slate-600 dark:text-slate-400 max-w-3xl">
                {t('contactPage.hero.subtitle')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Contact Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Chat Interface */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-4">
                  <div className="p-2 bg-brand-jade/10 rounded-lg">
                    <Bot className="text-brand-jade" size={28} />
                  </div>
                  {t('contactPage.ai.title')}
                </h3>
                <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t('contactPage.ai.desc')}
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-brand-jade/5 rounded-[3rem] blur-2xl -z-10" />
                <ChatWidget embedded={true} />
              </div>
            </motion.div>

            {/* Direct Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-12"
            >
              <div>
                <h3 className="label-muted mb-10">{t('contactPage.direct.label')}</h3>
                <div className="grid gap-6">
                  <a 
                    href="mailto:graham@appliedpolicysystems.com" 
                    className="group card-base card-hover flex items-center gap-8 p-8"
                  >
                    <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-brand-jade group-hover:bg-brand-jade group-hover:text-white transition-all duration-500 shadow-sm">
                      <Mail size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{t('contactPage.direct.email')}</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-jade transition-colors">graham@appliedpolicysystems.com</p>
                    </div>
                  </a>

                  <a 
                    href="https://www.linkedin.com/company/applied-policy-systems" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group card-base card-hover flex items-center gap-8 p-8"
                  >
                    <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-brand-jade group-hover:bg-brand-jade group-hover:text-white transition-all duration-500 shadow-sm">
                      <Linkedin size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{t('contactPage.direct.linkedin')}</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-jade transition-colors">Applied Policy Systems</p>
                    </div>
                  </a>

                  <div className="card-base flex items-center gap-8 p-8 border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-brand-jade shadow-sm">
                      <MapPin size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{t('contactPage.direct.location')}</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">Philadelphia, PA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative p-12 bg-slate-900 dark:bg-white rounded-[3rem] text-white dark:text-slate-900 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-jade/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10">
                  <h4 className="text-3xl font-bold mb-6 tracking-tight">{t('contactPage.cta.title')}</h4>
                  <p className="text-lg opacity-80 dark:opacity-70 mb-10 leading-relaxed max-w-md">
                    {t('contactPage.cta.desc')}
                  </p>
                  <a 
                    href="https://calendar.app.google/WiXHqdGmWaG5kxJQ7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 px-10 py-5 bg-brand-jade text-white font-bold rounded-2xl hover:bg-[#005a62] hover:scale-105 transition-all shadow-xl shadow-brand-jade/20"
                  >
                    {t('contactPage.cta.action')}
                    <ArrowRight size={22} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
