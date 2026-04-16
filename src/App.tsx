import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Core Pages
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Capabilities = lazy(() => import('./pages/Capabilities').then(m => ({ default: m.Capabilities })));
const Insights = lazy(() => import('./pages/Research').then(m => ({ default: m.Insights })));
const Field = lazy(() => import('./pages/Field').then(m => ({ default: m.Field })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));

// Dynamic Capability Loader
const CapabilityMap: Record<string, React.LazyExoticComponent<any>> = {
  'verifiable-payloads': lazy(() => import('./pages/capabilities/VerifiablePayloads')),
  'hybrid-engine': lazy(() => import('./pages/capabilities/HybridEngine')),
  'payment-error-rate': lazy(() => import('./pages/capabilities/Per')),
  'glassbox-integration': lazy(() => import('./pages/capabilities/Glassbox')),
  'pre-procurement': lazy(() => import('./pages/capabilities/PreProcurement')),
  'operational-translation': lazy(() => import('./pages/capabilities/OperationalTranslation')),
};

const DynamicCapability = () => {
  const { slug } = useParams();
  const Component = slug && CapabilityMap[slug] ? CapabilityMap[slug] : Capabilities;

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 animate-pulse"></div>}>
      <Component />
    </Suspense>
  );
};

// Prefetch mapping
const prefetchMap: Record<string, () => Promise<any>> = {
  '/': () => import('./pages/Home'),
  '/about': () => import('./pages/About'),
  '/contact': () => import('./pages/Contact'),
  '/capabilities': () => import('./pages/Capabilities'),
'/insights': () => import('./pages/Research'),
};

function AnimatedRoutes() {
  const location = useLocation();
  
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link) {
        const url = new URL(link.href);
        if (url.origin === window.location.origin && prefetchMap[url.pathname]) {
          prefetchMap[url.pathname]();
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
          
          <Route path="expertise" element={<Navigate to="/capabilities" replace />} />
          
          <Route path="capabilities" element={<Capabilities />} />
          <Route path="capabilities/:slug" element={<DynamicCapability />} />

          <Route path="insights" element={<Insights />} />
          <Route path="field" element={<Field />} />
          
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