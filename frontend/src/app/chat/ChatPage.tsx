'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import ChatBox from './components/ChatBox';
import ChatInput from './components/ChatInput';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
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
  ]);

  const handleSendMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const generateBotResponse = (userMessage: string): string => {
    const responses = [
      "That's great! Can you tell me more about it?",
      "How can I help you with that?",
      "Interesting! What specific aspect would you like assistance with?",
      "I understand. Let me help you with that.",
      "That sounds like a good project. What's your next step?",
      "I'm here to help! What would you like to know?",
      "Got it! Do you have any specific questions?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header 
        username="Mentorship Chat" 
        status="online"
      />
      <ChatBox messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
