import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';

// Core Pages
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Capabilities = lazy(() => import('./pages/Capabilities').then(m => ({ default: m.Capabilities })));
const Research = lazy(() => import('./pages/ResearchPage.tsx').then(m => ({ default: m.Research })));
const Simulators = lazy(() => import('./pages/Simulators').then(m => ({ default: m.Simulators })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));

// Dynamic Capability Loader
const CapabilityMap: Record<string, React.LazyExoticComponent<any>> = {
  'verifiable-policy-legal-fortification': lazy(() => import('./pages/capabilities/VerifiablePolicyLegalFortification')),
  'ethical-ai-governance-infrastructure': lazy(() => import('./pages/capabilities/EthicalAIGovernanceInfrastructure')),
  'strategic-procurement-alignment': lazy(() => import('./pages/capabilities/StrategicProcurementAlignment')),
  'frontline-operations-human-capital': lazy(() => import('./pages/capabilities/FrontlineOperationsHumanCapital')),
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
  '/research': () => import('./pages/ResearchPage.tsx'),
  '/prototypes': () => import('./pages/Simulators'),
};

function AnimatedRoutes() {
  const location = useLocation();
  
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link) {
        try {
          const url = new URL(link.href);
          if (url.origin === window.location.origin && prefetchMap[url.pathname]) {
            prefetchMap[url.pathname]();
          }
        } catch (err) {
          // Ignore invalid URLs or non-standard protocols
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

          <Route path="research" element={<Research />} />
          <Route path="insights" element={<Navigate to="/research" replace />} />
          <Route path="prototypes" element={<Simulators />} />
          <Route path="field" element={<Navigate to="/prototypes" replace />} />
          
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
      <AnimatedRoutes />
    </BrowserRouter>
  );
}