import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { analyzeAuditTrail } from '../services/gemini';

export interface SessionEvent {
  timestamp: string;
  type: string;
  details: string;
  statute?: string;
}

interface CaseContextType {
  activeCaseId: string | null;
  setActiveCaseId: (id: string | null) => void;
  isCaseBound: boolean;
  sessionLog: SessionEvent[];
  addEvent: (type: string, details: string, statute?: string) => void;
  exportAuditTrail: () => void;
  performIntegrityCheck: () => Promise<void>;
  integrityReport: any | null;
  isAnalyzingIntegrity: boolean;
  setIntegrityReport: (report: any | null) => void;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export function CaseProvider({ children }: { children: ReactNode }) {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [sessionLog, setSessionLog] = useState<SessionEvent[]>([]);
  const [integrityReport, setIntegrityReport] = useState<any | null>(null);
  const [isAnalyzingIntegrity, setIsAnalyzingIntegrity] = useState(false);

  const addEvent = useCallback((type: string, details: string, statute?: string) => {
    setSessionLog(prev => [...prev, {
      timestamp: new Date().toISOString(),
      type,
      details,
      statute
    }]);
    setIntegrityReport(null);
  }, []);

  const performIntegrityCheck = useCallback(async () => {
    if (sessionLog.length < 2) return;
    setIsAnalyzingIntegrity(true);
    try {
      const report = await analyzeAuditTrail(sessionLog);
      setIntegrityReport(report);
    } catch (error) {
      console.error("Integrity check failed:", error);
      throw error;
    } finally {
      setIsAnalyzingIntegrity(false);
    }
  }, [sessionLog]);

  const exportAuditTrail = useCallback(() => {
    if (!activeCaseId) return;

    const auditData = {
      auditId: `APS-AUDIT-${Math.random().toString(36).substring(7).toUpperCase()}`,
      exportDate: new Date().toISOString(),
      caseId: activeCaseId,
      authority: "Applied Policy Systems LLC | Forensic Logic Bureau",
      events: sessionLog
    };

    const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `APS_AUDIT_${activeCaseId}_${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [activeCaseId, sessionLog]);

  const value = {
    activeCaseId,
    setActiveCaseId,
    isCaseBound: activeCaseId !== null,
    sessionLog,
    addEvent,
    exportAuditTrail,
    performIntegrityCheck,
    integrityReport,
    isAnalyzingIntegrity,
    setIntegrityReport
  };

  return (
    <CaseContext.Provider value={value}>
      {children}
    </CaseContext.Provider>
  );
}

export function useCase() {
  const context = useContext(CaseContext);
  if (context === undefined) {
    throw new Error('useCase must be used within a CaseProvider');
  }
  return context;
}
