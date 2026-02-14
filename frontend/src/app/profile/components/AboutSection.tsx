'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface UserData {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  department?: string;
  collegeId: number;
}

interface AboutSectionProps {
  isEditMode: boolean;
  userData: UserData | null;
  onUpdate: (data: Partial<UserData>) => void;
}

export default function AboutSection({ isEditMode, userData, onUpdate }: AboutSectionProps) {
  const [name, setName] = useState(userData?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || '');
  const [department, setDepartment] = useState(userData?.department || '');

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setPhoneNumber(userData.phoneNumber || '');
      setDepartment(userData.department || '');
    }
  }, [userData]);

  const handleSave = () => {
    onUpdate({
      name,
      phoneNumber,
      department
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
        
        {isEditMode ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#6b4423',
                marginBottom: 8
              }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: '2px solid #f0e6dc',
                  fontSize: 15,
                  color: '#6b4423',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#6b4423',
                marginBottom: 8
              }}>
                Phone Number
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g., +977 9812345678"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: '2px solid #f0e6dc',
                  fontSize: 15,
                  color: '#6b4423',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#6b4423',
                marginBottom: 8
              }}>
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g., Computer Science"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: '2px solid #f0e6dc',
                  fontSize: 15,
                  color: '#6b4423',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              style={{
                background: 'linear-gradient(135deg, #ffd89b, #f5c77e)',
                color: '#6b4423',
                border: 'none',
                borderRadius: 12,
                padding: '12px 24px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 15,
                marginTop: 10
              }}
            >
              💾 Save Changes
            </motion.button>
          </div>
        ) : (
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
        )}
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
    </motion.div>
  );
}
