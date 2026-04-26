import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export function Home() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  // Safely extract the array from the JSON dictionary
  const technicalDeliverables = t('home.challenge.outputs', { returnObjects: true }) as string[];

  const directoryLinks = useMemo(() => [
    { 
      key: 'capabilities', 
      label: t('routes.expertise.label'),
      path: '/capabilities',
      description: t('routes.expertise.description')
    },
    { 
      key: 'about', 
      label: t('routes.about.label'),
      path: '/about',
      description: t('routes.about.description')
    },
    { 
      key: 'contact', 
      label: t('routes.contact.label'),
      path: '/contact',
      description: t('routes.contact.description')
    }
  ], [t]);

  const heroTitle = t('home.hero.title');
  const heroSubtitle = t('home.hero.subtitle');

  return (
    <>
      <Helmet>
        <title>Applied Policy Systems | {t('seo.pages.home.title')}</title>
        <meta name="description" content={t('seo.pages.home.description')} />
        <meta name="keywords" content={`${t('seo.pages.home.keywords')}, ${t('seo.defaultKeywords')}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:title" content={`Applied Policy Systems | ${heroTitle}`} />
        <meta property="og:description" content={heroSubtitle} />
        <meta property="og:image" content={`${window.location.origin}/logo.svg`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={window.location.origin} />
        <meta name="twitter:title" content={`Applied Policy Systems | ${heroTitle}`} />
        <meta name="twitter:description" content={heroSubtitle} />
        <meta name="twitter:image" content={`${window.location.origin}/logo.svg`} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Applied Policy Systems LLC",
            "url": window.location.origin,
            "logo": `${window.location.origin}/logo.svg`,
            "description": t('home.hero.subtitle'),
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Philadelphia",
              "addressRegion": "PA",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "graham@appliedpolicysystems.com",
              "contactType": "technical support"
            },
            "sameAs": [
              "https://www.linkedin.com/company/applied-policy-systems"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Multidisciplinary Domains of Authority",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Verifiable Policy & Downstream Prediction",
                    "description": "Predicting blast radiuses and bridging deterministic engineering with administrative law."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Secure AI Governance & Infrastructure",
                    "description": "Securing sensitive federal data via architectural boundaries and deploying binding AI frameworks."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "System Accountability & Procurement",
                    "description": "Engineering strict technical rules into RFPs and internal builds to force modularity."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Frontline Operations & Workforce Design",
                    "description": "Architecting professional state workforces and deploying frontline-first change management."
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-heading">
        <motion.div 
          style={{ 
            y,
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '100px 100px' 
          }}
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] dark:invert pointer-events-none" 
          aria-hidden="true"
        />
        
        <div className="container-wide relative text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 id="hero-heading" className="mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight">
                {t('home.hero.title')}
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-12 max-w-3xl mx-auto lg:mx-0 text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                <Link 
                  to="/capabilities" 
                  aria-label="View our capabilities"
                  className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 bg-brand-jade text-white text-lg sm:text-xl font-bold rounded-2xl hover:bg-[#005a62] hover:scale-[1.02] transition-all shadow-2xl shadow-brand-jade/30 flex items-center justify-center gap-4 group"
                >
                  {t('home.hero.cta')}
                  <ArrowRight size={24} strokeWidth={1.5} className="group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Section - Compact */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 relative overflow-hidden border-b border-slate-200 dark:border-slate-800" aria-labelledby="challenge-heading">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <h2 className="label-uppercase mb-4">{t('home.challenge.label')}</h2>
              <h3 id="challenge-heading" className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 tracking-tight leading-tight text-slate-900 dark:text-white">
                {t('home.challenge.title')}
              </h3>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-6">
                {t('home.challenge.text')}
              </p>
            </div>
            
            <div className="relative p-8 sm:p-10 bg-brand-jade text-white rounded-[2rem] shadow-xl overflow-hidden">
              {/* Aesthetic accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <h4 className="text-xs font-mono font-bold tracking-[0.2em] mb-8 opacity-70 uppercase">
                {t('home.challenge.outputsLabel')}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {Array.isArray(technicalDeliverables) && technicalDeliverables.map((output, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start gap-4 mb-2">
                      <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-white/20 transition-colors">
                        <span className="text-xs font-mono font-bold">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <h5 className="font-bold text-lg leading-tight pt-0.5">{output}</h5>
                    </div>
                    <div className="h-[1px] w-full bg-white/10 mt-4 group-hover:bg-white/30 transition-colors" />
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
                <p className="text-sm opacity-80 max-w-sm leading-relaxed">
                  {t('home.challenge.outputsLead')}
                </p>
                <Link 
                  to="/capabilities" 
                  className="px-6 py-3 bg-white text-brand-jade text-sm font-bold rounded hover:bg-slate-50 transition-all flex items-center gap-2 group/btn shrink-0"
                >
                  View All Capabilities
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Homepage Directory */}
      <section className="bg-white dark:bg-slate-950">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 py-16 sm:py-24">
            {directoryLinks.map((item) => (
              <Link 
                key={item.key} 
                to={item.path}
                className="group block border-t-2 border-slate-200 dark:border-slate-800 pt-6 hover:border-brand-jade transition-colors"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-3 flex items-center justify-between text-slate-900 dark:text-white">
                  {item.label}
                  <ArrowUpRight size={24} className="text-brand-jade opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300" />
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
