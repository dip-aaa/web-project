import React from 'react';

interface HeaderProps {
  username: string;
  avatarUrl?: string;
  status?: 'online' | 'offline' | 'away';
}

const Header: React.FC<HeaderProps> = ({ username, avatarUrl, status = 'online' }) => {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
  };

  return (
    <header className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-amber-50 px-4 py-3 shadow-lg sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        {/* Avatar with status indicator */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-200 shadow-md bg-amber-100">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt={username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-600 to-amber-800 text-white font-bold text-lg">
                {username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {/* Status indicator */}
          <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 ${statusColors[status]} rounded-full border-2 border-amber-900`}></div>
        </div>

        {/* Username and status */}
        <div className="flex-1">
          <h1 className="font-semibold text-lg">{username}</h1>
          <p className="text-xs text-amber-200 capitalize">{status}</p>
        </div>

        {/* Optional action buttons */}
        <div className="flex gap-2">
          <button 
            className="p-2 hover:bg-amber-700 rounded-full transition-colors"
            aria-label="Call"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button 
            className="p-2 hover:bg-amber-700 rounded-full transition-colors"
            aria-label="Video call"
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
