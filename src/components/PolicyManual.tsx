import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Send, Scale, Search, ShieldCheck, AlertCircle } from 'lucide-react';
import { getChatResponse } from '../services/gemini';

const POLICY_CHAPTERS = [
  { title: "Financial Eligibility", id: "financial", statutes: ["7 CFR 273.9"], topics: ["Earned Income", "Asset Limits"] },
  { title: "Non-Financial", id: "non-financial", statutes: ["42 CFR 435.403"], topics: ["Identity", "Residency"] },
  { title: "Work Requirements", id: "work", statutes: ["7 CFR 273.24"], topics: ["ABAWD Compliance", "Exemptions"] }
];

export function PolicyManual() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeChapter, setActiveChapter] = useState(POLICY_CHAPTERS[0]);
  
  const persona = 'worker';
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) chatScrollRef.current.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [chatHistory, isProcessing]);

  const handleSubmit = async () => {
    if (!input.trim() || isProcessing) return;
    setIsProcessing(true);
    const userMessage = input.trim();
    setInput('');

    setChatHistory(prev => [...prev, { role: 'user', parts: [{ text: userMessage }] }]);

    try {
      const safeHistory = chatHistory.map(h => ({ role: h.role, parts: h.parts }));
      const contextualMessage = `[CHAPTER: ${activeChapter.title}]\n[STATUTES: ${activeChapter.statutes.join(', ')}]\n[TOPICS: ${activeChapter.topics.join(', ')}]\n\nUser Question: ${userMessage}`;
      const responseData = await getChatResponse(contextualMessage, safeHistory, null, undefined, persona);
      
      setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: responseData.message || "Policy guidance synthesized." }] }]);
    } catch (error) {
      console.error("Policy Manual Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl h-[600px] overflow-hidden">
      
      {/* Header & Horizontal Tabs (Replaces Sidebar) */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/50">
          <div className="flex items-center gap-2 text-brand-jade">
            <BookOpen size={18} />
            <span className="font-black uppercase tracking-widest text-xs">Living Manual</span>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center gap-1 font-mono uppercase">
            <Scale size={12} /> {activeChapter.statutes.join(', ')}
          </div>
        </div>
        
        <div className="flex overflow-x-auto no-scrollbar p-2 gap-2">
          {POLICY_CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => setActiveChapter(chapter)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeChapter.id === chapter.id ? 'bg-brand-jade text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              {chapter.title}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {chatHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-sm mx-auto gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-brand-jade border border-slate-200 dark:border-slate-800">
              <Search size={20} />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Ask {activeChapter.title} Questions</h4>
            <div className="grid grid-cols-1 gap-2 w-full mt-2">
              <button onClick={() => setInput(`What are the parameters for ${activeChapter.topics[0]}?`)} className="text-left px-3 py-2 rounded border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 hover:border-brand-jade">
                "What are the parameters for {activeChapter.topics[0]}?"
              </button>
            </div>
          </div>
        )}

        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex flex-col gap-1.5 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`text-[9px] uppercase tracking-widest font-black flex items-center gap-1 ${msg.role === 'user' ? 'text-slate-400' : 'text-brand-jade'}`}>
              {msg.role === 'user' ? 'Caseworker' : 'Policy Engine'}
              {msg.role === 'model' && <ShieldCheck size={10} />}
            </div>
            <div className={`p-4 rounded-xl text-xs sm:text-sm max-w-[90%] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-brand-jade text-white rounded-tr-sm' : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'}`}>
              {msg.parts[0].text}
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-brand-jade">
            <div className="w-4 h-4 border-2 border-brand-jade border-t-transparent rounded-full animate-spin" />
            Analyzing statute...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
            placeholder="Ask a policy question..."
            className="w-full border border-slate-200 dark:border-slate-800 rounded-xl p-3 pr-12 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-brand-jade/20 focus:border-brand-jade outline-none resize-none text-sm"
            rows={1}
          />
          <button 
            onClick={handleSubmit} disabled={!input.trim() || isProcessing}
            className="absolute bottom-2 right-2 w-8 h-8 rounded-lg bg-brand-jade text-white flex items-center justify-center hover:bg-[#005a62] disabled:opacity-50"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}