'use client';

import React from 'react';
import { motion } from 'framer-motion';

const sellers = [
  { name: 'Priya S.', items: 12, earnings: 'रु 45,200', rank: 1 },
  { name: 'Rahul K.', items: 9, earnings: 'रु 38,900', rank: 2 },
  { name: 'Anjali M.', items: 7, earnings: 'रु 29,400', rank: 3 },
  { name: 'Vikram R.', items: 6, earnings: 'रु 24,100', rank: 4 },
  { name: 'Neha P.', items: 5, earnings: 'रु 19,800', rank: 5 },
];

export default function TopSellers() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-lg border border-[#d4a574]/15">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-[#d4a574]/20 to-[#bfa77a]/20 rounded-xl flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 9C6 9 6 4 12 4C18 4 18 9 18 9M6 9H18M6 9V18C6 19.1 6.9 20 8 20H16C17.1 20 18 19.1 18 18V9" 
                stroke="#8b6f47" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#6b4423]">Top Sellers</h3>
        </div>
        <span className="text-[10px] text-[#bfa77a] font-medium">This Month</span>
      </div>
      
      {/* Sellers List */}
      <div className="space-y-2">
        {sellers.map((seller, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ x: 3 }}
            className="flex items-center gap-3 bg-gradient-to-r from-[#fdfcfa] to-white rounded-xl p-3 hover:shadow-md transition-all cursor-pointer group border border-[#d4a574]/5"
          >
            {/* Rank */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white ${
              idx === 0 ? 'bg-gradient-to-br from-[#d4a574] to-[#bfa77a]' :
              idx === 1 ? 'bg-gradient-to-br from-[#bfa77a] to-[#a0826d]' :
              idx === 2 ? 'bg-gradient-to-br from-[#a0826d] to-[#8b6f47]' :
              'bg-gradient-to-br from-[#e7d7c1] to-[#d4a574]'
            }`}>
              {seller.rank}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-[#6b4423] text-base">{seller.name}</div>
              <div className="flex items-center gap-2 text-sm text-[#8b6f47] mt-0.5">
                <span className="text-base">{seller.items} sold</span>
                <span className="text-[#bfa77a] text-base">•</span>
                <span className="font-medium text-base">{seller.earnings}</span>
              </div>
            </div>
            
            {/* Arrow */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" 
              className="text-[#bfa77a] opacity-0 group-hover:opacity-100 transition-opacity">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        ))}
      </div>
      
      {/* Your Rank */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 bg-gradient-to-r from-[#f9f6f3] to-[#fdfcfa] rounded-xl p-3 border border-[#d4a574]/10"
      >
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="text-[#8b6f47]">Your Rank: </span>
            <span className="font-bold text-[#6b4423]">#23</span>
          </div>
          <div className="text-[#8b6f47]">
            <span>3 sold • </span>
            <span className="font-semibold text-[#6b4423]">रु8,500</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}