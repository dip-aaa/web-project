'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/sidebar';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import AboutSection from './components/AboutSection';
import ListingsGrid from './components/ListingsGrid';
import ReviewsSection from './components/ReviewsSection';
import ActivityTimeline from './components/ActivityTimeline';
import { motion } from 'framer-motion';
import { authAPI } from '../../lib/api';

export type ProfileTab = 'overview' | 'listings' | 'reviews' | 'activity';

interface UserData {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  department?: string;
  collegeId: number;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get user data from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserData(user);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      router.push('/setup/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local storage even if API call fails
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      router.push('/setup/login');
    }
  };

  const handleProfileUpdate = async (updatedData: Partial<UserData>) => {
    try {
      const response = await authAPI.updateProfile(updatedData);
      if (response.success) {
        const newUserData = { ...userData, ...updatedData };
        setUserData(newUserData as UserData);
        localStorage.setItem('user', JSON.stringify(newUserData));
        alert('Profile updated successfully! ✨');
        setIsEditMode(false);
      } else {
        alert('Failed to update profile: ' + response.message);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f6f3' }}>
        <div style={{ textAlign: 'center', color: '#6b4423' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
          <h3 style={{ fontSize: 20, fontWeight: 'bold' }}>Loading profile...</h3>
        </div>
      </div>
    );
  }

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
            userData={userData}
            onLogout={handleLogout}
          />

          {/* Tab Navigation */}
          <div style={{ padding: '20px 40px 0' }}>
            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Content Area */}
          <div style={{ 
            padding: '30px 40px'
          }}>
            {/* Dynamic Content */}
            <div>
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AboutSection 
                    isEditMode={isEditMode} 
                    userData={userData}
                    onUpdate={handleProfileUpdate}
                  />
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}
