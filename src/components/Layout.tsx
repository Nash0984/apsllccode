import { Logo } from '../components/Logo';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { motion, useScroll, AnimatePresence, useSpring } from 'motion/react';
import { Menu, X, Linkedin, ArrowUp } from 'lucide-react';
import { useState, useEffect, Suspense, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChatWidget } from './ChatWidget';
import { useBooking } from '../context/BookingContext';
import { BookingModal } from './BookingModal';
import { trackInteraction } from '../services/analytics';

export function Layout() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { openBooking } = useBooking();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const mainContentRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close menu when location changes and focus main content
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
    
    // Focus main content on route change
    if (mainContentRef.current) {
      mainContentRef.current.focus();
    }
  }, [location.pathname]);

  // Prevent scrolling and handle Escape key when menu is open
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'unset';
      if (menuButtonRef.current) {
        menuButtonRef.current.focus();
      }
    }
    
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const modal = mobileMenuRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTabTrap);
    
    // Set initial focus to the first element (usually the close button or logo)
    const timeoutId = setTimeout(() => {
      firstElement?.focus();
    }, 100);

    return () => {
      modal.removeEventListener('keydown', handleTabTrap);
      clearTimeout(timeoutId);
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('routes.expertise.label'), path: '/expertise' },
    { name: t('nav.research'), path: '/research' },
    { name: t('nav.field'), path: '/prototypes' },
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
        {t('nav.skipToContent')}
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
                  scale: isScrolled ? 0.75 : 1,
                  y: isScrolled ? 0 : -6,
                }}
                whileHover={{ 
                  scale: isScrolled ? 0.8 : 1.05,
                  y: isScrolled ? -2 : -8,
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 150, 
                  damping: 25,
                  mass: 0.8
                }}
              >
                <Logo className="h-20 md:h-24 transition-colors" />
              </motion.div>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                  className="relative group py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-jade focus-visible:ring-offset-8 rounded-sm transition-all"
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
                ref={menuButtonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-brand-jade transition-colors relative z-[120] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-jade rounded-lg"
                aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <main id="main-content" ref={mainContentRef} className="relative outline-none" tabIndex={-1}>
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

      <ChatWidget />
      <BookingModal />

      {/* Mobile Nav Overlay & Menu - Full Screen Solid Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            ref={mobileMenuRef}
            key="mobile-nav-menu"
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950 z-[2000] md:hidden flex flex-col will-change-[opacity]"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            style={{ backgroundColor: '#020617' }} // Force solid slate-950
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center h-20 px-6 border-b border-slate-800">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center"
                aria-label="Applied Policy Systems Home"
              >
                <Logo className="h-14 w-auto text-white" />
              </Link>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white hover:text-brand-jade transition-colors"
                aria-label="Close menu"
              >
                <X size={32} strokeWidth={1.5} />
              </button>
            </div>
            
            {/* Menu Links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-8 p-8" aria-label="Mobile main navigation">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.2,
                    delay: i * 0.05 + 0.1,
                    ease: "easeOut"
                  }}
                  className="w-full text-center will-change-[opacity,transform]"
                >
                  <Link 
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                    className={`text-4xl font-black tracking-tighter transition-all hover:scale-105 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-jade focus-visible:ring-offset-4 rounded-xl ${
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
              <button 
                onClick={() => {
                  trackInteraction('Layout', 'Schedule Session Clicked', { location: 'mobile-menu' });
                  setIsMenuOpen(false);
                  openBooking();
                }}
                className="w-full text-center py-5 bg-brand-jade text-white text-xl font-bold rounded-2xl shadow-2xl shadow-brand-jade/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-jade/50 transition-all font-sans"
              >
                {t('nav.scheduleSession')}
              </button>
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
                <Logo className="h-20 w-auto" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-50">
                  {t('footer.backToHome')}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                </div>
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs text-center md:text-left leading-relaxed">
                {t('footer.tagline')}
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-8">
              <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-bold uppercase tracking-widest" aria-label="Footer navigation">
                {[
                  { name: t('footer.privacy'), path: '/privacy', tip: t('footer.tips.privacy'), label: t('footer.labels.privacy') },
                  { name: t('footer.terms'), path: '/terms', tip: t('footer.tips.terms'), label: t('footer.labels.terms') },
                  { name: t('footer.contact'), path: '/contact', tip: t('footer.tips.contact'), label: t('footer.labels.contact') }
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