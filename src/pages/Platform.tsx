import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Lock, BarChart3, Cpu, CheckCircle2, ArrowRight, Zap, 
  Database, Users, Scale, FileSearch, AlertTriangle, Clock, 
  Gavel, Smartphone, Binary, History, GraduationCap, Globe, 
  RefreshCw, Code2, Eye, LayoutDashboard, Settings, Activity, Heart,
  Sparkles, ZapOff, Fingerprint, Network
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ModuleGraphic = lazy(() => import('../components/ModuleGraphics').then(m => ({ default: m.ModuleGraphic })));
const ArchitectureVisualization = lazy(() => import('../components/ArchitectureVisualization').then(m => ({ default: m.ArchitectureVisualization })));

export function Platform() {
  const [activePillar, setActivePillar] = useState(0);
  const [activeModule, setActiveModule] = useState(0);

  const pillars = [
    {
      title: "Statutory Governance & Fidelity",
      icon: <Shield size={20} />,
      desc: "Architectural frameworks that ensure every line of code remains strictly aligned with the written law.",
      modules: [
        {
          id: "01",
          title: "Jurisdictional Isolation Architecture",
          icon: <Shield className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Absolute data sovereignty for complex federal/state hierarchies, ensuring localized operations never compromise the global security baseline.",
          features: [
            { name: "Fail-Closed Security", detail: "Defaults to strict federal privacy baselines, ensuring compliance prior to localized configuration." },
            { name: "Isolated Environments", detail: "Geographic boundaries act as secure, isolated vaults for administrative rule application." },
            { name: "Immutable Audit Trails", detail: "Every system action is logged with strict jurisdictional context for transparent federal oversight." }
          ]
        },
        {
          id: "10",
          title: "Mathematical Policy Verification",
          icon: <Binary className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Formal logic environment allowing policymakers to mathematically prove that system rules match the written law.",
          features: [
            { name: "Formal Logic Proofs", detail: "Translates statutes into axioms to prove logic contains no dead-ends or loopholes." },
            { name: "Scenario Simulation", detail: "Simulates policy changes against historical data to project caseload and financial impacts." },
            { name: "Regression Prevention", detail: "Ensures localized waivers do not break the federal compliance baseline for the state." }
          ]
        },
        {
          id: "11",
          title: "Statutory Certification Hub",
          icon: <History className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Centralized tracking of legislative changes and federal certification requirements (MES/CMS/FNS).",
          features: [
            { name: "Legislative Mapping", detail: "Maps pending bills directly to the software rules they impact, ensuring synchronous evolution." },
            { name: "Certification Readiness", detail: "Automatically structures system artifacts into the precise formats required for federal funding." }
          ]
        },
        {
          id: "16",
          title: "Algorithmic Bias Monitoring",
          icon: <Eye className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Mandatory oversight ensuring automated decisions remain equitable, transparent, and legally defensible.",
          features: [
            { name: "Bias Detection", detail: "Continuously monitors outcomes for systemic disparities in location or demographic data." },
            { name: "Logic Tree Auditing", detail: "Logs the exact parameters and logic utilized for every machine-driven determination." },
            { name: "Source Integrity Alerts", detail: "Alerts administrators if external data integrations return anomalous or low-confidence results." }
          ]
        }
      ]
    },
    {
      title: "Financial Integrity & Risk Mitigation",
      icon: <Scale size={20} />,
      desc: "Precision-engineered modules built to manage strict tolerances and protect agencies from federal sanctions.",
      modules: [
        {
          id: "05",
          title: "Enterprise Quality Control (QC)",
          icon: <FileSearch className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "A unified auditing engine ensuring cross-program determinations (SNAP/Medicaid) remain strictly compliant.",
          features: [
            { name: "Intelligent Sampling", detail: "Automatically routes high-risk cases to QC reviewers based on federal guidelines." },
            { name: "Root Cause Diagnostics", detail: "Determines if errors originated from client omission, caseworker entry, or policy misconfiguration." },
            { name: "Remediation Feedback", detail: "Creates a loop between audit findings and operations to address systemic trends proactively." }
          ]
        },
        {
          id: "06",
          title: "SNAP PER Mitigation Engine",
          icon: <AlertTriangle className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Specialized financial compliance for SNAP, managing strict tolerances to prevent federal overpayment sanctions.",
          features: [
            { name: "Pre-Auth Risk Scoring", detail: "Flags high-variance cases (fluctuating income) for secondary review prior to benefit issuance." },
            { name: "Tolerance Dashboards", detail: "Visualizes over/underpayment rates against FNS national thresholds in real-time." },
            { name: "Liability Tracking", detail: "Distinguishes between agency and client errors to generate required Corrective Action Plans." }
          ]
        },
        {
          id: "07",
          title: "ABAWD Compliance Management",
          icon: <Clock className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Automates the complex 3-in-36 month time-limit tracking, reducing procedural friction for caseworkers and citizens.",
          features: [
            { name: "Proactive Exemptions", detail: "Scans integrated databases to identify statutory exemptions without redundant paperwork." },
            { name: "Clock Management", detail: "Precisely tracks countable months and geographic waivers across labor market areas." },
            { name: "Activity Reporting", detail: "Simplified mobile interfaces for logging work hours, minimizing procedural drop-offs." }
          ]
        },
        {
          id: "02",
          title: "Precision Access Control (RBAC)",
          icon: <Lock className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "A granular access matrix coordinating work across applicants, caseworkers, and adjudicators with zero data leakage.",
          features: [
            { name: "Persona-Based Workflows", detail: "Isolates capabilities across distinct roles, from intake staff to administrative law judges." },
            { name: "Dynamic UI Generation", detail: "Interfaces are generated server-side based on security clearance, preventing unauthorized data exposure." },
            { name: "Secure Handoffs", detail: "Routes cases between departments without exposing PII to unauthorized internal personnel." }
          ]
        }
      ]
    },
    {
      title: "Operational Intelligence & Automation",
      icon: <Activity size={20} />,
      desc: "Deterministic engines and analytics that translate complex statutes into mathematically provable outcomes.",
      modules: [
        {
          id: "04",
          title: "Deterministic Policy Engine",
          icon: <Cpu className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Centralized rules engine translating legislative text into automated, zero-touch eligibility determinations.",
          features: [
            { name: "Zero-Touch Renewals", detail: "Processes determinations via external data, removing manual calculation from caseworkers." },
            { name: "Automated Noticing", detail: "Triggers required communications (NOMI) based on real-time case status changes." },
            { name: "Policy Workspace", detail: "Structured environment for updating program parameters without hardcoded software changes." }
          ]
        },
        {
          id: "03",
          title: "Administrative Burden Analytics",
          icon: <BarChart3 className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Quantifies the friction placed on citizens and staff, replacing self-reported metrics with provable data.",
          features: [
            { name: "Burden Calculation", detail: "Computes exact processing time reductions and drop-off rates following new initiatives." },
            { name: "Churn Diagnostics", detail: "Isolates applications denied due to paperwork friction rather than statutory ineligibility." },
            { name: "Compliance Reporting", detail: "Aggregates data to satisfy federal mandates regarding administrative hurdle reduction." }
          ]
        },
        {
          id: "13",
          title: "Financial Data & Tax Gateway",
          icon: <Globe className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Secure integration hub managing complex financial parameters and tax routing to support income verification.",
          features: [
            { name: "E-Filing Infrastructure", detail: "Monitored pipeline for secure data transmission adhering to federal tax standards." },
            { name: "Dynamic Parameters", detail: "Allows updates to localized tax rates and deduction thresholds without code changes." },
            { name: "Instant Verification", detail: "Interfaces with workforce databases to validate income, reducing manual paystub reliance." }
          ]
        },
        {
          id: "15",
          title: "Interoperability API Gateway",
          icon: <Code2 className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Comprehensive integration layer designed to prevent vendor lock-in and connect disparate state/federal systems.",
          features: [
            { name: "Developer Sandbox", detail: "Secure access to API documentation and testing environments for internal IT teams." },
            { name: "Webhook Infrastructure", detail: "Modern architecture for real-time data synchronization across disparate databases." },
            { name: "Payload Cryptography", detail: "Enforces strict security standards on all inbound and outbound API requests." }
          ]
        }
      ]
    },
    {
      title: "Service Delivery & Human Capital",
      icon: <Heart size={20} />,
      desc: "Infrastructure designed to eliminate administrative burden and embed training directly into production.",
      modules: [
        {
          id: "08",
          title: "Administrative Adjudication",
          icon: <Gavel className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Legally robust framework for managing fair hearings and appeals with full historical context for judges.",
          features: [
            { name: "Immutable Snapshots", detail: "Captures the exact household data and rules active at the time of the original denial." },
            { name: "Docket Automation", detail: "Manages scheduling and noticing to prevent statutory deadlines from being missed." },
            { name: "Pre-Hearing Resolution", detail: "Routes contested cases to senior staff to overturn clear errors before judicial review." }
          ]
        },
        {
          id: "09",
          title: "Omnichannel Citizen Portal",
          icon: <Smartphone className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Mobile-responsive self-service hub diverting traffic from call centers by empowering citizens to manage cases.",
          features: [
            { name: "Unified Case Hub", detail: "Secure portal for checking status, reporting changes, and digital document uploads." },
            { name: "Communications Engine", detail: "Logs all correspondence across mail, email, and SMS for an indisputable audit trail." },
            { name: "Navigator Interfaces", detail: "Specialized displays for community assisters to triage inquiries and troubleshoot cases." }
          ]
        },
        {
          id: "12",
          title: "Workforce Training Academy",
          icon: <GraduationCap className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Embeds training directly into the production environment to address staff turnover and policy complexity.",
          features: [
            { name: "Contextual Lessons", detail: "Delivers role-specific training modules directly within the user's daily workflows." },
            { name: "Sandboxed Simulations", detail: "Allows staff to practice on synthetic cases that mimic the live production system." },
            { name: "Proficiency Tracking", detail: "Dashboards tracking training completion to identify knowledge gaps before errors occur." }
          ]
        },
        {
          id: "14",
          title: "Cross-Enrollment Engine",
          icon: <RefreshCw className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Automatically identifies eligibility overlaps across programs to maximize citizen access to benefits.",
          features: [
            { name: "Program Matching", detail: "Scans client index to flag households receiving one benefit that likely qualify for others." },
            { name: "Application Bridging", detail: "Pre-populates secondary applications with verified data to eliminate redundant entry." },
            { name: "Holistic Analytics", detail: "Cross-program dashboards to measure the success of horizontal integration initiatives." }
          ]
        }
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen flex flex-col">
      {/* Hero Section - Enhanced */}
      <section className="hero-section">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-jade/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="label-uppercase">Modernization Strategy</h1>
              <h2 className="mb-8">
                Architecting <br />
                <span className="text-brand-jade">Statutory Fidelity.</span>
              </h2>
              <p className="text-xl mb-10 max-w-xl">
                We replace opaque administrative systems with transparent, auditable, and high-fidelity infrastructure. Our approach ensures that every line of code remains strictly aligned with the written law.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {[
                  { icon: <Fingerprint className="text-brand-jade" />, title: "Zero-Gap Logic", desc: "Law-to-code translation with 100% fidelity." },
                  { icon: <Network className="text-brand-jade" />, title: "Modular Core", desc: "16 interoperable modules for total flexibility." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="px-8 py-4 bg-brand-jade text-white font-bold rounded-xl hover:bg-[#005a62] transition-all shadow-xl shadow-brand-jade/20 flex items-center gap-2">
                  Request Technical Deep-Dive
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Suspense fallback={<div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 animate-pulse rounded-[2.5rem]" />}>
                <ArchitectureVisualization />
              </Suspense>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-jade/10 rounded-full blur-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Command Center */}
      <section className="flex-1 flex flex-col lg:flex-row container-wide py-24 gap-16">
        {/* Sidebar Navigation */}
        <div className="lg:w-96 shrink-0 space-y-12">
          <div className="p-8 rounded-card bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <h3 className="label-muted mb-8">Infrastructure Domains</h3>
            <div className="space-y-3">
              {pillars.map((pillar, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActivePillar(index);
                    setActiveModule(0);
                  }}
                  className={`w-full text-left p-5 rounded-2xl transition-all flex items-center gap-5 group ${
                    activePillar === index 
                      ? 'bg-brand-jade text-white shadow-2xl shadow-brand-jade/30 scale-[1.02]' 
                      : 'hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${activePillar === index ? 'bg-white/20 text-white' : 'bg-brand-jade/10 text-brand-jade group-hover:scale-110 transition-transform'}`}>
                    {pillar.icon}
                  </div>
                  <span className="text-sm font-bold leading-tight">{pillar.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-card border border-slate-100 dark:border-slate-800">
            <h3 className="label-muted mb-8">Infrastructure Modules</h3>
            <div className="grid grid-cols-1 gap-2">
              {pillars[activePillar].modules.map((module, index) => (
                <button
                  key={index}
                  onClick={() => setActiveModule(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between group ${
                    activeModule === index 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono opacity-50">{module.id}</span>
                    <span className="text-xs font-bold">{module.title}</span>
                  </div>
                  <div className={`text-brand-jade ${activeModule === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                    <ArrowRight size={14} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Display Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activePillar}-${activeModule}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[4rem] p-10 md:p-16 shadow-2xl h-full flex flex-col relative overflow-hidden"
            >
              <div className="flex flex-col gap-12 relative z-10 h-full">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-brand-jade/10 flex items-center justify-center text-brand-jade">
                        {pillars[activePillar].modules[activeModule].icon}
                      </div>
                      <div>
                        <div className="label-uppercase mb-1">Module {pillars[activePillar].modules[activeModule].id}</div>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tight">
                          {pillars[activePillar].modules[activeModule].title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xl leading-relaxed max-w-2xl">
                      {pillars[activePillar].modules[activeModule].desc}
                    </p>
                  </div>
                  
                  <div className="shrink-0 w-full lg:w-auto">
                    <Link 
                      to="/contact" 
                      className="w-full lg:w-auto px-10 py-5 bg-brand-jade text-white font-bold rounded-2xl hover:bg-[#005a62] transition-all shadow-xl shadow-brand-jade/20 flex items-center justify-center gap-3"
                    >
                      Architectural Consultation
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>

                {/* Enlarged Module Graphic */}
                <div className="flex-1 min-h-[400px] bg-slate-50/50 dark:bg-slate-950/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-8 relative group/graphic">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full max-w-4xl">
                      <Suspense fallback={
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-12 h-12 border-4 border-brand-jade/20 border-t-brand-jade rounded-full animate-spin" />
                        </div>
                      }>
                        <ModuleGraphic id={pillars[activePillar].modules[activeModule].id} />
                      </Suspense>
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-8 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-jade animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Architectural Simulation</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {pillars[activePillar].modules[activeModule].features.map((feature, fIndex) => (
                    <div key={fIndex} className="p-8 bg-white dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 group hover:border-brand-jade/30 transition-all hover:shadow-xl hover:shadow-brand-jade/5">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                        <div className="w-2 h-2 bg-brand-jade rounded-full" />
                        {feature.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {feature.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Quick Stats / Footer CTA */}
      <section className="section-padding border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-black mb-6">Ready to Modernize?</h3>
              <p className="text-lg mb-8">
                Our modular infrastructure is designed to be deployed incrementally, ensuring zero downtime and immediate statutory compliance.
              </p>
              <div className="flex gap-12">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Modules</p>
                  <p className="text-3xl font-black text-brand-jade">16</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Infrastructure Domains</p>
                  <p className="text-3xl font-black text-brand-jade">04</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Compliance</p>
                  <p className="text-3xl font-black text-brand-jade">Federal</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Link 
                to="/contact" 
                className="px-12 py-6 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold rounded-[2rem] hover:scale-105 transition-transform flex items-center gap-4 shadow-2xl"
              >
                Start Architectural Consultation
                <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
