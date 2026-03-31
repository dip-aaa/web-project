import React, { useState } from 'react';
import Image from 'next/image';

interface HeaderProps {
  username: string;
  userId?: number;
  avatarUrl?: string;
  status?: 'online' | 'offline' | 'away';
  onAudioCall?: () => void;
  onVideoCall?: () => void;
  onViewProfile?: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, userId, avatarUrl, status = 'online', onAudioCall, onVideoCall, onViewProfile }) => {
  const [callLoading, setCallLoading] = useState(false);

  const handleUserClick = () => {
    if (onViewProfile) {
      onViewProfile();
    }
  };

  const handleAudioCall = async () => {
    try {
      setCallLoading(true);
      if (onAudioCall) {
        await onAudioCall();
      }
    } catch (error) {
      console.error('Error initiating audio call:', error);
    } finally {
      setCallLoading(false);
    }
  };

  const handleVideoCall = async () => {
    try {
      setCallLoading(true);
      if (onVideoCall) {
        await onVideoCall();
      }
    } catch (error) {
      console.error('Error initiating video call:', error);
    } finally {
      setCallLoading(false);
    }
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
  };

  return (
    <header className="bg-gradient-to-r from-[#f9f6f3] via-[#fdfcfa] to-[#f5f0eb] text-[#6b4423] px-4 py-3 shadow-md sticky top-0 z-10 border-b border-[#e8ddd4]">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        {/* Avatar with status indicator */}
        <div className="relative cursor-pointer hover:opacity-80 transition-opacity" onClick={handleUserClick}>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#e8ddd4] shadow-md bg-[#f5f0eb]">
            {avatarUrl ? (
              <Image 
                src={avatarUrl} 
                alt={username}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#8b6f47] to-[#6b4423] text-white font-bold text-lg">
                ☕
              </div>
            )}
          </div>
          {/* Status indicator */}
          <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 ${statusColors[status]} rounded-full border-2 border-[#f5f0eb]`}></div>
        </div>

        {/* Username and status - clickable */}
        <div 
          className="flex-1 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleUserClick}
        >
          <h1 className="font-semibold text-lg text-[#6b4423]">{username}</h1>
          <p className="text-xs text-[#8b6f47] capitalize">{status}</p>
        </div>

        {/* Call Action Buttons */}
        <div className="flex gap-2">
          {/* Audio Call */}
          <button 
            className="p-2 hover:bg-stone-200 text-stone-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Audio call"
            onClick={handleAudioCall}
            disabled={callLoading || !userId}
            title="Start voice call"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>

          {/* Video Call */}
          <button 
            className="p-2 hover:bg-stone-200 text-stone-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Video call"
            onClick={handleVideoCall}
            disabled={callLoading || !userId}
            title="Start video call"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
