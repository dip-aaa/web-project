'use client';

import React from 'react';
import { motion } from 'framer-motion';

const badges = [
  { 
    id: 1, 
    title: 'Top Seller', 
    icon: '🏆', 
    color: '#FFD700',
    description: 'Achieved $3,000+ in sales',
    unlocked: true
  },
  { 
    id: 2, 
    title: 'Mentor Pro', 
    icon: '🎓', 
    color: '#9C27B0',
    description: '200+ mentorship hours',
    unlocked: true
  },
  { 
    id: 3, 
    title: '5-Star Rating', 
    icon: '⭐', 
    color: '#FF9800',
    description: 'Maintained 4.9+ rating',
    unlocked: true
  },
  { 
    id: 4, 
    title: 'Early Adopter', 
    icon: '🚀', 
    color: '#2196F3',
    description: 'Joined in the first month',
    unlocked: true
  },
  { 
    id: 5, 
    title: 'Community Leader', 
    icon: '🌟', 
    color: '#4CAF50',
    description: '100+ helpful responses',
    unlocked: false,
    progress: 67
  },
  { 
    id: 6, 
    title: 'Master Mentor', 
    icon: '👑', 
    color: '#E91E63',
    description: '500 mentorship hours',
    unlocked: false,
    progress: 49
  }
];

export default function AchievementsBadges() {
  return (
    <div>
      {/* Achievements Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: 24,
          marginBottom: 20,
          boxShadow: '0 4px 20px rgba(107, 68, 35, 0.08)',
          border: '2px solid #f0e6dc'
        }}
      >
        <h3 style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: '#6b4423',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span>🏅</span> Achievements
        </h3>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 15
        }}>
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: badge.unlocked ? 1.05 : 1 }}
              style={{
                padding: 16,
                borderRadius: 12,
                background: badge.unlocked 
                  ? 'linear-gradient(135deg, #ffd89b, #f5c77e)' 
                  : '#f9f6f3',
                border: badge.unlocked 
                  ? '2px solid #d4a574' 
                  : '2px dashed #d4d4d4',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                opacity: badge.unlocked ? 1 : 0.6
              }}
            >
              {/* Icon */}
              <div style={{ 
                fontSize: 36,
                marginBottom: 8,
                filter: badge.unlocked ? 'none' : 'grayscale(100%)'
              }}>
                {badge.icon}
              </div>
              
              {/* Title */}
              <div style={{ 
                fontSize: 13,
                fontWeight: 'bold',
                color: '#6b4423',
                marginBottom: 4
              }}>
                {badge.title}
              </div>
              
              {/* Description */}
              <div style={{ 
                fontSize: 11,
                color: '#8b6f47',
                lineHeight: 1.3
              }}>
                {badge.description}
              </div>

              {/* Progress Bar for Locked Badges */}
              {!badge.unlocked && badge.progress && (
                <div style={{ marginTop: 10 }}>
                  <div style={{
                    height: 4,
                    borderRadius: 2,
                    background: '#e0e0e0',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${badge.progress}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #ffd89b, #f5c77e)'
                    }} />
                  </div>
                  <div style={{
                    fontSize: 10,
                    color: '#8b6f47',
                    marginTop: 4
                  }}>
                    {badge.progress}% Complete
                  </div>
                </div>
              )}

              {/* Unlocked Badge */}
              {badge.unlocked && (
                <div style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  fontSize: 16
                }}>
                  ✓
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: 24,
          boxShadow: '0 4px 20px rgba(107, 68, 35, 0.08)',
          border: '2px solid #f0e6dc'
        }}
      >
        <h3 style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: '#6b4423',
          marginBottom: 18,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span>📊</span> Quick Stats
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Profile Views', value: '1,234', icon: '👁️' },
            { label: 'Followers', value: '456', icon: '❤️' },
            { label: 'Total Transactions', value: '89', icon: '💰' },
            { label: 'Avg. Response Time', value: '2h', icon: '⚡' }
          ].map((stat, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: index < 3 ? '1px solid #f0e6dc' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>{stat.icon}</span>
                <span style={{ 
                  fontSize: 14, 
                  color: '#6b4423',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </span>
              </div>
              <span style={{ 
                fontSize: 16, 
                fontWeight: 'bold', 
                color: '#d4883e' 
              }}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
