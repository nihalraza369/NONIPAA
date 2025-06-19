import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChatHistory from '@/components/ChatHistory';
import ChatInterface from '@/components/ChatInterface';
import LoginPanel from '@/components/LoginPanel';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNewChat = () => {
    const newChatId = Date.now();
    setCurrentChatId(newChatId);
  };

  return (
    <div className="h-screen w-full bg-black overflow-hidden relative">
      {/* Global animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full floating-orb blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/5 rounded-full floating-orb blur-3xl" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full floating-orb blur-2xl" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex h-full relative z-10"
      >
        {!isAuthenticated ? (
          <LoginPanel onLogin={() => setIsAuthenticated(true)} />
        ) : (
          <>
            <ChatHistory onNewChat={handleNewChat} currentChatId={currentChatId} />
            <ChatInterface />
          </>
        )}
      </motion.div>

      <Toaster />

      {/* Ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent glow-effect"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent glow-effect"></div>
        <div className="absolute top-0 left-80 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"></div>
        <div className="absolute top-0 right-80 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"></div>
      </div>
    </div>
  );
}

export default App;
