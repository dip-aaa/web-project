'use client';

import React from 'react';

interface UserData {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  department?: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  collegeId: number;
}

interface AboutSectionProps {
  userData: UserData | null;
}

export default function AboutSection({ userData }: AboutSectionProps) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 20,
        padding: 30,
        boxShadow: '0 4px 20px rgba(107, 68, 35, 0.08)',
        border: '2px solid #f0e6dc'
      }}
    >
      {/* About */}
      <div style={{ marginBottom: 30 }}>
        <h3 style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: '#6b4423',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span>📝</span> Profile Information
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ 
            fontSize: 15, 
            color: '#6b4423', 
            lineHeight: 1.7 
          }}>
            <strong>Name:</strong> {userData?.name || 'Not set'}
          </div>
          <div style={{ 
            fontSize: 15, 
            color: '#6b4423', 
            lineHeight: 1.7 
          }}>
            <strong>Email:</strong> {userData?.email || 'Not set'}
          </div>
          <div style={{ 
            fontSize: 15, 
            color: '#6b4423', 
            lineHeight: 1.7 
          }}>
            <strong>Phone:</strong> {userData?.phoneNumber || 'Not set'}
          </div>
          <div style={{ 
            fontSize: 15, 
            color: '#6b4423', 
            lineHeight: 1.7 
          }}>
            <strong>Department:</strong> {userData?.department || 'Not set'}
          </div>
        </div>
      </div>

      {/* College Info */}
      <div style={{ marginBottom: 30 }}>
        <h3 style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: '#6b4423',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span>🎓</span> College
        </h3>
        <p style={{ 
          fontSize: 15, 
          color: '#6b4423', 
          lineHeight: 1.7 
        }}>
          Khwopa College of Engineering
        </p>
      </div>
    </div>
  );
}
