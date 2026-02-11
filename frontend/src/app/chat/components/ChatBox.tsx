import React, { useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import { Message } from '../hooks/useChat';

interface ChatBoxProps {
  messages: Message[];
  isLoading?: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, isLoading = false }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div 
      ref={chatBoxRef}
      className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-[#f5f0eb]"
    >
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((message) => (
          <ChatBubble 
            key={message.id}
            message={message}
          />
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start animate-fadeIn">
            <div className="flex gap-2 max-w-[75%] md:max-w-[60%]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                ☕
              </div>
              <div className="bg-stone-100 text-stone-900 border border-stone-200 rounded-3xl rounded-bl-md px-4 py-3 shadow-md">
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Invisible element to scroll to */}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatBox;
