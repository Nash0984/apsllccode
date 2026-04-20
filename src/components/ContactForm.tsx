import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Send, Bot, User, Loader2, ChevronRight } from 'lucide-react';
import { trackInteraction } from '../services/analytics';
import { TypingIndicator, ChatBubble } from './ui/ChatElements';

export function ContactForm() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { 
      role: 'model', 
      content: "Hello! I am the Applied Policy Systems Client Intake Assistant. To help me route your inquiry accurately, please select a topic below or type your specific request." 
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Pre-defined intake routes acting as guided form inputs
  const intakeRoutes = [
    "Schedule an Architectural Consultation",
    "Request IV&V Services",
    "Explore Modernization Integration",
    "General Inquiry"
  ];

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isProcessing, hasInteracted]);

  const processSubmit = async (textToSubmit: string) => {
    if (!textToSubmit.trim() || isProcessing) return;
    
    setHasInteracted(true);
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: textToSubmit }]);
    setIsProcessing(true);
    
    trackInteraction('ContactIntake', 'Message Sent');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: textToSubmit,
          history: messages.map(m => ({
            role: m.role,
            parts: [{ text: m.content }]
          }))
        })
      });

      if (!response.ok) throw new Error("Backend connection failed");
      
      const data = await response.json();
      const aiResponse = data.reply || data.text || data.message || data.response || "Inquiry logged. The transcript has been routed to the team.";
      
      setMessages(prev => [...prev, { role: 'model', content: aiResponse }]);
      
    } catch (error) {
      console.error("[APS-INTAKE-ERROR]", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "I apologize, but the secure backend is currently unreachable. Please utilize the direct email channel to reach the team." 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = () => {
    processSubmit(input);
  };

  return (
    <div className="flex flex-col h-[550px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-sans">
      
      {/* Widget-Aligned Header */}
      <div className="bg-brand-jade text-white p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Bot size={22} className="text-white" />
          <div>
            <h3 className="text-sm font-bold tracking-wide">APS Intake Assistant</h3>
            <p className="text-[11px] text-white/80 font-medium tracking-wider">Client Services</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-[10px] font-bold tracking-wider text-white uppercase">Online</span>
        </div>
      </div>

      {/* Chat History & Guided Inputs */}
      <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50 dark:bg-slate-900/50">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, idx) => (
            <div key={idx} className="space-y-3">
              <ChatBubble
                role={msg.role === 'model' ? 'assistant' : 'user'}
                content={msg.content}
                avatar={msg.role === 'user' ? <User size={14} /> : <Bot size={16} />}
              />

              {/* Render Guided Routing Pills ONLY after the first bot message, if user hasn't interacted */}
              {idx === 0 && !hasInteracted && !isProcessing && (
                <div className="flex flex-col gap-2 pl-11 pr-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300 fill-mode-both">
                  {intakeRoutes.map((route, i) => (
                    <button
                      key={i}
                      onClick={() => processSubmit(route)}
                      className="flex items-center justify-between w-fit max-w-full text-left px-4 py-2.5 rounded-xl border border-brand-jade/30 bg-brand-jade/5 hover:bg-brand-jade/10 text-brand-jade dark:text-teal-400 text-xs sm:text-sm font-medium transition-all group"
                    >
                      <span className="truncate pr-4">{route}</span>
                      <ChevronRight size={14} className="shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </AnimatePresence>

        {isProcessing && (
          <div className="flex items-end gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 shadow-sm">
              <Bot size={16} className="text-brand-jade" />
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-5 py-4 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-3">
              <TypingIndicator size={16} />
              <span className="text-xs text-slate-500 font-medium ml-2">Processing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Widget-Aligned Input Field */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
            placeholder={!hasInteracted ? "Or type your inquiry here..." : "Type a message..."}
            disabled={isProcessing}
            className="w-full bg-slate-100 dark:bg-slate-900 border border-transparent rounded-full py-3.5 pl-5 pr-14 text-slate-900 dark:text-slate-200 text-sm focus:outline-none focus:border-brand-jade/30 focus:ring-1 focus:ring-brand-jade/30 transition-all placeholder:text-slate-400 disabled:opacity-50"
          />
          <button 
            onClick={handleSubmit} 
            disabled={!input.trim() || isProcessing}
            className="absolute right-1.5 w-9 h-9 rounded-full bg-brand-jade text-white flex items-center justify-center hover:bg-[#005a62] disabled:opacity-50 transition-all shadow-sm"
          >
            <Send size={15} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}