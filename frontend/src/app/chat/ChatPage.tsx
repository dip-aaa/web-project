'use client';

import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from './components/Header';
import ChatBox from './components/ChatBox';
import ChatInput from './components/ChatInput';
import { useChat, Message } from './hooks/useChat';
import './chat.css';

export type { Message };

const ChatPageComponent: React.FC = () => {
  const initialMessages: Message[] = [
    {
      id: '1',
      text: 'Hello! How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: '2',
      text: 'Hi! I need some help with a project.',
      sender: 'user',
      timestamp: new Date(Date.now() - 45000),
    },
    {
      id: '3',
      text: 'I\'d be happy to help! What kind of project are you working on?',
      sender: 'bot',
      timestamp: new Date(Date.now() - 30000),
    },
  ];

  const { messages, isLoading, sendMessage } = useChat(initialMessages);

  return (
    <div className="min-h-screen h-screen flex bg-gradient-to-br from-[#f9f6f3] via-[#fdfcfa] to-[#f5f0eb]">
      <Sidebar />

      <div className="flex-1 min-w-0 p-6 overflow-y-auto">
        <div className="flex flex-col h-full bg-brown rounded-md shadow-sm">
          <Header username="Mentorship Chat" status="online" />
          <div className="flex-1 min-h-0">
            <ChatBox messages={messages} isLoading={isLoading} />
          </div>
          <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatPageComponent;
