import React, { useState, useEffect } from 'react';

function ChatList({ setSelectedWaId }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // ✅ Corrected fetch URL to use the /api prefix
    fetch('http://localhost:5000/api/conversations')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        // Optionally, sort conversations by last message timestamp (descending)
        const sorted = [...data].sort((a, b) => {
          const aTime = new Date(a.lastTimestamp || 0).getTime();
          const bTime = new Date(b.lastTimestamp || 0).getTime();
          return bTime - aTime;
        });
        setConversations(sorted);
      })
      .catch(err => {
        // Show a toast or notification in a real app
        console.error('❌ Error fetching conversations:', err.message);
        setConversations([]);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-green-900 dark:text-white mb-4">WhatsApp Clone</h1>
      
      {conversations.length === 0 && (
        <p className="text-gray-500 text-sm">No conversations available.</p>
      )}

      {conversations.map((conv, idx) => (
        <div
          key={idx}
          onClick={() => setSelectedWaId(conv._id)}
          className="flex items-center gap-4 p-3 mb-2 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-sm hover:shadow-lg border border-transparent hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-all duration-200 group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-700 text-white flex items-center justify-center rounded-full font-bold text-lg shadow group-hover:scale-105 transition-transform duration-200">
            {conv.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-semibold text-gray-900 dark:text-white text-base truncate">{conv.name || 'Unknown'}</span>
            <span className="text-gray-500 dark:text-gray-300 text-xs truncate w-48 mt-0.5">
              {conv.lastMessage || <span className="italic text-gray-400">No messages yet</span>}
            </span>
          </div>
          {/* Optionally, show a right arrow for better affordance */}
          <svg className="w-4 h-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      ))}
    
    </div>
  );
}

export default ChatList;
