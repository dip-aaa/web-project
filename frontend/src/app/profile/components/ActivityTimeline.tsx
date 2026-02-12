'use client';

import React from 'react';
import { motion } from 'framer-motion';

const activities = [
  {
    id: 1,
    type: 'sale',
    title: 'Sold "React Course Notes"',
    description: 'Purchased by Emily Chen',
    time: '2 hours ago',
    icon: '💰',
    color: '#4CAF50'
  },
  {
    id: 2,
    type: 'mentorship',
    title: 'Completed Mentorship Session',
    description: 'Session with John Davis - React Hooks Discussion',
    time: '5 hours ago',
    icon: '🎓',
    color: '#9C27B0'
  },
  {
    id: 3,
    type: 'review',
    title: 'Received 5-Star Review',
    description: 'From Michael Brown on TypeScript Guide',
    time: '1 day ago',
    icon: '⭐',
    color: '#FF9800'
  },
  {
    id: 4,
    type: 'listing',
    title: 'Listed New Item',
    description: 'Added "Database Design Tutorial" to marketplace',
    time: '2 days ago',
    icon: '📦',
    color: '#2196F3'
  },
  {
    id: 5,
    type: 'sale',
    title: 'Sold "JavaScript Cheat Sheet"',
    description: 'Purchased by Lisa Wang',
    time: '3 days ago',
    icon: '💰',
    color: '#4CAF50'
  },
  {
    id: 6,
    type: 'mentorship',
    title: 'Scheduled Mentorship Session',
    description: 'Upcoming session with David Kim - Node.js Best Practices',
    time: '4 days ago',
    icon: '📅',
    color: '#9C27B0'
  },
  {
    id: 7,
    type: 'achievement',
    title: 'Unlocked Achievement',
    description: 'Earned "Top Seller" badge for reaching $3,000 in sales',
    time: '5 days ago',
    icon: '🏆',
    color: '#FFD700'
  },
  {
    id: 8,
    type: 'review',
    title: 'Received 5-Star Review',
    description: 'From Alex Johnson on Full Stack Project Template',
    time: '1 week ago',
    icon: '⭐',
    color: '#FF9800'
  }
];

export default function ActivityTimeline() {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 20,
      padding: 30,
      boxShadow: '0 4px 20px rgba(107, 68, 35, 0.08)',
      border: '2px solid #f0e6dc'
    }}>
      <h3 style={{ 
        fontSize: 22, 
        fontWeight: 'bold', 
        color: '#6b4423',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <span>📈</span> Recent Activity
      </h3>

      <div style={{ position: 'relative' }}>
        {/* Timeline Line */}
        <div style={{
          position: 'absolute',
          left: 24,
          top: 0,
          bottom: 0,
          width: 2,
          background: 'linear-gradient(180deg, #d4a574 0%, #f0e6dc 100%)'
        }} />

        {/* Activities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              style={{
                display: 'flex',
                gap: 20,
                position: 'relative',
                paddingLeft: 60
              }}
            >
              {/* Icon Circle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  position: 'absolute',
                  left: 0,
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#fff',
                  border: `3px solid ${activity.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  zIndex: 1
                }}
              >
                {activity.icon}
              </motion.div>

              {/* Content */}
              <div style={{ 
                flex: 1,
                background: '#f9f6f3',
                borderRadius: 12,
                padding: 16,
                border: '1.5px solid #f0e6dc'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 6
                }}>
                  <h4 style={{ 
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#6b4423'
                  }}>
                    {activity.title}
                  </h4>
                  <span style={{
                    fontSize: 12,
                    color: '#8b6f47',
                    whiteSpace: 'nowrap',
                    marginLeft: 12
                  }}>
                    {activity.time}
                  </span>
                </div>
                <p style={{
                  fontSize: 14,
                  color: '#8b6f47',
                  lineHeight: 1.5
                }}>
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%',
          marginTop: 20,
          padding: '12px',
          borderRadius: 12,
          background: 'linear-gradient(135deg, #ffd89b, #f5c77e)',
          border: 'none',
          color: '#6b4423',
          fontWeight: 'bold',
          fontSize: 14,
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(212, 165, 116, 0.3)'
        }}
      >
        Load More Activity
      </motion.button>
    </div>
  );
}
