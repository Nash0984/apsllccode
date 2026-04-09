import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Layout } from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { AnimatePresence, motion } from 'motion/react';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Capabilities = lazy(() => import('./pages/Capabilities').then(m => ({ default: m.Capabilities })));
const Audiences = lazy(() => import('./pages/Audiences').then(m => ({ default: m.Audiences })));
const Research = lazy(() => import('./pages/Research').then(m => ({ default: m.Research })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Platform = lazy(() => import('./pages/Platform').then(m => ({ default: m.Platform })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));

// Prefetch mapping
const prefetchMap: Record<string, () => Promise<any>> = {
  '/': () => import('./pages/Home'),
  '/capabilities': () => import('./pages/Capabilities'),
  '/audiences': () => import('./pages/Audiences'),
  '/research': () => import('./pages/Research'),
  '/about': () => import('./pages/About'),
  '/contact': () => import('./pages/Contact'),
  '/platform': () => import('./pages/Platform'),
  '/privacy': () => import('./pages/Privacy'),
  '/terms': () => import('./pages/Terms'),
};

function AnimatedRoutes() {
  const location = useLocation();
  
  // Global prefetch on hover
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link) {
        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
          const path = url.pathname;
          if (prefetchMap[path]) {
            prefetchMap[path]();
          }
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ 
          duration: 0.4, 
          ease: [0.22, 1, 0.36, 1] // Custom "premium" ease-out
        }}
      >
        <Suspense fallback={null}>
          <Routes location={location}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="capabilities" element={<Capabilities />} />
              <Route path="audiences" element={<Audiences />} />
              <Route path="research" element={<Research />} />
              <Route path="about" element={<About />} />
              <Route path="platform" element={<Platform />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
            </Route>
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
