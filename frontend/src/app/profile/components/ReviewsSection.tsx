'use client';

import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    author: 'John Davis',
    avatar: '👨‍💼',
    rating: 5,
    date: 'Feb 10, 2026',
    comment: 'Excellent mentor! Sarah helped me understand React hooks in depth. Her teaching style is clear and patient.',
    type: 'mentorship'
  },
  {
    id: 2,
    author: 'Emily Chen',
    avatar: '👩‍💻',
    rating: 5,
    date: 'Feb 8, 2026',
    comment: 'The course notes were incredibly helpful. Well organized and easy to follow. Highly recommend!',
    type: 'marketplace'
  },
  {
    id: 3,
    author: 'Michael Brown',
    avatar: '👨‍🎓',
    rating: 4,
    date: 'Feb 5, 2026',
    comment: 'Great resource for learning TypeScript. Good examples and explanations.',
    type: 'marketplace'
  },
  {
    id: 4,
    author: 'Lisa Wang',
    avatar: '👩‍🔬',
    rating: 5,
    date: 'Jan 28, 2026',
    comment: 'Sarah is an amazing mentor. She went above and beyond to help me debug my project. Thank you!',
    type: 'mentorship'
  },
  {
    id: 5,
    author: 'David Kim',
    avatar: '👨‍🚀',
    rating: 5,
    date: 'Jan 25, 2026',
    comment: 'Very responsive and knowledgeable. The project template saved me hours of setup time!',
    type: 'marketplace'
  }
];

export default function ReviewsSection() {
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div>
      {/* Rating Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: 30,
          marginBottom: 20,
          boxShadow: '0 4px 20px rgba(107, 68, 35, 0.08)',
          border: '2px solid #f0e6dc',
          display: 'flex',
          alignItems: 'center',
          gap: 30
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: 56, 
            fontWeight: 'bold', 
            color: '#6b4423',
            marginBottom: 8
          }}>
            {avgRating}
          </div>
          <div style={{ fontSize: 28, marginBottom: 8 }}>
            {'⭐'.repeat(5)}
          </div>
          <div style={{ 
            fontSize: 14, 
            color: '#8b6f47' 
          }}>
            Based on {reviews.length} reviews
          </div>
        </div>

        <div style={{ flex: 1 }}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter(r => r.rating === star).length;
            const percentage = (count / reviews.length) * 100;
            
            return (
              <div 
                key={star}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 10,
                  marginBottom: 8
                }}
              >
                <span style={{ 
                  width: 60, 
                  fontSize: 14, 
                  color: '#6b4423',
                  fontWeight: 'bold'
                }}>
                  {star} ⭐
                </span>
                <div style={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  background: '#f0e6dc',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #ffd89b, #f5c77e)',
                      borderRadius: 4
                    }}
                  />
                </div>
                <span style={{ 
                  width: 40, 
                  fontSize: 14, 
                  color: '#8b6f47' 
                }}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Reviews List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              background: '#fff',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 4px 20px rgba(107, 68, 35, 0.08)',
              border: '2px solid #f0e6dc'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: 12
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ffd89b, #f5c77e)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24
                }}>
                  {review.avatar}
                </div>
                <div>
                  <div style={{ 
                    fontWeight: 'bold', 
                    color: '#6b4423',
                    marginBottom: 4
                  }}>
                    {review.author}
                  </div>
                  <div style={{ 
                    fontSize: 13, 
                    color: '#8b6f47' 
                  }}>
                    {review.date} • {review.type === 'mentorship' ? '🎓 Mentorship' : '📦 Purchase'}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 18 }}>
                {'⭐'.repeat(review.rating)}
              </div>
            </div>
            <p style={{ 
              fontSize: 15, 
              color: '#6b4423', 
              lineHeight: 1.6 
            }}>
              {review.comment}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
