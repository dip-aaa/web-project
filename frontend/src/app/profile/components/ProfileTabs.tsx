'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProfileTab } from '../page';

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

const tabs = [
  { id: 'overview' as ProfileTab, label: 'Overview', icon: '🏠' },
  { id: 'listings' as ProfileTab, label: 'My Listings', icon: '📦' },
  { id: 'reviews' as ProfileTab, label: 'Reviews', icon: '⭐' }
];

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: 16,
      padding: 8,
      display: 'flex',
      gap: 6,
      boxShadow: '0 2px 20px rgba(107, 68, 35, 0.08)',
      border: '1.5px solid #f0e6dc'
    }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              flex: 1,
              padding: '14px 24px',
              border: 'none',
              borderRadius: 12,
              background: isActive
                ? 'linear-gradient(135deg, #ffd89b, #f5c77e)'
                : 'transparent',
              color: isActive ? '#6b4423' : '#8b6f47',
              fontWeight: isActive ? 'bold' : '600',
              fontSize: 15,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: isActive ? '0 4px 15px rgba(212, 165, 116, 0.3)' : 'none'
            }}
          >
            <span style={{ fontSize: 18 }}>{tab.icon}</span>
            {tab.label}
          </motion.button>
        );
      })}
    </div>
  );
}
