import { BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom';
import { lazy, Suspense, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { AnimatePresence, motion } from 'motion/react';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Expertise = lazy(() => import('./pages/Capabilities').then(m => ({ default: m.Capabilities })));
const Insights = lazy(() => import('./pages/Insights').then(m => ({ default: m.Insights })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));

// Dynamic Topic Loader for Insights
const DynamicInsight = () => {
  const { topic } = useParams();
  const capitalized = topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : '';
  
  const Component = useMemo(() => lazy(() => 
    import(`./pages/insights/${capitalized}`)
      .then(m => ({ default: m[capitalized] }))
      .catch(() => import('./pages/Insights').then(m => ({ default: m.Insights })))
  ), [capitalized]);

  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
};

// Prefetch mapping
const prefetchMap: Record<string, () => Promise<any>> = {
  '/': () => import('./pages/Home'),
  '/about': () => import('./pages/About'),
  '/contact': () => import('./pages/Contact'),
  '/expertise': () => import('./pages/Capabilities'),
  '/insights': () => import('./pages/Insights'),
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
    <Suspense fallback={null}>
      <Routes location={location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="expertise" element={<Expertise />} />
          <Route path="insights" element={<Insights />} />
          <Route path="insights/:topic" element={<DynamicInsight />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>
    </Suspense>
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
