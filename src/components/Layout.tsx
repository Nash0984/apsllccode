import { Logo } from '../components/Logo';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ThemeToggle } from '../components/ThemeToggle';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import { Menu, X, Linkedin, ArrowUp } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Layout() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();
  const { scrollY, scrollYProgress } = useScroll();

  // Track scroll position for header styling and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.capabilities'), path: '/capabilities' },
    { name: t('nav.audiences'), path: '/audiences' },
    { name: t('nav.research'), path: '/research' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-brand-charcoal dark:text-slate-200 selection:bg-brand-cyan selection:text-brand-charcoal transition-colors duration-300">
      {/* Navigation */}
      <header 
        role="banner"
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 py-0 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]' 
            : 'bg-transparent border-b border-transparent py-4'
        }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[2px] bg-brand-jade/30 origin-left z-[60]"
          style={{ scaleX: scrollYProgress }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2 group" aria-label="Applied Policy Systems Home">
              <motion.div
                animate={{ 
                  scale: isScrolled ? 0.85 : 1,
                  filter: isScrolled ? 'brightness(1)' : 'brightness(1.05)'
                }}
                whileHover={{ 
                  scale: isScrolled ? 0.9 : 1.05,
                  filter: 'brightness(1.1)'
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Logo className="h-16 md:h-20 w-auto transition-colors" />
              </motion.div>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                  className={`text-sm font-bold transition-all duration-300 relative group py-2 ${
                    location.pathname === item.path 
                      ? 'text-brand-jade' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-brand-jade'
                  }`}
                >
                  {item.name}
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-0.5 bg-brand-jade"
                    initial={{ width: 0 }}
                    animate={{ width: location.pathname === item.path ? '100%' : 0 }}
                    whileHover={{ width: '100%' }}
                  />
                </Link>
              ))}
              <div className="pl-4 border-l border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-brand-jade transition-colors relative z-50"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay & Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.2 } }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
            />
          )}
          
          {isMenuOpen && (
            <motion.div 
              key="mobile-nav-menu"
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white dark:bg-slate-900 shadow-2xl z-50 md:hidden p-8 flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex justify-between items-center mb-12">
                <Logo className="h-12 w-auto" />
              </div>
              
              <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={location.pathname === item.path ? 'page' : undefined}
                      className={`text-2xl font-bold tracking-tight transition-colors ${
                        location.pathname === item.path 
                          ? 'text-brand-jade' 
                          : 'text-slate-900 dark:text-white hover:text-brand-jade'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
              </nav>

              <div className="mt-auto pt-12 border-t border-slate-100 dark:border-slate-800">
                <p className="text-sm text-slate-400 dark:text-slate-500 font-medium mb-4 uppercase tracking-widest">Connect</p>
                <Link 
                  to="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Get in touch with us"
                  className="inline-block px-8 py-4 bg-brand-jade text-white font-bold rounded-xl shadow-lg shadow-brand-jade/20"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative">
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-brand-jade/20 border-t-brand-jade rounded-full animate-spin" />
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="relative group">
              <Link to="/" aria-label="Applied Policy Systems Home">
                <Logo className="h-14 w-auto" />
              </Link>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-50">
                Back to Home
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
              </div>
            </div>
            
            <div className="flex gap-8 text-sm text-slate-500 dark:text-slate-400 font-medium items-center">
              {[
                { name: t('footer.privacy'), path: '/privacy', tip: 'Data Protection', label: 'View our Privacy Policy' },
                { name: t('footer.terms'), path: '/terms', tip: 'Legal Framework', label: 'View our Terms of Service' },
                { name: t('footer.contact'), path: '/contact', tip: 'Start Consultation', label: 'Contact us for a consultation' }
              ].map((link) => (
                <div key={link.name} className="relative group">
                  <Link 
                    to={link.path} 
                    aria-label={link.label}
                    className="hover:text-brand-jade transition-colors"
                  >
                    {link.name}
                  </Link>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-50">
                    {link.tip}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                  </div>
                </div>
              ))}
              <div className="relative group">
                <a 
                  href="https://www.linkedin.com/company/applied-policy-systems" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow Applied Policy Systems on LinkedIn"
                  className="text-slate-400 dark:text-slate-500 hover:text-brand-jade transition-colors"
                >
                  <Linkedin size={20} strokeWidth={1.5} />
                </a>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-50">
                  Follow on LinkedIn
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[100] w-12 h-12 bg-brand-jade text-white rounded-full flex items-center justify-center shadow-2xl shadow-brand-jade/30 hover:bg-[#005a62] transition-colors group"
            aria-label="Back to top"
          >
            <ArrowUp size={24} strokeWidth={2} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
