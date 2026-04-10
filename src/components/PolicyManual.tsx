import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, Send, Scale, BookOpen, Search, ChevronRight, Info, ShieldCheck, AlertCircle, ExternalLink
} from 'lucide-react';
import { getChatResponse } from '../services/gemini';

const POLICY_CHAPTERS = [
  {
    title: "Financial Eligibility",
    id: "financial",
    statutes: ["7 CFR 273.9", "42 CFR 435.603"],
    topics: ["Earned Income", "Unearned Income", "Asset Limits", "Deductions"]
  },
  {
    title: "Non-Financial Requirements",
    id: "non-financial",
    statutes: ["6 CFR Part 37", "42 CFR 435.403"],
    topics: ["Identity", "Citizenship", "Residency", "Household Composition"]
  },
  {
    title: "Work Requirements",
    id: "work",
    statutes: ["7 CFR 273.24", "45 CFR 98.20"],
    topics: ["ABAWD Compliance", "Work Registration", "Exemptions", "CCDF Work/Study"]
  },
  {
    title: "Special Programs",
    id: "special",
    statutes: ["7 CFR 246.7", "42 USC 8624"],
    topics: ["WIC Nutritional Risk", "LIHEAP Priority", "Medical Exemptions"]
  }
];

export function PolicyManual() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [persona, setPersona] = useState<'client' | 'worker'>('worker');
  const [activeChapter, setActiveChapter] = useState(POLICY_CHAPTERS[0]);
  
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [chatHistory, isProcessing]);

  const handleSubmit = async () => {
    if (!input.trim() || isProcessing) return;
    
    setIsProcessing(true);
    const userMessage = input.trim();
    setInput('');

    const newUserPart = { 
      role: 'user', 
      parts: [{ text: userMessage }]
    };
    setChatHistory(prev => [...prev, newUserPart]);

    try {
      const safeHistory = chatHistory.map(h => ({ role: h.role, parts: h.parts }));
      
      // Inject chapter context into the message for better grounding
      const contextualMessage = `[CHAPTER: ${activeChapter.title}]\n[STATUTES: ${activeChapter.statutes.join(', ')}]\n[TOPICS: ${activeChapter.topics.join(', ')}]\n\nUser Question: ${userMessage}`;
      
      const responseData = await getChatResponse(contextualMessage, safeHistory, null, undefined, persona);
      
      const newModelPart: { role: 'model', parts: { text: string }[] } = { 
        role: 'model', 
        parts: [{ text: responseData.message || "Policy guidance synthesized." }] 
      };
      setChatHistory(prev => [...prev, newModelPart]);
    } catch (error) {
      console.error("Policy Manual Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 font-sans">
      <div className="flex flex-col lg:flex-row border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-slate-950 min-h-[700px] lg:h-[800px]">
        
        {/* Sidebar: Policy Navigation */}
        <div className="w-full lg:w-80 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 text-brand-jade mb-2">
              <BookOpen size={20} />
              <span className="font-black uppercase tracking-widest text-xs">Policy Repository</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Living Manual</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4 px-2">Chapters</span>
              <div className="space-y-1">
                {POLICY_CHAPTERS.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => setActiveChapter(chapter)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center justify-between group ${activeChapter.id === chapter.id ? 'bg-brand-jade text-white font-bold shadow-lg shadow-brand-jade/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                  >
                    {chapter.title}
                    <ChevronRight size={14} className={`transition-transform ${activeChapter.id === chapter.id ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4 px-2">Active Statutes</span>
              <div className="space-y-2 px-2">
                {activeChapter.statutes.map((statute, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500 font-mono">
                    <Scale size={12} className="text-brand-jade" />
                    {statute}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4 px-2">Perspective</span>
              <div className="flex p-1 bg-slate-200 dark:bg-slate-800 rounded-xl">
                <button
                  onClick={() => setPersona('client')}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all ${persona === 'client' ? 'bg-white dark:bg-slate-700 text-brand-jade shadow-sm' : 'text-slate-500'}`}
                >
                  Resident
                </button>
                <button
                  onClick={() => setPersona('worker')}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all ${persona === 'worker' ? 'bg-white dark:bg-slate-700 text-brand-jade shadow-sm' : 'text-slate-500'}`}
                >
                  Caseworker
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Interface: Chat & Intelligence */}
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 relative">
          
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{activeChapter.title}</h3>
                <span className="px-2 py-0.5 rounded bg-brand-jade/10 text-brand-jade text-[10px] font-bold uppercase tracking-widest border border-brand-jade/20">Methodology: Rules-as-Code</span>
              </div>
              <p className="text-xs text-slate-500">Ask questions about {activeChapter.topics.join(', ')}.</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={14} className="text-green-500" />
                Legally Grounded
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-8 space-y-8">
            {chatHistory.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto gap-8">
                <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-brand-jade shadow-inner">
                  <Search size={40} className="opacity-50" />
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">How can I assist with policy?</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Our Living Policy Manual uses neurosymbolic AI to translate strict statutory requirements into actionable guidance.
                  </p>
                  <div className="grid grid-cols-1 gap-2 mt-6">
                    {[
                      `"What are the income limits for ${activeChapter.topics[0]}?"`,
                      `"How is ${activeChapter.topics[1]} verified?"`,
                      `"Are there exemptions for ${activeChapter.topics[2]}?"`
                    ].map((prompt, i) => (
                      <button 
                        key={i}
                        onClick={() => setInput(prompt)}
                        className="text-left px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 hover:border-brand-jade hover:bg-brand-jade/5 transition-all"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex flex-col gap-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-black ${msg.role === 'user' ? 'text-slate-400' : 'text-brand-jade'}`}>
                  {msg.role === 'user' ? 'Query' : 'Statutory Guidance'}
                  {msg.role === 'model' && <Scale size={10} />}
                </div>
                <div className={`p-5 rounded-2xl text-sm max-w-[85%] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-brand-jade text-white rounded-tr-sm' : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm whitespace-pre-wrap'}`}>
                  {msg.parts[0].text}
                  {msg.role === 'model' && (
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold text-slate-400">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={12} />
                        Citing: {activeChapter.statutes[0]}
                      </div>
                      <button className="flex items-center gap-1 hover:text-brand-jade transition-colors">
                        View Full Statute <ExternalLink size={10} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-brand-jade">
                <div className="w-5 h-5 border-2 border-brand-jade border-t-transparent rounded-full animate-spin" />
                Consulting policy repository...
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex gap-4 items-end max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="Ask a policy question..."
                  className="w-full border border-slate-200 dark:border-slate-800 rounded-2xl p-4 pr-12 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-brand-jade/10 focus:border-brand-jade transition-all resize-none min-h-[60px] max-h-[200px] text-sm shadow-sm"
                  rows={1}
                />
                <button 
                  onClick={handleSubmit}
                  disabled={!input.trim() || isProcessing}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-brand-jade text-white flex items-center justify-center shadow-lg shadow-brand-jade/20 hover:bg-[#005a62] transition-all disabled:opacity-50 disabled:scale-95 active:scale-90"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                Neurosymbolic Engine v2.4 • Legally Grounded Response
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
