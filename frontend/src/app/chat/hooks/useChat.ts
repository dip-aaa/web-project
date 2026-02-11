import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (text: string) => void;
  clearMessages: () => void;
  deleteMessage: (id: string) => void;
}

const generateBotResponse = (userMessage: string): string => {
  const responses = [
    "That's great! Can you tell me more about it?",
    "How can I help you with that?",
    "Interesting! What specific aspect would you like assistance with?",
    "I understand. Let me help you with that.",
    "That sounds like a good project. What's your next step?",
    "I'm here to help! What would you like to know?",
    "Got it! Do you have any specific questions?",
    "That's a fantastic point! Can you elaborate further?",
    "I see what you mean. How did you approach that?",
    "Absolutely! I'm here to support you with that.",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

export const useChat = (initialMessages: Message[] = []): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate bot response after a short delay
    const timeoutId = setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timeoutId);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const deleteMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    deleteMessage,
  };
};
