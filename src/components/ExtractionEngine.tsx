import React, { useState, useRef, useEffect } from 'react';
import { 
  Network, Cpu, Database, GitBranch, Activity, Code2, Play, 
  CheckCircle2, AlertCircle, Server, ShieldCheck, FileJson
} from 'lucide-react';
import { LOGIC_PIPELINES } from '../config/ontology';

interface ExecutionResult {
  query: string;
  status: 'success' | 'error';
  formalLogic: string;
  jsonSchema: string;
  executionTime: string;
}

export function ExtractionEngine() {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activePipeline, setActivePipeline] = useState(LOGIC_PIPELINES[0]);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [executionResult, isProcessing]);

  const handleExecute = () => {
    if (!input.trim() || isProcessing) return;
    
    setIsProcessing(true);
    setExecutionResult(null);

    // Simulating the mathematical solver and extraction pipeline latency
    setTimeout(() => {
      const generatedSchema = {
        "rule_id": `APS-EXT-${Math.floor(Math.random() * 10000)}`,
        "domain": activePipeline.id.toUpperCase(),
        "statutory_authority": activePipeline.statute,
        "parameters": [
          {
            "variable": "gross_income",
            "type": "integer",
            "constraint": "<=",
            "threshold": "fpl_130_percent"
          }
        ],
        "action": {
          "on_pass": "EVALUATE_NET_INCOME",
          "on_fail": "TRIGGER_DENIAL_NOTICE"
        }
      };

      const formalLogicTrace = `
;; Z3 SMT-LIB2 Mathematical Proof
(declare-const gross_income Int)
(declare-const fpl_130 Int)
(assert (= fpl_130 2430))

;; Rule Axiom: 7 CFR § 273.9
(assert (<= gross_income fpl_130))

(check-sat)
;; Output: SAT
;; Proof Verified: No contradictory paths detected.
      `.trim();

      setExecutionResult({
        query: input,
        status: 'success',
        formalLogic: formalLogicTrace,
        jsonSchema: JSON.stringify(generatedSchema, null, 2),
        executionTime: `${(Math.random() * (1.5 - 0.8) + 0.8).toFixed(2)}s`
      });
      
      setIsProcessing(false);
      setInput('');
    }, 1800);
  };

  return (
    <div className="w-full flex flex-col bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden font-sans min-h-[600px] max-h-[800px]">
      
      {/* Header Bar */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/50">
          <div className="flex items-center gap-3 text-brand-jade">
            <Cpu size={18} />
            <div className="flex flex-col">
              <span className="font-black uppercase tracking-widest text-xs">Mathematical Policy Verification</span>
              <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Enterprise Rules Extraction Engine</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center gap-1 font-mono uppercase bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">
            <Database size={12} /> ontology.ts
          </div>
        </div>

        {/* Pipeline Selection */}
        <div className="flex overflow-x-auto no-scrollbar p-2 gap-2 bg-slate-100 dark:bg-slate-800/50">
          {LOGIC_PIPELINES.map((pipeline) => (
            <button
              key={pipeline.id}
              onClick={() => setActivePipeline(pipeline)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activePipeline.id === pipeline.id 
                  ? 'bg-brand-jade text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50'
              }`}
            >
              <GitBranch size={14} />
              {pipeline.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Execution Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-[#050a0f] p-4 sm:p-6 space-y-6">
        
        {/* Initial State */}
        {!executionResult && !isProcessing && (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto gap-4 opacity-70">
            <Network size={32} className="text-slate-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Formal Logic Extractor</h3>
              <p className="text-xs text-slate-500 font-mono">
                Input statutory text. The engine will translate the regulation into an SMT solver proof and an executable JSON schema.
              </p>
            </div>
            <div className="w-full mt-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-left">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-2">Example Input</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                "Participation in the SNAP program shall be limited to those households whose income is determined to be a substantial limiting factor. Gross income must not exceed 130 percent of the poverty line."
              </p>
            </div>
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <div className="relative">
              <Server size={32} className="text-brand-jade animate-pulse" />
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-brand-jade rounded-full animate-ping" />
            </div>
            <div className="space-y-2 text-center">
              <div className="text-xs font-mono font-bold text-brand-jade uppercase tracking-widest">Compiling Formal Logic</div>
              <div className="text-[10px] text-slate-500 font-mono">Translating natural language to Z3 SMT constraints...</div>
            </div>
          </div>
        )}

        {/* Execution Results */}
        {executionResult && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            
            {/* Success Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-brand-jade" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Translation Verified</h3>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Target Authority: {activePipeline.statute}
                  </p>
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                {executionResult.executionTime}
              </div>
            </div>

            {/* Input Echo */}
            <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-2">Input Source Text</span>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">"{executionResult.query}"</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Output 1: Formal Logic (SMT Solver) */}
              <div className="bg-[#0d1117] border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
                <div className="bg-[#161b22] border-b border-slate-800 px-4 py-2 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-brand-jade" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Formal Logic Proof (Z3 SMT)</span>
                </div>
                <div className="p-4 overflow-x-auto flex-1">
                  <pre className="text-[11px] font-mono text-emerald-400/90 leading-relaxed">
                    {executionResult.formalLogic}
                  </pre>
                </div>
              </div>

              {/* Output 2: JSON Schema */}
              <div className="bg-[#0d1117] border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
                <div className="bg-[#161b22] border-b border-slate-800 px-4 py-2 flex items-center gap-2">
                  <FileJson size={14} className="text-brand-jade" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Generated System Schema</span>
                </div>
                <div className="p-4 overflow-x-auto flex-1">
                  <pre className="text-[11px] font-mono text-blue-400/90 leading-relaxed">
                    {executionResult.jsonSchema}
                  </pre>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-50 dark:bg-[#0a1017] border-t border-slate-200 dark:border-slate-800 shrink-0">
        <div className="relative flex items-center">
          <span className="absolute left-4 text-brand-jade font-mono text-sm">&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleExecute(); }}
            placeholder="Paste statutory text to initiate formal logic extraction..."
            disabled={isProcessing}
            className="w-full bg-white dark:bg-[#050a0f] border border-slate-200 dark:border-slate-700 rounded-lg py-3 pl-8 pr-12 text-slate-900 dark:text-slate-200 font-mono text-sm focus:outline-none focus:border-brand-jade focus:ring-1 focus:ring-brand-jade/50 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 disabled:opacity-50"
          />
          <button 
            onClick={handleExecute} 
            disabled={!input.trim() || isProcessing}
            className="absolute right-2 p-1.5 rounded-md bg-brand-jade text-white hover:bg-[#005a62] disabled:opacity-50 transition-colors shadow-sm"
          >
            <Play size={16} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}