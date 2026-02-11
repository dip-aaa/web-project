import React, { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  placeholder = "Type a message...",
  disabled = false 
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-[#f5f0eb] px-4 py-4 border-t border-[#e8ddd4] shadow-lg">
      <div className="max-w-4xl mx-auto flex gap-3 items-end">
        {/* Emoji/Attachment buttons */}
        <button 
          disabled={disabled}
          className={`flex-shrink-0 p-2.5 rounded-full transition-all duration-200 shadow-md ${
            disabled 
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed' 
              : 'bg-stone-300 hover:bg-stone-400 text-stone-800 hover:shadow-lg'
          }`}
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
            disabled={disabled}
            placeholder={placeholder}
            className={`
              w-full px-5 py-3.5 
              bg-white
              border-2 border-[#e8ddd4]
              rounded-full 
              text-[#6b4423] placeholder-[#b08e62]
              focus:outline-none focus:border-[#8b6f47] focus:ring-2 focus:ring-[#f5f0eb]
              shadow-sm
              transition-all duration-200
              ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
            `}
          />
        </div>

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!inputValue.trim() || disabled}
          className={`
            flex-shrink-0 p-3 rounded-full
            transition-all duration-200 shadow-md
            ${!inputValue.trim() || disabled
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
              : 'bg-[#6b4423] hover:bg-[#573217] text-white shadow-lg hover:shadow-xl hover:scale-105'
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
