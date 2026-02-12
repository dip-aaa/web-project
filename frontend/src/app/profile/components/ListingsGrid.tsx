'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ListingsGridProps {
  limit?: number;
}

const listings = [
  {
    id: 1,
    title: 'React Course Notes',
    price: '$25',
    image: '/book.svg',
    status: 'active',
    sales: 34
  },
  {
    id: 2,
    title: 'JavaScript Cheat Sheet',
    price: '$15',
    image: '/book.svg',
    status: 'active',
    sales: 67
  },
  {
    id: 3,
    title: 'Full Stack Project Template',
    price: '$45',
    image: '/book.svg',
    status: 'active',
    sales: 23
  },
  {
    id: 4,
    title: 'Node.js Best Practices',
    price: '$30',
    image: '/book.svg',
    status: 'sold',
    sales: 89
  },
  {
    id: 5,
    title: 'TypeScript Guide',
    price: '$20',
    image: '/book.svg',
    status: 'active',
    sales: 45
  },
  {
    id: 6,
    title: 'Database Design Tutorial',
    price: '$35',
    image: '/book.svg',
    status: 'active',
    sales: 28
  }
];

export default function ListingsGrid({ limit }: ListingsGridProps) {
  const displayedListings = limit ? listings.slice(0, limit) : listings;

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
          {/* Status Badge */}
          <div style={{
            position: 'absolute',
            top: 12,
            right: 12,
            padding: '6px 12px',
            borderRadius: 20,
            background: item.status === 'active' ? '#4CAF50' : '#9E9E9E',
            color: '#fff',
            fontSize: 11,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            zIndex: 1
          }}>
            {item.status}
          </div>

          {/* Image */}
          <div style={{
            height: 180,
            background: 'linear-gradient(135deg, #ffd89b, #f5c77e)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <img 
              src={item.image} 
              alt={item.title}
              style={{ width: 80, height: 80, opacity: 0.7 }}
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
                {item.price}
              </span>
              <span style={{ 
                fontSize: 13, 
                color: '#8b6f47',
                background: '#f9f6f3',
                padding: '4px 10px',
                borderRadius: 12
              }}>
                📦 {item.sales} sales
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
