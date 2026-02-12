'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/sidebar';
import ProfileHeader from './components/ProfileHeader';
import ProfileStats from './components/ProfileStats';
import ProfileTabs from './components/ProfileTabs';
import AboutSection from './components/AboutSection';
import ListingsGrid from './components/ListingsGrid';
import ReviewsSection from './components/ReviewsSection';
import AchievementsBadges from './components/AchievementsBadges';
import ActivityTimeline from './components/ActivityTimeline';
import { motion } from 'framer-motion';

export type ProfileTab = 'overview' | 'listings' | 'reviews' | 'activity';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div style={{ height: '100vh', display: 'flex', background: '#f9f6f3', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ 
        minWidth: 220, 
        maxWidth: 260, 
        background: '#fff', 
        borderRight: '1.5px solid #e8ddd4', 
        zIndex: 2, 
        flexShrink: 0
      }}>
        <Sidebar animate={false} />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto', height: '100vh' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header with Cover & Avatar */}
          <ProfileHeader 
            isEditMode={isEditMode}
            onEditToggle={() => setIsEditMode(!isEditMode)}
          />

          {/* Stats Section */}
          <div style={{ padding: '20px 40px' }}>
            <ProfileStats />
          </div>

          {/* Tab Navigation */}
          <div style={{ padding: '0 40px' }}>
            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Content Area */}
          <div style={{ 
            padding: '30px 40px', 
            display: 'grid', 
            gridTemplateColumns: '1fr 380px', 
            gap: '30px',
            alignItems: 'start'
          }}>
            {/* Left Column - Dynamic Content */}
            <div>
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AboutSection isEditMode={isEditMode} />
                  <div style={{ marginTop: 20 }}>
                    <h3 style={{ 
                      fontSize: 22, 
                      fontWeight: 'bold', 
                      color: '#6b4423', 
                      marginBottom: 15 
                    }}>
                      Recent Listings
                    </h3>
                    <ListingsGrid limit={4} />
                  </div>
                </motion.div>
              )}

              {activeTab === 'listings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ListingsGrid />
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReviewsSection />
                </motion.div>
              )}

              {activeTab === 'activity' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ActivityTimeline />
                </motion.div>
              )}
            </div>

            {/* Right Column - Achievements & Info */}
            <div style={{ position: 'sticky', top: 20 }}>
              <AchievementsBadges />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
