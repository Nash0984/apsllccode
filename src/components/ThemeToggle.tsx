import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : 180 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      >
        {theme === 'light' ? (
          <Moon size={20} strokeWidth={1.5} />
        ) : (
          <Sun size={20} strokeWidth={1.5} />
        )}
      </motion.div>
    </button>
  );
}
