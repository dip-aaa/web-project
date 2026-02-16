'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { mentorshipAPI } from '../../../lib/api';

interface ConnectionRequest {
  id: number;
  status: string;
  sentAt: string;
  receivedAt?: string;
  mentee?: {
    id: number;
    name: string;
    email: string;
    department: string;
  };
  mentor?: {
    id: number;
    name: string;
    email: string;
    department: string;
  };
}

export default function AlertsSection() {
  const [receivedRequests, setReceivedRequests] = useState<ConnectionRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<ConnectionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'received' | 'sent'>('received');
  const [processing, setProcessing] = useState<number | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      
      // Fetch received requests
      const receivedResponse = await mentorshipAPI.getConnectionRequests('received');
      if (receivedResponse.success) {
        setReceivedRequests(receivedResponse.data);
      }

      // Fetch sent requests
      const sentResponse = await mentorshipAPI.getConnectionRequests('sent');
      if (sentResponse.success) {
        setSentRequests(sentResponse.data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestResponse = async (requestId: number, action: 'accept' | 'reject') => {
    try {
      setProcessing(requestId);
      const response = await mentorshipAPI.respondToRequest(requestId, action);
      
      if (response.success) {
        alert(`Request ${action}ed successfully!`);
        // Refresh requests
        await fetchRequests();
      } else {
        alert(response.message || `Failed to ${action} request`);
      }
    } catch (error: any) {
      console.error(`Error ${action}ing request:`, error);
      alert(error.message || `An error occurred while ${action}ing the request`);
    } finally {
      setProcessing(null);
    }
  };

  const handleCancelRequest = async (requestId: number) => {
    if (!confirm('Are you sure you want to cancel this connection request?')) return;

    try {
      setProcessing(requestId);
      const response = await mentorshipAPI.cancelConnectionRequest(requestId);
      
      if (response.success) {
        alert('Connection request canceled successfully!');
        // Refresh requests
        await fetchRequests();
      } else {
        alert(response.message || 'Failed to cancel request');
      }
    } catch (error: any) {
      console.error('Error canceling request:', error);
      alert(error.message || 'An error occurred while canceling the request');
    } finally {
      setProcessing(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div style={{
        background: 'white',
        borderRadius: 20,
        padding: 40,
        boxShadow: '0 4px 20px rgba(107, 68, 35, 0.08)',
        textAlign: 'center',
        color: '#8b6f47'
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔔</div>
        <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#6b4423' }}>Loading alerts...</h3>
      </div>
    );
  }

  const currentRequests = activeView === 'received' ? receivedRequests : sentRequests;

  return (
    <div style={{
      background: 'white',
      borderRadius: 20,
      padding: 30,
      boxShadow: '0 4px 20px rgba(107, 68, 35, 0.08)',
      border: '1.5px solid #f0e6dc'
    }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{
          fontSize: 26,
          fontWeight: 'bold',
          color: '#6b4423',
          marginBottom: 8
        }}>
          🔔 Connection Requests
        </h2>
        <p style={{ color: '#8b6f47', fontSize: 14 }}>
          Manage your mentorship connection requests
        </p>
      </div>

      {/* Toggle between received and sent */}
      <div style={{
        display: 'flex',
        gap: 12,
        marginBottom: 24,
        background: '#f9f6f3',
        padding: 6,
        borderRadius: 12
      }}>
        <button
          onClick={() => setActiveView('received')}
          style={{
            flex: 1,
            padding: '10px 20px',
            borderRadius: 8,
            border: 'none',
            background: activeView === 'received' ? 'linear-gradient(135deg, #ffd89b, #f5c77e)' : 'transparent',
            color: activeView === 'received' ? '#6b4423' : '#8b6f47',
            fontWeight: activeView === 'received' ? 'bold' : '600',
            fontSize: 14,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Received ({receivedRequests.length})
        </button>
        <button
          onClick={() => setActiveView('sent')}
          style={{
            flex: 1,
            padding: '10px 20px',
            borderRadius: 8,
            border: 'none',
            background: activeView === 'sent' ? 'linear-gradient(135deg, #ffd89b, #f5c77e)' : 'transparent',
            color: activeView === 'sent' ? '#6b4423' : '#8b6f47',
            fontWeight: activeView === 'sent' ? 'bold' : '600',
            fontSize: 14,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Sent ({sentRequests.length})
        </button>
      </div>

      {/* Requests List */}
      {currentRequests.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#8b6f47'
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📭</div>
          <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#6b4423', marginBottom: 8 }}>
            No {activeView} requests
          </h3>
          <p style={{ fontSize: 14 }}>
            {activeView === 'received' 
              ? 'When mentees send you connection requests, they will appear here.'
              : 'Your sent connection requests will appear here.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {currentRequests.map((request, index) => {
            const user = activeView === 'received' ? request.mentee : request.mentor;
            if (!user) return null;

            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: 'linear-gradient(135deg, #fdfcfa, #f9f6f3)',
                  borderRadius: 16,
                  padding: 20,
                  border: '1.5px solid #f0e6dc',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ffd89b, #f5c77e)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#6b4423',
                  flexShrink: 0
                }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#6b4423',
                    marginBottom: 4
                  }}>
                    {user.name}
                  </h4>
                  <p style={{
                    fontSize: 13,
                    color: '#8b6f47',
                    marginBottom: 4
                  }}>
                    {user.department || 'Student'} · {user.email}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 12,
                    color: '#a0826d'
                  }}>
                    <span>{formatDate(request.sentAt)}</span>
                    <span>•</span>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: 6,
                      background: request.status === 'pending' ? '#fef3c7' : request.status === 'accepted' ? '#d1fae5' : '#fee2e2',
                      color: request.status === 'pending' ? '#92400e' : request.status === 'accepted' ? '#065f46' : '#991b1b',
                      fontWeight: 600
                    }}>
                      {request.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                {activeView === 'received' && request.status === 'pending' && (
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button
                      onClick={() => handleRequestResponse(request.id, 'accept')}
                      disabled={processing === request.id}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 10,
                        border: 'none',
                        background: 'linear-gradient(135deg, #5a9e6f, #3d7a52)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 13,
                        cursor: processing === request.id ? 'not-allowed' : 'pointer',
                        opacity: processing === request.id ? 0.6 : 1
                      }}
                    >
                      {processing === request.id ? '...' : 'Accept'}
                    </button>
                    <button
                      onClick={() => handleRequestResponse(request.id, 'reject')}
                      disabled={processing === request.id}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 10,
                        border: '1.5px solid #d4a574',
                        background: 'white',
                        color: '#8b6f47',
                        fontWeight: 'bold',
                        fontSize: 13,
                        cursor: processing === request.id ? 'not-allowed' : 'pointer',
                        opacity: processing === request.id ? 0.6 : 1
                      }}
                    >
                      {processing === request.id ? '...' : 'Reject'}
                    </button>
                  </div>
                )}

                {/* Cancel action for sent pending requests */}
                {activeView === 'sent' && request.status === 'pending' && (
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button
                      onClick={() => handleCancelRequest(request.id)}
                      disabled={processing === request.id}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 10,
                        border: '1.5px solid #dc2626',
                        background: 'white',
                        color: '#dc2626',
                        fontWeight: 'bold',
                        fontSize: 13,
                        cursor: processing === request.id ? 'not-allowed' : 'pointer',
                        opacity: processing === request.id ? 0.6 : 1,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        if (processing !== request.id) {
                          e.currentTarget.style.background = '#dc2626';
                          e.currentTarget.style.color = 'white';
                        }
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = '#dc2626';
                      }}
                    >
                      {processing === request.id ? 'Canceling...' : 'Cancel Request'}
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
