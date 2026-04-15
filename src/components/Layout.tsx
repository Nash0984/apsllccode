import { Logo } from '../components/Logo';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { motion, useScroll, AnimatePresence, useSpring } from 'motion/react';
import { Menu, X, Linkedin, ArrowUp, ChevronDown } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChatWidget } from './ChatWidget';

export function Layout() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const location = useLocation();
  const { scrollY, scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll position for header styling and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 300);
      if (window.scrollY > 100) setShowScrollHint(false);
      else setShowScrollHint(true);
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
    { name: t('routes.expertise.label'), path: '/expertise' },
    { name: t('nav.insights'), path: '/insights' },
    { name: t('routes.about.label'), path: '/about' },
    { name: t('routes.contact.label'), path: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-brand-charcoal dark:text-slate-200 selection:bg-brand-cyan selection:text-brand-charcoal transition-colors duration-300">
      {/* Skip to Content Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-brand-jade focus:text-white focus:rounded-lg focus:font-bold focus:shadow-2xl transition-all"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <motion.header 
        role="banner"
        initial={false}
        animate={{
          backgroundColor: isScrolled 
            ? (theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.9)') 
            : (theme === 'light' ? 'rgba(255, 255, 255, 0)' : 'rgba(15, 23, 42, 0)'),
          borderBottomColor: isScrolled
            ? (theme === 'light' ? 'rgba(226, 232, 240, 0.6)' : 'rgba(30, 41, 59, 0.6)')
            : 'rgba(0, 0, 0, 0)',
          paddingTop: isScrolled ? 0 : 16,
          paddingBottom: isScrolled ? 0 : 16,
          boxShadow: isScrolled 
            ? (theme === 'light' ? '0 10px 30px -10px rgba(0,0,0,0.1)' : '0 10px 30px -10px rgba(0,0,0,0.4)')
            : '0 0px 0px 0px rgba(0,0,0,0)'
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 24,
          mass: 1
        }}
        className="sticky top-0 z-[100] backdrop-blur-xl"
      >
        {/* Scroll Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[3px] bg-brand-jade origin-left z-[110]"
          style={{ scaleX }}
        />

        <div className="container-wide">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2 group text-brand-charcoal dark:text-white" aria-label="Applied Policy Systems Home">
              <motion.div
                animate={{ 
                  scale: isScrolled ? 0.8 : 1,
                  y: isScrolled ? 0 : -6,
                }}
                whileHover={{ 
                  scale: isScrolled ? 0.85 : 1.05,
                  y: isScrolled ? -2 : -8,
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 150, 
                  damping: 25,
                  mass: 0.8
                }}
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
                  className="relative group py-2"
                >
                  <motion.span
                    animate={{ 
                      color: location.pathname === item.path 
                        ? 'var(--color-brand-jade)' 
                        : isScrolled ? (theme === 'light' ? 'rgb(100, 116, 139)' : 'rgb(148, 163, 184)') : (theme === 'light' ? 'rgb(71, 85, 105)' : 'rgb(203, 213, 225)'),
                      y: isScrolled ? 0 : -2
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 150, 
                      damping: 25,
                      mass: 0.8
                    }}
                    className="text-sm font-bold block"
                  >
                    {item.name}
                  </motion.span>
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-0.5 bg-brand-jade"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: location.pathname === item.path ? '100%' : 0,
                      opacity: isScrolled ? 1 : 0.6
                    }}
                    whileHover={{ width: '100%', opacity: 1 }}
                  />
                </Link>
              ))}
              <motion.div 
                animate={{ y: isScrolled ? 0 : -2 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 150, 
                  damping: 25,
                  mass: 0.8
                }}
                className="pl-4 border-l border-slate-200 dark:border-slate-800 flex items-center gap-2"
              >
                <LanguageSwitcher />
                <ThemeToggle />
              </motion.div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-brand-jade transition-colors relative z-[120]"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <main id="main-content" className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <Suspense fallback={
              <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-brand-jade/20 border-t-brand-jade rounded-full animate-spin" />
              </div>
            }>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Scroll Hint */}
      <AnimatePresence>
        {showScrollHint && location.pathname !== '/contact' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown size={20} className="text-brand-jade" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatWidget />

      {/* Mobile Nav Overlay & Menu - Full Screen Solid Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            key="mobile-nav-menu"
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-slate-950 z-[2000] md:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            style={{ backgroundColor: '#020617' }} // Force solid slate-950
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center h-20 px-6 border-b border-slate-800">
              <Logo className="h-10 w-auto text-white" />
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white hover:text-brand-jade transition-colors"
                aria-label="Close menu"
              >
                <X size={32} strokeWidth={1.5} />
              </button>
            </div>
            
            {/* Menu Links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-8 p-8" aria-label="Mobile navigation">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  className="w-full text-center"
                >
                  <Link 
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                    className={`text-4xl font-black tracking-tighter transition-all hover:scale-105 inline-block ${
                      location.pathname === item.path 
                        ? 'text-brand-jade' 
                        : 'text-white hover:text-brand-jade'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Menu Footer */}
            <div className="p-8 border-t border-slate-800 flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              <a 
                href="https://calendar.app.google/WiXHqdGmWaG5kxJQ7" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center py-5 bg-brand-jade text-white text-xl font-bold rounded-2xl shadow-2xl shadow-brand-jade/20"
              >
                Schedule a Session
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-20" role="contentinfo">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-6">
              <Link to="/" aria-label="Applied Policy Systems Home" className="relative group">
                <Logo className="h-14 w-auto" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-50">
                  Back to Home
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                </div>
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs text-center md:text-left leading-relaxed">
                Bridging the gap between legislative intent and administrative reality through precision-engineered infrastructure.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-8">
              <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-bold uppercase tracking-widest" aria-label="Footer navigation">
                {[
                  { name: t('footer.privacy'), path: '/privacy', tip: 'Data Protection', label: 'View our Privacy Policy' },
                  { name: t('footer.terms'), path: '/terms', tip: 'Legal Framework', label: 'View our Terms of Service' },
                  { name: t('footer.contact'), path: '/contact', tip: 'Start Consultation', label: 'Contact us for a consultation' }
                ].map((link) => (
                  <div key={link.name} className="relative group">
                    <Link 
                      to={link.path} 
                      aria-label={link.label}
                      className="text-slate-600 dark:text-slate-400 hover:text-brand-jade transition-colors"
                    >
                      {link.name}
                    </Link>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-50">
                      {link.tip}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                    </div>
                  </div>
                ))}
              </nav>

              <div className="flex items-center gap-6">
                <a 
                  href="https://www.linkedin.com/company/applied-policy-systems" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow Applied Policy Systems on LinkedIn"
                  className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-brand-jade hover:border-brand-jade/30 border border-slate-100 dark:border-slate-700 transition-all group"
                >
                  <Linkedin size={20} strokeWidth={1.5} />
                </a>
                <div className="flex flex-col items-center md:items-end">
                  <p className="font-mono uppercase text-[10px] text-slate-400 dark:text-slate-500 mb-2">
                    {t('footer.location')}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest">
                    {t('footer.rights')}
                  </p>
                </div>
              </div>
            </div>
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
