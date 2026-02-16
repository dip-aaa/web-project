'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MarketplaceItem } from '../page';

const ShoppingBagSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <defs>
      <linearGradient id="bagGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#c9a27b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#b8936b', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect x="40" y="70" width="120" height="110" rx="10" fill="url(#bagGradient)" />
    <path d="M70 70 Q70 40 100 40 Q130 40 130 70"
          stroke="#8b6f47" strokeWidth="6" fill="none" strokeLinecap="round"/>
    <rect x="50" y="80" width="100" height="5" fill="#8b6f47" opacity="0.3" />
  </svg>
);

const HeartSVG = ({ filled = false, className = "" }: { filled?: boolean; className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <defs>
      <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff6b9d', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#c44569', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <motion.path
      d="M50 80 C50 80 20 55 20 35 C20 20 30 15 40 20 C45 22.5 50 27.5 50 27.5 C50 27.5 55 22.5 60 20 C70 15 80 20 80 35 C80 55 50 80 50 80 Z"
      fill={filled ? "url(#heartGradient)" : "none"}
      stroke={filled ? "none" : "#c9a27b"}
      strokeWidth="3"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    />
  </svg>
);

interface MarketplacePreviewProps {
  items: MarketplaceItem[];
  toggleWishlist: (id: number) => void;
  loading?: boolean;
}

export default function MarketplacePreview({ items, toggleWishlist, loading = false }: MarketplacePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border-2 border-[#d4a574]/20"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <ShoppingBagSVG className="w-14 h-14" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#6b4423] to-[#8b5a3c] bg-clip-text text-transparent">
            Recently Added
          </h2>
        </div>
        <Link href="/marketplace">
          <motion.button 
            whileHover={{ x: 5 }}
            className="text-sm text-[#8b6f47] hover:text-[#6b4423] font-bold transition-colors flex items-center gap-2 bg-[#f9f6f3] px-4 py-2 rounded-full"
          >
            View All
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </Link>
      </div>

      {loading ? (
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div
              key={idx}
              className="w-[240px] flex-shrink-0 bg-gradient-to-br from-[#fdfcfa] to-[#f5f0eb] rounded-3xl p-6 snap-start shadow-lg border-2 border-[#d4a574]/20 animate-pulse"
            >
              <div className="mb-4 rounded-2xl overflow-hidden bg-[#e8ddd4] aspect-video" />
              <div className="h-6 bg-[#e8ddd4] rounded-lg mb-3" />
              <div className="flex items-center justify-between">
                <div className="h-10 w-20 bg-[#e8ddd4] rounded-full" />
                <div className="w-10 h-10 bg-[#e8ddd4] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-[#8b6f47] text-lg">No items available yet</p>
          <p className="text-[#a0826d] text-sm mt-2">Be the first to list an item!</p>
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
          {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + idx * 0.1 }}
            className="w-[240px] flex-shrink-0 bg-gradient-to-br from-[#fdfcfa] to-[#f5f0eb] rounded-3xl p-6 snap-start shadow-lg transition-all duration-300 border-2 border-[#d4a574]/20 group relative overflow-hidden"
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
            />
            
            <div className="relative z-10">
              <div className="mb-4 rounded-2xl overflow-hidden bg-white/50 aspect-video w-full">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300"
                  style={{ maxWidth: '100%' }}
                />
              </div>
              <h3 className="font-bold text-[#6b4423] mb-3 text-center line-clamp-2 min-h-[3rem]">
                {item.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-[#8b6f47] font-black text-lg bg-white/80 px-5 py-2 rounded-full shadow-md">
                  {item.price}
                </span>
                <motion.button
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => toggleWishlist(item.id)}
                  className="relative"
                >
                  <HeartSVG filled={item.wishlisted} className="w-10 h-10" />
                  {item.wishlisted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.5, 0] }}
                      className="absolute inset-0 bg-red-400 rounded-full opacity-50"
                    />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      )}
    </motion.div>
  );
}