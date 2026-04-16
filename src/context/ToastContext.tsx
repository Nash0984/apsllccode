import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType, duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-3 pointer-events-none items-end">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem: React.FC<{ toast: Toast; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  const icons = {
    success: <CheckCircle2 className="text-emerald-500" size={20} />,
    error: <AlertCircle className="text-rose-500" size={20} />,
    info: <Info className="text-sky-500" size={20} />,
    warning: <AlertTriangle className="text-amber-500" size={20} />,
  };

  const bgColors = {
    success: 'bg-white dark:bg-slate-900 border-emerald-500/20',
    error: 'bg-white dark:bg-slate-900 border-rose-500/20',
    info: 'bg-white dark:bg-slate-900 border-sky-500/20',
    warning: 'bg-white dark:bg-slate-900 border-amber-500/20',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: 50 }}
      className={`pointer-events-auto flex items-center gap-4 px-4 py-3 min-w-[300px] max-w-md rounded-2xl border shadow-2xl ${bgColors[toast.type]}`}
    >
      <div className="shrink-0">{icons[toast.type]}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
          {toast.message}
        </p>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};
