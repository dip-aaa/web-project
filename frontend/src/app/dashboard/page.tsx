'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/sidebar';
import WelcomeHeader from './components/WelcomeHeader';
import StatsGrid from './components/StatsGrid';
import CalendarSection from './components/CalendarSection';
import TodoList from './components/TodoList';
// import StreakTracker from './components/StreakTracker';
import MarketplacePreview from './components/MarketplacePreview';
import SuggestedMentors from './components/SuggestedMentors';
import TopSellers from './components/TopSellers';
import ActivityFeed from './components/ActivityFeed';
import EventSchedulerModal from './components/EventSchedulerModal';
import { motion } from 'framer-motion';

export interface CalendarEvent {
  date: string;
  type: 'mentorship' | 'study' | 'marketplace';
  title: string;
  time: string;
}

export interface MarketplaceItem {
  id: number;
  title: string;
  price: string;
  image: string;
  wishlisted: boolean;
}

export interface Task {
  id: number;
  title: string;
  date: string;
  completed: boolean;
}

export interface Activity {
  id: number;
  type: string;
  message: string;
  time: string;
}

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showScheduler, setShowScheduler] = useState(false);
  
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([
    { id: 1, title: 'Engineering Textbook', price: 'रु 500', image: '📚', wishlisted: false },
    { id: 2, title: 'Scientific Calculator', price: 'Exchange', image: '🔢', wishlisted: false },
    { id: 3, title: 'Lab Coat', price: 'रु 300', image: '🥼', wishlisted: true },
    { id: 4, title: 'Geometry Set', price: 'रु 150', image: '📐', wishlisted: false },
    { id: 5, title: 'Drawing Board', price: 'रु 400', image: '🎨', wishlisted: false },
  ]);

  const [events] = useState<CalendarEvent[]>([
    { date: '2026-02-10', type: 'mentorship', title: 'Math Tutoring', time: '2:00 PM' },
    { date: '2026-02-12', type: 'study', title: 'Physics Exam Prep', time: '4:00 PM' },
    { date: '2026-02-15', type: 'marketplace', title: 'Book Exchange Meet', time: '11:00 AM' },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Complete Physics assignment', date: '2026-02-10', completed: true },
    { id: 2, title: 'Study for Math quiz', date: '2026-02-11', completed: true },
    { id: 3, title: 'Review Chemistry notes', date: '2026-02-12', completed: false },
    { id: 4, title: 'Prepare presentation', date: '2026-02-13', completed: false },
  ]);

  const activities: Activity[] = [
    { id: 1, type: 'message', message: 'New message from Priya about Physics notes', time: '5m ago' },
    { id: 2, type: 'mentor', message: 'Dr. Sharma accepted your mentorship request', time: '1h ago' },
    { id: 3, type: 'marketplace', message: 'New item nearby: Engineering Graphics Book', time: '2h ago' },
    { id: 4, type: 'achievement', message: 'You earned "5 Day Streak" badge! 🎉', time: '3h ago' },
  ];

  const firstName = "Aarav";

  const toggleWishlist = (id: number) => {
    setMarketplaceItems(items =>
      items.map(item =>
        item.id === id ? { ...item, wishlisted: !item.wishlisted } : item
      )
    );
  };

  const getDayEvents = (day: number) => {
    const dateStr = `2026-02-${day.toString().padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  return (
    <div className="min-h-screen h-screen flex bg-gradient-to-br from-[#f9f6f3] via-[#fdfcfa] to-[#f5f0eb]">
      <Sidebar />
      
      <div className="flex-1 min-w-0 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Welcome Header */}
          <WelcomeHeader firstName={firstName} />

          {/* Stats Grid */}
          <StatsGrid />

          {/* Streak Tracker - Removed as requested */}

          {/* Calendar & Todo - Irregular Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Calendar - Takes 5 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-5"
            >
              <CalendarSection 
                events={events}
                getDayEvents={getDayEvents}
                setSelectedDate={setSelectedDate}
                setShowScheduler={setShowScheduler}
              />
            </motion.div>

            {/* Todo List - Takes 7 columns (further increased width) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-7"
            >
              <TodoList tasks={tasks} setTasks={setTasks} />
            </motion.div>

            
          </div>

          {/* Marketplace Preview */}
          <MarketplacePreview 
            items={marketplaceItems}
            toggleWishlist={toggleWishlist}
          />

          {/* Mentorship & Top Sellers - Asymmetric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Suggested Mentors - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-3"
            >
              <SuggestedMentors />
            </motion.div>

            {/* Top Sellers - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="lg:col-span-2"
            >
              <TopSellers />
            </motion.div>
          </div>

          {/* Activity Feed */}
          <ActivityFeed activities={activities} />
        </div>
      </div>

      {/* Event Scheduler Modal */}
      <EventSchedulerModal
        showScheduler={showScheduler}
        setShowScheduler={setShowScheduler}
        selectedDate={selectedDate}
        events={events}
      />

      <style jsx global>{`
        html, body, #__next {
          height: 100%;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}