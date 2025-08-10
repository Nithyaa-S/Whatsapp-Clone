import React, { useState, useEffect } from 'react';
import { MessageCircle, Users, Settings, Search, Plus, MoreVertical, Phone, Video, Archive, Star, Trash2, LogOut } from 'lucide-react';
import ChatWindow from '../components/ChatWindow';

export default function Home() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch conversations from backend API
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/conversations');
        if (!response.ok) {
          throw new Error('Failed to fetch conversations');
        }
        const data = await response.json();
        
        // Transform backend data to frontend format
        const transformedChats = data.map(conv => ({
          id: conv._id,
          name: conv.name || 'Unknown User',
          lastMessage: conv.lastMessage || 'No messages yet',
          timestamp: new Date(conv.lastTimestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          unread: conv.unreadCount || 0,
          online: Math.random() > 0.5, // Simulate online status
          avatar: (conv.name || 'U').substring(0, 2).toUpperCase()
        }));
        
        setChats(transformedChats);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching conversations:', err);
        setError('Failed to load conversations');
        // Fallback to sample data if API is not available
        setChats([
          {
            id: 'user1',
            name: 'John Doe',
            lastMessage: 'Hey, how are you doing?',
            timestamp: '2:30 PM',
            unread: 2,
            online: true,
            avatar: 'JD'
          },
          {
            id: 'user2',
            name: 'Sarah Wilson',
            lastMessage: 'The meeting is scheduled for tomorrow',
            timestamp: '1:45 PM',
            unread: 0,
            online: false,
            avatar: 'SW'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    // Clear unread count when chat is selected
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, unread: 0 } : chat
    ));
  };

  const handleNewChat = () => {
    // Add new chat functionality
    const newChat = {
      id: `user${Date.now()}`,
      name: 'New Contact',
      lastMessage: 'Start a conversation',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: 0,
      online: false,
      avatar: 'NC'
    };
    setChats(prev => [newChat, ...prev]);
    setSelectedChat(newChat.id);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col shadow-lg">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-text">WhatsApp Clone</h1>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors hover-scale"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 top-10 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 py-2 z-50 animate-fade-in-up">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2 transition-colors">
                    <Archive className="w-4 h-4" />
                    <span>Archived</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2 transition-colors">
                    <Star className="w-4 h-4" />
                    <span>Starred</span>
                  </button>
                  <hr className="my-2 border-gray-200 dark:border-gray-600" />
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search or start new chat"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="spinner"></div>
              <span className="ml-2 text-gray-500">Loading conversations...</span>
            </div>
          ) : error ? (
            <div className="p-4 text-center">
              <p className="text-red-500 text-sm">{error}</p>
              <p className="text-gray-500 text-xs mt-1">Using sample data</p>
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-gray-500 text-sm">No conversations found</p>
            </div>
          ) : (
            filteredChats.map((chat, index) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover-lift ${
                  selectedChat === chat.id ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-l-green-500' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg hover-scale">
                      {chat.avatar}
                    </div>
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {chat.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {chat.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">
                      {chat.lastMessage}
                    </p>
                  </div>
                  
                  {chat.unread > 0 && (
                    <div className="w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-semibold animate-bounce-in">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={handleNewChat}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 animate-pulse-glow"
          >
            <Plus className="w-5 h-5" />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <ChatWindow wa_id={selectedChat} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md animate-fade-in-up">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-bounce-in">
                <MessageCircle className="w-16 h-16 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to WhatsApp Clone
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Connect with friends and family through instant messaging. 
                Start a new conversation or continue where you left off.
              </p>
              <div className="space-y-4">
                <button 
                  onClick={handleNewChat}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse-glow"
                >
                  Start New Chat
                </button>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Secure messaging</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Real-time updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
