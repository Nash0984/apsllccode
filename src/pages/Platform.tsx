import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Lock, BarChart3, Cpu, CheckCircle2, ArrowRight, Zap, 
  Database, Users, Scale, FileSearch, AlertTriangle, Clock, 
  Gavel, Smartphone, Binary, History, GraduationCap, Globe, 
  RefreshCw, Code2, Eye, LayoutDashboard, Settings, Activity, Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function Platform() {
  const [activePillar, setActivePillar] = useState(0);
  const [activeModule, setActiveModule] = useState(0);

  const pillars = [
    {
      title: "Architectural Integrity & Security",
      icon: <Shield size={20} />,
      desc: "The foundational governance and security frameworks that ensure system-wide trust and compliance.",
      modules: [
        {
          id: "01",
          title: "Jurisdictional Isolation Architecture",
          icon: <Shield className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Designed for complex federal and state hierarchies, this module ensures absolute data privacy and regulatory alignment across different geographic or administrative boundaries.",
          features: [
            { name: "Fail-Closed Security Baseline", detail: "The system defaults to strict federal privacy baselines, ensuring compliance even before state-specific configurations are applied." },
            { name: "Dynamic State Configurations", detail: "Geographic boundaries act as secure, isolated environments, allowing localized agencies to apply specific operational rules without compromising the overarching data architecture." },
            { name: "Immutable Audit Trails", detail: "Every system action is logged with strict jurisdictional context, providing transparent oversight for federal audits." }
          ]
        },
        {
          id: "02",
          title: "Precision Access Control & Workflow Engine",
          icon: <Lock className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "A highly granular, role-based access control (RBAC) matrix that seamlessly coordinates work across citizens, front-line staff, and adjudicators.",
          features: [
            { name: "Targeted Persona Workflows", detail: "The system isolates views and capabilities across distinct operational roles, including applicants, eligibility workers, quality control reviewers, program administrators, and administrative law judges." },
            { name: "Data-Driven Navigation", detail: "User interfaces and administrative dashboards are generated dynamically from the server side, ensuring users only access the tools and data strictly permitted by their security clearance." },
            { name: "Cross-Departmental Handoffs", detail: "Securely routes cases between initial intake, documentation review, and formal hearings without exposing sensitive data to unauthorized internal staff." }
          ]
        },
        {
          id: "11",
          title: "Statutory Tracking & Certification Hub",
          icon: <History className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "A centralized repository for tracking legislative changes and managing the agency's compliance with federal modernization funding requirements, such as Medicaid Enterprise System (MES) certification.",
          features: [
            { name: "Federal & State Law Trackers", detail: "A dedicated dashboard that maps pending legislative bills and final statutes directly to the software rules they impact, ensuring the technology stack evolves synchronously with the law." },
            { name: "Federal Certification Readiness", detail: "Automatically structures system documentation, testing artifacts, and performance metrics into the precise formats required by federal regulators (CMS and FNS) to secure and maintain enhanced federal matching funds." }
          ]
        },
        {
          id: "16",
          title: "AI Governance & Automated Decision Monitoring",
          icon: <Eye className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "As government systems increasingly rely on algorithms to process data, this module provides the mandatory oversight required to ensure automated decisions remain equitable, transparent, and legally defensible.",
          features: [
            { name: "Algorithmic Bias Tracking", detail: "Continuously monitors the outcomes of automated routing and pre-authorization scoring to ensure specific demographic groups or jurisdictions are not experiencing disproportionate procedural friction." },
            { name: "Automated Decision Auditability", detail: "Logs the exact parameters, data inputs, and logic trees utilized by the rules engine for every automated determination, ensuring every machine-driven action can be explained and defended." },
            { name: "Performance Degradation Alerts", detail: "Tracks the accuracy and confidence thresholds of automated verification integrations, immediately alerting administrators if an external data source begins returning anomalous results." }
          ]
        }
      ]
    },
    {
      title: "Financial Compliance & Precision",
      icon: <Scale size={20} />,
      desc: "Specialized financial compliance modules built to manage strict tolerances and protect agencies from multi-million dollar sanctions.",
      modules: [
        {
          id: "05",
          title: "Enterprise Quality Control & Audit Framework",
          icon: <FileSearch className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "A unified, cross-program auditing engine that ensures eligibility determinations for SNAP, Medicaid, TANF, and other programs remain strictly compliant with federal and state regulations.",
          features: [
            { name: "Intelligent Case Sampling", detail: "Automatically selects and routes statistical samples of authorized and denied cases to Quality Control (QC) reviewers based on federal guidelines and algorithmic risk profiling." },
            { name: "Root Cause Diagnostics", detail: "Captures and categorizes discrepancies to determine if an error originated from client omission, caseworker data entry, or systemic policy engine misconfigurations." },
            { name: "Targeted Remediation Workflows", detail: "Creates a feedback loop between QC findings and agency operations, allowing administrators to deploy targeted training or system adjustments to address systemic error trends before they trigger federal audits." }
          ]
        },
        {
          id: "06",
          title: "SNAP Payment Error Rate (PER) Mitigation Engine",
          icon: <AlertTriangle className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "A specialized financial compliance module built specifically to manage the strict tolerances of the Supplemental Nutrition Assistance Program (SNAP) and protect agencies from multi-million dollar federal sanctions.",
          features: [
            { name: "Pre-Authorization Risk Scoring", detail: "Analyzes incoming cases for high-variance indicators (e.g., fluctuating earned income, complex household compositions) and flags them for secondary review prior to benefit issuance." },
            { name: "Real-Time Tolerance Dashboards", detail: "Provides program administrators with live visualizations of overpayment and underpayment rates, comparing active agency performance against the USDA Food and Nutrition Service (FNS) national tolerance thresholds." },
            { name: "Error Liability Tracking", detail: "Granularly tracks error assignments—distinguishing between agency-caused errors and client-caused errors—to generate highly specific Corrective Action Plans (CAPs) required by federal regulators." }
          ]
        },
        {
          id: "07",
          title: "ABAWD Compliance & Exemption Automation",
          icon: <Clock className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "Able-Bodied Adults Without Dependents (ABAWD) requirements are notoriously complex and heavily burden both caseworkers and citizens. This module automates the 3-in-36 month time-limit tracking and drastically reduces the procedural friction of proving compliance.",
          features: [
            { name: "Proactive Exemption Identification", detail: "The rules engine automatically scans integrated state databases and existing case records to identify statutory exemptions (e.g., age, veteran status, homelessness, or physical/mental unfitness) without requiring the citizen to submit redundant paperwork." },
            { name: "Automated Clock Management", detail: "Replaces manual caseworker spreadsheets with an automated tracking system that precisely counts countable months, applied exemptions, and geographic waiver statuses across different counties or labor market areas." },
            { name: "Frictionless Activity Reporting", detail: "Provides citizens and approved workforce partners with simplified, mobile-responsive interfaces to log qualifying work or training hours, minimizing procedural drop-offs and reducing the administrative processing burden on front-line staff." }
          ]
        },
        {
          id: "13",
          title: "Integrated Financial Data & Tax Routing Gateway",
          icon: <Globe className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "A highly secure data integration hub that manages complex financial parameters, tax rates, and electronic filing infrastructures to support comprehensive income verification and economic routing.",
          features: [
            { name: "Electronic Filing Infrastructure", detail: "Provides a secure, monitored pipeline for e-filing data, ensuring strict adherence to data privacy and electronic tax administration standards." },
            { name: "Dynamic Tax Parameter Management", detail: "Allows administrators to configure and update localized county tax rates, earned income parameters, and deduction thresholds without requiring backend database migrations." },
            { name: "Automated Income Verification", detail: "Interfaces directly with external financial and state workforce databases to validate applicant income instantly, reducing the reliance on manual paystub uploads." }
          ]
        }
      ]
    },
    {
      title: "Outcome-Driven Operations",
      icon: <Activity size={20} />,
      desc: "Modules that handle citizen interactions, formal disputes, and mathematical policy verification.",
      modules: [
        {
          id: "03",
          title: "Procedural Friction & Outcomes Analytics",
          icon: <BarChart3 className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "This module tracks, quantifies, and visualizes the administrative burden placed on both citizens and agency staff. It replaces self-reported success metrics with mathematically provable data.",
          features: [
            { name: "Automated Burden Calculation", detail: "The system aggregates front-line operational assessments to dynamically compute the exact reduction in processing times and applicant drop-off rates following a new initiative." },
            { name: "Procedural Denial Tracking", detail: "Isolates applications denied due to paperwork friction rather than statutory ineligibility, allowing agencies to fix confusing notices and prevent unnecessary citizen churn." },
            { name: "Federal Compliance Reporting", detail: "Automatically aggregates data to satisfy federal mandates (such as EO 14058) regarding the reduction of administrative hurdles in public benefits." }
          ]
        },
        {
          id: "04",
          title: "Deterministic Policy Engine",
          icon: <Cpu className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "A centralized rules engine that translates complex statutory requirements into automated eligibility determinations.",
          features: [
            { name: "Automated Verification Processing", detail: "Interfaces with external data sources to process zero-touch renewals and determinations, removing the manual calculation burden from caseworkers." },
            { name: "Notice Generation Engine", detail: "Automatically triggers and tracks required communications, such as Notices of Missing Information (NOMI), categorizing them by pending, overdue, and resolved statuses." },
            { name: "Policy Workspace", detail: "Provides administrators with a structured environment to update program parameters, tax rates, or waiver logic without requiring hardcoded software changes." }
          ]
        },
        {
          id: "10",
          title: "Mathematical Policy Verification & Scenario Simulation",
          icon: <Binary className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "A cutting-edge testing and compliance environment that allows policymakers to mathematically prove that the system's automated rules match the written law.",
          features: [
            { name: "Formal Logic Verification", detail: "Utilizes advanced formal methods to translate state and federal statutes into mathematical axioms. This proves definitively that the system's logic contains no dead-ends, contradictory rules, or unintended loopholes." },
            { name: "Scenario Workspace", detail: "Allows program administrators to safely simulate proposed policy changes against anonymized historical data to accurately project the caseload and financial impacts before the rule goes live." },
            { name: "Regression Prevention", detail: "Ensures that a localized policy waiver applied to one county does not inadvertently break the federal compliance baseline for the rest of the state." }
          ]
        },
        {
          id: "15",
          title: "Interoperability & Developer API Gateway",
          icon: <Code2 className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "A comprehensive integration layer designed to prevent vendor lock-in and allow the agency to seamlessly connect the platform with external state, federal, and third-party systems.",
          features: [
            { name: "Developer Portal & API Explorer", detail: "Provides internal state IT teams and authorized third-party vendors with secure access to exhaustive API documentation and testing sandboxes to accelerate system integrations." },
            { name: "Real-Time Webhook Infrastructure", detail: "Replaces brittle batch-processing files with a modern webhook architecture, allowing the system to instantly push and pull real-time updates across disparate state databases." },
            { name: "Data Payload Security", detail: "Enforces strict cryptographic standards and RBAC validations on all inbound and outbound API requests to ensure external integrations do not compromise the core system's federal compliance baseline." }
          ]
        }
      ]
    },
    {
      title: "Citizen & Workforce Empowerment",
      icon: <Heart size={20} />,
      desc: "Infrastructure for interoperability, workforce readiness, and automated decision monitoring.",
      modules: [
        {
          id: "08",
          title: "Administrative Adjudication & Appeals Framework",
          icon: <Gavel className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "A legally robust module designed to manage fair hearings, appeals, and formal dispute resolutions. It provides Administrative Law Judges (ALJs) and hearing officers with the precise context needed to adjudicate cases fairly and efficiently.",
          features: [
            { name: "Immutable Case Snapshots", detail: "When an appeal is filed, the system captures an exact, immutable snapshot of the household data and policy rules active at the exact time of the original denial, ensuring judges are evaluating the correct historical context." },
            { name: "Streamlined Docket Management", detail: "Automates the scheduling, noticing, and docketing of fair hearings, preventing statutory deadlines from being missed and avoiding default judgments against the agency." },
            { name: "Pre-Hearing Resolution Workflows", detail: "Automatically routes contested cases through a secondary review queue, allowing senior staff to identify and overturn clear agency errors before they consume expensive judicial resources." }
          ]
        },
        {
          id: "09",
          title: "Citizen Self-Service & Omnichannel Engagement",
          icon: <Smartphone className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "A modern, mobile-responsive portal and communications hub designed to divert traffic away from overwhelmed call centers and local offices by empowering citizens to manage their own cases.",
          features: [
            { name: "Unified Applicant Portal", detail: "Provides a secure hub for citizens to check benefit statuses, view upcoming deadlines, report changes in circumstances, and complete friction-free digital document uploads." },
            { name: "Centralized Communications Engine", detail: "Manages and logs all outbound and inbound correspondence across mail, email, and SMS. It tracks the exact delivery status of critical notices to provide an indisputable audit trail." },
            { name: "Community Navigator & Call Center Interfaces", detail: "Provides authorized third-party assisters and state call center representatives with a specialized, read-only 'heads-up' display to triage citizen inquiries and troubleshoot cases." }
          ]
        },
        {
          id: "12",
          title: "Integrated Workforce Readiness & Training Academy",
          icon: <GraduationCap className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "High staff turnover and complex policy manuals are the primary drivers of processing errors. This module embeds the training apparatus directly into the production environment's architecture.",
          features: [
            { name: "Contextual Lesson Plans", detail: "Delivers role-specific training modules directly related to the user's daily workflows, ensuring new eligibility workers or QC reviewers are trained on the exact screens and rules they will use." },
            { name: "Simulated Intake Environments", detail: "Allows new staff to practice processing complex, synthetic cases in a safe, sandboxed environment that perfectly mimics the live production system without risking actual citizen data." },
            { name: "Progress & Proficiency Tracking", detail: "Provides supervisors with dashboards tracking staff completion of mandatory training sequences, identifying knowledge gaps before they result in active payment errors." }
          ]
        },
        {
          id: "14",
          title: "Multi-Program Cross-Enrollment Engine",
          icon: <RefreshCw className="text-brand-jade" size={32} strokeWidth={1.5} />,
          desc: "A specialized data synchronization module designed to maximize citizen access to benefits by automatically identifying eligibility overlaps across disparate state and federal programs.",
          features: [
            { name: "Automated Program Matching", detail: "Continuously scans the master client index to flag households receiving assistance in one program (e.g., Medicaid) that are statistically likely to qualify for another (e.g., SNAP or WIC)." },
            { name: "Frictionless Application Bridging", detail: "Pre-populates secondary benefit applications with verified household and income data from the primary program, eliminating redundant data entry for the citizen." },
            { name: "Holistic Caseload Dashboards", detail: "Provides program administrators with cross-program analytics to measure the success of horizontal integration initiatives and track overall household stabilization metrics." }
          ]
        }
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen flex flex-col">
      {/* Hero Section - Compact */}
      <section className="relative py-20 overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900/50 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-brand-jade mb-6">Strategic Infrastructure</h1>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
                Integrated Benefits Administration Platform.
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                Our proprietary eligibility and case management platform provides government agencies with a secure, modernized infrastructure to deliver health and human services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Command Center */}
      <section className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 gap-12">
        {/* Sidebar Navigation */}
        <div className="lg:w-80 shrink-0 space-y-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6">Strategic Pillars</h3>
            <div className="space-y-2">
              {pillars.map((pillar, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActivePillar(index);
                    setActiveModule(0);
                  }}
                  className={`w-full text-left p-4 rounded-2xl transition-all flex items-center gap-4 group ${
                    activePillar === index 
                      ? 'bg-brand-jade text-white shadow-lg shadow-brand-jade/20' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className={`shrink-0 ${activePillar === index ? 'text-white' : 'text-brand-jade group-hover:scale-110 transition-transform'}`}>
                    {pillar.icon}
                  </div>
                  <span className="text-sm font-bold leading-tight">{pillar.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6">Modules in Pillar</h3>
            <div className="space-y-2">
              {pillars[activePillar].modules.map((module, index) => (
                <button
                  key={index}
                  onClick={() => setActiveModule(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between group ${
                    activeModule === index 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-500'
                  }`}
                >
                  <span className="text-xs font-bold">{module.title}</span>
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-8 md:p-12 shadow-sm h-full flex flex-col"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-brand-jade/10 flex items-center justify-center">
                      {pillars[activePillar].modules[activeModule].icon}
                    </div>
                    <span className="text-3xl font-mono font-black text-slate-200 dark:text-slate-800">
                      {pillars[activePillar].modules[activeModule].id}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                    {pillars[activePillar].modules[activeModule].title}
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillars[activePillar].modules[activeModule].desc}
                  </p>
                </div>
                <div className="shrink-0 pt-2">
                  <Link 
                    to="/contact" 
                    className="px-6 py-3 bg-brand-jade/10 text-brand-jade font-bold rounded-xl hover:bg-brand-jade hover:text-white transition-all flex items-center gap-2 text-sm"
                  >
                    Consult on this Module
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-auto">
                {pillars[activePillar].modules[activeModule].features.map((feature, fIndex) => (
                  <div key={fIndex} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-brand-jade/30 transition-colors">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-brand-jade rounded-full" />
                      {feature.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {feature.detail}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Quick Stats / Footer CTA */}
      <section className="py-12 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Modules</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">16</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Strategic Pillars</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">04</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Compliance</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">Federal</p>
            </div>
          </div>
          <Link 
            to="/contact" 
            className="px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold rounded-2xl hover:scale-105 transition-transform flex items-center gap-3"
          >
            Start Architectural Consultation
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
