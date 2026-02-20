'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { reviewAPI } from '../../../lib/api';

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div style={{ fontSize: 18 }}>
      {'⭐'.repeat(Math.round(rating))}
      {rating < 5 && <span style={{ opacity: 0.3 }}>{'⭐'.repeat(5 - Math.round(rating))}</span>}
    </div>
  );
};

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        setLoading(true);
        const userStr = localStorage.getItem('user');
        if (!userStr) return;

        const user = JSON.parse(userStr);
        const response = await reviewAPI.getMentorReviews(user.id);

        if (response.success) {
          setReviews(response.data);
          setAvgRating(response.averageRating);
        }
      } catch (error) {
        console.error('Error fetching profile reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyReviews();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0', color: '#8b6f47' }}>
        <div style={{ fontSize: 32, marginBottom: 10 }}>⏳</div>
        <p>Loading your reviews...</p>
      </div>
    );
  }

  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length
  }));

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
          gap: 30,
          flexWrap: 'wrap'
        }}
      >
        <div style={{ textAlign: 'center', minWidth: 150 }}>
          <div style={{
            fontSize: 56,
            fontWeight: 'bold',
            color: '#6b4423',
            marginBottom: 8
          }}>
            {avgRating || "0.0"}
          </div>
          <div style={{ marginBottom: 8 }}>
            <StarRating rating={avgRating} />
          </div>
          <div style={{
            fontSize: 14,
            color: '#8b6f47'
          }}>
            Based on {reviews.length} reviews
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 250 }}>
          {ratingCounts.map(({ star, count }) => {
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;

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
        {reviews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', background: '#fff', borderRadius: 20, border: '2px dashed #f0e6dc' }}>
            <p style={{ color: '#8b6f47', fontSize: 16 }}>No reviews yet. As you complete mentorship sessions, feedback will appear here!</p>
          </div>
        ) : (
          reviews.map((review, index) => (
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
                marginBottom: 12,
                flexWrap: 'wrap',
                gap: 12
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
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#6b4423',
                    overflow: 'hidden'
                  }}>
                    {review.buyer?.user?.profileImageUrl ? (
                      <Image src={review.buyer.user.profileImageUrl} alt="" fill style={{ objectFit: 'cover' }} />
                    ) : (
                      review.buyer?.user?.name?.charAt(0) || 'U'
                    )}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: 'bold',
                      color: '#6b4423',
                      marginBottom: 4
                    }}>
                      {review.buyer?.user?.name || 'Anonymous User'}
                    </div>
                    <div style={{
                      fontSize: 13,
                      color: '#8b6f47'
                    }}>
                      {new Date(review.date).toLocaleDateString()} • Mentorship
                    </div>
                  </div>
                </div>
                <div>
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <p style={{
                fontSize: 15,
                color: '#6b4423',
                lineHeight: 1.6,
                fontStyle: 'italic'
              }}>
                &ldquo;{review.comments || "No comments provided."}&rdquo;
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
