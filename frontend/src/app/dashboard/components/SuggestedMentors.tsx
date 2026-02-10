'use client';

import React from 'react';
import { motion } from 'framer-motion';

const mentors = [
  { name: 'Dr. Sharma', subject: 'Mathematics', rating: 4.8, students: 124, initial: 'D' },
  { name: 'Prof. Patel', subject: 'Physics', rating: 4.9, students: 98, initial: 'P' },
  { name: 'Ms. Gupta', subject: 'Chemistry', rating: 4.7, students: 156, initial: 'G' },
  { name: 'Mr. Kumar', subject: 'Computer Science', rating: 4.9, students: 201, initial: 'K' },
  { name: 'Dr. Mehta', subject: 'Biology', rating: 4.8, students: 142, initial: 'M' },
  { name: 'Ms. Singh', subject: 'English', rating: 4.6, students: 87, initial: 'S' },
];

export default function SuggestedMentors() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-lg border border-[#d4a574]/15">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 bg-gradient-to-br from-[#d4a574]/20 to-[#bfa77a]/20 rounded-xl flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="7" r="3" stroke="#8b6f47" strokeWidth="1.8"/>
            <path d="M3 21C3 17.134 5.686 14 9 14C12.314 14 15 17.134 15 21" 
              stroke="#8b6f47" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="16" cy="9" r="2.5" stroke="#bfa77a" strokeWidth="1.5"/>
            <path d="M13 21C13 18.791 14.343 16.5 16 16.5C17.657 16.5 19 18.791 19 21" 
              stroke="#bfa77a" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[#6b4423]">Suggested Mentors</h3>
      </div>
      
      {/* Mentors Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {mentors.map((mentor, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -2 }}
            className="bg-gradient-to-br from-[#fcfbfa] to-[#f9f6f3] rounded-xl p-3 hover:shadow-md transition-all cursor-pointer border border-[#d4a574]/5 group"
          >
            {/* Avatar & Name */}
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#d4a574] to-[#bfa77a] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                {mentor.initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[#6b4423] text-base truncate">{mentor.name}</div>
                <div className="text-xs text-[#8b6f47] truncate">{mentor.subject}</div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-[#8b6f47]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" 
                    fill="#d4a574" stroke="none"/>
                </svg>
                <span className="font-semibold text-base">{mentor.rating}</span>
              </div>
              <span className="text-[#bfa77a] text-base">{mentor.students} students</span>
            </div>

            {/* Connect Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-2.5 bg-gradient-to-r from-[#d4a574] to-[#bfa77a] text-white text-[11px] font-medium py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Connect
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}