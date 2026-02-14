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
      className="py-8 px-4"
    >
      <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 justify-center w-full">
          {/* CoffeeCupSVG removed as requested */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#6b4423]">
              Hello <span className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#8b5a3c] to-[#6b4423] bg-clip-text text-transparent">{firstName}</span>
            </h1>
            <p className="text-xl text-[#6b4423] mt-2 font-medium">Ready to brew some knowledge today? ☕</p>
          </div>
          <img src="/6.png" alt="Header Side" className="w-20 h-20 rounded-xl object-cover ml-4" />
        </div>
        
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
          <div className="flex items-center gap-4 w-full justify-center">
            <div className="w-80 bg-gradient-to-r from-[#f5f0eb]/50 to-[#f9f6f3]/50 rounded-full h-5 overflow-hidden backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '62.5%' }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#ffd89b] via-[#f5c77e] to-[#ffd89b] rounded-full shadow-lg"
              />
            </div>
            <div className="bg-gradient-to-r from-[#f5f0eb]/80 to-[#f9f6f3]/80 backdrop-blur-sm px-6 py-2 rounded-full text-[#6b4423] font-bold shadow-lg">
              Level 3 • 1250 XP
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-lg text-[#8b6f47] italic font-medium"
          >
            ✨ "Every expert was once a beginner who refused to give up"
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}