'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { marketplaceAPI } from '../../../lib/api';

interface ListingsGridProps {
  limit?: number;
}

interface Listing {
  id: string;
  title: string;
  price: number;
  conditionLabel: string;
  category: string;
  imageUrl: string;
}

export default function ListingsGrid({ limit }: ListingsGridProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const response = await marketplaceAPI.getMyItems();
        if (response.success && response.data) {
          setListings(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyListings();
  }, []);

  const displayedListings = limit ? listings.slice(0, limit) : listings;

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: 300,
        color: '#8b6f47'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>⏳</div>
          <p>Loading your listings...</p>
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: 300,
        color: '#8b6f47',
        background: '#fff',
        borderRadius: 16,
        padding: 40,
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: 60, marginBottom: 16 }}>📦</div>
          <h3 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#6b4423' }}>
            No listings yet
          </h3>
          <p style={{ fontSize: 14, color: '#8b6f47' }}>
            Head to the Marketplace to create your first listing!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 20
    }}>
      {displayedListings.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ 
            y: -8,
            scale: 1.02,
            transition: { type: 'spring', stiffness: 400 }
          }}
          style={{
            background: '#fff',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(107, 68, 35, 0.08)',
            border: '2px solid #f0e6dc',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          {/* Condition Badge */}
          <div style={{
            position: 'absolute',
            top: 12,
            right: 12,
            padding: '6px 12px',
            borderRadius: 20,
            background: '#4CAF50',
            color: '#fff',
            fontSize: 11,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            zIndex: 1
          }}>
            {item.conditionLabel}
          </div>

          {/* Image */}
          <div style={{
            height: 180,
            background: 'linear-gradient(135deg, #f9f6f3, #f0e6dc)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <img 
              src={item.imageUrl} 
              alt={item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Content */}
          <div style={{ padding: 18 }}>
            <h4 style={{ 
              fontSize: 16, 
              fontWeight: 'bold', 
              color: '#6b4423',
              marginBottom: 8,
              lineHeight: 1.3
            }}>
              {item.title}
            </h4>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12
            }}>
              <span style={{ 
                fontSize: 20, 
                fontWeight: 'bold', 
                color: '#d4883e'
              }}>
                ${item.price}
              </span>
              <span style={{ 
                fontSize: 13, 
                color: '#8b6f47',
                background: '#f9f6f3',
                padding: '4px 10px',
                borderRadius: 12
              }}>
                🏷️ {item.category}
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #ffd89b, #f5c77e)',
                  border: 'none',
                  color: '#6b4423',
                  fontWeight: 'bold',
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                ✏️ Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  background: '#f9f6f3',
                  border: '1.5px solid #d4a574',
                  color: '#6b4423',
                  fontWeight: 'bold',
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                📊
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
