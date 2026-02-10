'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CoffeeCupSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none">
    <defs>
      <linearGradient id="cupGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#6b4423', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#8b5a3c', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M50 80 Q45 100 50 140 L150 140 Q155 100 150 80 Z" fill="url(#cupGradient)" />
    <ellipse cx="100" cy="80" rx="50" ry="15" fill="#3e2723" />
    <ellipse cx="100" cy="80" rx="45" ry="12" fill="#4e342e" />
    <path d="M155 90 Q180 90 180 115 Q180 140 155 140"
          stroke="#6b4423" strokeWidth="8" fill="none" strokeLinecap="round"/>
    <motion.path
      d="M80 60 Q75 40 80 20"
      stroke="#d4a574"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path
      d="M100 65 Q95 45 100 25"
      stroke="#d4a574"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      animate={{ opacity: [0.7, 0.3, 0.7], y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
    <motion.path
      d="M120 60 Q125 40 120 20"
      stroke="#d4a574"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
    />
  </svg>
);

interface WelcomeHeaderProps {
  firstName: string;
}

export default function WelcomeHeader({ firstName }: WelcomeHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white/90 to-[#f9f6f3]/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-[#d4a574]/20"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <CoffeeCupSVG className="w-16 h-16" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#6b4423]">
              Good morning <span className="text-4xl md:text-5xl font-extrabold text-[#8b5a3c]">{firstName}</span>
            </h1>
            <p className="text-lg text-[#6b4423] mt-1">Ready to brew some knowledge today? ☕</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 w-64 bg-[#f5f0eb] rounded-full h-4 overflow-hidden border-2 border-[#d4a574]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '62.5%' }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#ffd89b] via-[#f5c77e] to-[#ffd89b] rounded-full shadow-lg"
              />
            </div>
            <div className="bg-[#f5f0eb] px-5 py-2 rounded-full border-2 border-[#d4a574] text-[#6b4423] font-bold">
              Level 3 • 1250 XP
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-[#8b6f47] italic font-light"
          >
            ✨ "Every expert was once a beginner who refused to give up"
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}