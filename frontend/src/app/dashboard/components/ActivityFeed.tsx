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
      
      <div className="space-y-6">
        {activities.map((activity, idx) => {
          const iconConfig = {
            achievement: { bg: 'from-yellow-400 to-amber-500', icon: '🏆' },
            mentor: { bg: 'from-emerald-400 to-green-500', icon: '🎓' },
            marketplace: { bg: 'from-orange-400 to-red-400', icon: '🛍️' },
            message: { bg: 'from-blue-400 to-indigo-500', icon: '💬' },
          };
          
          const config = iconConfig[activity.type as keyof typeof iconConfig] || iconConfig.message;
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + idx * 0.1 }}
              className="flex gap-5 group"
            >
              <div className="relative flex-shrink-0">
                <motion.div
                  animate={idx === 0 ? {
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(139, 111, 71, 0)',
                      '0 0 0 10px rgba(139, 111, 71, 0)',
                      '0 0 0 0 rgba(139, 111, 71, 0)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${config.bg} shadow-lg flex items-center justify-center text-xl`}
                >
                  {config.icon}
                </motion.div>
                {idx < activities.length - 1 && (
                  <div className="absolute top-14 left-6 w-0.5 h-12 bg-gradient-to-b from-[#d4a574] to-transparent" />
                )}
              </div>
              
              <motion.div
                whileHover={{ x: 5 }}
                className="flex-1 pb-5 cursor-pointer bg-gradient-to-r from-[#f9f6f3] to-[#fdfcfa] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-[#d4a574]/10"
              >
                <p className="text-[#6b4423] font-semibold leading-relaxed mb-2">{activity.message}</p>
                <div className="flex items-center gap-2 text-sm text-[#8b6f47]">
                  <span>🕐</span>
                  <span className="font-bold">{activity.time}</span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Removed bottom View All Activity button, now at top right */}
    </motion.div>
  );
}