
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Library, MessageSquare, Clock, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ChatHistory = ({ onNewChat, currentChatId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatHistory] = useState([
    { id: 1, title: 'AI Assistant Help', timestamp: '2 hours ago', starred: true },
    { id: 2, title: 'Creative Writing Ideas', timestamp: '1 day ago', starred: false },
    { id: 3, title: 'Code Review Session', timestamp: '2 days ago', starred: true },
    { id: 4, title: 'Marketing Strategy', timestamp: '3 days ago', starred: false },
    { id: 5, title: 'Data Analysis Help', timestamp: '1 week ago', starred: false },
    { id: 6, title: 'Project Planning', timestamp: '1 week ago', starred: true },
  ]);

  const filteredHistory = chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatSelect = (chatId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleLibraryClick = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="w-80 h-full bg-black border-r border-purple-500/30 flex flex-col relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-600/20 rounded-full floating-orb blur-xl"></div>
        <div className="absolute bottom-20 right-5 w-16 h-16 bg-purple-400/15 rounded-full floating-orb blur-lg" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-purple-500/10 rounded-full floating-orb blur-md" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <div className="p-4 border-b border-purple-500/20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={onNewChat}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl pulse-glow transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Chat
          </Button>
        </motion.div>
      </div>

      {/* Search */}
      <div className="p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-900/50 border-purple-500/30 text-white placeholder-purple-300/50 focus:border-purple-400 focus:ring-purple-400/20 glass-effect"
          />
        </motion.div>
      </div>

      {/* Library Section */}
      <div className="px-4 pb-2 relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={handleLibraryClick}
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-900/30 transition-all duration-300 text-purple-300 hover:text-purple-200 group"
        >
          <Library className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-medium">Library</span>
        </motion.button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-2"
        >
          {filteredHistory.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handleChatSelect(chat.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-300 chat-bubble group ${
                currentChatId === chat.id
                  ? 'bg-purple-600/30 border border-purple-400/50'
                  : 'hover:bg-purple-900/20 border border-transparent hover:border-purple-500/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <MessageSquare className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm truncate group-hover:text-purple-200 transition-colors duration-300">
                      {chat.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-3 h-3 text-purple-400/70" />
                      <span className="text-purple-300/70 text-xs">{chat.timestamp}</span>
                    </div>
                  </div>
                </div>
                {chat.starred && (
                  <Star className="w-4 h-4 text-yellow-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Glowing border effect */}
      <div className="absolute inset-0 border-r border-purple-500/30 pointer-events-none">
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/50 to-transparent glow-effect"></div>
      </div>
    </div>
  );
};

export default ChatHistory;
