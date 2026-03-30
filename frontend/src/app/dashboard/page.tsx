
'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import WelcomeHeader from './components/WelcomeHeader';
import StatsGrid from './components/StatsGrid';
// import StreakTracker from './components/StreakTracker';
import MarketplacePreview from './components/MarketplacePreview';
import { marketplaceAPI } from '../../lib/api';

export interface MarketplaceItem {
  id: number;
  title: string;
  price: string;
  image: string;
  wishlisted: boolean;
}

export default function DashboardPage() {
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);

  // Get user's first name from localStorage
  const [firstName, setFirstName] = React.useState<string>("Guest");

  React.useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const name = user.name || "Guest";
        setFirstName(name.split(" ")[0]); // Get first name only
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Fetch recently added items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoadingItems(true);
        const response = await marketplaceAPI.getItems();
        if (response.success && response.data) {
          // Take only the 5 most recent items
          const recentItems = response.data.slice(0, 5).map((item: any) => ({
            id: parseInt(item.id),
            title: item.title,
            price: `रु ${item.price}`,
            image: item.imageUrl || `https://placehold.co/400x300/f0e6dc/6b4423?text=${encodeURIComponent(item.title)}`,
            wishlisted: false
          }));
          setMarketplaceItems(recentItems);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        // Keep empty array on error
        setMarketplaceItems([]);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, []);

  const toggleWishlist = (id: number) => {
    setMarketplaceItems(items =>
      items.map(item =>
        item.id === id ? { ...item, wishlisted: !item.wishlisted } : item
      )
    );
  };

  return (
    <div className="min-h-screen h-screen flex bg-gradient-to-br from-[#f9f6f3] via-[#fdfcfa] to-[#f5f0eb]">
      <Sidebar />
      
      <div className="flex-1 min-w-0 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Welcome Header */}
          <WelcomeHeader firstName={firstName} />

          {/* Stats Grid */}
          <StatsGrid />

          {/* Streak Tracker - Removed as requested */}

          {/* Marketplace Preview */}
          <MarketplacePreview 
            items={marketplaceItems}
            toggleWishlist={toggleWishlist}
            loading={loadingItems}
          />
        </div>
      </div>

      <style jsx global>{`
        html, body, #__next {
          height: 100%;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}