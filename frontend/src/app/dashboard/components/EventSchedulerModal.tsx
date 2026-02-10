'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarEvent } from '../page';

const CalendarSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <defs>
      <linearGradient id="calGradientModal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b6f47', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#6b5444', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect x="30" y="50" width="140" height="130" rx="12" fill="url(#calGradientModal)" />
    <rect x="30" y="50" width="140" height="30" rx="12" fill="#6b4423" />
    <rect x="60" y="35" width="10" height="30" rx="5" fill="#4e342e" />
    <rect x="130" y="35" width="10" height="30" rx="5" fill="#4e342e" />
    <rect x="45" y="95" width="110" height="70" fill="#f5f0eb" />
    {[0, 1, 2].map(i => (
      <line key={`h${i}`} x1="45" y1={105 + i * 20} x2="155" y2={105 + i * 20}
            stroke="#d4a574" strokeWidth="1.5" />
    ))}
    {[0, 1, 2].map(i => (
      <line key={`v${i}`} x1={65 + i * 30} y1="95" x2={65 + i * 30} y2="165"
            stroke="#d4a574" strokeWidth="1.5" />
    ))}
  </svg>
);

interface EventSchedulerModalProps {
  showScheduler: boolean;
  setShowScheduler: (show: boolean) => void;
  selectedDate: string | null;
  events: CalendarEvent[];
}

export default function EventSchedulerModal({
  showScheduler,
  setShowScheduler,
  selectedDate,
  events
}: EventSchedulerModalProps) {
  return (
    <AnimatePresence>
      {showScheduler && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setShowScheduler(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-gradient-to-br from-white to-[#f9f6f3] rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl border-4 border-[#d4a574]/20"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <motion.div
              initial={{ rotate: -10, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CalendarSVG className="w-20 h-20 mx-auto mb-6" />
            </motion.div>
            
            <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-[#6b4423] to-[#8b5a3c] bg-clip-text text-transparent mb-2">
              Events
            </h3>
            <p className="text-center text-[#8b6f47] mb-8 font-semibold">
              {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
            
            <div className={`space-y-4 mb-8 ${events.filter(e => e.date === selectedDate).length > 2 ? 'overflow-y-scroll h-60 scrollbar-custom' : ''}`}>
              {events
                .filter(e => e.date === selectedDate)
                .slice(0, 2)
                .map((event, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="bg-gradient-to-r from-[#f9f6f3] to-[#f5f0eb] rounded-2xl p-5 shadow-lg border-2 border-[#d4a574]/20 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div 
                        className={`w-4 h-4 rounded-full shadow-md ${
                          event.type === 'mentorship' ? 'bg-gradient-to-br from-emerald-400 to-green-500' :
                          event.type === 'study' ? 'bg-gradient-to-br from-amber-400 to-yellow-500' :
                          'bg-gradient-to-br from-orange-400 to-red-400'
                        }`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="font-bold text-[#6b4423] text-lg">{event.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8b6f47] font-semibold ml-7">
                      <span>🕐</span>
                      <span>{event.time}</span>
                    </div>
                    {/* Action buttons - shown on hover */}
                    <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-all">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-bold py-2 rounded-xl shadow-md"
                      >
                        Join
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-[#8b6f47] to-[#6b4423] text-white text-xs font-bold py-2 rounded-xl shadow-md"
                      >
                        Details
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
            </div>

            <style jsx>{`
              .scrollbar-custom {
                scrollbar-width: thin;
                scrollbar-color: #d4a574 #f9f6f3;
              }
              .scrollbar-custom::-webkit-scrollbar {
                width: 8px;
              }
              .scrollbar-custom::-webkit-scrollbar-thumb {
                background: #d4a574;
                border-radius: 8px;
              }
              .scrollbar-custom::-webkit-scrollbar-track {
                background: #f9f6f3;
              }
            `}</style>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowScheduler(false)}
              className="w-full bg-gradient-to-r from-[#8b6f47] to-[#6b4423] text-white rounded-2xl py-4 font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}