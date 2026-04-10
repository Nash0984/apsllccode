import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, X, FileText, Send, Activity, ShieldAlert, CheckCircle, RefreshCw, MessageSquare, ChevronDown, Check, User
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
type AppState = 'idle' | 'processing' | 'results';

interface ExtractedField {
  field: string;
  value: string;
  confidence: number;
}

interface EngineResponse {
  status: string;
  message: string;
  extractedData: ExtractedField[];
}

export function Sandbox() {
  const [input, setInput] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileData, setFileData] = useState<FileData | null>(null);
  
  const [appState, setAppState] = useState<AppState>('idle');
  const [loadingPhase, setLoadingPhase] = useState('');
  
  // Master state controls
  const [persona, setPersona] = useState<Persona>('client');
  const [activeMode, setActiveMode] = useState<'upload' | 'chat'>('upload');
  
  const [engineResponse, setEngineResponse] = useState<EngineResponse | null>(null);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [chatHistory, appState]);

  // Handle click outside custom dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Loading phase cycler
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (appState === 'processing') {
      const phases = activeMode === 'upload' 
        ? (persona === 'worker' 
            ? ['Ingesting payload...', 'Executing deterministic extraction...', 'Evaluating statutory thresholds...', 'Rendering payload data...']
            : ['Encrypting transmission...', 'Verifying document format...', 'Submitting to state agency...'])
        : ['Querying policy repository...', 'Synthesizing statutory guidance...', 'Formatting response...'];
      
      let step = 0;
      setLoadingPhase(phases[0]);
      
      interval = setInterval(() => {
        step = (step + 1) % phases.length;
        setLoadingPhase(phases[step]);
      }, 1200);
    } else {
      setLoadingPhase('');
    }
    return () => clearInterval(interval);
  }, [appState, persona, activeMode]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFileUrl(URL.createObjectURL(selectedFile));

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

  const resetState = () => {
    setFile(null);
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFileUrl(null);
    setFileData(null);
    setInput('');
    setEngineResponse(null);
    setAppState('idle');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const togglePersona = (newPersona: Persona) => {
    setPersona(newPersona);
    setChatHistory([]);
    setActiveMode('upload');
    resetState();
  };

  const handleSubmit = async () => {
    if (!input.trim() && !fileData) return;
    
    setAppState('processing');

    const safeHistory = chatHistory.map(h => ({ role: h.role, parts: h.parts }));
    const activePolicyId = activeMode === 'upload' ? dropdownValue : undefined;
    
    const responseData = await getChatResponse(input.trim(), safeHistory, fileData, activePolicyId, persona);
    
    if (activeMode === 'chat') {
      const newUserPart = { 
        role: 'user', 
        parts: [{ text: input.trim() }]
      };
      const newModelPart = { 
        role: 'model', 
        parts: [{ text: responseData.message || "System evaluation complete." }] 
      };
      setChatHistory(prev => [...prev, newUserPart, newModelPart]);
      setAppState('idle');
      setInput('');
    } else {
      setEngineResponse(responseData);
      setAppState('results');
    }
  };

  const getSelectedDropdownLabel = () => {
    if (!dropdownValue) return persona === 'client' ? 'Select Document Category...' : 'Select Target Verification Rule...';
    for (const domain of UNIFIED_VERIFICATION_ONTOLOGY) {
      const found = domain.protocols.find(p => p.id === dropdownValue);
      if (found) return persona === 'client' ? found.clientLabel : found.workerLabel;
    }
    return '';
  };

  const renderWorkerDashboard = () => {
    if (appState === 'idle') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-700 gap-6">
          <Activity size={48} className="text-slate-700" />
          <div className="text-center max-w-lg mb-4">
            <h3 className="text-lg font-bold text-slate-300 mb-2">Automated Intake Engine</h3>
            <p className="text-sm text-slate-500">Execute deterministic extraction and policy routing on resident payloads.</p>
          </div>
          <div className="bg-[#050a0f] border border-slate-800 p-6 rounded-xl w-full max-w-md shadow-inner text-left">
            <span className="text-brand-jade font-bold block mb-2 text-sm">Demonstrating: Automated Extraction & Routing</span>
            <span className="text-slate-400 block mb-3 text-xs leading-relaxed">Showcases how the engine eliminates manual data entry by processing unstructured payloads.</span>
            <ul className="text-slate-500 list-disc pl-4 space-y-1 text-xs">
              <li>Select a Target Verification Rule below.</li>
              <li>Upload a sample resident document.</li>
              <li>Observe structured extraction and confidence scoring.</li>
            </ul>
          </div>
        </div>
      );
    }

    if (appState === 'processing') {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div className="w-8 h-8 border-4 border-brand-jade border-t-transparent rounded-full animate-spin" />
          <div className="text-brand-jade text-xs font-bold uppercase tracking-widest animate-pulse">{loadingPhase}</div>
        </div>
      );
    }

    return (
      <div className="flex h-full gap-4">
        <div className="flex-1 bg-slate-950 border border-slate-800 rounded-lg flex flex-col overflow-hidden">
          <div className="bg-[#050a0f] px-4 py-3 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between items-center">
            <span>Payload Viewer</span>
            <span className="truncate max-w-[200px] text-slate-600 font-mono">{file?.name}</span>
          </div>
          <div className="flex-1 p-2 overflow-auto flex items-center justify-center">
            {file?.type.includes('pdf') ? (
              <object data={fileUrl || ''} type="application/pdf" className="w-full h-full rounded" />
            ) : (
              <img src={fileUrl || ''} alt="Document Payload" className="max-w-full max-h-full object-contain rounded" />
            )}
          </div>
        </div>

        <div className="flex-1 bg-slate-950 border border-slate-800 rounded-lg flex flex-col overflow-hidden">
          <div className="bg-[#050a0f] px-4 py-3 border-b border-slate-800 text-xs font-bold text-brand-jade uppercase tracking-wider">
            Diagnostic Extraction
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {engineResponse?.status === 'PROCEED TO RULES ENGINE' && (
              <div className="mb-6 p-4 bg-[#002a2e] border border-brand-jade rounded-lg text-brand-jade font-bold flex items-center gap-3 text-sm">
                <CheckCircle size={20} /> {engineResponse.status}
              </div>
            )}
            {engineResponse?.status === 'REQUIRES HITL REVIEW' && (
              <div className="mb-6 p-4 bg-red-950 border border-red-500 rounded-lg text-red-500 font-bold flex items-center gap-3 text-sm">
                <ShieldAlert size={20} /> {engineResponse.status}
              </div>
            )}
            {engineResponse?.status === 'ERROR' && (
              <div className="mb-6 p-4 bg-red-950 border border-red-500 rounded-lg text-red-500 font-bold text-sm">
                {engineResponse.message}
              </div>
            )}

            <div className="space-y-4">
              {engineResponse?.extractedData?.map((data, idx) => (
                <div key={idx} className="bg-[#050a0f] border border-slate-800 rounded p-3 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">{data.field}</div>
                    <div className="text-sm font-mono text-slate-200">{data.value}</div>
                  </div>
                  <div className={`text-[10px] font-mono px-2 py-1 rounded bg-slate-900 border ${data.confidence >= 0.85 ? 'text-brand-jade border-brand-jade/30' : 'text-red-400 border-red-500/30'}`}>
                    CONF: {data.confidence.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <button onClick={resetState} className="mt-8 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-bold transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
              <RefreshCw size={16} /> Process Next Payload
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderClientDashboard = () => {
    if (appState === 'idle') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-6">
          <Upload size={48} className="text-blue-500/50" />
          <div className="text-center max-w-md mb-4">
            <h3 className="text-xl font-bold text-slate-200 mb-2">Submit a Document</h3>
            <p className="text-sm text-slate-400">Select the type of document you are providing, attach your file, and submit.</p>
          </div>
          <div className="bg-[#050a0f] border border-slate-800 p-6 rounded-xl w-full max-w-md shadow-inner text-left">
            <span className="text-blue-400 font-bold block mb-2 text-sm">Demonstrating: Secure Document Submission</span>
            <span className="text-slate-400 block mb-3 text-xs leading-relaxed">Showcases a frictionless, guided upload experience designed to reduce administrative burden for the resident.</span>
            <ul className="text-slate-500 list-disc pl-4 space-y-1 text-xs">
              <li>Select a Document Category below.</li>
              <li>Attach a file to simulate submission.</li>
            </ul>
          </div>
        </div>
      );
    }

    if (appState === 'processing') {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-blue-400 text-sm font-bold tracking-wide animate-pulse">{loadingPhase}</div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <div className="w-20 h-20 bg-blue-900/20 border-2 border-blue-500 rounded-full flex items-center justify-center text-blue-400">
          <CheckCircle size={40} />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Upload Successful</h3>
          <p className="text-base text-slate-400 max-w-md">{engineResponse?.message}</p>
        </div>
        <button onClick={resetState} className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold transition-colors text-sm">
          Submit Another Document
        </button>
      </div>
    );
  };

  const renderChatInterface = () => (
    <div className="flex flex-col h-full bg-[#050a0f] rounded-lg border border-slate-800 overflow-hidden">
      <div className={`px-4 py-3 border-b border-slate-800 text-xs font-bold uppercase tracking-wider ${persona === 'client' ? 'text-blue-400 bg-blue-950/20' : 'text-brand-jade bg-[#002a2e]/30'}`}>
        {persona === 'worker' ? 'Policy Operations Copilot' : 'Resident Benefits Assistant'}
      </div>
      <div ref={chatScrollRef} className="flex-1 p-6 overflow-y-auto space-y-6">
        {chatHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 text-center max-w-md mx-auto gap-6">
            <MessageSquare size={40} className="opacity-50" />
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl w-full shadow-inner text-left">
              <span className={`font-bold block mb-2 text-sm ${persona === 'client' ? 'text-blue-400' : 'text-brand-jade'}`}>
                Demonstrating: {persona === 'worker' ? 'Intelligent Policy Navigation' : 'Plain Language Translation'}
              </span>
              <span className="text-slate-400 block mb-3 text-xs leading-relaxed">
                {persona === 'worker' 
                  ? 'Showcases how the engine can parse complex scenarios and locate specific eligibility statutes instantly.' 
                  : 'Showcases how the neurosymbolic engine grounds its answers in statute, but translates the rules into plain language to help residents understand their options.'}
              </span>
              <ul className="text-slate-500 list-disc pl-4 space-y-1 text-xs">
                <li>{persona === 'worker' ? 'Ask a question about a specific program limit (e.g., "What is the SNAP limit for a family of 4?")' : 'Ask a general question (e.g., "How do I know if I qualify for child care?")'}</li>
              </ul>
            </div>
          </div>
        )}
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className={`text-[10px] uppercase tracking-wider font-bold ${msg.role === 'user' ? 'text-slate-500' : (persona === 'client' ? 'text-blue-400' : 'text-brand-jade')}`}>
              {msg.role === 'user' ? 'You' : 'System'}
            </span>
            <div className={`p-4 rounded-xl text-sm max-w-[85%] leading-relaxed ${msg.role === 'user' ? 'bg-slate-800 text-slate-200 rounded-tr-sm' : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-sm whitespace-pre-wrap'}`}>
              {msg.parts[0].text}
            </div>
          </div>
        ))}
        {appState === 'processing' && (
          <div className={`flex items-center gap-3 text-xs font-bold uppercase ${persona === 'client' ? 'text-blue-400' : 'text-brand-jade'}`}>
            <div className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin ${persona === 'client' ? 'border-blue-500' : 'border-brand-jade'}`} />
            Synthesizing guidance...
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 font-sans">
      
      {/* Main Application Frame */}
      <div className={`border rounded-xl overflow-hidden shadow-2xl flex flex-col h-[750px] transition-colors duration-300 ${persona === 'client' ? 'bg-slate-900 border-slate-700' : 'bg-[#0a0f14] border-slate-800'}`}>
        
        {/* The Fourth Wall: Global Simulator Controls */}
        <div className="bg-[#020617] border-b border-slate-800 px-6 py-3 flex flex-wrap justify-between items-center gap-4 shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <User size={14} /> Simulated Persona:
            </span>
            <div className="flex bg-slate-900/50 rounded-lg p-1 border border-slate-800">
              <button
                onClick={() => togglePersona('client')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${persona === 'client' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Resident (Applicant)
              </button>
              <button
                onClick={() => togglePersona('worker')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${persona === 'worker' ? 'bg-brand-jade text-slate-950 shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Caseworker (Agency)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Active Module:
            </span>
            <div className="flex bg-slate-900/50 rounded-lg p-1 border border-slate-800">
              <button 
                onClick={() => { setActiveMode('upload'); resetState(); }}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${activeMode === 'upload' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {persona === 'client' ? 'Document Upload' : 'Intake Pipeline'}
              </button>
              <button 
                onClick={() => setActiveMode('chat')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${activeMode === 'chat' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {persona === 'client' ? 'Benefits Assistant' : 'Policy Copilot'}
              </button>
            </div>
          </div>
        </div>

        {/* Application Context Header (Inside the Simulation) */}
        <div className={`px-6 py-4 border-b flex items-center gap-4 shrink-0 ${persona === 'client' ? 'bg-slate-800/80 border-slate-700' : 'bg-[#050a0f] border-slate-800'}`}>
          {persona === 'client' ? (
            <>
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><FileText size={20} /></div>
              <div>
                <div className="font-bold text-white tracking-wide text-lg leading-none">State Benefits Portal</div>
                <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mt-1.5">Public Resident Interface</div>
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded bg-brand-jade/20 flex items-center justify-center text-brand-jade"><Activity size={20} /></div>
              <div>
                <div className="font-bold text-white tracking-wide font-mono uppercase text-lg leading-none">Agency Adjudication System</div>
                <div className="text-[10px] text-brand-jade font-bold font-mono uppercase tracking-wider mt-1.5">Secure Internal Operations</div>
              </div>
            </>
          )}
        </div>

        {/* Dynamic Workspace */}
        <div className="flex-1 p-6 overflow-hidden">
          {activeMode === 'chat' 
            ? renderChatInterface() 
            : (persona === 'worker' ? renderWorkerDashboard() : renderClientDashboard())}
        </div>

        {/* Unified Input Footer */}
        <div className={`p-6 border-t flex-shrink-0 relative ${persona === 'client' ? 'bg-slate-800 border-slate-700' : 'bg-[#050a0f] border-slate-800'}`}>
          {(file && activeMode === 'upload') && (
            <div className="flex items-center gap-3 mb-4 p-2 bg-slate-950 rounded border border-slate-800 inline-flex">
              <FileText size={16} className={persona === 'client' ? 'text-blue-400' : 'text-brand-jade'} />
              <span className="text-sm font-mono text-slate-300 truncate max-w-[300px]">{file.name}</span>
              <button onClick={removeFile} className="text-slate-500 hover:text-white"><X size={16} /></button>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {activeMode === 'upload' && (
              <div className="relative w-full" ref={dropdownRef}>
                <button
                  type="button"
                  disabled={appState === 'processing'}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full text-left bg-slate-950 border border-slate-800 rounded-lg p-3.5 text-slate-300 focus:outline-none focus:ring-1 text-sm flex justify-between items-center transition-colors disabled:opacity-50 shadow-inner ${persona === 'client' ? 'focus:ring-blue-500 hover:border-slate-700' : 'focus:ring-brand-jade hover:border-slate-700 font-mono'}`}
                >
                  <span className={!dropdownValue ? 'text-slate-500' : ''}>{getSelectedDropdownLabel()}</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 text-slate-500 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Custom Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute z-50 w-full mb-2 bottom-[100%] bg-slate-900 border border-slate-700 rounded-lg shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden max-h-[300px] overflow-y-auto">
                    {UNIFIED_VERIFICATION_ONTOLOGY.map((domain, idx) => (
                      <div key={idx} className="pb-1">
                        <div className="px-4 py-2 sticky top-0 bg-slate-950/95 backdrop-blur z-10 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800/50">
                          {persona === 'client' ? domain.clientCategory : domain.workerCategory}
                        </div>
                        <div className="py-1">
                          {domain.protocols.map((protocol) => (
                            <button
                              key={protocol.id}
                              type="button"
                              className={`w-full text-left px-4 py-1.5 text-sm transition-colors flex items-center gap-3 ${dropdownValue === protocol.id ? (persona === 'client' ? 'bg-blue-900/30 text-blue-400' : 'bg-[#002a2e] text-brand-jade') : 'text-slate-300 hover:bg-slate-800'}`}
                              onClick={() => {
                                setDropdownValue(protocol.id);
                                setIsDropdownOpen(false);
                              }}
                            >
                              <div className="w-4 flex justify-center">
                                {dropdownValue === protocol.id && <Check size={14} />}
                              </div>
                              <span className={dropdownValue === protocol.id ? 'font-bold' : ''}>
                                {persona === 'client' ? protocol.clientLabel : protocol.workerLabel}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  activeMode === 'chat'
                    ? (persona === 'client' ? 'Ask a question about benefits...' : 'Query policy framework...')
                    : (persona === 'client' ? 'Add an optional note to your file...' : 'Append optional instructions to payload...')
                }
                className={`flex-1 bg-slate-950 border border-slate-800 rounded-lg p-4 text-slate-200 focus:outline-none resize-none min-h-[60px] text-sm shadow-inner ${persona === 'client' ? 'focus:border-blue-500' : 'focus:border-brand-jade font-mono'}`}
                rows={1}
              />
              {activeMode === 'upload' && (
                <>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,application/pdf" />
                  <button onClick={() => fileInputRef.current?.click()} disabled={appState === 'processing'} className="px-6 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700 transition-colors disabled:opacity-50 flex items-center justify-center shadow-md" title="Select Document">
                    <Upload size={20} />
                  </button>
                </>
              )}
              <button 
                onClick={handleSubmit} 
                disabled={appState === 'processing' || (activeMode === 'upload' && !fileData && !input.trim()) || (activeMode === 'chat' && !input.trim())} 
                className={`px-8 text-white rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md ${persona === 'client' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-brand-jade hover:bg-[#005a62] text-slate-950'}`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}