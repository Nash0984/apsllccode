import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Send, Activity, ShieldAlert, CheckCircle } from 'lucide-react';
import { getChatResponse, FileData } from '../services/gemini';

export function Sandbox() {
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      setFileData({
        mimeType: selectedFile.type,
        data: base64String
      });
    };
    reader.readAsDataURL(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setFileData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePreconfiguredPrompt = () => {
    setInput("Process this verification document for ABAWD exemption status.");
  };

  const handleSubmit = async () => {
    if (!input && !fileData) return;
    
    setIsProcessing(true);
    setOutput('');

    try {
      const response = await getChatResponse(input, [], fileData);
      setOutput(response);
    } catch (error) {
      setOutput("System alert: Processing failure. Verify API connection.");
    } finally {
      setIsProcessing(false);
      setInput('');
      removeFile();
    }
  };

  const renderVisualOutput = (text: string) => {
    if (!text) return <div className="text-slate-600">Awaiting input stream...</div>;

    return (
      <div className="whitespace-pre-wrap font-mono text-sm">
        {text.split('\n').map((line, i) => {
          if (line.includes('PROCEED TO RULES ENGINE')) {
            return (
              <div key={i} className="mt-4 p-3 bg-[#002a2e] border border-brand-jade rounded text-brand-jade font-bold flex items-center gap-2">
                <CheckCircle size={18} />
                {line}
              </div>
            );
          }
          if (line.includes('REQUIRES HITL REVIEW')) {
            return (
              <div key={i} className="mt-4 p-3 bg-red-950 border border-red-500 rounded text-red-500 font-bold flex items-center gap-2">
                <ShieldAlert size={18} />
                {line}
              </div>
            );
          }
          if (line.includes('System Note:')) {
            return (
              <div key={i} className="text-slate-500 italic mt-4 border-l-2 border-slate-700 pl-3 py-1">
                {line}
              </div>
            );
          }
          if (line.match(/Confidence:\s*0\.[0-8][0-4]/)) {
             return <div key={i} className="text-red-400 pl-4">{line}</div>;
          }
          if (line.match(/Confidence:\s*0\.(8[5-9]|9[0-9])/)) {
             return <div key={i} className="text-brand-jade pl-4">{line}</div>;
          }
          if (line.match(/^\d\./)) {
             return <div key={i} className="text-white font-bold mt-3">{line}</div>;
          }
          return <div key={i} className="text-slate-300">{line}</div>;
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono text-sm shadow-2xl">
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-brand-jade">
          <Activity size={18} />
          <span className="font-bold tracking-widest uppercase text-xs">Administrative Burden Reduction Engine</span>
        </div>
      </div>

      <div className="p-6 h-96 overflow-y-auto bg-slate-950 text-slate-300">
        {renderVisualOutput(output)}
        {isProcessing && (
          <div className="mt-4 flex items-center gap-2 text-brand-jade">
            <Activity size={16} className="animate-spin" />
            <span className="animate-pulse">Executing Document Intelligence protocol...</span>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800">
        {file && (
          <div className="flex items-center gap-3 mb-3 p-2 bg-slate-800 rounded-md inline-flex border border-slate-700">
            <FileText size={16} className="text-brand-jade" />
            <span className="text-xs text-slate-300 truncate max-w-[200px]">{file.name}</span>
            <button onClick={removeFile} className="text-slate-400 hover:text-white">
              <X size={16} />
            </button>
          </div>
        )}

        <div className="flex gap-2 mb-3">
          <button 
            onClick={handlePreconfiguredPrompt}
            className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
          >
            Load: Document Protocol
          </button>
        </div>

        <div className="flex items-end gap-2 relative">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter system prompt or load protocol..."
              className="w-full bg-slate-950 border border-slate-800 rounded-md p-3 text-slate-300 focus:outline-none focus:border-brand-jade resize-none min-h-[50px]"
              rows={2}
            />
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*,application/pdf"
          />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md border border-slate-700 transition-colors"
            title="Upload Verification Document"
          >
            <Upload size={20} />
          </button>
          
          <button 
            onClick={handleSubmit}
            disabled={isProcessing || (!input && !fileData)}
            className="p-3 bg-brand-jade hover:bg-[#005a62] text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
