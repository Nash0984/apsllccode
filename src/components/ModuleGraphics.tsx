import React from 'react';
import { motion } from 'motion/react';
import { Database, Zap, Globe, Binary, Shield, Lock, CheckCircle2 } from 'lucide-react';

interface GraphicProps {
  id: string;
}

function UXFrame({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle?: string }) {
  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col group/window">
      {/* Window Header - Sophisticated Browser/App Style */}
      <div className="h-10 bg-slate-50 dark:bg-slate-800/50 flex items-center px-4 gap-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-[9px] font-medium text-slate-400 dark:text-slate-500 w-full max-w-[200px] flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-jade/40" />
            <span className="truncate">{title}</span>
          </div>
        </div>
        <div className="w-12 flex justify-end">
          <div className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-700/50" />
        </div>
      </div>
      {/* Window Content */}
      <div className="flex-1 relative overflow-hidden bg-white dark:bg-slate-950 flex flex-col">
        {subtitle && (
          <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-900/10">
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{subtitle}</span>
            <div className="flex gap-1">
              <div className="w-8 h-1.5 bg-brand-jade/20 rounded-full" />
              <div className="w-4 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
          </div>
        )}
        <div className="flex-1 relative">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ModuleGraphic({ id }: GraphicProps) {
  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const renderGraphic = () => {
    switch (id) {
      case "01": // Jurisdictional Isolation
        return (
          <UXFrame title="gov.systems/admin/jurisdiction" subtitle="Data Sovereignty Matrix">
            <div className="p-8 h-full flex flex-col items-center justify-center">
              <div className="relative w-full max-w-md h-full flex items-center justify-center">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] text-slate-900 dark:text-white" 
                     style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                
                <div className="relative flex items-center justify-center">
                  {/* Federal Node */}
                  <motion.div 
                    className="relative z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-24 h-24 rounded-[2rem] bg-brand-jade flex flex-col items-center justify-center shadow-2xl shadow-brand-jade/40 border-4 border-white dark:border-slate-800">
                      <Shield className="text-white mb-1" size={32} strokeWidth={1.5} />
                      <span className="text-[8px] font-black text-white uppercase tracking-tighter">FEDERAL</span>
                    </div>
                    {/* Pulse Effect */}
                    <motion.div 
                      className="absolute inset-0 rounded-[2rem] bg-brand-jade/20 -z-10"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Connection Lines with Data Packets */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[0, 60, 120, 180, 240, 300].map((angle) => (
                      <div key={angle} className="absolute" style={{ transform: `rotate(${angle}deg) translateX(80px)` }}>
                        <div className="w-16 h-px bg-slate-200 dark:bg-slate-800 relative">
                          <motion.div 
                            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-jade/40"
                            animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: angle / 100 }}
                          />
                          {/* Isolation Barrier */}
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-slate-400 dark:bg-slate-600 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* State Nodes */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                      <motion.div 
                        key={angle}
                        className="absolute"
                        style={{ transform: `rotate(${angle}deg) translateX(140px) rotate(-${angle}deg)` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col items-center justify-center group-hover/window:border-brand-jade/30 transition-colors relative">
                          <Globe className="text-slate-400 dark:text-slate-600 mb-1" size={18} strokeWidth={1.5} />
                          <span className="text-[6px] font-bold text-slate-400 uppercase tracking-widest">STATE {i + 1}</span>
                          {/* Lock Icon Overlay */}
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm border-2 border-white dark:border-slate-900">
                            <Lock size={10} strokeWidth={2.5} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legend/Status Bar */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-jade" />
                    <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Federal Baseline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Isolated Environment</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <CheckCircle2 size={10} className="text-emerald-500" />
                  <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400">JURISDICTIONAL_LOCK: ACTIVE</span>
                </div>
              </div>
            </div>
          </UXFrame>
        );
      case "02": // Precision Access Control
        return (
          <UXFrame title="gov.systems/security/rbac" subtitle="Role-Based Access Control">
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div className="space-y-1">
                  <div className="w-32 h-4 bg-slate-900 dark:bg-white rounded" />
                  <div className="w-48 h-2 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
                <div className="w-20 h-8 bg-brand-jade rounded-lg" />
              </div>
              <div className="flex-1 space-y-3">
                {[
                  { name: "Eligibility Worker", status: true },
                  { name: "Quality Control", status: true },
                  { name: "Admin Law Judge", status: false },
                  { name: "Program Admin", status: true }
                ].map((role, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${role.status ? 'bg-brand-jade' : 'bg-slate-300 dark:bg-slate-700'}`} />
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{role.name}</span>
                    </div>
                    <div className={`w-8 h-4 rounded-full p-1 flex ${role.status ? 'justify-end bg-brand-jade/20' : 'justify-start bg-slate-200 dark:bg-slate-800'}`}>
                      <div className={`w-2 h-2 rounded-full ${role.status ? 'bg-brand-jade' : 'bg-slate-400'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </UXFrame>
        );
      case "03": // Procedural Friction
        return (
          <UXFrame title="gov.systems/analytics/friction" subtitle="Administrative Burden Index">
            <div className="p-6 h-full flex flex-col">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-brand-jade/5 border border-brand-jade/10">
                  <div className="text-[8px] font-bold text-brand-jade uppercase mb-1">Avg. Processing Time</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">-42%</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <div className="text-[8px] font-bold text-slate-400 uppercase mb-1">Drop-off Rate</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">12.4%</div>
                </div>
              </div>
              <div className="flex-1 relative">
                <svg viewBox="0 0 200 80" className="w-full h-full text-brand-jade">
                  <defs>
                    <linearGradient id="friction-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path 
                    d="M0 60 Q 40 55, 80 40 T 160 10 T 200 5" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    initial={{ pathLength: 0 }} 
                    animate={{ pathLength: 1 }} 
                    transition={{ duration: 1.5 }}
                  />
                  <path d="M0 60 Q 40 55, 80 40 T 160 10 T 200 5 V 80 H 0 Z" fill="url(#friction-grad)" />
                  <motion.circle cx="160" cy="10" r="4" fill="white" stroke="currentColor" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />
                </svg>
              </div>
            </div>
          </UXFrame>
        );
      case "04": // Deterministic Policy Engine
        return (
          <UXFrame title="gov.systems/policy/engine" subtitle="Rules-as-Code Workspace">
            <div className="flex h-full">
              <div className="w-1/3 border-r border-slate-100 dark:border-slate-800 p-4 space-y-4">
                <div className="text-[8px] font-bold text-slate-400 uppercase">Statutory Input</div>
                <div className="space-y-2">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="h-10 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2">
                      <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded mb-1" />
                      <div className="w-2/3 h-1 bg-slate-200 dark:bg-slate-800 rounded" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex-1 rounded-2xl bg-slate-900 p-4 font-mono text-[7px] text-brand-jade space-y-2 overflow-hidden">
                  <div className="text-slate-500">// Eligibility Logic v2.4</div>
                  <div><span className="text-purple-400">rule</span> <span className="text-blue-400">CalculateSNAP</span>(household) {"{"}</div>
                  <div className="pl-4"><span className="text-purple-400">if</span> (household.income &lt; federal_poverty_level * 1.3) {"{"}</div>
                  <div className="pl-8 text-emerald-400">return <span className="text-white">Eligible</span>;</div>
                  <div className="pl-4">{"}"}</div>
                  <div>{"}"}</div>
                  <motion.div className="w-1 h-3 bg-brand-jade" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} />
                </div>
              </div>
            </div>
          </UXFrame>
        );
      case "05": // Enterprise Quality Control
        return (
          <UXFrame title="gov.systems/audit/qc" subtitle="Quality Control Dashboard">
            <div className="p-6 h-full flex flex-col">
              <div className="flex gap-6 mb-8">
                <div className="relative w-24 h-24 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
                    <motion.circle 
                      cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" 
                      strokeDasharray="251.2" 
                      initial={{ strokeDashoffset: 251.2 }} 
                      animate={{ strokeDashoffset: 251.2 * 0.02 }} 
                      className="text-brand-jade"
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-xl font-black text-slate-900 dark:text-white">98%</div>
                    <div className="text-[6px] font-bold text-slate-400 uppercase">Accuracy</div>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  {[
                    { label: "Cases Audited", value: "12,402" },
                    { label: "Error Rate", value: "1.2%" },
                    { label: "Remediation", value: "Active" },
                    { label: "Compliance", value: "Federal" }
                  ].map((stat, i) => (
                    <div key={i} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
                      <div className="text-[6px] font-bold text-slate-400 uppercase mb-1">{stat.label}</div>
                      <div className="text-xs font-black text-slate-900 dark:text-white">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {[0, 1, 2].map(i => (
                  <div key={i} className="h-8 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center px-4 justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-jade" />
                      <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded" />
                    </div>
                    <div className="w-12 h-2 bg-slate-100 dark:bg-slate-800 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </UXFrame>
        );
      case "06": // SNAP PER Mitigation
        return (
          <UXFrame title="gov.systems/compliance/snap" subtitle="PER Mitigation Engine">
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-end mb-8">
                <div className="space-y-2">
                  <div className="text-[8px] font-bold text-slate-400 uppercase">FNS Tolerance Threshold</div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-black text-slate-900 dark:text-white">3.4%</div>
                    <div className="text-[10px] font-bold text-emerald-500">▼ 0.8%</div>
                  </div>
                </div>
                <div className="flex gap-1 items-end h-12">
                  {[0.4, 0.6, 0.8, 0.5, 0.9, 0.3, 0.4].map((h, i) => (
                    <motion.div 
                      key={i} 
                      className="w-3 bg-brand-jade/20 rounded-t-sm" 
                      initial={{ height: 0 }} 
                      animate={{ height: `${h * 100}%` }} 
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex-1 rounded-2xl border border-brand-jade/20 bg-brand-jade/5 p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3">
                  <div className="px-2 py-1 rounded bg-brand-jade text-white text-[6px] font-bold">HIGH RISK FLAG</div>
                </div>
                <div className="space-y-4">
                  <div className="w-32 h-3 bg-brand-jade/20 rounded" />
                  <div className="grid grid-cols-3 gap-4">
                    {[0, 1, 2].map(i => <div key={i} className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-brand-jade/10" />)}
                  </div>
                </div>
              </div>
            </div>
          </UXFrame>
        );
      case "07": // ABAWD Compliance
        return (
          <UXFrame title="gov.systems/compliance/abawd" subtitle="ABAWD Clock Management">
            <div className="p-6 h-full flex flex-col">
              <div className="flex gap-8 items-center mb-8">
                <div className="relative w-32 h-32 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-100 dark:text-slate-800" strokeDasharray="2 2" />
                    {[...Array(36)].map((_, i) => (
                      <rect key={i} x="49" y="5" width="2" height="5" fill="currentColor" fillOpacity={i < 12 ? 1 : 0.1} transform={`rotate(${i * 10} 50 50)`} />
                    ))}
                    <motion.line 
                      x1="50" y1="50" x2="50" y2="15" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
                      style={{ originX: "50px", originY: "50px" }} 
                      className="text-brand-jade"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-black text-slate-900 dark:text-white">12/36</div>
                      <div className="text-[6px] font-bold text-slate-400 uppercase">Months</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="text-[8px] font-bold text-slate-400 uppercase mb-2">Exemption Status</div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Statutory Waiver Applied</div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-brand-jade" initial={{ width: 0 }} animate={{ width: "33%" }} />
                  </div>
                </div>
              </div>
            </div>
          </UXFrame>
        );
      case "08": // Administrative Adjudication
        return (
          <UXFrame title="gov.systems/judicial/appeals" subtitle="Hearing Docket Management">
            <div className="flex h-full">
              <div className="w-1/3 border-r border-slate-100 dark:border-slate-800 p-4 space-y-4">
                <div className="text-[8px] font-bold text-slate-400 uppercase">Calendar</div>
                <div className="grid grid-cols-7 gap-1">
                  {[...Array(28)].map((_, i) => (
                    <div key={i} className={`aspect-square rounded-sm ${i === 14 ? 'bg-brand-jade' : 'bg-slate-100 dark:bg-slate-800'}`} />
                  ))}
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-xs font-black text-slate-900 dark:text-white">Active Docket: April 09</div>
                  <div className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[8px] font-bold text-slate-500">12 Pending</div>
                </div>
                <div className="flex-1 space-y-3">
                  {[
                    { id: "APP-9921", time: "09:00 AM", status: "In Progress" },
                    { id: "APP-9925", time: "10:30 AM", status: "Scheduled" },
                    { id: "APP-9930", time: "01:00 PM", status: "Scheduled" }
                  ].map((hearing, i) => (
                    <div key={i} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-[10px] font-mono font-bold text-brand-jade">{hearing.time}</div>
                        <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{hearing.id}</div>
                      </div>
                      <div className={`px-2 py-0.5 rounded-full text-[6px] font-bold uppercase ${hearing.status === 'In Progress' ? 'bg-brand-jade text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                        {hearing.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </UXFrame>
        );
      case "09": // Citizen Self-Service
        return (
          <UXFrame title="gov.systems/portal/mobile" subtitle="Citizen Experience Hub">
            <div className="flex h-full items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50">
              <div className="w-40 h-[180px] relative bg-white dark:bg-slate-900 border-[6px] border-slate-900 dark:border-slate-800 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
                <div className="h-4 flex items-center justify-center pt-1">
                  <div className="w-10 h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
                </div>
                <div className="flex-1 p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-6 rounded-full bg-brand-jade/10" />
                    <div className="w-12 h-2 bg-slate-100 dark:bg-slate-800 rounded" />
                  </div>
                  <div className="p-3 bg-brand-jade/5 rounded-xl border border-brand-jade/10">
                    <div className="w-16 h-2 bg-brand-jade/20 rounded mb-2" />
                    <div className="w-24 h-4 bg-brand-jade rounded" />
                  </div>
                  <div className="space-y-1.5">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="h-8 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center px-2 gap-2">
                        <div className="w-4 h-4 rounded bg-slate-100 dark:bg-slate-800" />
                        <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-10 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-around items-center px-4">
                  {[0, 1, 2, 3].map(i => <div key={i} className="w-4 h-4 rounded-lg bg-slate-200 dark:bg-slate-700" />)}
                </div>
              </div>
              <div className="ml-8 flex-1 space-y-4 hidden md:block">
                <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                  <div className="text-[8px] font-bold text-slate-400 uppercase mb-2">Omnichannel Sync</div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">SMS</div>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">App</div>
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">Mail</div>
                  </div>
                </div>
              </div>
            </div>
          </UXFrame>
        );
      case "10": // Mathematical Policy Verification
        return (
          <UXFrame title="gov.systems/verify/formal" subtitle="Mathematical Policy Proof">
            <div className="flex h-full bg-slate-900">
              <div className="w-12 border-r border-white/5 flex flex-col items-center py-4 gap-4">
                <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <Binary size={12} />
                </div>
              </div>
              <div className="flex-1 p-6 font-mono text-[7px] space-y-3">
                <div className="text-emerald-500/50"># Formal Verification Engine v4.0</div>
                <div className="text-white">
                  <span className="text-emerald-400">ASSERT</span>: <span className="text-blue-400">Statute_2026_Sec_4A</span> == <span className="text-blue-400">Engine_Logic_v2</span>
                </div>
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <span className="text-slate-500">01</span>
                    <span className="text-emerald-400">CHECKING</span>: Income_Threshold_Logic... <span className="text-white">[PASS]</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500">02</span>
                    <span className="text-emerald-400">CHECKING</span>: Household_Composition_Rules... <span className="text-white">[PASS]</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500">03</span>
                    <span className="text-emerald-400">CHECKING</span>: Asset_Limit_Verification... <span className="text-white">[PASS]</span>
                  </div>
                </div>
                <motion.div 
                  className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="font-black">VERIFICATION COMPLETE: Q.E.D.</div>
                  <div className="text-[5px] opacity-70">No logical contradictions or unintended loopholes detected in 1,402 paths.</div>
                </motion.div>
              </div>
            </div>
          </UXFrame>
        );
      case "11": // Statutory Tracking
        return (
          <UXFrame title="gov.systems/legislative/tracker" subtitle="Statutory Fidelity Hub">
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div className="space-y-1">
                  <div className="text-xs font-black text-slate-900 dark:text-white">Legislative Pipeline</div>
                  <div className="text-[8px] font-bold text-slate-400 uppercase">Active Session 2026</div>
                </div>
                <div className="flex gap-2">
                  <div className="w-16 h-6 rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="w-16 h-6 rounded bg-brand-jade" />
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-0.5 bg-slate-100 dark:bg-slate-800" />
                </div>
                <div className="relative flex justify-between h-full items-center">
                  {[
                    { bill: "HB-102", date: "Jan 12", active: false },
                    { bill: "SB-442", date: "Feb 28", active: true },
                    { bill: "HB-205", date: "Mar 15", active: false }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-4">
                      <div className={`w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 shadow-sm ${item.active ? 'bg-brand-jade scale-150' : 'bg-slate-300 dark:bg-slate-700'}`} />
                      <div className="text-center">
                        <div className={`text-[8px] font-black ${item.active ? 'text-brand-jade' : 'text-slate-400'}`}>{item.bill}</div>
                        <div className="text-[6px] font-bold text-slate-400">{item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </UXFrame>
        );
      case "12": // Integrated Workforce Readiness
        return (
          <UXFrame title="gov.systems/academy/training" subtitle="Workforce Training Academy">
            <div className="p-6 h-full flex flex-col">
              <div className="flex gap-6 mb-8">
                <div className="w-1/3 p-4 rounded-2xl bg-brand-jade/5 border border-brand-jade/10">
                  <div className="text-[8px] font-bold text-brand-jade uppercase mb-2">My Progress</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">74%</div>
                  <div className="w-full h-1.5 bg-brand-jade/20 rounded-full mt-2 overflow-hidden">
                    <motion.div className="h-full bg-brand-jade" initial={{ width: 0 }} animate={{ width: "74%" }} />
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  {[0, 1].map(i => (
                    <div key={i} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
                      <div className="w-8 h-1 bg-slate-200 dark:bg-slate-800 rounded mb-2" />
                      <div className="w-12 h-3 bg-slate-100 dark:bg-slate-800 rounded" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="text-[8px] font-bold text-slate-400 uppercase mb-2">Active Modules</div>
                {[
                  { title: "SNAP Eligibility Basics", time: "15m left" },
                  { title: "Fraud Detection Patterns", time: "Completed" }
                ].map((mod, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${mod.time === 'Completed' ? 'bg-emerald-500' : 'bg-brand-jade'}`} />
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{mod.title}</span>
                    </div>
                    <span className="text-[8px] font-bold text-slate-400">{mod.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </UXFrame>
        );
      case "13": // Integrated Financial Data
        return (
          <UXFrame title="gov.systems/finance/gateway" subtitle="Financial Data Integration">
            <div className="p-6 h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-slate-100 dark:bg-slate-800" />
                </div>
                <div className="flex gap-12 relative">
                  {[
                    { label: "State Tax", icon: <Database size={12} /> },
                    { label: "Gateway", icon: <Zap size={12} />, active: true },
                    { label: "Federal IRS", icon: <Globe size={12} /> }
                  ].map((node, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${node.active ? 'bg-brand-jade text-white shadow-brand-jade/20' : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400'}`}>
                        {node.icon}
                      </div>
                      <span className={`text-[8px] font-bold uppercase tracking-wider ${node.active ? 'text-brand-jade' : 'text-slate-400'}`}>{node.label}</span>
                    </div>
                  ))}
                </div>
                <motion.div 
                  className="absolute w-2 h-2 rounded-full bg-brand-jade shadow-lg shadow-brand-jade/50"
                  animate={{ x: [-80, 80], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </UXFrame>
        );
      case "14": // Multi-Program Cross-Enrollment
        return (
          <UXFrame title="gov.systems/enrollment/cross" subtitle="Cross-Program Eligibility Engine">
            <div className="p-6 h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-48 h-32">
                  <div className="absolute left-0 top-0 w-32 h-32 rounded-full border-2 border-brand-jade/30 bg-brand-jade/5 flex items-center justify-start pl-6">
                    <div className="text-center">
                      <div className="text-xs font-black text-brand-jade">SNAP</div>
                      <div className="text-[6px] font-bold text-slate-400">1.2M</div>
                    </div>
                  </div>
                  <div className="absolute right-0 top-0 w-32 h-32 rounded-full border-2 border-blue-500/30 bg-blue-500/5 flex items-center justify-end pr-6">
                    <div className="text-center">
                      <div className="text-xs font-black text-blue-500">Medicaid</div>
                      <div className="text-[6px] font-bold text-slate-400">2.4M</div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xl">
                    <div className="text-center">
                      <div className="text-[8px] font-black text-slate-900 dark:text-white">OVERLAP</div>
                      <div className="text-[10px] font-black text-brand-jade">840k</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Auto-Enrollment Potential</span>
                  <span className="text-[10px] font-black text-emerald-500">+12%</span>
                </div>
              </div>
            </div>
          </UXFrame>
        );
      case "15": // Interoperability & API Gateway
        return (
          <UXFrame title="gov.systems/developer/api" subtitle="Developer API Explorer">
            <div className="flex h-full">
              <div className="w-16 border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-2 space-y-2">
                <div className="h-4 bg-brand-jade/20 rounded" />
                {[0, 1, 2, 3, 4].map(i => <div key={i} className="h-3 bg-slate-100 dark:bg-slate-800 rounded" />)}
              </div>
              <div className="flex-1 bg-slate-900 p-4 font-mono text-[7px] text-emerald-400 space-y-3 overflow-hidden">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <div className="flex gap-2">
                    <span className="text-emerald-500">GET</span>
                    <span className="text-white">/api/v1/eligibility/TX-9921</span>
                  </div>
                  <span className="bg-emerald-400/20 px-1 rounded text-emerald-400">200 OK</span>
                </div>
                <div className="text-slate-400 space-y-1">
                  <div>{"{"}</div>
                  <div className="pl-4">"status": <span className="text-emerald-400">"authorized"</span>,</div>
                  <div className="pl-4">"program": <span className="text-emerald-400">"SNAP"</span>,</div>
                  <div className="pl-4">"benefit_amount": <span className="text-emerald-400">291.00</span>,</div>
                  <div className="pl-4">"metadata": {"{"}</div>
                  <div className="pl-8">"jurisdiction": "TX",</div>
                  <div className="pl-8">"timestamp": "2026-04-09T10:25:11Z"</div>
                  <div className="pl-4">{"}"}</div>
                  <div>{"}"}</div>
                </div>
                <motion.div className="w-1.5 h-3 bg-emerald-400" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} />
              </div>
            </div>
          </UXFrame>
        );
      case "16": // AI Governance
        return (
          <UXFrame title="gov.systems/ai/governance" subtitle="Algorithmic Bias Monitor">
            <div className="p-6 h-full flex flex-col">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <div className="text-[8px] font-bold text-slate-400 uppercase mb-2">Demographic Parity</div>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-black text-slate-900 dark:text-white">0.98</div>
                    <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-jade w-[98%]" />
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-brand-jade/5 border border-brand-jade/10">
                  <div className="text-[8px] font-bold text-brand-jade uppercase mb-2">Decision Fairness</div>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-black text-brand-jade">99.4%</div>
                    <div className="w-8 h-8 rounded-full border-4 border-brand-jade border-t-transparent animate-spin" />
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <svg viewBox="0 0 200 60" className="w-full h-full text-brand-jade">
                  {[0, 20, 40, 60, 80, 100].map(x => (
                    <rect key={x} x={x * 2} y="20" width="10" height="20" rx="2" fill="currentColor" fillOpacity={Math.random() * 0.5 + 0.1} />
                  ))}
                  <motion.line x1="0" y1="30" x2="200" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                </svg>
              </div>
            </div>
          </UXFrame>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-full h-full flex items-center justify-center p-2"
    >
      {renderGraphic()}
    </motion.div>
  );
}
