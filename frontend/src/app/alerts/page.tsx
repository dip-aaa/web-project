'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../../components/Sidebar';
import AlertsSection from '../profile/components/AlertsSection';

export default function AlertsPage() {
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
          style={{ padding: '40px' }}
        >
          {/* Page Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #ffd89b, #f5c77e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24
              }}>
                🔔
              </div>
              <h1 style={{
                margin: 0,
                fontSize: 32,
                fontWeight: 700,
                color: '#6b4423',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Alerts & Notifications
              </h1>
            </div>
            <p style={{
              margin: 0,
              fontSize: 15,
              color: '#8b6f47',
              paddingLeft: 64,
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Manage your connection requests and notifications
            </p>
          </div>

          {/* Alerts Section */}
          <AlertsSection />
        </motion.div>
      </div>
    </div>
  );
}
