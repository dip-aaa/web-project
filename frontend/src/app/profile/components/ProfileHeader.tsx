'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProfileHeaderProps {
  isEditMode: boolean;
  onEditToggle: () => void;
}

export default function ProfileHeader({ isEditMode, onEditToggle }: ProfileHeaderProps) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Cover Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          height: 280,
          background: 'linear-gradient(135deg, #6b4423 0%, #8b5a3c 50%, #d4a574 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/coffee-pattern.svg")',
          backgroundSize: '200px',
          opacity: 0.1
        }} />
        
        {/* Edit Cover Button */}
        {isEditMode && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: 12,
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#6b4423',
              fontSize: 14
            }}
          >
            📷 Change Cover
          </motion.button>
        )}
      </motion.div>

      {/* Profile Info Section */}
      <div style={{ 
        padding: '0 40px', 
        transform: 'translateY(-60px)',
        position: 'relative'
      }}>
        <div style={{ 
          background: '#fff', 
          borderRadius: 20, 
          padding: 30,
          boxShadow: '0 8px 30px rgba(107, 68, 35, 0.15)',
          border: '2px solid #f0e6dc'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 25 }}>
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ffd89b, #f5c77e)',
                padding: 5,
                transform: 'translateY(-80px)'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: '#6b4423',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="/6.png" 
                    alt="Profile" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
              
              {isEditMode && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    background: '#6b4423',
                    border: '3px solid #fff',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18
                  }}
                >
                  📷
                </motion.button>
              )}
            </motion.div>

            {/* User Info */}
            <div style={{ flex: 1, paddingTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h1 style={{ 
                    fontSize: 36, 
                    fontWeight: 'bold', 
                    color: '#6b4423',
                    marginBottom: 5
                  }}>
                    Aarav Nepal
                  </h1>
                  <p style={{ 
                    fontSize: 18, 
                    color: '#8b6f47',
                    marginBottom: 12
                  }}>
                    @Aarav • Senior Developer & Mentor
                  </p>
                  <p style={{ 
                    fontSize: 16, 
                    color: '#6b4423',
                    lineHeight: 1.6,
                    maxWidth: 600,
                    marginBottom: 15
                  }}>
                    Passionate about teaching web development and helping students grow. 
                    Specializing in React, Node.js, and full-stack development. 
                    Coffee enthusiast ☕ | 5+ years mentoring
                  </p>
                  
                  {/* Meta Info */}
                  <div style={{ 
                    display: 'flex', 
                    gap: 20, 
                    fontSize: 14, 
                    color: '#8b6f47',
                    marginBottom: 15
                  }}>
                    <span>📍 Kathmandu, Nepal</span>
                    <span>📅 Joined January 2024</span>
                    <span>⭐ 4.9 Rating</span>
                  </div>

                  {/* Social Links */}
                  <div style={{ display: 'flex', gap: 10 }}>
                    {['🌐', '💼', '🐦', '📧'].map((icon, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: '#f9f6f3',
                          border: '1.5px solid #d4a574',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 16
                        }}
                      >
                        {icon}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Edit Profile Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onEditToggle}
                  style={{
                    background: isEditMode ? '#6b4423' : 'linear-gradient(135deg, #ffd89b, #f5c77e)',
                    color: isEditMode ? '#fff' : '#6b4423',
                    border: 'none',
                    borderRadius: 12,
                    padding: '12px 28px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 15,
                    boxShadow: '0 4px 15px rgba(107, 68, 35, 0.2)'
                  }}
                >
                  {isEditMode ? '✓ Save Profile' : '✏️ Edit Profile'}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
