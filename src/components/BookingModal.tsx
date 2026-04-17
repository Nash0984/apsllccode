import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Loader2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useTranslation } from 'react-i18next';

export function BookingModal() {
  const { isBookingOpen, closeBooking } = useBooking();
  const { t } = useTranslation();

  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBooking();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeBooking]);

  // Prevent scroll when open
  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isBookingOpen]);

  return (
    <AnimatePresence>
      {isBookingOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl h-[85vh] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-jade/10 flex items-center justify-center text-brand-jade">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                    {t('contactPage.cta.title')}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
                    Architectural Strategy Session
                  </p>
                </div>
              </div>
              <button
                onClick={closeBooking}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close booking modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Iframe Content */}
            <div className="flex-1 relative bg-slate-50 dark:bg-[#050a0f]">
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 text-brand-jade animate-spin" />
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">Synchronizing Scheduler...</p>
                </div>
              </div>
              <iframe
                src="https://calendar.app.google/WiXHqdGmWaG5kxJQ7"
                style={{ border: 0 }}
                width="100%"
                height="100%"
                frameBorder="0"
                className="relative z-10 w-full h-full"
                title="Book an appointment"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-[#0a1017] border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em]">
                Secure Direct Booking Protocol | Applied Policy Systems LLC
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
