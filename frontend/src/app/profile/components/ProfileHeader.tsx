'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface UserData {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  department?: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  collegeId: number;
  avgRating?: number;
  reviewCount?: number;
}

interface ProfileHeaderProps {
  isEditMode: boolean;
  onEditToggle: () => void;
  userData: UserData | null;
}

export default function ProfileHeader({ isEditMode, onEditToggle, userData }: ProfileHeaderProps) {
  const displayName = userData?.name || 'Guest User';
  const displayEmail = userData?.email || 'user@khwopa.edu.np';
  const displayDepartment = userData?.department || 'Not specified';
  const coverImage = userData?.coverImageUrl || '';
  const profileImage = userData?.profileImageUrl || '/6.png';

  return (
    <div style={{ position: 'relative' }}>
      {/* Cover Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          height: 280,
          background: coverImage ? `url(${coverImage})` : 'linear-gradient(135deg, #6b4423 0%, #8b5a3c 50%, #d4a574 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative Pattern (only show if no cover image) */}
        {!coverImage && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("/coffee-pattern.svg")',
            backgroundSize: '200px',
            opacity: 0.1
          }} />
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
                    src={profileImage}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
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
                    {displayName}
                  </h1>
                  <p style={{
                    fontSize: 18,
                    color: '#8b6f47',
                    marginBottom: 12
                  }}>
                    {displayEmail} • {displayDepartment}
                  </p>
                  <p style={{
                    fontSize: 16,
                    color: '#6b4423',
                    lineHeight: 1.6,
                    maxWidth: 600,
                    marginBottom: 15
                  }}>
                    Welcome to your profile! Edit your information and manage your marketplace listings.
                  </p>

                  {/* Meta Info */}
                  <div style={{
                    display: 'flex',
                    gap: 20,
                    fontSize: 14,
                    color: '#8b6f47',
                    marginBottom: 15
                  }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <img src="/svg/profile/location.svg" alt="" style={{ width: 14, height: 14 }} /> Kathmandu, Nepal
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <img src="/svg/profile/calendar.svg" alt="" style={{ width: 14, height: 14 }} /> Joined January 2024
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <img src="/svg/profile/star.svg" alt="" style={{ width: 14, height: 14 }} /> {userData?.avgRating || "0.0"} Rating
                    </span>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <div style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onEditToggle}
                    style={{
                      background: 'linear-gradient(135deg, #ffd89b, #f5c77e)',
                      color: '#6b4423',
                      border: 'none',
                      borderRadius: 12,
                      padding: '12px 28px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: 15,
                      boxShadow: '0 4px 15px rgba(107, 68, 35, 0.2)'
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <img src="/svg/profile/edit.svg" alt="" style={{ width: 16, height: 16 }} /> Edit Profile
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
