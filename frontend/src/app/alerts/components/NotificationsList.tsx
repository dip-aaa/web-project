'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { notificationAPI, marketplaceAPI } from '../../../lib/api';
import { useRouter } from 'next/navigation';

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
    'mentorship_response': '✅',
    'buy_request': '🛒',
    'buy_request_accepted': '🎉'
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
  const router = useRouter();

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const handleAcceptBuyRequest = async (id: number) => {
    try {
      setProcessing(id);
      const response = await marketplaceAPI.acceptBuyRequest(id);
      if (response.success) {
        alert('✅ Request accepted! Redirecting to chat...');
        // Refresh notifications to show the updated state
        fetchNotifications();
        // Redirect to chat
        router.push('/chat');
      } else {
        alert('❌ Failed to accept request: ' + response.message);
      }
    } catch (error) {
      console.error('Error accepting buy request:', error);
      alert('❌ Error accepting request. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  const handleRejectBuyRequest = async (id: number) => {
    try {
      setProcessing(id);
      const response = await marketplaceAPI.rejectBuyRequest(id);
      if (response.success) {
        alert('Request dismissed.');
        fetchNotifications();
      } else {
        alert('❌ Failed to dismiss request: ' + response.message);
      }
    } catch (error) {
      console.error('Error dismissing buy request:', error);
      alert('❌ Error dismissing request. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

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
        background: '#fff',
        borderRadius: 8,
        padding: '16px 24px',
        marginBottom: 16,
        border: '1px solid #e0e0e0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
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
              whileHover={{ backgroundColor: '#f3f6f8' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter('all')}
              style={{
                padding: '6px 16px',
                borderRadius: 16,
                border: filter === 'all' ? 'none' : '1px solid #666',
                background: filter === 'all' ? '#8b6f47' : 'transparent',
                color: filter === 'all' ? '#fff' : '#666',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              All ({notifications.length})
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: '#f3f6f8' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter('unread')}
              style={{
                padding: '6px 16px',
                borderRadius: 16,
                border: filter === 'unread' ? 'none' : '1px solid #666',
                background: filter === 'unread' ? '#8b6f47' : 'transparent',
                color: filter === 'unread' ? '#fff' : '#666',
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
                whileHover={{ textDecoration: 'underline' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMarkAllAsRead}
                style={{
                  padding: '6px 12px',
                  borderRadius: 4,
                  border: 'none',
                  background: 'transparent',
                  color: '#8b6f47',
                  fontSize: 14,
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                Mark all as read
              </motion.button>
            )}
            {notifications.some(n => n.read) && (
              <motion.button
                whileHover={{ textDecoration: 'underline' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClearRead}
                style={{
                  padding: '6px 12px',
                  borderRadius: 4,
                  border: 'none',
                  background: 'transparent',
                  color: '#666',
                  fontSize: 14,
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                Clear read
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
            background: '#fff',
            borderRadius: 8,
            padding: 60,
            textAlign: 'center',
            border: '1px solid #e0e0e0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
        >
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔕</div>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: '#000', marginBottom: 8 }}>
            No notifications
          </h3>
          <p style={{ fontSize: 16, color: '#666' }}>
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
                background: notif.read ? '#fff' : '#fefaf6',
                borderRadius: 0,
                padding: '16px 24px',
                marginBottom: 0,
                borderBottom: '1px solid #e0e0e0',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background-color 0.3s'
              }}
            >
              {!notif.read && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: 8,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#c6a664',
                  transform: 'translateY(-50%)'
                }} />
              )}

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                {/* Icon */}
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: '#f3f6f8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  flexShrink: 0
                }}>
                  {getNotificationEmoji(notif.type)}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontSize: 16,
                    fontWeight: notif.read ? 400 : 700,
                    color: '#000',
                    marginBottom: 4
                  }}>
                    {notif.title}
                  </h4>
                  <p style={{
                    fontSize: 15,
                    color: '#666',
                    marginBottom: 4,
                    lineHeight: 1.4
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
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0 }}>
                  {notif.type === 'buy_request' && !notif.read ? (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <motion.button
                        whileHover={{ backgroundColor: '#6b4423' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAcceptBuyRequest(notif.id)}
                        disabled={processing === notif.id}
                        style={{
                          padding: '6px 16px',
                          borderRadius: 16,
                          background: '#8b6f47',
                          color: '#fff',
                          border: 'none',
                          fontWeight: 600,
                          fontSize: 13,
                          cursor: 'pointer',
                          opacity: processing === notif.id ? 0.7 : 1
                        }}
                      >
                        Accept & Chat
                      </motion.button>
                      <motion.button
                        whileHover={{ backgroundColor: '#f3f6f8' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRejectBuyRequest(notif.id)}
                        disabled={processing === notif.id}
                        style={{
                          padding: '6px 16px',
                          borderRadius: 16,
                          background: 'transparent',
                          color: '#666',
                          border: '1px solid #666',
                          fontWeight: 600,
                          fontSize: 13,
                          cursor: 'pointer',
                          opacity: processing === notif.id ? 0.7 : 1
                        }}
                      >
                        Reject
                      </motion.button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: 8 }}>
                      {!notif.read && (
                        <motion.button
                          whileHover={{ backgroundColor: '#f3f6f8' }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleMarkAsRead(notif.id)}
                          disabled={processing === notif.id}
                          style={{
                            padding: '4px 8px',
                            borderRadius: 4,
                            border: 'none',
                            background: 'transparent',
                            color: '#8b6f47',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: 600,
                            opacity: processing === notif.id ? 0.5 : 1
                          }}
                        >
                          Mark as read
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ backgroundColor: '#f3f6f8' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(notif.id)}
                        disabled={processing === notif.id}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 4,
                          border: 'none',
                          background: 'transparent',
                          color: '#666',
                          cursor: 'pointer',
                          fontSize: 13,
                          fontWeight: 600,
                          opacity: processing === notif.id ? 0.5 : 1
                        }}
                      >
                        Delete
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
