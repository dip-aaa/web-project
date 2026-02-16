'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarEvent } from '../page';
import { taskAPI } from '../../../lib/api';

const CalendarSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <defs>
      <linearGradient id="calGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b6f47', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#6b5444', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect x="30" y="50" width="140" height="130" rx="12" fill="url(#calGradient)" />
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

interface Task {
  id: number;
  title: string;
  date: string;
  completed: boolean;
}

interface CalendarSectionProps {
  events: CalendarEvent[];
  getDayEvents: (day: number) => CalendarEvent[];
  setSelectedDate: (date: string) => void;
  setShowScheduler: (show: boolean) => void;
}

export default function CalendarSection({ 
  events, 
  getDayEvents, 
  setSelectedDate, 
  setShowScheduler 
}: CalendarSectionProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
  const todayDate = today.getDate();

  // Fetch tasks from database
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await taskAPI.getTasks();
        if (response.success && response.data) {
          setTasks(response.data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Get tasks for a specific day
  const getDayTasks = (day: number): Task[] => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(task => task.date === dateStr);
  };

  // Navigate months
  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border-2 border-[#d4a574]/20 h-full">
      <div className="flex items-center gap-4 mb-6">
        <CalendarSVG className="w-12 h-12" />
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6b4423] to-[#8b5a3c] bg-clip-text text-transparent">
          Study Calendar
        </h3>
      </div>

      {/* Month/Year Navigation */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={previousMonth}
          className="p-2 rounded-xl bg-gradient-to-r from-[#8b6f47] to-[#6b4423] text-white font-bold hover:shadow-lg transition-all"
        >
          ←
        </motion.button>
        <div className="text-center">
          <div className="text-lg font-bold text-[#6b4423]">{monthNames[currentMonth]}</div>
          <div className="text-sm text-[#8b6f47]">{currentYear}</div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextMonth}
          className="p-2 rounded-xl bg-gradient-to-r from-[#8b6f47] to-[#6b4423] text-white font-bold hover:shadow-lg transition-all"
        >
          →
        </motion.button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
          <motion.div
            key={day + idx}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
            className="text-center font-bold text-[#8b6f47] py-2"
          >
            {day}
          </motion.div>
        ))}
      </div>

      {/* Calendar grid */}
      {loading ? (
        <div className="text-center py-12 text-[#8b6f47]">
          <div className="text-3xl mb-2">⏳</div>
          <div className="text-sm">Loading...</div>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
            <div key={`empty-${idx}`} className="aspect-square" />
          ))}
          
          {/* Days of the month */}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day, idx) => {
            const dayTasks = getDayTasks(day);
            const hasTasks = dayTasks.length > 0;
            const isToday = isCurrentMonth && day === todayDate;
            
            return (
              <motion.button
                key={day}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.01 }}
                whileHover={{ scale: 1.15, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (hasTasks) {
                    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    setSelectedDate(dateStr);
                    setShowScheduler(true);
                  }
                }}
                className={`
                  aspect-square rounded-2xl flex flex-col items-center justify-center font-bold
                  transition-all duration-300 relative group
                  ${isToday
                    ? 'bg-gradient-to-br from-[#8b6f47] to-[#6b4423] text-white shadow-lg scale-110'
                    : hasTasks
                    ? 'bg-gradient-to-br from-[#f9f6f3] to-[#f5f0eb] text-[#6b5444] shadow-md'
                    : 'bg-gradient-to-br from-[#fdfcfa] to-[#f9f6f3] text-[#8b6f47] hover:shadow-md'
                  }
                  ${hasTasks ? 'ring-2 ring-[#8b6f47]' : ''}
                `}
              >
                <span className="relative z-10 text-sm">{day}</span>
                {hasTasks && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex gap-0.5 mt-1 flex-wrap justify-center px-1"
                  >
                    {dayTasks.slice(0, 3).map((task, idx) => (
                      <motion.div
                        key={task.id}
                        className={`w-1 h-1 rounded-full ${
                          task.completed ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        title={task.title}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.3 }}
                      />
                    ))}
                  </motion.div>
                )}
                {hasTasks && dayTasks.length > 3 && (
                  <span className="text-[8px] text-[#8b6f47]">+{dayTasks.length - 3}</span>
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6">
        {[
          { color: 'bg-amber-500', label: 'Pending', icon: '📝' },
          { color: 'bg-emerald-500', label: 'Completed', icon: '✓' }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + idx * 0.1 }}
            className="flex items-center gap-2"
          >
            <div className={`w-3 h-3 ${item.color} rounded-full`} />
            <span className="text-sm text-[#6b5444] font-semibold">{item.icon} {item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}