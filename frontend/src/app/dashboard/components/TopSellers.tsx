'use client';

import React from 'react';
import { motion } from 'framer-motion';

const sellers = [
  { name: 'Priya S.', items: 12, badge: 1, color: 'from-yellow-400 to-amber-500', rank: 1 },
  { name: 'Rahul K.', items: 9, badge: 2, color: 'from-gray-300 to-gray-400', rank: 2 },
  { name: 'Anjali M.', items: 7, badge: 3, color: 'from-orange-400 to-orange-500', rank: 3 },
  { name: 'Vikram R.', items: 6, badge: 4, color: 'from-blue-300 to-blue-400', rank: 4 },
  { name: 'Neha P.', items: 5, badge: 5, color: 'from-purple-300 to-purple-400', rank: 5 },
];

export default function TopSellers() {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border-2 border-[#d4a574]/20">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
          {/* Minimalist SVG trophy */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="3" width="12" height="6" rx="2" fill="#fff3cd" stroke="#bfa14a" strokeWidth="1.5"/>
            <rect x="11" y="9" width="6" height="7" rx="2" fill="#fff3cd" stroke="#bfa14a" strokeWidth="1.5"/>
            <rect x="12" y="16" width="4" height="5" rx="1.5" fill="#bfa14a"/>
          </svg>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6b4423] to-[#8b5a3c] bg-clip-text text-transparent">
          Top Sellers
        </h3>
      </div>
      
      <div className="space-y-3">
        {sellers.map((seller, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + idx * 0.1 }}
            whileHover={{ scale: 1.03, x: -5 }}
            className="flex items-center gap-4 bg-gradient-to-r from-[#fdfcfa] to-[#f9f6f3] rounded-2xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer border border-[#d4a574]/10 group relative overflow-hidden"
          >


            {/* Minimal badge - circle with number */}
            <div className={`w-14 h-14 bg-gradient-to-br ${seller.color} rounded-2xl flex items-center justify-center shadow-lg ml-4`}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="16" fill="#fff" stroke="#bfa14a" strokeWidth="2"/>
                <text x="18" y="24" textAnchor="middle" fontSize="18" fill="#bfa14a" fontWeight="bold">{seller.badge}</text>
              </svg>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="font-bold text-[#6b4423] text-lg">{seller.name}</div>
              <div className="text-sm text-[#8b6f47] flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="3" y="6" width="14" height="8" rx="2" fill="#bfa14a"/><rect x="7" y="10" width="6" height="2" rx="1" fill="#fff3cd"/></svg>
                <span>{seller.items} items sold</span>
              </div>
            </div>
            
            {/* View profile button - appears on hover */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#8b6f47] to-[#6b4423] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all"
            >
              View Profile
            </motion.button>
          </motion.div>
        ))}
      </div>
      
      {/* Leaderboard footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-6 bg-gradient-to-r from-[#f9f6f3] to-[#fdfcfa] rounded-2xl p-4 border border-[#d4a574]/30 text-center"
      >
        <div className="text-sm text-[#8b6f47] mb-1">Your Rank</div>
        <div className="text-2xl font-black bg-gradient-to-r from-[#8b6f47] to-[#6b4423] bg-clip-text text-transparent">
          #23
        </div>
        <div className="text-xs text-[#8b6f47] mt-1">Keep selling to climb!</div>
      </motion.div>
    </div>
  );
}