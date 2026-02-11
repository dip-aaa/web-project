import React, { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  placeholder = "Type a message..." 
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 px-4 py-4 border-t border-amber-200 shadow-lg">
      <div className="max-w-4xl mx-auto flex gap-3 items-end">
        {/* Emoji/Attachment buttons */}
        <button 
          className="flex-shrink-0 p-2.5 bg-amber-200 hover:bg-amber-300 text-amber-800 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
          aria-label="Add emoji"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Input field */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="
              w-full px-5 py-3.5 
              bg-white
              border-2 border-amber-200
              rounded-full 
              text-amber-950 placeholder-amber-400
              focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200
              shadow-sm
              transition-all duration-200
            "
          />
        </div>

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className={`
            flex-shrink-0 p-3 rounded-full
            transition-all duration-200 shadow-md
            ${inputValue.trim()
              ? 'bg-gradient-to-br from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white shadow-lg hover:shadow-xl hover:scale-105'
              : 'bg-amber-200 text-amber-400 cursor-not-allowed'
            }
          `}
          aria-label="Send message"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
