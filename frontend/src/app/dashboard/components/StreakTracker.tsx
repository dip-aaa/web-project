'use client';


import React from 'react';
import { motion } from 'framer-motion';

export default function StreakTracker() {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-4 shadow-2xl border-2 border-[#d4a574]/20 w-full flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl"
        >
          🔥
        </motion.div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6b4423] to-[#8b5a3c] bg-clip-text text-transparent">
          Streak
        </h3>
      </div>
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-5xl font-black bg-gradient-to-br from-[#8b6f47] via-[#bfa77a] to-[#d4a574] bg-clip-text text-transparent mb-2"
        >
          5 Days
        </motion.div>
        <p className="text-sm text-[#8b6f47] mb-3 text-center">Your current learning streak</p>
        {/* Horizontal GitHub-style Contribution Grid - Coffee Theme */}
        <div className="space-y-1 w-full flex flex-col items-center">
          {/* Month labels on top */}
          <div className="flex w-full justify-center mb-1 gap-1 pl-8">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
              <span key={month} className="block w-8 text-[11px] text-[#bfa77a] text-center font-semibold tracking-wide">{month}</span>
            ))}
          </div>
          <div className="flex w-full justify-center">
            {/* Day labels vertically */}
            <div className="flex flex-col justify-between text-[11px] text-[#bfa77a] font-semibold tracking-wide mr-1 h-[112px]">
              {['Sun', 'Mon', 'Wed', 'Fri'].map((d, i) => (
                <span key={d} style={{ marginTop: i === 0 ? 0 : 24 }}>{d}</span>
              ))}
            </div>
            {/* Streak grid */}
            <div className="grid grid-rows-7 grid-flow-col gap-1">
              {Array.from({ length: 7 }).map((_, day) => (
                <React.Fragment key={day}>
                  {Array.from({ length: 20 }).map((_, week) => {
                    const streak = Math.floor(Math.random() * 5);
                    const colors = [
                      'bg-[#f9f6f3]',
                      'bg-[#e7d7c1]',
                      'bg-[#d4a574]',
                      'bg-[#bfa77a]',
                      'bg-[#8b6f47]',
                    ];
                    return (
                      <motion.div
                        key={`${day}-${week}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: (day * 20 + week) * 0.0015 }}
                        whileHover={{ scale: 1.3, zIndex: 10 }}
                        className={`w-3 h-3 rounded-[3px] ${colors[streak]} border border-[#e2c9a0]/40 cursor-pointer transition-all`}
                      />
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* Color legend */}
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[10px] text-[#bfa77a]">Less</span>
            <div className="flex gap-0.5">
              <div className="w-3 h-3 rounded-[3px] bg-[#f9f6f3] border border-[#e2c9a0]/40" />
              <div className="w-3 h-3 rounded-[3px] bg-[#e7d7c1] border border-[#e2c9a0]/40" />
              <div className="w-3 h-3 rounded-[3px] bg-[#d4a574] border border-[#e2c9a0]/40" />
              <div className="w-3 h-3 rounded-[3px] bg-[#bfa77a] border border-[#e2c9a0]/40" />
              <div className="w-3 h-3 rounded-[3px] bg-[#8b6f47] border border-[#e2c9a0]/40" />
            </div>
            <span className="text-[10px] text-[#bfa77a]">More</span>
          </div>
        </div>
        <div className="text-xs text-[#6b4423] font-bold mt-1">5/7 days</div>
      </div>
    </div>
  );
}