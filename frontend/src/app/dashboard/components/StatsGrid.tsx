'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { marketplaceAPI, mentorshipAPI } from '../../../lib/api';

interface Stats {
  label: string;
  value: string | number;
  svg: string;
}

export default function StatsGrid() {
  const [stats, setStats] = useState<Stats[]>([
    { label: 'Items Sold', value: '-', svg: '/market.svg' },
    { label: 'Items Bought', value: '-', svg: '/book.svg' },
    { label: 'Mentorship Given', value: '-', svg: '/mentor.svg' },
    { label: 'Mentorship Received', value: '-', svg: '/cup.svg' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch items sold (user's own items)
        const myItemsResponse = await marketplaceAPI.getMyItems();
        const itemsSold = myItemsResponse.success ? myItemsResponse.data.length : 0;

        // Fetch items bought - need to count purchases
        // For now, we'll use 0 as a placeholder since there's no dedicated API
        const itemsBought = 0;

        // Fetch mentorship connections
        const connectedResponse = await mentorshipAPI.getConnectedUsers();
        const connectedCount = connectedResponse.success ? connectedResponse.data.length : 0;

        // Check if user is a mentor (mentorship given)
        let mentorshipGiven = 0;
        let mentorshipReceived = 0;
        
        try {
          const statusResponse = await mentorshipAPI.checkMentorStatus();
          if (statusResponse.success && statusResponse.data.isMentor) {
            // If user is a mentor, all connections are mentorship given
            mentorshipGiven = connectedCount;
            mentorshipReceived = 0;
          } else {
            // If user is not a mentor, all connections are mentorship received
            mentorshipReceived = connectedCount;
            mentorshipGiven = 0;
          }
        } catch (error) {
          console.error('Error checking mentor status:', error);
          mentorshipReceived = connectedCount;
        }

        setStats([
          { label: 'Items Sold', value: itemsSold, svg: '/market.svg' },
          { label: 'Items Bought', value: itemsBought, svg: '/book.svg' },
          { label: 'Mentorship Given', value: mentorshipGiven, svg: '/mentor.svg' },
          { label: 'Mentorship Received', value: mentorshipReceived, svg: '/cup.svg' },
        ]);
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
            <div className="text-2xl font-black text-[#d4883e]">
              {loading ? '...' : stat.value}
            </div>
            {/* Label */}
            <div className="text-xs font-bold text-[#6b4423] text-center leading-tight">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}