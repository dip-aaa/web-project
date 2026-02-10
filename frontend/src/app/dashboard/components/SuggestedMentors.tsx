'use client';

import React from 'react';
import { motion } from 'framer-motion';

const UsersSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <defs>
      <linearGradient id="userGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b6f47', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#6b5444', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="70" cy="70" r="25" fill="url(#userGradient1)" />
    <path d="M30 150 Q30 110 70 110 Q110 110 110 150 Z" fill="url(#userGradient1)" />
    <circle cx="130" cy="85" r="22" fill="#a0826d" opacity="0.8" />
    <path d="M95 160 Q95 125 130 125 Q165 125 165 160 Z" fill="#a0826d" opacity="0.8" />
  </svg>
);

const mentors = [
  { name: 'Dr. Sharma', subject: 'Mathematics', rating: 4.8, color: 'from-[#8b6f47] to-[#6b4423]', students: 124 },
  { name: 'Prof. Patel', subject: 'Physics', rating: 4.9, color: 'from-[#a0826d] to-[#8b6f47]', students: 98 },
  { name: 'Ms. Gupta', subject: 'Chemistry', rating: 4.7, color: 'from-[#c9a27b] to-[#a0826d]', students: 156 },
  { name: 'Mr. Kumar', subject: 'Computer Science', rating: 4.9, color: 'from-[#b8936b] to-[#8b6f47]', students: 201 },
  { name: 'Dr. Mehta', subject: 'Biology', rating: 4.8, color: 'from-[#a3b18a] to-[#588157]', students: 142 },
  { name: 'Ms. Singh', subject: 'English Literature', rating: 4.6, color: 'from-[#f7c873] to-[#d4a574]', students: 87 },
];

export default function SuggestedMentors() {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border-2 border-[#d4a574]/20">
      <div className="flex items-center gap-4 mb-8">
        <UsersSVG className="w-12 h-12" />
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6b4423] to-[#8b5a3c] bg-clip-text text-transparent">
          Suggested Mentors
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mentors.map((mentor, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + idx * 0.1 }}
            whileHover={{ scale: 1.03, x: 5 }}
            className="flex items-center gap-4 bg-gradient-to-r from-[#f9f6f3] to-[#fdfcfa] rounded-2xl p-5 shadow-md hover:shadow-xl transition-all cursor-pointer border border-[#d4a574]/10 group"
          >
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className={`w-16 h-16 bg-gradient-to-br ${mentor.color} rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg flex-shrink-0`}
            >
              {mentor.name[0]}
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[#6b4423] text-lg mb-1">{mentor.name}</div>
              <div className="text-sm text-[#8b6f47] mb-2">📚 {mentor.subject}</div>
              <div className="text-xs text-[#8b6f47]/70">{mentor.students} students</div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 px-3 py-1.5 rounded-full shadow-sm">
                <svg viewBox="0 0 50 50" className="w-5 h-5">
                  <motion.path
                    d="M25 5 L30 20 L45 20 L33 30 L38 45 L25 35 L12 45 L17 30 L5 20 L20 20 Z"
                    fill="#fbbf24"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </svg>
                <span className="text-sm font-black text-amber-600">{mentor.rating}</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#8b6f47] to-[#6b4423] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all"
              >
                Connect
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}