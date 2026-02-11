import React from 'react';
import { Message } from '../ChatPage';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
      <div className={`flex gap-2 max-w-[75%] md:max-w-[60%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar for bot messages */}
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white text-xs font-bold shadow-md">
            ☕
          </div>
        )}

        {/* Message bubble */}
        <div className="flex flex-col gap-1">
          <div
            className={`
              px-4 py-3 rounded-3xl shadow-md
              ${isUser 
                ? 'bg-gradient-to-br from-amber-800 to-amber-900 text-amber-50 rounded-br-md' 
                : 'bg-gradient-to-br from-amber-50 to-orange-50 text-amber-950 border border-amber-200 rounded-bl-md'
              }
              transition-all duration-200 hover:shadow-lg
            `}
          >
            <p className="text-sm md:text-base leading-relaxed break-words">
              {message.text}
            </p>
          </div>

          {/* Timestamp */}
          <span 
            className={`text-xs text-amber-700 px-2 ${isUser ? 'text-right' : 'text-left'}`}
          >
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>

        {/* Avatar for user messages */}
        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-900 to-amber-950 flex items-center justify-center text-white text-xs font-bold shadow-md">
            U
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
