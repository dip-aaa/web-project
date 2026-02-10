'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    label: 'Items Sold',
    value: '47',
    svg: '/market.svg',
    trend: '+12%'
  },
  {
    label: 'Items Bought',
    value: '23',
    svg: '/book.svg',
    trend: '+8%'
  },
  {
    label: 'Mentorship Given',
    value: '15',
    svg: '/mentor.svg',
    trend: '+5'
  },
  {
    label: 'Mentorship Received',
    value: '31',
    svg: '/cup.svg',
    trend: '+18%'
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          whileHover={{
            scale: 1.08,
            y: -8,
            transition: { type: 'spring', stiffness: 400 }
          }}
          className="relative group"
        >
          <div className="relative bg-[#fdfcfa] rounded-xl p-6 shadow-xl border-2 border-[#d4a574]/20 overflow-hidden flex flex-col items-center gap-2">
            {/* SVG Icon */}
            <img src={stat.svg} alt={stat.label} className="w-12 h-12 mb-2" />
            {/* Value */}
            <div className="text-2xl font-black text-[#d4883e]">{stat.value}</div>
            {/* Label */}
            <div className="text-xs font-bold text-[#6b4423] text-center leading-tight">{stat.label}</div>
            {/* Trend */}
            <div className="text-xs font-bold px-2 py-1 rounded-full bg-[#ffe4b5] text-[#8b5a3c] mt-2">{stat.trend}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}