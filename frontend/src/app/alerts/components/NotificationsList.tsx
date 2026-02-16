'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { notificationAPI } from '../../../lib/api';

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  read: boolean;
  data: any;
  createdAt: string;
}

// Get emoji based on notification type
const getNotificationEmoji = (type: string) => {
  const emojiMap: { [key: string]: string } = {
    'message': '💬',
    'item_interest': '🛍️',
    'item_comment': '💬',
    'new_item': '🛒',
    'review': '⭐',
    'mentorship_request': '🤝',
    'mentorship_response': '✅'
  };
  return emojiMap[type] || '🔔';
};

// Get time ago string
const getTimeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
};

export default function NotificationsList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [processing, setProcessing] = useState<number | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationAPI.getNotifications(filter === 'unread');
      
      if (response.success) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      setProcessing(id);
      const response = await notificationAPI.markAsRead(id);
      
      if (response.success) {
        setNotifications(notifications.map(notif => 
          notif.id === id ? { ...notif, read: true } : notif
        ));
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    } finally {
      setProcessing(null);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await notificationAPI.markAllAsRead();
      
      if (response.success) {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
      }
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setProcessing(id);
      const response = await notificationAPI.deleteNotification(id);
      
      if (response.success) {
        setNotifications(notifications.filter(notif => notif.id !== id));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    } finally {
      setProcessing(null);
    }
  };

  const handleClearRead = async () => {
    if (!confirm('Are you sure you want to clear all read notifications?')) return;
    
    try {
      const response = await notificationAPI.clearReadNotifications();
      
      if (response.success) {
        setNotifications(notifications.filter(notif => !notif.read));
      }
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 400,
        color: '#8b6f47'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
          <div>Loading notifications...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Header with Filters */}
      <div style={{
        background: 'linear-gradient(145deg, #ffffff, #fef8f0)',
        borderRadius: 20,
        padding: '24px 32px',
        marginBottom: 24,
        border: '2px solid #f0e6dc',
        boxShadow: '0 4px 12px rgba(139, 111, 71, 0.08)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16
        }}>
          {/* Filter Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('all')}
              style={{
                padding: '10px 20px',
                borderRadius: 12,
                border: filter === 'all' ? '2px solid #f5c77e' : '2px solid #f0e6dc',
                background: filter === 'all' ? 'linear-gradient(135deg, #ffd89b, #f5c77e)' : '#fff',
                color: '#6b4423',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              All ({notifications.length})
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('unread')}
              style={{
                padding: '10px 20px',
                borderRadius: 12,
                border: filter === 'unread' ? '2px solid #f5c77e' : '2px solid #f0e6dc',
                background: filter === 'unread' ? 'linear-gradient(135deg, #ffd89b, #f5c77e)' : '#fff',
                color: '#6b4423',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Unread ({unreadCount})
            </motion.button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            {unreadCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMarkAllAsRead}
                style={{
                  padding: '10px 18px',
                  borderRadius: 12,
                  border: '2px solid #f0e6dc',
                  background: '#fff',
                  color: '#6b4423',
                  fontSize: 13,
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s'
                }}
              >
                ✓ Mark All Read
              </motion.button>
            )}
            {notifications.some(n => n.read) && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearRead}
                style={{
                  padding: '10px 18px',
                  borderRadius: 12,
                  border: '2px solid #f0e6dc',
                  background: '#fff',
                  color: '#8b6f47',
                  fontSize: 13,
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s'
                }}
              >
                🗑️ Clear Read
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(145deg, #ffffff, #fef8f0)',
            borderRadius: 20,
            padding: 60,
            textAlign: 'center',
            border: '2px solid #f0e6dc'
          }}
        >
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔕</div>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: '#6b4423', marginBottom: 8 }}>
            No notifications
          </h3>
          <p style={{ fontSize: 15, color: '#8b6f47' }}>
            {filter === 'unread' 
              ? "You're all caught up!" 
              : "You'll get notified about new messages, items, and connections"}
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          {notifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
              style={{
                background: notif.read 
                  ? 'linear-gradient(145deg, #fefefe, #faf8f6)'
                  : 'linear-gradient(145deg, #fffef8, #fff9ed)',
                borderRadius: 16,
                padding: 20,
                marginBottom: 12,
                border: notif.read ? '2px solid #f5f0e8' : '2px solid #ffd89b',
                boxShadow: notif.read 
                  ? '0 2px 8px rgba(139, 111, 71, 0.04)'
                  : '0 4px 12px rgba(255, 216, 155, 0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {!notif.read && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 4,
                  height: '100%',
                  background: 'linear-gradient(180deg, #ffd89b, #f5c77e)'
                }} />
              )}

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                {/* Icon */}
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #ffd89b, #f5c77e)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(245, 199, 126, 0.3)'
                }}>
                  {getNotificationEmoji(notif.type)}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#6b4423',
                    marginBottom: 6
                  }}>
                    {notif.title}
                  </h4>
                  <p style={{
                    fontSize: 14,
                    color: '#8b6f47',
                    marginBottom: 8,
                    lineHeight: 1.5
                  }}>
                    {notif.message}
                  </p>
                  <div style={{
                    fontSize: 13,
                    color: '#a0826d',
                    fontStyle: 'italic'
                  }}>
                    {getTimeAgo(notif.createdAt)}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  {!notif.read && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleMarkAsRead(notif.id)}
                      disabled={processing === notif.id}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        border: '2px solid #f0e6dc',
                        background: '#fff',
                        cursor: 'pointer',
                        fontSize: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: processing === notif.id ? 0.5 : 1
                      }}
                      title="Mark as read"
                    >
                      ✓
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(notif.id)}
                    disabled={processing === notif.id}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      border: '2px solid #f0e6dc',
                      background: '#fff',
                      cursor: 'pointer',
                      fontSize: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: processing === notif.id ? 0.5 : 1
                    }}
                    title="Delete"
                  >
                    🗑️
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
