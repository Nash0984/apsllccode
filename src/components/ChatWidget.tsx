import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Loader2, Minimize2, Trash2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { getConversationalResponse } from '../services/gemini';
import { TypingIndicator, ChatBubble } from './ui/ChatElements';

const INITIAL_MESSAGES: Message[] = [
  { 
    role: 'assistant', 
    content: 'Hello! I am the Applied Policy Systems Consulting Assistant. How can I help you explore our Independent Verification and Validation services, Subject Matter Expert advisory for public benefits, or legislative mandate translation strategies today?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

const THROTTLE_DURATION = 1500;
const MAX_MESSAGES = 20;

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export function ChatWidget({ embedded = false }: { embedded?: boolean }) {
  // 1. ALL HOOKS MUST BE DECLARED FIRST
  const { showToast } = useToast();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(embedded);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThrottled, setIsThrottled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && !isMinimized && !embedded) {
      inputRef.current?.focus();
    } else if (!isOpen && !embedded) {
      triggerRef.current?.focus();
    }
  }, [isOpen, isMinimized, embedded]);

  // Accessibility keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !embedded) {
        if (!isMinimized) {
          setIsMinimized(true);
        } else {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMinimized, embedded]);

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    showToast("Chat history cleared", "info");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clear chat history on specific route changes to ensure fresh context
  useEffect(() => {
    const clearRoutes = ['/contact'];
    if (clearRoutes.includes(location.pathname) && messages.length > INITIAL_MESSAGES.length) {
      setMessages(INITIAL_MESSAGES);
    }
  }, [location.pathname, messages.length]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || isThrottled) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: Message = { role: 'user', content: input.trim(), timestamp };
    const currentMessages = [...messages, userMessage].slice(-MAX_MESSAGES);
    
    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);
    setIsThrottled(true);

    setTimeout(() => {
      setIsThrottled(false);
    }, THROTTLE_DURATION);

    try {
      const history = currentMessages.map(m => ({
        role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: m.content }]
      }));

      const botResponse = await getConversationalResponse(input.trim(), history);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }].slice(-MAX_MESSAGES));
    } catch (error) {
      console.error("[CHAT WIDGET ERROR]:", error);
      showToast("Chat system connection error. Please try again or contact support.", "error");
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "System alert: Unable to reach the verification engine endpoint. Please try again later or contact us directly." 
      }].slice(-MAX_MESSAGES));
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // 2. COMPONENT SUPPRESSION (After all hooks are called)
  if (!embedded && location.pathname === '/contact') {
    return null;
  }

  // 3. RENDER LOGIC
  if (embedded) {
    return (
      <div className="flex flex-col h-[600px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="p-6 bg-brand-jade text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot size={24} />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-brand-jade-light border-2 border-white rounded-full animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold">APS Consulting Assistant</h3>
              <p className="text-[10px] opacity-80 font-mono tracking-wider uppercase">Online | Architecture Specialist</p>
            </div>
          </div>
          <button 
            onClick={clearChat}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors group relative"
            title="Clear chat history"
          >
            <Trash2 size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-slate-50/50 dark:bg-slate-900/50">
          <AnimatePresence mode="popLayout">
            {messages.map((m, i) => (
              <ChatBubble
                key={`${i}-${messages.length}`}
                role={m.role}
                content={m.content}
                timestamp={m.timestamp}
                avatar={m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              />
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none">
                <TypingIndicator size={20} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isThrottled ? "Cooling down..." : "Ask about our architecture..."}
              disabled={isThrottled}
              aria-label="Chat query input"
              className={`flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-jade transition-all ${isThrottled ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || isThrottled}
              className="p-3 bg-brand-jade text-white rounded-xl hover:bg-[#005a62] transition-colors disabled:opacity-50 flex items-center justify-center min-w-[44px]"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            key="chat-window-popup"
            id="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 w-96 h-[500px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl z-[100] flex flex-col"
          >
            <div className="p-4 bg-brand-jade text-white flex justify-between items-center shadow-lg relative z-10">
              <div className="flex items-center gap-2">
                <Bot size={18} aria-hidden="true" />
                <h3 className="font-bold text-xs uppercase tracking-tight">APS Assistant</h3>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={clearChat}
                  className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  <Trash2 size={14} />
                </button>
                <div className="w-px h-4 bg-white/20 mx-1" />
                <button 
                  onClick={() => setIsMinimized(true)} 
                  className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
                  aria-label="Minimize chat"
                >
                  <Minimize2 size={14} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
                  aria-label="Close chat"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-slate-50/30 dark:bg-slate-900/30" aria-live="polite" aria-atomic="false">
              <AnimatePresence mode="popLayout">
                {messages.map((m, i) => (
                  <ChatBubble
                    key={`${i}-${messages.length}`}
                    role={m.role}
                    content={m.content}
                    timestamp={m.timestamp}
                    avatar={m.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  />
                ))}
              </AnimatePresence>
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl rounded-tl-none">
                    <TypingIndicator size={16} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isThrottled ? "Wait..." : "Type a message..."}
                  disabled={isThrottled}
                  aria-label="Chat message input"
                  className={`flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-brand-jade transition-all ${isThrottled ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || isThrottled}
                  aria-label="Send message"
                  className="p-2 bg-brand-jade text-white rounded-lg hover:bg-[#005a62] transition-colors disabled:opacity-50 flex items-center justify-center min-w-[36px]"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMinimized && isOpen && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setIsMinimized(false)}
          aria-label="Restore consulting assistant"
          aria-controls="chat-window"
          className="fixed bottom-24 right-8 px-6 py-3 bg-brand-jade text-white rounded-full shadow-xl z-[100] flex items-center gap-2 font-bold text-sm"
        >
          <Bot size={18} />
          APS Assistant
        </motion.button>
      )}

      {!isOpen && (
        <motion.button
          ref={triggerRef}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          aria-label="Open consulting assistant"
          aria-expanded="false"
          aria-controls="chat-window"
          className="fixed bottom-24 right-8 w-14 h-14 bg-brand-jade text-white rounded-full flex items-center justify-center shadow-2xl z-[100] hover:bg-[#005a62] transition-colors"
        >
          <MessageSquare size={24} />
        </motion.button>
      )}
    </>
  );
}