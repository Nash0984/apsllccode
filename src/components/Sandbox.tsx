import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, X, FileText, Send, Activity, ShieldAlert, CheckCircle 
} from 'lucide-react';
import { getChatResponse, FileData } from '../services/gemini';

const UNIFIED_VERIFICATION_ONTOLOGY = [
  {
    workerCategory: "1.0 Demographics & Identity",
    clientCategory: "Personal Information",
    protocols: [
      { id: 'id-citizenship', workerLabel: '1.1 Identity & Citizenship (SAVE/REAL ID)', clientLabel: 'ID or Citizenship Documents' },
      { id: 'residency', workerLabel: '1.2 Residency Verification (42 CFR 435.403)', clientLabel: 'Proof of Address' }
    ]
  },
  {
    workerCategory: "2.0 Financial Means Testing",
    clientCategory: "Income & Assets",
    protocols: [
      { id: 'earned-income', workerLabel: '2.1 Earned Income (SNAP/TANF)', clientLabel: 'Pay Stubs / Proof of Income' },
      { id: 'unearned-income', workerLabel: '2.2 Unearned Income (UI/SSI)', clientLabel: 'Unemployment or SSI Letters' },
      { id: 'asset-verification', workerLabel: '2.3 Resource & Asset Test', clientLabel: 'Bank Statements' }
    ]
  },
  {
    workerCategory: "3.0 Statutory Compliance",
    clientCategory: "Work & Medical Info",
    protocols: [
      { id: 'abawd-work', workerLabel: '3.1 Work Compliance Logs (7 CFR 273.24)', clientLabel: 'Work Hours Log' },
      { id: 'medical-exemption', workerLabel: '3.2 Medical Exemption', clientLabel: 'Medical Exemption Form' }
    ]
  },
  {
    workerCategory: "4.0 Deductions & Expenses",
    clientCategory: "Household Expenses",
    protocols: [
      { id: 'shelter-utility', workerLabel: '4.1 Shelter/Utility Costs (LIHEAP)', clientLabel: 'Utility Bills or Rent Receipts' },
      { id: 'dependent-care', workerLabel: '4.2 Dependent Care (CCDF)', clientLabel: 'Child Care Expenses' }
    ]
  },
  {
    workerCategory: "5.0 Tax Integration",
    clientCategory: "Tax Documents",
    protocols: [
      { id: 'vita-intake', workerLabel: '5.1 VITA Tax Intake (13614-C)', clientLabel: 'Tax Intake Form' }
    ]
  }
];

type Persona = 'client' | 'worker';

export function Sandbox() {
  const [input, setInput] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [persona, setPersona] = useState<Persona>('client');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;
      
      if (isNearBottom || history.length === 0) {
        scrollRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isProcessing]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      setFileData({ mimeType: selectedFile.type, data: base64String });
    };
    reader.readAsDataURL(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setFileData(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleContextChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDropdownValue(e.target.value);
  };

  const togglePersona = (newPersona: Persona) => {
    setPersona(newPersona);
    setHistory([]);
    setInput('');
    removeFile();
  };

  const handleSubmit = async () => {
    if (!input.trim() && !fileData) return;
    
    setIsProcessing(true);

    const selectedProtocol = UNIFIED_VERIFICATION_ONTOLOGY
      .flatMap(d => d.protocols)
      .find(p => p.id === dropdownValue);

    let uiDisplayMessage = input.trim();
    const typeLabel = selectedProtocol 
      ? (persona === 'client' ? selectedProtocol.clientLabel : selectedProtocol.workerLabel) 
      : 'General Evaluation';

    if (!uiDisplayMessage && fileData) {
      const contextPrefix = persona === 'client' ? 'Document Category:' : 'Verification Rule:';
      uiDisplayMessage = `[System Event] Document uploaded for processing.\n${contextPrefix} ${typeLabel}\nPayload: ${file?.name}`;
    }

    try {
      const safeHistory = history.map(h => ({ role: h.role, parts: h.parts }));
      
      const response = await getChatResponse(input.trim(), safeHistory, fileData, dropdownValue, persona);
      
      const newUserPart = { 
        role: 'user', 
        displayText: uiDisplayMessage,
        parts: [{ text: input.trim() || `Execute evaluation against: ${typeLabel}` }]
      };
      
      const newModelPart = { 
        role: 'model', 
        displayText: response,
        parts: [{ text: response }] 
      };
      
      setHistory(prev => [...prev, newUserPart, newModelPart]);
    } catch (error) {
      setHistory(prev => [...prev, { 
        role: 'model', 
        displayText: "System alert: Processing failure. Verify API connection.",
        parts: [{ text: "System alert: Processing failure." }] 
      }]);
    } finally {
      setIsProcessing(false);
      setInput('');
      removeFile();
    }
  };

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    return (
      <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
        {text.split('\n').map((line, i) => {
          if (line.includes('PROCEED TO RULES ENGINE')) {
            return <div key={i} className="mt-4 p-3 bg-[#002a2e] border border-brand-jade rounded text-brand-jade font-bold flex items-center gap-2"><CheckCircle size={18} />{line}</div>;
          }
          if (line.includes('REQUIRES HITL REVIEW')) {
            return <div key={i} className="mt-4 p-3 bg-red-950 border border-red-500 rounded text-red-500 font-bold flex items-center gap-2"><ShieldAlert size={18} />{line}</div>;
          }
          if (line.includes('Status: Document received. Pending caseworker review.')) {
            return <div key={i} className="mt-4 p-3 bg-blue-900/30 border border-blue-500 rounded text-blue-400 font-bold flex items-center gap-2"><CheckCircle size={18} />{line}</div>;
          }
          if (line.includes('System Note:')) {
            return <div key={i} className="text-slate-500 italic mt-4 border-l-2 border-slate-700 pl-3 py-1 bg-slate-900/50">{line}</div>;
          }
          if (line.includes('[System Event]')) {
            return <div key={i} className={`${persona === 'client' ? 'text-blue-400' : 'text-brand-jade'} font-bold mb-1`}>{line}</div>;
          }
          if (line.match(/Confidence:\s*0\.[0-8][0-4]/)) return <div key={i} className="text-red-400 pl-4">{line}</div>;
          if (line.match(/Confidence:\s*0\.(8[5-9]|9[0-9])/)) return <div key={i} className="text-brand-jade pl-4">{line}</div>;
          if (line.match(/^\d\./)) return <div key={i} className="text-white font-bold mt-4 border-b border-slate-800 pb-1">{line}</div>;
          return <div key={i} className="text-slate-300">{line}</div>;
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono text-sm shadow-2xl flex flex-col h-[600px]">
      
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between flex-shrink-0 gap-4">
        <div className="flex items-center gap-2 text-brand-jade">
          <Activity size={18} />
          <span className="font-bold tracking-widest uppercase text-xs">Benefits Verification Engine</span>
        </div>
        
        <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
          <button
            onClick={() => togglePersona('client')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${persona === 'client' ? 'bg-blue-900/50 text-blue-400 border border-blue-800' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <FileText size={14} /> Client
          </button>
          <button
            onClick={() => togglePersona('worker')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${persona === 'worker' ? 'bg-[#002a2e] text-brand-jade border border-brand-jade' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Activity size={14} /> Eligibility Worker
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto bg-slate-950 text-slate-300 space-y-8 scroll-smooth">
        {history.length === 0 && !isProcessing && (
          <div className="flex flex-col items-center justify-center h-full text-slate-700 gap-6 border-2 border-dashed border-slate-800 rounded-lg p-10">
            {persona === 'client' ? (
              <>
                <FileText size={40} className="text-slate-800" />
                <div className="text-sm font-bold uppercase tracking-wider text-slate-400">Submit Your Documents</div>
                <div className="text-xs text-center max-w-md text-slate-500">
                  Choose the document type from the menu, upload your file, and submit it for review.
                </div>
              </>
            ) : (
              <>
                <Activity size={40} className="text-slate-800" />
                <div className="text-sm font-bold uppercase tracking-wider text-slate-400">Eligibility Worker Terminal</div>
                <div className="flex flex-col gap-4 w-full max-w-md text-xs">
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex flex-col gap-1">
                    <span className="text-brand-jade font-bold">1. Policy Guidance</span>
                    <span className="text-slate-400">Select a verification type and ask a question to retrieve statutory rules and CFR citations.</span>
                  </div>
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex flex-col gap-1">
                    <span className="text-brand-jade font-bold">2. Document Extraction</span>
                    <span className="text-slate-400">Select a verification type and upload a document to extract data and evaluate routing thresholds.</span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        
        {history.map((msg, idx) => (
          <div key={idx} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-1 h-4 rounded-full ${msg.role === 'user' ? 'bg-slate-700' : (persona === 'client' ? 'bg-blue-500' : 'bg-brand-jade')}`} />
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${msg.role === 'user' ? 'text-slate-500' : (persona === 'client' ? 'System Receipt' : 'Diagnostic Log')}`}>
                {msg.role === 'user' ? 'User Input' : (persona === 'client' ? 'System Receipt' : 'Diagnostic Log')}
              </span>
            </div>
            <div className={msg.role === 'user' ? 'text-slate-300 pl-3 italic text-xs bg-slate-900/50 p-3 rounded border border-slate-800' : 'pl-3'}>
              {renderFormattedText(msg.displayText)}
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex flex-col gap-3 pl-3">
            <div className="flex items-center gap-2">
              <div className={`w-1 h-4 rounded-full animate-pulse ${persona === 'client' ? 'bg-blue-500' : 'bg-brand-jade'}`} />
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse ${persona === 'client' ? 'text-blue-400' : 'text-brand-jade'}`}>
                Processing...
              </span>
            </div>
          </div>
        )}
        <div className="h-px w-full" />
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800 flex-shrink-0">
        {file && (
          <div className="flex items-center gap-3 mb-3 p-2 bg-slate-800 rounded-md inline-flex border border-slate-700">
            <FileText size={16} className={persona === 'client' ? 'text-blue-400' : 'text-brand-jade'} />
            <span className="text-xs text-slate-300 truncate max-w-[200px]">{file.name}</span>
            <button onClick={removeFile} className="text-slate-400 hover:text-white"><X size={16} /></button>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <select
            value={dropdownValue}
            onChange={handleContextChange}
            disabled={isProcessing}
            className={`w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-300 focus:outline-none text-xs font-mono appearance-none ${persona === 'client' ? 'focus:border-blue-500' : 'focus:border-brand-jade'}`}
          >
            <option value="">-- {persona === 'client' ? 'Select Document Type' : 'Target Verification Type (Optional)'} --</option>
            {UNIFIED_VERIFICATION_ONTOLOGY.map((domain) => (
              <optgroup 
                key={persona === 'client' ? domain.clientCategory : domain.workerCategory} 
                label={persona === 'client' ? domain.clientCategory : domain.workerCategory} 
                className="text-slate-500 bg-slate-950"
              >
                {domain.protocols.map((protocol) => (
                  <option key={protocol.id} value={protocol.id} className="text-slate-300">
                    ▸ {persona === 'client' ? protocol.clientLabel : protocol.workerLabel}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <div className="flex items-end gap-2 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                persona === 'client' 
                  ? 'Add an optional note for your caseworker...' 
                  : (file ? 'Add optional context for the extraction...' : 'Ask a policy question, or upload a document to extract data...')
              }
              className={`flex-1 bg-slate-950 border border-slate-800 rounded-md p-3 text-slate-300 focus:outline-none resize-none min-h-[60px] text-xs ${persona === 'client' ? 'focus:border-blue-500' : 'focus:border-brand-jade'}`}
              rows={2}
            />
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,application/pdf" />
            <button onClick={() => fileInputRef.current?.click()} disabled={isProcessing} className="p-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md border border-slate-700 transition-colors disabled:opacity-50" title="Upload Document">
              <Upload size={18} />
            </button>
            <button onClick={handleSubmit} disabled={isProcessing || (!input.trim() && !fileData)} className={`p-3.5 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${persona === 'client' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-brand-jade hover:bg-[#005a62]'}`}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}