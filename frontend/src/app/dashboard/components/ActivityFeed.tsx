'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from '../page';

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border-2 border-[#d4a574]/20"
    >
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <motion.circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="#8b6f47" 
              strokeWidth="6" 
              strokeDasharray="5 5"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <circle cx="50" cy="50" r="25" fill="#8b6f47" />
            <rect x="48" y="30" width="4" height="20" fill="white" rx="2" />
            <rect x="48" y="50" width="4" height="15" fill="white" rx="2" />
          </svg>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6b4423] to-[#8b5a3c] bg-clip-text text-transparent">
            Recent Activity
          </h3>
        </div>
        <button
          className="flex items-center gap-1 text-[#8b6f47] font-bold hover:underline focus:outline-none transition-all"
        >
          View All
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M7 5l5 5-5 5" stroke="#8b6f47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      
      <ul className="space-y-2">
        {activities.map((activity, idx) => (
          <li key={activity.id}>
            <div className="bg-gradient-to-r from-[#fdfcfa] to-white rounded-xl px-4 py-2 flex items-center min-h-[36px] border border-[#d4a574]/10 shadow-sm">
              <span className="text-[#6b4423] font-medium flex-1">{activity.message}</span>
              <span className="ml-2 text-xs text-[#8b6f47]">({activity.time})</span>
            </div>
          </li>
        ))}
      </ul>
      
      {/* Removed bottom View All Activity button, now at top right */}
    </motion.div>
  );
}