import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Mic, Image, File, Camera } from 'lucide-react';

function MessageInput({ onSend, onTyping }) {
  const [msg, setMsg] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = msg.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setMsg('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMsg(e.target.value);
    if (onTyping && e.target.value.trim()) {
      onTyping();
    }
  };

  const handleAttachmentClick = (type) => {
    // Handle different attachment types
    console.log(`Attachment type: ${type}`);
    setShowAttachments(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
      {/* Attachment Menu */}
      {showAttachments && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={() => handleAttachmentClick('image')}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Image className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Photo</span>
            </button>
            
            <button
              onClick={() => handleAttachmentClick('camera')}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Camera className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Camera</span>
            </button>
            
            <button
              onClick={() => handleAttachmentClick('file')}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors group"
            >
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <File className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Document</span>
            </button>
            
            <button
              onClick={() => handleAttachmentClick('audio')}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors group"
            >
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Mic className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Audio</span>
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        {/* Attachment Button */}
        <button
          type="button"
          onClick={() => setShowAttachments(!showAttachments)}
          className={`p-2 rounded-full transition-all duration-200 ${
            showAttachments 
              ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label="Attach file"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={msg}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full px-4 py-3 pr-12 rounded-full border transition-all duration-200 text-sm ${
              isFocused
                ? 'border-green-500 bg-white dark:bg-gray-700 ring-2 ring-green-500/20'
                : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
            } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none`}
            placeholder="Type a message..."
            aria-label="Message input"
          />
          
          {/* Emoji Button */}
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
            aria-label="Add emoji"
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!msg.trim()}
          className={`p-3 rounded-full transition-all duration-200 transform ${
            msg.trim()
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
              : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
          }`}
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Character Counter */}
      {msg.length > 0 && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          {msg.length} characters
        </div>
      )}
    </div>
  );
}

export default MessageInput;
