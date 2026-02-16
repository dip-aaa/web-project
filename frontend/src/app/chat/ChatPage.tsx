'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from '../../components/sidebar';
import Header from './components/Header';
import ChatBox from './components/ChatBox';
import ChatInput from './components/ChatInput';
import { mentorshipAPI, chatAPI } from '../../lib/api';
import './chat.css';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ConnectedUser {
  id: number;
  name: string;
  email: string;
  department: string;
  connectionType: 'mentor' | 'mentee';
}

interface ChatMessage {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  read: boolean;
}

const ChatPageComponent: React.FC = () => {
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ConnectedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const currentUserIdRef = useRef<number | null>(null);

  // Get current user ID
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      currentUserIdRef.current = user.id;
    }
  }, []);

  // Fetch connected users on mount
  useEffect(() => {
    const fetchConnectedUsers = async () => {
      try {
        setLoading(true);
        const response = await mentorshipAPI.getConnectedUsers();
        if (response.success && response.data) {
          setConnectedUsers(response.data);
          // Auto-select first user if available
          if (response.data.length > 0) {
            setSelectedUser(response.data[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching connected users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConnectedUsers();
  }, []);

  // Fetch messages when user is selected
  useEffect(() => {
    if (!selectedUser || !currentUserIdRef.current) return;

    const fetchMessages = async () => {
      try {
        setIsLoadingMessages(true);
        const response = await chatAPI.getMessages(selectedUser.id);
        
        if (response.success && response.data) {
          const chatMessages: ChatMessage[] = response.data.messages || [];
          
          // Transform to Message format
          const transformedMessages: Message[] = chatMessages.map((msg) => ({
            id: msg.id.toString(),
            text: msg.content,
            sender: msg.senderId === currentUserIdRef.current ? 'user' : 'bot',
            timestamp: new Date(msg.createdAt)
          }));
          
          setMessages(transformedMessages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchMessages();
    
    // Poll for new messages every 3 seconds
    const interval = setInterval(fetchMessages, 3000);
    
    return () => clearInterval(interval);
  }, [selectedUser]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !selectedUser || !currentUserIdRef.current || isSending) return;

    try {
      setIsSending(true);

      // Optimistically add message to UI
      const tempMessage: Message = {
        id: `temp-${Date.now()}`,
        text: text.trim(),
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, tempMessage]);

      // Send to backend
      const response = await chatAPI.sendMessage(selectedUser.id, text.trim());
      
      if (response.success && response.data) {
        // Replace temporary message with real one
        const realMessage: Message = {
          id: response.data.message.id.toString(),
          text: response.data.message.content,
          sender: 'user',
          timestamp: new Date(response.data.message.createdAt)
        };
        
        setMessages(prev => 
          prev.map(msg => msg.id === tempMessage.id ? realMessage : msg)
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
      // Remove failed message
      setMessages(prev => prev.filter(msg => msg.id !== `temp-${Date.now()}`));
    } finally {
      setIsSending(false);
    }
  }, [selectedUser, isSending]);

  return (
    <div className="min-h-screen h-screen flex bg-gradient-to-br from-[#f9f6f3] via-[#fdfcfa] to-[#f5f0eb] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex gap-4 p-6 min-w-0 overflow-hidden">
        {/* Connected Users List */}
        <div className="w-80 bg-white rounded-2xl shadow-lg border border-[#e8ddd4] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[#e8ddd4]">
            <h2 className="text-xl font-bold text-[#6b4423]">Connections</h2>
            <p className="text-sm text-[#8b6f47] mt-1">Chat with your connections</p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-6 text-center text-[#8b6f47]">
                <div className="text-4xl mb-2">⏳</div>
                <p>Loading connections...</p>
              </div>
            ) : connectedUsers.length === 0 ? (
              <div className="p-6 text-center text-[#8b6f47]">
                <div className="text-5xl mb-3">👥</div>
                <p className="font-semibold mb-2">No connections yet</p>
                <p className="text-xs">Connect with mentors in the Mentorship section to start chatting</p>
              </div>
            ) : (
              <div className="p-2">
                {connectedUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`w-full p-3 rounded-xl mb-2 text-left transition-all ${
                      selectedUser?.id === user.id
                        ? 'bg-gradient-to-r from-[#ffd89b] to-[#f5c77e] shadow-md'
                        : 'bg-[#f9f6f3] hover:bg-[#f5f0eb]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                          selectedUser?.id === user.id
                            ? 'bg-[#6b4423] text-white'
                            : 'bg-[#e8ddd4] text-[#6b4423]'
                        }`}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold truncate ${
                          selectedUser?.id === user.id ? 'text-[#6b4423]' : 'text-[#6b4423]'
                        }`}>
                          {user.name}
                        </h3>
                        <p className={`text-xs truncate ${
                          selectedUser?.id === user.id ? 'text-[#8b6f47]' : 'text-[#a0826d]'
                        }`}>
                          {user.department || 'Student'}
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          user.connectionType === 'mentor'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {user.connectionType === 'mentor' ? '🧑‍🏫 Mentor' : '📚 Mentee'}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-lg border border-[#e8ddd4] overflow-hidden min-w-0">
          {selectedUser ? (
            <>
              <Header username={selectedUser.name} status="online" />
              <div className="flex-1 min-h-0">
                <ChatBox messages={messages} isLoading={isLoadingMessages} />
              </div>
              <ChatInput onSendMessage={sendMessage} disabled={isSending} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-bold text-[#6b4423] mb-2">Select a connection to start chatting</h3>
                <p className="text-[#8b6f47]">
                  {connectedUsers.length === 0
                    ? 'Connect with mentors first to start conversations'
                    : 'Choose a mentor or mentee from the list'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPageComponent;
