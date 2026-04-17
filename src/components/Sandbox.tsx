import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, X, FileText, Send, Activity, ShieldAlert, CheckCircle, RefreshCw, ChevronDown, Check, User, Scale
} from 'lucide-react';
import { getChatResponse, FileData } from '../services/gemini';
import { useToast } from '../context/ToastContext';

const UNIFIED_VERIFICATION_ONTOLOGY = [
  {
    workerCategory: "1.0 Demographics & Identity",
    clientCategory: "Personal Information",
    protocols: [
      { 
        id: 'id-citizenship', 
        workerLabel: '1.1 Identity & Citizenship (6 CFR Part 37)', 
        clientLabel: 'ID or Citizenship Documents',
        statutoryDetail: 'Governed by the REAL ID Act (6 CFR Part 37), requiring state-issued IDs to meet specific security standards for federal recognition. SNAP/Medicaid rules (7 CFR 273.2) further mandate verification of identity for all applicants.'
      },
      { 
        id: 'residency', 
        workerLabel: '1.2 Residency Verification (42 CFR 435.403)', 
        clientLabel: 'Proof of Address',
        statutoryDetail: '42 CFR 435.403 defines state residence for Medicaid. For SNAP, 7 CFR 273.2(f)(1)(vi) requires verification of residency, typically through documents showing the intent to remain in the state.'
      }
    ]
  },
  {
    workerCategory: "2.0 Financial Means Testing",
    clientCategory: "Income & Assets",
    protocols: [
      { 
        id: 'earned-income', 
        workerLabel: '2.1 Earned Income (7 CFR 273.9 / 42 CFR 435.603)', 
        clientLabel: 'Pay Stubs or Proof of Income',
        statutoryDetail: '7 CFR 273.9 defines countable earned income for SNAP. 42 CFR 435.603 establishes the Modified Adjusted Gross Income (MAGI) methodology for Medicaid eligibility.'
      },
      { 
        id: 'unearned-income', 
        workerLabel: '2.2 Unearned Income (7 CFR 273.9(c))', 
        clientLabel: 'Unemployment or SSI Letters',
        statutoryDetail: 'Covers income not derived from employment, such as Social Security, Unemployment Insurance, and Child Support. 7 CFR 273.9(c) lists specific exclusions and inclusions.'
      },
      { 
        id: 'asset-verification', 
        workerLabel: '2.3 Resource & Asset Test (7 CFR 273.8)', 
        clientLabel: 'Bank Statements',
        statutoryDetail: '7 CFR 273.8 sets the resource limits for SNAP households. While many states have implemented Broad-Based Categorical Eligibility (BBCE) to waive asset tests, it remains a federal requirement for certain populations.'
      }
    ]
  },
  {
    workerCategory: "3.0 Statutory Compliance",
    clientCategory: "Work & Medical Info",
    protocols: [
      { 
        id: 'abawd-work', 
        workerLabel: '3.1 Work Compliance Logs (7 CFR 273.24)', 
        clientLabel: 'Work Hours Log',
        statutoryDetail: '7 CFR 273.24 outlines the time limit and work requirements for Able-Bodied Adults Without Dependents (ABAWDs), requiring 80 hours of work or qualifying activity per month.'
      },
      { 
        id: 'medical-exemption', 
        workerLabel: '3.2 Medical Exemption (42 CFR 435.541)', 
        clientLabel: 'Medical Exemption Form',
        statutoryDetail: '42 CFR 435.541 provides the framework for state agencies to determine disability status for Medicaid eligibility when not already established by the Social Security Administration.'
      }
    ]
  },
  {
    workerCategory: "4.0 Deductions & Expenses",
    clientCategory: "Household Expenses",
    protocols: [
      { 
        id: 'shelter-utility', 
        workerLabel: '4.1 Shelter/Utility Costs (7 CFR 273.9(d))', 
        clientLabel: 'Utility Bills or Rent Receipts',
        statutoryDetail: '7 CFR 273.9(d)(6) allows for deductions of excess shelter costs and standard utility allowances (SUA) to determine net income for SNAP eligibility.'
      },
      { 
        id: 'dependent-care', 
        workerLabel: '4.2 Dependent Care (7 CFR 273.9(d))', 
        clientLabel: 'Child Care Expenses',
        statutoryDetail: '7 CFR 273.9(d)(4) allows a deduction for payments for the actual costs for the care of children or other dependents when necessary for a household member to accept or continue employment.'
      }
    ]
  },
  {
    workerCategory: "5.0 Tax Integration",
    clientCategory: "Tax Documents",
    protocols: [
      { 
        id: 'vita-intake', 
        workerLabel: '5.1 VITA Tax Intake (IRS Form 13614-C)', 
        clientLabel: 'Tax Intake Form',
        statutoryDetail: 'IRS Publication 4012 and Form 13614-C govern the intake and interview process for the Volunteer Income Tax Assistance (VITA) program, ensuring tax returns are prepared within the scope of the program.'
      }
    ]
  },
  {
    workerCategory: "6.0 Program-Specific Requirements",
    clientCategory: "Specialized Programs",
    protocols: [
      { 
        id: 'wic-nutritional', 
        workerLabel: '6.1 WIC Nutritional Risk (7 CFR 246.7)', 
        clientLabel: 'WIC Medical/Nutritional Form',
        statutoryDetail: '7 CFR 246.7 requires WIC applicants to be at nutritional risk, as determined by a competent professional authority through medical or nutritional assessment.'
      },
      { 
        id: 'liheap-priority', 
        workerLabel: '6.2 LIHEAP Priority Status (42 USC 8624)', 
        clientLabel: 'Energy Assistance Priority Proof',
        statutoryDetail: '42 USC 8624(b)(5) requires states to provide the highest level of assistance to households which have the lowest incomes and the highest energy costs or needs in relation to income.'
      },
      { 
        id: 'ccdf-eligibility', 
        workerLabel: '6.3 Childcare Work/Study Status (45 CFR 98.20)', 
        clientLabel: 'Childcare Eligibility Proof',
        statutoryDetail: '45 CFR 98.20 establishes that children are eligible for CCDF subsidies if their parents are working or attending a job training or educational program and their income does not exceed 85% of the State Median Income.'
      }
    ]
  }
];

type Persona = 'client' | 'worker';
type AppState = 'idle' | 'processing' | 'results';

interface ExtractedField {
  field: string;
  value: string;
  statutorySufficiency: number;
  complianceNote: string;
}

interface EngineResponse {
  status: string;
  message: string;
  extractedData: ExtractedField[];
}

export function Sandbox() {
  const { showToast } = useToast();
  const [input, setInput] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showStatutoryDetail, setShowStatutoryDetail] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileData, setFileData] = useState<FileData | null>(null);
  
  const [appState, setAppState] = useState<AppState>('idle');
  const [loadingPhase, setLoadingPhase] = useState('');
  const [fileError, setFileError] = useState<string | null>(null);
  
  // Master state controls
  const [persona, setPersona] = useState<Persona>('client');
  
  const [engineResponse, setEngineResponse] = useState<EngineResponse | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      const phases = persona === 'worker' 
        ? ['Ingesting unstructured transmission...', 'Executing deterministic extraction...', 'Evaluating statutory sufficiency...', 'Calculating compliance thresholds...', 'Rendering diagnostic results...']
        : ['Encrypting transmission...', 'Verifying document format...', 'Submitting to state agency...'];
      
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
  }, [appState, persona]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // File type validation
    const supportedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
    const supportedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];

    if (!supportedMimeTypes.includes(selectedFile.type) && !supportedExtensions.includes(fileExtension || '')) {
      const errorMsg = persona === 'client' 
        ? "We can only accept PDF, JPG, or PNG files. Please try uploading your document in one of these formats."
        : "ERROR: Unsupported file type. System requires PDF, JPG, or PNG for statutory analysis.";
      setFileError(errorMsg);
      showToast(errorMsg, "error");
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setFileError(null);
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
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resetState = () => {
    setFile(null);
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFileUrl(null);
    setFileData(null);
    setFileError(null);
    setInput('');
    setEngineResponse(null);
    setAppState('idle');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const togglePersona = (newPersona: Persona) => {
    setPersona(newPersona);
    setShowStatutoryDetail(false);
    resetState();
  };

  const handleSubmit = async () => {
    if (!fileData) return;
    
    setAppState('processing');

    const activePolicyId = dropdownValue;
    
    const responseData = await getChatResponse(input.trim(), [], fileData, activePolicyId, persona);
    
    setEngineResponse(responseData);
    setAppState('results');
    
    if (responseData.status === 'PROCEED TO RULES ENGINE') {
      showToast("Verification successful. Statutory threshold met.", "success");
    } else if (responseData.status === 'REQUIRES HITL REVIEW') {
      showToast("Manual review required for compliance verification.", "warning");
    } else if (responseData.status === 'ERROR') {
      showToast(responseData.message || "An error occurred during analysis.", "error");
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

  const getSelectedStatutoryDetail = () => {
    if (!dropdownValue) return null;
    for (const domain of UNIFIED_VERIFICATION_ONTOLOGY) {
      const found = domain.protocols.find(p => p.id === dropdownValue);
      if (found) return found.statutoryDetail;
    }
    return null;
  };

  const renderWorkerDashboard = () => {
    if (appState === 'idle') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-700 gap-6">
          <Activity size={48} className="text-slate-700" />
          <div className="text-center max-w-lg mb-4">
            <h3 className="text-lg font-bold text-slate-300 mb-2">Automated Intake Engine</h3>
            <p className="text-sm text-slate-500">Execute deterministic extraction and policy routing on resident data transmissions.</p>
          </div>
          <div className="bg-slate-100 dark:bg-[#050a0f] border border-slate-200 dark:border-slate-800 p-6 rounded-xl w-full max-w-md shadow-inner text-left">
            <span className="text-brand-jade font-bold block mb-2 text-sm">Demonstrating: Automated Extraction & Routing</span>
            <span className="text-slate-600 dark:text-slate-400 block mb-3 text-xs leading-relaxed">Showcases how the engine eliminates manual data entry by processing unstructured data inputs.</span>
            <ul className="text-slate-500 dark:text-slate-500 list-disc pl-4 space-y-1 text-xs">
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
      <div className="flex flex-col lg:flex-row h-full gap-4 overflow-y-auto lg:overflow-hidden">
        <div className="flex-1 min-h-[400px] lg:min-h-0 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg flex flex-col overflow-hidden">
          <div className="bg-slate-50 dark:bg-[#050a0f] px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex justify-between items-center">
            <span>Transmission Viewer</span>
            <span className="truncate max-w-[150px] sm:max-w-[200px] text-slate-400 dark:text-slate-600 font-mono">{file?.name}</span>
          </div>
          <div className="flex-1 p-2 overflow-auto flex items-center justify-center">
            {file?.type.includes('pdf') ? (
              <object data={fileUrl || ''} type="application/pdf" className="w-full h-full rounded" />
            ) : (
              <img src={fileUrl || ''} alt="Document Transmission" className="max-w-full max-h-full object-contain rounded" />
            )}
          </div>
        </div>

        <div className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg flex flex-col overflow-hidden min-h-[400px] lg:min-h-0">
          <div className="bg-slate-50 dark:bg-[#050a0f] px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-xs font-bold text-brand-jade uppercase tracking-wider flex justify-between items-center">
            <span>Diagnostic Extraction</span>
            {engineResponse?.extractedData && engineResponse.extractedData.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[8px] sm:text-[10px] text-slate-400 dark:text-slate-500">OVERALL SUFFICIENCY:</span>
                <span className={`font-mono text-xs sm:text-sm ${
                  (engineResponse.extractedData.reduce((acc, curr) => acc + curr.statutorySufficiency, 0) / engineResponse.extractedData.length) >= 0.85 
                    ? 'text-brand-jade' 
                    : 'text-red-500 dark:text-red-400'
                }`}>
                  {(engineResponse.extractedData.reduce((acc, curr) => acc + curr.statutorySufficiency, 0) / engineResponse.extractedData.length).toFixed(2)}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {engineResponse?.status === 'PROCEED TO RULES ENGINE' && (
              <div className="mb-6 p-4 bg-emerald-50 dark:bg-[#002a2e] border border-brand-jade rounded-lg text-brand-jade font-bold flex items-center gap-3 text-xs sm:text-sm">
                <CheckCircle size={18} sm:size={20} /> {engineResponse.status}
                <span className="ml-auto text-[8px] sm:text-[10px] opacity-70">STATUTORY THRESHOLD MET</span>
              </div>
            )}
            {engineResponse?.status === 'REQUIRES HITL REVIEW' && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-500 rounded-lg text-red-600 dark:text-red-500 font-bold flex items-center gap-3 text-xs sm:text-sm">
                <ShieldAlert size={18} sm:size={20} /> {engineResponse.status}
                <span className="ml-auto text-[8px] sm:text-[10px] opacity-70">BELOW COMPLIANCE FLOOR</span>
              </div>
            )}
            {engineResponse?.status === 'ERROR' && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-500 rounded-lg text-red-600 dark:text-red-500 font-bold text-sm">
                {engineResponse.message}
              </div>
            )}

            <div className="space-y-4">
              {engineResponse?.extractedData?.map((data, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-[#050a0f] border border-slate-200 dark:border-slate-800 rounded p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold mb-1">{data.field}</div>
                      <div className="text-sm font-mono text-slate-800 dark:text-slate-200">{data.value}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className={`text-[10px] font-mono px-2 py-1 rounded bg-white dark:bg-slate-900 border ${data.statutorySufficiency >= 0.85 ? 'text-brand-jade border-brand-jade/30' : 'text-red-500 dark:text-red-400 border-red-500/30'}`}>
                        SUFFICIENCY: {data.statutorySufficiency.toFixed(2)}
                      </div>
                      <div className="text-[8px] font-mono text-slate-400 dark:text-slate-600 uppercase">
                        {data.statutorySufficiency >= 0.85 ? 'Statutory Pass' : 'Statutory Fail'}
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 italic border-t border-slate-200 dark:border-slate-800/50 pt-2 mt-2">
                    {data.complianceNote}
                  </div>
                </div>
              ))}
            </div>
            
            <button onClick={resetState} className="mt-8 w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded font-bold transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wider border border-slate-200 dark:border-slate-700">
              <RefreshCw size={16} /> Process Next Transmission
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderClientDashboard = () => {
    if (appState === 'idle') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-8">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 shadow-inner">
            <Upload size={48} />
          </div>
          <div className="text-center max-w-md">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Ready to help</h3>
            <p className="text-slate-500 leading-relaxed">Select the type of document you're providing, and we'll help you check if it meets the requirements.</p>
          </div>
          <div className="bg-white border border-blue-100 p-8 rounded-2xl w-full max-w-lg shadow-sm text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16" />
            <span className="text-blue-600 font-bold block mb-3 text-sm uppercase tracking-wider">How it works</span>
            <ul className="text-slate-600 space-y-4 text-sm relative z-10">
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</div>
                <span>Pick a document category from the menu below.</span>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</div>
                <span>Upload a photo or PDF of your document.</span>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</div>
                <span>Get instant feedback on your document's readiness.</span>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    if (appState === 'processing') {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-100 rounded-full" />
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>
          <div className="text-blue-600 text-lg font-bold tracking-tight animate-pulse">{loadingPhase}</div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full gap-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-blue-50 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 border-2 border-green-100 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Analysis Complete</h3>
              <p className="text-xs text-slate-500 font-medium">We've checked your document against the rules.</p>
            </div>
          </div>
          <button onClick={resetState} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-all text-xs uppercase tracking-wider">
            Submit Another
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-y-auto lg:overflow-hidden">
          <div className="bg-white border border-blue-50 rounded-2xl flex flex-col overflow-hidden shadow-sm min-h-[400px] lg:min-h-0">
            <div className="bg-slate-50 px-5 py-4 border-b border-blue-50 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] flex justify-between items-center">
              <span>Your Document</span>
              <span className="truncate max-w-[120px] sm:max-w-[150px] text-blue-400 font-medium">{file?.name}</span>
            </div>
            <div className="flex-1 p-4 overflow-auto flex items-center justify-center bg-slate-50/30">
              {file?.type.includes('pdf') ? (
                <object data={fileUrl || ''} type="application/pdf" className="w-full h-full rounded-xl" />
              ) : (
                <img src={fileUrl || ''} alt="Document Transmission" className="max-w-full max-h-full object-contain rounded-xl shadow-md" />
              )}
            </div>
          </div>

          <div className="bg-white border border-blue-50 rounded-2xl flex flex-col overflow-hidden shadow-sm min-h-[400px] lg:min-h-0">
            <div className="bg-slate-50 px-5 py-4 border-b border-blue-50 text-[10px] sm:text-[11px] font-bold text-blue-600 uppercase tracking-[0.15em]">
              Readiness Report
            </div>
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
              {engineResponse?.status === 'PROCEED TO RULES ENGINE' && (
                <div className="p-4 sm:p-5 bg-green-50 border border-green-100 rounded-2xl text-green-700 font-bold flex items-center gap-4 text-xs sm:text-sm shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-600 shrink-0"><CheckCircle size={20} /></div>
                  High Readiness: This document looks great and meets the requirements!
                </div>
              )}
              {engineResponse?.status === 'REQUIRES HITL REVIEW' && (
                <div className="p-4 sm:p-5 bg-amber-50 border border-amber-100 rounded-2xl text-amber-700 font-bold flex items-center gap-4 text-xs sm:text-sm shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-amber-600 shrink-0"><ShieldAlert size={20} /></div>
                  Almost there: This document might need a quick look or more info.
                </div>
              )}

              <div className="space-y-5">
                {engineResponse?.extractedData?.map((data, idx) => (
                  <div key={idx} className="bg-slate-50/50 border border-blue-50 rounded-2xl p-5 transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-[10px] text-blue-600 uppercase tracking-widest font-extrabold mb-1.5">Information Found</div>
                        <div className="text-base font-bold text-slate-800">{data.value}</div>
                      </div>
                      <div className={`text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm ${data.statutorySufficiency >= 0.85 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                        {(data.statutorySufficiency * 100).toFixed(0)}% READY
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-blue-50/50 italic">
                      "{data.complianceNote}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 font-sans">
      
      {/* Main Application Frame */}
      <div className={`border rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[700px] lg:h-[800px] transition-all duration-500 ${persona === 'client' ? 'bg-slate-50 border-blue-100' : 'bg-[#0a0f14] border-slate-800'}`}>
        
        {/* The Fourth Wall: Global Simulator Controls */}
        <div className={`px-6 py-3 flex flex-wrap justify-between items-center gap-4 shrink-0 border-b transition-colors duration-500 ${persona === 'client' ? 'bg-white border-blue-50' : 'bg-[#020617] border-slate-800'}`}>
          <div className="flex items-center gap-4">
            <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${persona === 'client' ? 'text-blue-400' : 'text-slate-500'}`}>
              <User size={14} /> Simulated Persona:
            </span>
            <div className={`flex rounded-xl p-1 border transition-colors duration-500 ${persona === 'client' ? 'bg-blue-50/50 border-blue-100' : 'bg-slate-900/50 border-slate-800'}`} role="group" aria-label="Select persona">
              <button
                onClick={() => togglePersona('client')}
                aria-pressed={persona === 'client'}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${persona === 'client' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Resident (Applicant)
              </button>
              <button
                onClick={() => togglePersona('worker')}
                aria-pressed={persona === 'worker'}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${persona === 'worker' ? 'bg-brand-jade text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Caseworker (Agency)
              </button>
            </div>
          </div>
        </div>

        {/* Application Context Header (Inside the Simulation) */}
        <div className={`px-4 sm:px-8 py-4 sm:py-5 border-b flex items-center gap-4 sm:gap-5 shrink-0 transition-colors duration-500 ${persona === 'client' ? 'bg-white border-blue-50' : 'bg-[#050a0f] border-slate-800'}`}>
          {persona === 'client' ? (
            <>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200"><FileText size={20} sm:size={24} /></div>
              <div>
                <div className="font-extrabold text-slate-900 tracking-tight text-lg sm:text-xl">State Benefits Portal</div>
                <div className="text-[9px] sm:text-[11px] text-blue-600 font-bold uppercase tracking-[0.2em] mt-0.5 sm:mt-1">Public Resident Interface</div>
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-brand-jade/10 border border-brand-jade/30 flex items-center justify-center text-brand-jade"><Activity size={20} sm:size={24} /></div>
              <div>
                <div className="font-bold text-white tracking-widest font-mono uppercase text-lg sm:text-xl">Agency Adjudication System</div>
                <div className="text-[9px] sm:text-[10px] text-brand-jade font-bold font-mono uppercase tracking-[0.3em] mt-1 sm:mt-1.5">Secure Internal Operations</div>
              </div>
            </>
          )}
        </div>

        {/* Dynamic Workspace */}
        <div className="flex-1 p-6 overflow-hidden">
          {persona === 'worker' ? renderWorkerDashboard() : renderClientDashboard()}
        </div>

        {/* Unified Input Footer */}
        <div className={`p-6 border-t flex-shrink-0 relative transition-colors duration-500 ${persona === 'client' ? 'bg-white border-blue-50' : 'bg-[#050a0f] border-slate-800'}`}>
          {fileError && (
            <div className={`flex items-center gap-3 mb-4 p-3 rounded-xl border animate-in fade-in slide-in-from-bottom-2 ${persona === 'client' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-red-950/30 border-red-500/50 text-red-400'}`}>
              <ShieldAlert size={16} className="shrink-0" />
              <span className="text-xs font-bold">{fileError}</span>
              <button onClick={() => setFileError(null)} className="ml-auto hover:opacity-70"><X size={14} /></button>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <div className="relative flex-1" ref={dropdownRef}>
                  <button
                    type="button"
                    disabled={appState === 'processing'}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    aria-label={persona === 'client' ? 'Select document category' : 'Select target verification rule'}
                    className={`w-full text-left border rounded-xl px-4 py-3 text-xs flex justify-between items-center transition-all disabled:opacity-50 shadow-sm ${persona === 'client' ? 'bg-slate-50 border-blue-100 text-slate-700 focus:ring-2 focus:ring-blue-500/20 hover:bg-white' : 'bg-slate-950 border-slate-800 text-slate-300 focus:ring-1 focus:ring-brand-jade hover:border-slate-700 font-mono'}`}
                  >
                    <span className={!dropdownValue ? 'text-slate-400' : 'font-bold'}>{getSelectedDropdownLabel()}</span>
                    <ChevronDown size={16} className={`transition-transform duration-300 text-slate-400 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Custom Dropdown Menu */}
                  {isDropdownOpen && (
                    <div 
                      className={`absolute z-50 w-full mb-2 bottom-[100%] border rounded-2xl shadow-2xl overflow-hidden max-h-[300px] overflow-y-auto transition-all ${persona === 'client' ? 'bg-white border-blue-100' : 'bg-slate-900 border-slate-700'}`}
                      role="listbox"
                    >
                      {UNIFIED_VERIFICATION_ONTOLOGY.map((domain, idx) => (
                        <div key={idx} className="pb-1">
                          <div className={`px-4 py-2 sticky top-0 backdrop-blur z-10 text-[9px] font-black uppercase tracking-[0.2em] border-b ${persona === 'client' ? 'bg-slate-50/95 text-blue-600 border-blue-50' : 'bg-slate-950/95 text-slate-500 border-slate-800/50'}`}>
                            {persona === 'client' ? domain.clientCategory : domain.workerCategory}
                          </div>
                          <div className="py-1">
                            {domain.protocols.map((protocol) => (
                              <button
                                key={protocol.id}
                                type="button"
                                role="option"
                                aria-selected={dropdownValue === protocol.id}
                                className={`w-full text-left px-4 py-2 text-xs transition-all flex items-center gap-3 ${dropdownValue === protocol.id ? (persona === 'client' ? 'bg-blue-50 text-blue-600 font-bold' : 'bg-[#002a2e] text-brand-jade font-bold') : (persona === 'client' ? 'text-slate-600 hover:bg-slate-50' : 'text-slate-300 hover:bg-slate-800')}`}
                                onClick={() => {
                                  setDropdownValue(protocol.id);
                                  setIsDropdownOpen(false);
                                }}
                              >
                                <div className="w-4 flex justify-center shrink-0">
                                  {dropdownValue === protocol.id && <Check size={14} />}
                                </div>
                                <span className="truncate">
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

                {dropdownValue && (
                  <button 
                    onClick={() => setShowStatutoryDetail(!showStatutoryDetail)}
                    className={`p-3 rounded-xl border transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${showStatutoryDetail ? (persona === 'client' ? 'bg-blue-600 text-white border-blue-600' : 'bg-brand-jade text-slate-950 border-brand-jade') : (persona === 'client' ? 'bg-white border-blue-100 text-blue-600 hover:bg-blue-50' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200')}`}
                    title="Toggle Statutory Context"
                  >
                    <Scale size={16} />
                    <span className="hidden sm:inline">{showStatutoryDetail ? 'Hide Context' : 'Show Context'}</span>
                  </button>
                )}
              </div>
              
              <AnimatePresence>
                {(dropdownValue && showStatutoryDetail) && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-4 rounded-xl border text-[11px] leading-relaxed transition-colors duration-500 mb-2 ${persona === 'client' ? 'bg-blue-50/30 border-blue-100 text-slate-600' : 'bg-[#002a2e]/20 border-brand-jade/30 text-slate-400 font-mono'}`}>
                      <div className={`font-black uppercase tracking-widest mb-1.5 flex items-center gap-2 ${persona === 'client' ? 'text-blue-600' : 'text-brand-jade'}`}>
                        <Scale size={12} /> Statutory Context:
                      </div>
                      {getSelectedStatutoryDetail()}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-3 items-end">
              <div className="flex-1 flex flex-col gap-2">
                {file && (
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border self-start shadow-sm animate-in fade-in slide-in-from-left-2 ${persona === 'client' ? 'bg-blue-50 border-blue-100' : 'bg-slate-950 border-slate-800'}`}>
                    <FileText size={14} className={persona === 'client' ? 'text-blue-600' : 'text-brand-jade'} />
                    <span className={`text-[10px] font-bold truncate max-w-[200px] ${persona === 'client' ? 'text-slate-700' : 'text-slate-300 font-mono'}`}>{file.name}</span>
                    <button onClick={removeFile} className="text-slate-400 hover:text-red-500 transition-colors"><X size={14} /></button>
                  </div>
                )}
                {persona === 'worker' && (
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Append optional instructions to transmission..."
                    aria-label="Optional instructions"
                    className="w-full border rounded-xl p-3 text-slate-800 focus:outline-none resize-none min-h-[50px] text-xs shadow-sm transition-all bg-slate-950 border-slate-800 text-slate-200 focus:border-brand-jade font-mono"
                    rows={1}
                  />
                )}
              </div>
              
              <div className="flex gap-2">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" />
                <button onClick={() => fileInputRef.current?.click()} disabled={appState === 'processing'} className={`w-12 h-12 rounded-xl border transition-all disabled:opacity-50 flex items-center justify-center shadow-sm ${persona === 'client' ? 'bg-white border-blue-100 text-blue-600 hover:bg-blue-50' : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'}`} title="Select Document">
                  <Upload size={20} />
                </button>
                <button 
                  onClick={handleSubmit} 
                  disabled={appState === 'processing' || !fileData} 
                  aria-label="Submit for analysis"
                  className={`w-12 h-12 rounded-xl font-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg active:scale-95 ${persona === 'client' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200' : 'bg-brand-jade hover:bg-[#005a62] text-slate-950 shadow-brand-jade/20'}`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}