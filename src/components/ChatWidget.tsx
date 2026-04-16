import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Loader2, Minimize2, Maximize2 } from 'lucide-react';

const TypingIndicator = ({ size = 16 }: { size?: number }) => (
  <div className="flex gap-1 items-center h-4 px-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="bg-brand-jade rounded-full"
        style={{ width: size / 4, height: size / 4 }}
        animate={{
          y: [0, -size / 4, 0],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWidget({ embedded = false }: { embedded?: boolean }) {
  const [isOpen, setIsOpen] = useState(embedded);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am the Applied Policy Systems Consulting Assistant. How can I help you explore our Independent Verification and Validation services, Subject Matter Expert advisory for public benefits, or legislative mandate translation strategies today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const currentMessages = [...messages, userMessage];
    
    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: currentMessages,
          temperature: 0.2
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error("[CHAT WIDGET ERROR]:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "System alert: Unable to reach the verification engine endpoint. Please try again later or contact us directly." 
      }]);
    } finally {
      setIsLoading(false);
      // Ensure scrolling to bottom after response
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  if (embedded) {
    return (
      <div className="flex flex-col h-[600px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="p-6 bg-brand-jade text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Bot size={24} />
            <div>
              <h3 className="font-bold">APS Consulting Assistant</h3>
              <p className="text-xs opacity-80">Online | Architecture Specialist</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                m.role === 'user' 
                  ? 'bg-brand-jade text-white rounded-tr-none' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
              </div>
            </motion.div>
          ))}
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
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about our architecture..."
              className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-jade transition-all"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
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
            <div className="p-4 bg-brand-jade text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Bot size={20} aria-hidden="true" />
                <h3 className="font-bold text-sm">APS Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(true)} 
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Minimize chat"
                >
                  <Minimize2 size={16} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide" aria-live="polite" aria-atomic="false">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-brand-jade text-white rounded-tr-none' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
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
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  aria-label="Chat message"
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-brand-jade transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
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
          className="fixed bottom-24 right-8 px-6 py-3 bg-brand-jade text-white rounded-full shadow-xl z-[100] flex items-center gap-2 font-bold text-sm"
        >
          <Bot size={18} />
          APS Assistant
        </motion.button>
      )}

      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          aria-label="Open consulting assistant"
          aria-expanded={isOpen}
          aria-controls="chat-window"
          className="fixed bottom-24 right-8 w-14 h-14 bg-brand-jade text-white rounded-full flex items-center justify-center shadow-2xl z-[100] hover:bg-[#005a62] transition-colors"
        >
          <MessageSquare size={24} />
        </motion.button>
      )}
    </>
  );
}