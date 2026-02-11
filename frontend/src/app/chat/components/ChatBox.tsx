import React, { useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import { Message } from '../ChatPage';

interface ChatBoxProps {
  messages: Message[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div 
      ref={chatBoxRef}
      className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
    >
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((message) => (
          <ChatBubble 
            key={message.id}
            message={message}
          />
        ))}
        {/* Invisible element to scroll to */}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatBox;
