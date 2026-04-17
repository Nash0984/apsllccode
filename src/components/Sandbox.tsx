import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, X, FileText, Activity, ShieldAlert, CheckCircle, RefreshCw, ChevronDown, Check, User, Scale
} from 'lucide-react';
import { evaluateDocument, FileData } from '../services/gemini';
import { useToast } from '../context/ToastContext';
import { UNIFIED_VERIFICATION_ONTOLOGY, ExtractedField } from '../config/ontology';
import { trackInteraction } from '../services/analytics';

export function Sandbox() {
  const { showToast } = useToast();
  const [persona, setPersona] = useState<'client' | 'worker'>('worker');
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeProtocolIndex, setActiveProtocolIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [appState, setAppState] = useState<'idle' | 'processing' | 'results'>('idle');
  const [extractedVariables, setExtractedVariables] = useState<ExtractedField[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeDomain = UNIFIED_VERIFICATION_ONTOLOGY[activeCategoryIndex];
  const activeProtocol = activeDomain.protocols[activeProtocolIndex];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        showToast("File size must be less than 5MB", "error");
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setFileData({ mimeType: selectedFile.type, data: base64String });
        setAppState('idle');
        setExtractedVariables([]);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setFileData(null);
    setAppState('idle');
    setExtractedVariables([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!fileData) return;
    
    trackInteraction('Sandbox', 'Evaluate Compliance Clicked', { 
      protocol: activeProtocol.id,
      persona: persona 
    });
    setAppState('processing');
    
    try {
      const response = await evaluateDocument(fileData, activeProtocol.id, persona);
      
      if (response.extractedData && Array.isArray(response.extractedData)) {
        setExtractedVariables(response.extractedData);
        setAppState('results');
      } else {
        throw new Error("Invalid schema returned from extraction engine.");
      }
    } catch (error) {
      console.error(error);
      setAppState('idle');
      showToast("Verification engine failed to process the document.", "error");
    }
  };

  return (
    <div className="w-full flex flex-col bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden font-sans min-h-[600px]">
      
      {/* Top Control Bar */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-20">
        
        {/* Persona Toggle */}
        <div className="flex items-center bg-slate-200 dark:bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setPersona('client')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${persona === 'client' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <User size={14} /> Resident
          </button>
          <button
            onClick={() => setPersona('worker')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${persona === 'worker' ? 'bg-white dark:bg-slate-700 text-brand-jade shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <Scale size={14} /> Caseworker
          </button>
        </div>

        {/* Ontology Dropdown */}
        <div className="relative w-full sm:w-auto" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full sm:w-64 flex items-center justify-between bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 shadow-sm hover:border-brand-jade focus:outline-none focus:ring-2 focus:ring-brand-jade/20 transition-all"
          >
            <span className="truncate pr-2">
              {persona === 'worker' ? activeProtocol.workerLabel : activeProtocol.clientLabel}
            </span>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-full sm:w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-50"
              >
                <div className="max-h-80 overflow-y-auto py-2 no-scrollbar">
                  {UNIFIED_VERIFICATION_ONTOLOGY.map((domain, cIdx) => (
                    <div key={cIdx} className="mb-2 last:mb-0">
                      <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-slate-800/50">
                        {persona === 'worker' ? domain.workerCategory : domain.clientCategory}
                      </div>
                      {domain.protocols.map((protocol, pIdx) => {
                        const isActive = activeCategoryIndex === cIdx && activeProtocolIndex === pIdx;
                        return (
                          <button
                            key={protocol.id}
                            onClick={() => {
                              setActiveCategoryIndex(cIdx);
                              setActiveProtocolIndex(pIdx);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between transition-colors ${isActive ? 'bg-brand-jade/10 text-brand-jade font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'}`}
                          >
                            <span className="truncate pr-4">{persona === 'worker' ? protocol.workerLabel : protocol.clientLabel}</span>
                            {isActive && <Check size={14} className="text-brand-jade shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 sm:p-8 flex flex-col items-center justify-center relative bg-slate-50/50 dark:bg-[#050a0f]">
        
        {/* State: Idle / File Upload */}
        {appState === 'idle' && (
          <div className="w-full max-w-md flex flex-col items-center">
            {!file ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-brand-jade hover:bg-brand-jade/5 transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload size={24} className="text-slate-400 group-hover:text-brand-jade" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Upload Document</h3>
                <p className="text-xs text-slate-500 text-center">Drag and drop or click to browse.<br/>Accepts PDF, JPG, PNG.</p>
              </div>
            ) : (
              <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm relative">
                <button onClick={clearFile} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                  <X size={16} />
                </button>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-brand-jade/10 text-brand-jade flex items-center justify-center shrink-0">
                    <FileText size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  onClick={handleSubmit}
                  className="w-full py-3 bg-brand-jade hover:bg-[#005a62] text-white rounded-xl text-sm font-bold shadow-md shadow-brand-jade/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Activity size={16} /> Evaluate Compliance
                </button>
              </div>
            )}
            
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl w-full">
              <p className="text-xs text-blue-800 dark:text-blue-300 flex gap-2">
                <ShieldAlert size={16} className="shrink-0" />
                <span><strong className="font-bold">Active Authority:</strong> {activeProtocol.statutoryDetail}</span>
              </p>
            </div>
          </div>
        )}

        {/* State: Processing */}
        {appState === 'processing' && (
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-slate-200 dark:border-slate-800 rounded-full" />
              <div className="w-20 h-20 border-4 border-brand-jade border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-jade">
                <Activity size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Evaluating Statutory Sufficiency</h3>
              <p className="text-xs text-slate-500 font-mono">Applying {activeProtocol.id} constraints...</p>
            </div>
          </div>
        )}

        {/* State: Results */}
        {appState === 'results' && (
          <div className="w-full max-w-2xl flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle size={20} className="text-brand-jade" /> Evaluation Complete
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-1">Rule Node: {activeProtocol.id}</p>
              </div>
              <button 
                onClick={clearFile}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
              >
                <RefreshCw size={14} /> New Document
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto pr-2 no-scrollbar">
              {extractedVariables.map((variable, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Extracted Data Point</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{variable.field}</span>
                    </div>
                    <div className="sm:text-right bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Value</span>
                      <span className="text-sm font-mono text-brand-jade font-bold">{variable.value}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded text-[10px] font-black tracking-widest uppercase flex items-center gap-1 ${variable.statutorySufficiency >= 1.0 ? 'bg-brand-jade/10 text-brand-jade border border-brand-jade/20' : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'}`}>
                        Score: {variable.statutorySufficiency.toFixed(1)} 
                        {variable.statutorySufficiency >= 1.0 ? ' (Primary)' : ' (Secondary)'}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                      {variable.complianceNote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" 
      />
    </div>
  );
}