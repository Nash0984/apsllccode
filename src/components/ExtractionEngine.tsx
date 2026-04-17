import React, { useState, useRef, useEffect } from 'react';
import { Network, Cpu, Database, GitBranch, Activity, Code2, Play, CheckCircle2, AlertCircle, Server } from 'lucide-react';
import { getChatResponse } from '../services/gemini';

const LOGIC_PIPELINES = [
  { id: "financial", label: "Financial Means Testing", statute: "7 CFR § 273.9", status: "online" },
  { id: "work", label: "ABAWD Work Compliance", statute: "7 CFR § 273.24", status: "online" },
  { id: "tax", label: "IRS 1075 Privacy Isolation", statute: "IRC § 7216", status: "standby" }
];

export function ExtractionEngine() {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activePipeline, setActivePipeline] = useState(LOGIC_PIPELINES[0]);
  
  // Structured state for node visualization instead of raw text chat
  const [executionNodes, setExecutionNodes] = useState<{
    query: string;
    status: 'success' | 'error';
    extractedGates: { field: string; value: string; statutorySufficiency: number; complianceNote: string }[];
    rawOutput: string;
  } | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const persona = 'worker'; 

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [executionNodes, isProcessing]);

  const handleExecute = async (queryOverride?: string) => {
    const command = queryOverride || input.trim();
    if (!command || isProcessing) return;
    
    setInput('');
    setIsProcessing(true);
    
    // Clear previous node to show processing state
    setExecutionNodes(null);

    try {
      const contextualMessage = `[SYSTEM OVERRIDE: OUTPUT RAW DETERMINISTIC PSEUDOCODE AND EXACT JSON EXTRACTS ONLY. DO NOT CONVERSE.]\n[TARGET PIPELINE: ${activePipeline.label}]\n[STATUTE: ${activePipeline.statute}]\n\nExecute Extraction For: ${command}`;
      
      const responseData = await getChatResponse(contextualMessage, [{ role: 'user', parts: [{ text: contextualMessage }] }], null, undefined, persona);
      
      setExecutionNodes({
        query: command,
        status: 'success',
        extractedGates: responseData.extractedData || [],
        rawOutput: responseData.message
      });
    } catch (error) {
      setExecutionNodes({
        query: command,
        status: 'error',
        extractedGates: [],
        rawOutput: "ERR: Pipeline execution failed. Verification node unresponsive."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col font-sans bg-white dark:bg-[#050a0f] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden min-h-[700px]">
      
      {/* Top Telemetry Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-50 dark:bg-[#0a1017] border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <Network className="text-brand-jade" size={18} />
          <span className="text-slate-800 dark:text-slate-300 font-bold tracking-widest uppercase text-xs">APS Rules Extraction Core</span>
          <span className="px-2 py-0.5 rounded bg-brand-jade/10 text-brand-jade text-[9px] font-mono border border-brand-jade/20">v2.4.0-stable</span>
        </div>
        <div className="flex items-center gap-6 text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">
          <div className="flex items-center gap-1.5"><Activity size={12} className="text-green-500" /> Latency: 42ms</div>
          <div className="flex items-center gap-1.5"><Cpu size={12} className="text-blue-500" /> Deterministic Mode: Active</div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Panel: Logic Pipelines */}
        <div className="w-64 bg-slate-50 dark:bg-[#0a1017] border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col gap-4 shrink-0 overflow-y-auto">
          <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Available Pipelines</div>
          {LOGIC_PIPELINES.map((pipeline) => (
            <button
              key={pipeline.id}
              onClick={() => setActivePipeline(pipeline)}
              className={`p-3 rounded-lg border text-left transition-all relative overflow-hidden group ${activePipeline.id === pipeline.id ? 'bg-white dark:bg-[#0f1722] border-brand-jade/50 shadow-[0_0_15px_rgba(0,183,168,0.1)]' : 'bg-transparent border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Database size={14} className={activePipeline.id === pipeline.id ? 'text-brand-jade' : 'text-slate-400 dark:text-slate-500'} />
                <span className={`text-xs font-bold ${activePipeline.id === pipeline.id ? 'text-brand-jade dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>{pipeline.label}</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>{pipeline.statute}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${pipeline.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`} />
              </div>
              {activePipeline.id === pipeline.id && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-jade" />
              )}
            </button>
          ))}
        </div>

        {/* Main Stage: Node Visualization */}
        <div className="flex-1 flex flex-col relative bg-white dark:bg-[#050a0f] overflow-hidden">
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
            {!executionNodes && !isProcessing && (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto opacity-60">
                <GitBranch size={48} className="text-slate-300 dark:text-slate-700 mb-6" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-300 mb-2">Target Pipeline Selected</h3>
                <p className="text-sm text-slate-600 dark:text-slate-500 mb-8 leading-relaxed">Enter a system query below to extract executable logic gates and trace statutory compliance nodes.</p>
                <div className="grid gap-2 w-full">
                  <button onClick={() => handleExecute(`Extract logical bounds for ${activePipeline.label}`)} className="p-3 text-xs font-mono text-brand-jade bg-brand-jade/5 border border-brand-jade/20 rounded-lg hover:bg-brand-jade/10 transition-colors">
                    &gt; Execute Default Extraction
                  </button>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="h-full flex flex-col items-center justify-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    <Cpu size={24} className="text-brand-jade animate-pulse" />
                  </div>
                  <div className="absolute inset-0 border-2 border-brand-jade border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="font-mono text-xs text-brand-jade tracking-widest uppercase">Compiling Statutory Logic...</div>
              </div>
            )}

            {executionNodes && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Input Node */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-1 border border-slate-200 dark:border-slate-700">
                    <Code2 size={14} className="text-slate-600 dark:text-slate-300" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Execution Query</div>
                    <div className="bg-slate-50 dark:bg-[#0a1017] p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 font-mono text-sm shadow-inner">
                      {executionNodes.query}
                    </div>
                  </div>
                </div>

                {/* Connection Line */}
                <div className="w-px h-8 bg-slate-100 dark:bg-slate-800 ml-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-jade/10 text-brand-jade text-[8px] font-mono px-2 py-0.5 rounded border border-brand-jade/20">
                    TRANSLATING
                  </div>
                </div>

                {/* Output Nodes */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-brand-jade/10 flex items-center justify-center shrink-0 mt-1 border border-brand-jade/20">
                    {executionNodes.status === 'success' ? <CheckCircle2 size={14} className="text-brand-jade" /> : <AlertCircle size={14} className="text-red-500" />}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">Compiled Logic Gates</div>
                    
                    {/* Visualizing Data as Nodes instead of raw text */}
                    {executionNodes.extractedGates.length > 0 ? (
                      <div className="grid gap-3">
                        {executionNodes.extractedGates.map((gate, i) => (
                          <div key={i} className="bg-white dark:bg-[#0a1017] border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm dark:shadow-lg hover:border-brand-jade/30 transition-colors group">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-mono text-xs text-brand-jade font-bold">{gate.field.toUpperCase()}</span>
                              <span className="text-[10px] font-mono px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded border border-slate-100 dark:border-slate-700">
                                Sufficiency: {gate.statutorySufficiency.toFixed(2)}
                              </span>
                            </div>
                            <div className="text-slate-800 dark:text-slate-200 font-mono text-sm mb-4 pl-3 border-l-2 border-brand-jade">
                              {gate.value}
                            </div>
                            <div className="flex items-start gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                              <Server size={12} className="text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                              <span className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">{gate.complianceNote}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-slate-50 dark:bg-[#0a1017] p-5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-mono text-xs whitespace-pre-wrap">
                        {executionNodes.rawOutput}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Command Bar */}
          <div className="p-4 bg-slate-50 dark:bg-[#0a1017] border-t border-slate-200 dark:border-slate-800 shrink-0">
            <div className="relative flex items-center">
              <span className="absolute left-4 text-brand-jade font-mono text-sm">&gt;</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleExecute(); }}
                placeholder="Initialize deterministic extraction..."
                className="w-full bg-white dark:bg-[#050a0f] border border-slate-200 dark:border-slate-700 rounded-lg py-3 pl-8 pr-12 text-slate-900 dark:text-slate-200 font-mono text-sm focus:outline-none focus:border-brand-jade focus:ring-1 focus:ring-brand-jade/50 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
              <button 
                onClick={() => handleExecute()} 
                disabled={!input.trim() || isProcessing}
                className="absolute right-2 p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-brand-jade hover:bg-brand-jade/10 transition-colors disabled:opacity-50"
              >
                <Play size={16} className="fill-current" />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}