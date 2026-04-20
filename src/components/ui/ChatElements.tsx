import React from 'react';
import { motion } from 'motion/react';

export const TypingIndicator = ({ size = 16, colorClass = "bg-brand-jade" }: { size?: number, colorClass?: string }) => (
  <div className="flex gap-1.5 items-center h-4 px-1" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className={`${colorClass} rounded-full`}
        style={{ width: size / 4, height: size / 4 }}
        animate={{
          y: [0, -4, 0],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

interface ChatBubbleProps {
  role: 'user' | 'assistant' | 'model';
  content: string;
  timestamp?: string;
  avatar: React.ReactNode;
  isProcessing?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ role, content, timestamp, avatar, isProcessing }) => {
  const isUser = role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 20 : -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-transform hover:scale-110 ${
        isUser ? 'bg-slate-200 dark:bg-slate-700' : 'bg-slate-200 dark:bg-slate-800 text-brand-jade'
      }`}>
        {avatar}
      </div>
      <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm relative group transition-all duration-200 ${
        isUser 
          ? 'bg-brand-jade text-white rounded-tr-none hover:shadow-lg' 
          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none hover:shadow-md'
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        
        {timestamp && (
          <div className={`absolute -bottom-5 ${isUser ? 'right-0' : 'left-0'} opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
            <span className="text-[10px] text-slate-400 font-mono">{timestamp}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
