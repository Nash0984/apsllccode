import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Send, Search, ShieldCheck, Database, FileSearch, Lock, Cpu, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { routePolicyQuery } from '../services/gemini';
import { STATE_RULES_ONTOLOGY } from '../config/ontology';
import { useToast } from '../context/ToastContext';

export function PolicyManual() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'system', content: any }[]>([]);
  const [processingPhase, setProcessingPhase] = useState('');
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [caseInput, setCaseInput] = useState('');
  
  const isCaseValid = caseInput.trim().length > 4;
  
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [chatHistory, processingPhase]);

  const handleCaseLock = () => {
    if (caseInput.trim().length > 4) {
      setActiveCaseId(caseInput.trim().toUpperCase());
    }
  };

  const handleSubmit = async () => {
    if (!input.trim() || processingPhase || !activeCaseId) return;
    
    const userMessage = input.trim();
    setInput('');
    
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setProcessingPhase(t('simulators.policyManual.processing.analyzing'));

    setTimeout(() => setProcessingPhase(t('simulators.policyManual.processing.querying')), 600);
    setTimeout(() => setProcessingPhase(t('simulators.policyManual.processing.verifying')), 1200);

    const result = await routePolicyQuery(userMessage);
    
    setProcessingPhase('');
    setChatHistory(prev => [...prev, { role: 'system', content: result }]);
  };

  const renderSystemResponse = (content: any) => {
    if (!content || content.message === "UNKNOWN") {
      return (
        <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-500/10 p-4 rounded-xl border border-amber-200 dark:border-amber-500/20">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
            {t('simulators.policyManual.chat.unknownResponse')}
          </p>
        </div>
      );
    }

    const node = STATE_RULES_ONTOLOGY[content.message as keyof typeof STATE_RULES_ONTOLOGY];
    
    if (!node) {
      return (
        <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <Database size={18} className="text-slate-500 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {content.message}
          </p>
        </div>
      );
    }

    return (
      <div className="bg-white dark:bg-slate-900 border border-brand-jade/30 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-brand-jade/10 border-b border-brand-jade/20 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-jade font-mono text-xs font-bold tracking-widest uppercase">
            <ShieldCheck size={14} />
            {t('simulators.policyManual.chat.authoritativeRetrieval')}
          </div>
          <span className="text-[10px] font-mono text-slate-500 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
            {node.ruleId}
          </span>
        </div>
        <div className="p-4 sm:p-5 space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              {t('simulators.policyManual.chat.statutoryAuthority')}
            </h4>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {node.statute}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              {t('simulators.policyManual.chat.policyParameters')}
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {node.explanation}
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-4 border border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-jade mb-3 flex items-center gap-2">
              <Cpu size={14} />
              {t('simulators.policyManual.chat.systemLogic')}
            </h4>
            <ul className="space-y-2">
              {node.procedure.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 size={14} className="text-brand-jade shrink-0 mt-0.5 opacity-50" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[600px] font-sans">
      
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white dark:bg-slate-950 shrink-0 rounded-t-[2.5rem]">
        <div className="w-10 h-10 rounded-xl bg-brand-jade/10 flex items-center justify-center text-brand-jade shrink-0">
          <BookOpen size={20} />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">
            {t('simulators.policyManual.header.title')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('simulators.policyManual.header.subtitle')}
          </p>
        </div>
      </div>

      {/* Case Binding Overlay or Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50/50 dark:bg-[#0a1017] relative" ref={chatScrollRef}>
        
        {!activeCaseId ? (
          <div className="absolute inset-0 z-10 bg-slate-50/90 dark:bg-[#0a1017]/90 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 max-w-sm w-full">
              <div className="w-12 h-12 rounded-full bg-brand-navy/10 dark:bg-brand-navy/30 text-brand-navy dark:text-brand-jade flex items-center justify-center mb-4 mx-auto">
                <Lock size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 text-center">
                {t('simulators.policyManual.bindCase.title')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 text-center leading-relaxed">
                {t('simulators.policyManual.bindCase.description')}
              </p>
              <div className="space-y-3">
                <input 
                  type="text" 
                  value={caseInput}
                  onChange={(e) => setCaseInput(e.target.value)}
                  placeholder={t('simulators.policyManual.bindCase.placeholder')}
                  className="w-full text-center font-mono uppercase bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-jade focus:ring-1 focus:ring-brand-jade"
                />
                <button 
                  onClick={handleCaseLock}
                  disabled={!isCaseValid}
                  className="w-full bg-brand-navy dark:bg-brand-jade text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {t('simulators.policyManual.bindCase.button')}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-8">
            <div className="bg-brand-jade/10 border border-brand-jade/20 rounded-full px-4 py-1.5 flex items-center gap-2">
              <Lock size={12} className="text-brand-jade" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand-jade uppercase">
                {t('simulators.policyManual.chat.activeCase')}: {activeCaseId}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-6 pb-4">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${msg.role === 'user' ? 'text-slate-400 mr-2' : 'text-brand-jade ml-2'}`}>
                {msg.role === 'user' ? t('simulators.policyManual.chat.userRole') : t('simulators.policyManual.chat.systemRole')}
              </div>
              {msg.role === 'user' ? (
                <div className="bg-brand-navy text-white text-sm px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
                  {msg.content}
                </div>
              ) : (
                <div className="w-full sm:max-w-[90%]">
                  {renderSystemResponse(msg.content)}
                </div>
              )}
            </div>
          ))}
        </div>

        {processingPhase && (
          <div className="flex items-center gap-2 text-brand-jade font-mono text-xs uppercase tracking-widest mt-4 ml-2 opacity-80 mb-20">
            <Cpu size={14} className="animate-pulse" />
            {processingPhase}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
            placeholder={activeCaseId ? t('simulators.policyManual.chat.inputPlaceholderActive') : t('simulators.policyManual.chat.inputPlaceholderIdle')}
            disabled={!activeCaseId || processingPhase !== ''}
            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-4 pr-12 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-brand-jade/20 focus:border-brand-jade outline-none resize-none text-sm shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
          />
          <button 
            onClick={handleSubmit} 
            disabled={!input.trim() || processingPhase !== '' || !activeCaseId}
            className="absolute bottom-3 right-3 w-9 h-9 rounded-lg bg-brand-jade text-white flex items-center justify-center disabled:opacity-50 disabled:bg-slate-300 dark:disabled:bg-slate-700 transition-colors"
          >
            <Send size={16} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
