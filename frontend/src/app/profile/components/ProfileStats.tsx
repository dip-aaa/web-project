'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    label: 'Total Sales',
    value: '$3,247',
    icon: '💰',
    color: '#4CAF50',
    trend: '+23%'
  },
  {
    label: 'Items Listed',
    value: '47',
    icon: '📦',
    color: '#2196F3',
    trend: '+8'
  },
  {
    label: 'Reviews',
    value: '128',
    icon: '⭐',
    color: '#FF9800',
    trend: '4.9'
  },
  {
    label: 'Mentorship Hours',
    value: '245',
    icon: '🎓',
    color: '#9C27B0',
    trend: '+15h'
  },
  {
    label: 'Response Rate',
    value: '98%',
    icon: '⚡',
    color: '#f44336',
    trend: '+2%'
  }
];

export default function ProfileStats() {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 20,
      marginBottom: 20
    }}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ 
            y: -8,
            scale: 1.05,
            transition: { type: 'spring', stiffness: 400 }
          }}
          style={{
            background: '#fff',
            borderRadius: 16,
            padding: 20,
            boxShadow: '0 4px 20px rgba(107, 68, 35, 0.08)',
            border: '2px solid #f0e6dc',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background Icon */}
          <div style={{
            position: 'absolute',
            right: -10,
            bottom: -10,
            fontSize: 80,
            opacity: 0.05
          }}>
            {stat.icon}
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
              fontSize: 32, 
              marginBottom: 8 
            }}>
              {stat.icon}
            </div>
            <div style={{ 
              fontSize: 28, 
              fontWeight: 'bold', 
              color: '#6b4423',
              marginBottom: 4
            }}>
              {stat.value}
            </div>
            <div style={{ 
              fontSize: 13, 
              color: '#8b6f47',
              fontWeight: '600',
              marginBottom: 8
            }}>
              {stat.label}
            </div>
            <div style={{
              display: 'inline-block',
              padding: '4px 10px',
              borderRadius: 20,
              background: '#f0f7f0',
              color: '#2e7d32',
              fontSize: 12,
              fontWeight: 'bold'
            }}>
              {stat.trend}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
