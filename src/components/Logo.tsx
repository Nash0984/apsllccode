import React from 'react';
import { motion } from 'motion/react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 590 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="cubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-brand-jade)" />
          <stop offset="100%" stopColor="var(--color-brand-jade)" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-brand-jade)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--color-brand-jade)" stopOpacity="0.4" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Geometric Cube Icon - Vertically Centered with Text Block */}
      <g transform="translate(0, 82.5)">
        <motion.g 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.4 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ originX: "40px", originY: "40px" }}
        >
          {/* Subtle background glow/shadow */}
          <circle cx="40" cy="40" r="40" fill="url(#cubeGradient)" fillOpacity="0.03" />

          {/* The "Dark" core shape (Left face) */}
          <motion.path
            d="M5.35898 20L40 40V80L5.35898 60V20Z"
            fill="url(#cubeGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
          
          {/* Bottom-left face */}
          <motion.path
            d="M5.35898 60L40 80L74.641 60L40 40L5.35898 60Z"
            fill="currentColor"
            fillOpacity="0.15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          
          {/* Top Face (Transparent/Light) */}
          <motion.path
            d="M40 0L74.641 20L40 40L5.35898 20L40 0Z"
            fill="url(#cubeGradient)"
            fillOpacity="0.05"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          />

          {/* Right Face Structure */}
          <motion.path
            d="M40 40L74.641 20V60L40 80V40Z"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.7, duration: 1.5 }}
          />

          {/* Dynamic "System" Lines */}
          <motion.path
            d="M40 0V40M5.35898 20L40 40M74.641 20L40 40M40 40V80"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.9, duration: 1.5 }}
          />
          
          {/* Outer Boundary */}
          <motion.path
            d="M40 0L74.641 20V60L40 80L5.35898 60V20L40 0Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeOpacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 2 }}
          />

          {/* Nodes (Dots) with subtle pulse */}
          {[
            { cx: 40, cy: 0 },
            { cx: 74.641, cy: 20 },
            { cx: 74.641, cy: 60 },
            { cx: 40, cy: 80 },
            { cx: 5.35898, cy: 60 },
            { cx: 5.35898, cy: 20 },
            { cx: 40, cy: 40 }
          ].map((node, i) => (
            <motion.circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r="2"
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
            />
          ))}
          
          {/* Floating "Data" points */}
          <motion.circle
            cx="90" cy="28.8" r="1.5" fill="var(--color-brand-jade)"
            animate={{ 
              y: [0, -5, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="-10" cy="51.2" r="1.5" fill="var(--color-brand-jade)"
            animate={{ 
              y: [0, 5, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.g>
      </g>

      {/* Typography with staggered entrance - Two rows perfectly centered with icon */}
      <motion.text
        x="140"
        y="115.5"
        fill="currentColor"
        style={{
          fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
          fontWeight: 700,
          fontSize: '56px',
          letterSpacing: '-0.02em'
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Applied Policy
      </motion.text>
      <motion.text
        x="140"
        y="185.5"
        fill="currentColor"
        style={{
          fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
          fontWeight: 700,
          fontSize: '56px',
          letterSpacing: '-0.02em'
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Systems LLC
      </motion.text>
    </svg>
  );
};
