import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Image, Wrench, Phone, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your NONIPaa. How can I help you today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
const handleSendMessage = async () => {
  if (!message.trim()) return;

  const userMsg = {
    id: messages.length + 1,
    type: 'user',
    content: message,
    timestamp: new Date().toLocaleTimeString()
  };

  const updatedMessages = [...messages, userMsg];
  setMessages(updatedMessages);
  setMessage('');

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: updatedMessages.map((msg) => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        model: 'openai/gpt-3.5-turbo',
      }),
    });

    const data = await response.json();

    const botMsg = {
      id: updatedMessages.length + 1,
      type: 'bot',
      content: data.reply,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, botMsg]);

  } catch (error) {
    console.error("Fetch Error:", error);
  }
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToolClick = (tool) => {
    toast({
      title: `🚧 ${tool} feature isn't implemented yet—but you can request it!`
    });
  };

  return (
    <div className="w-full h-screen flex flex-col bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 moving-gradient opacity-20"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-400/10 rounded-full floating-orb blur-2xl"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-purple-600/15 rounded-full floating-orb blur-xl" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-purple-500/10 rounded-full floating-orb blur-lg" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-3xl ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar className="w-10 h-10 ring-2 ring-purple-400/50">
                    <AvatarFallback className={`${msg.type === 'user' ? 'bg-purple-600' : 'bg-purple-800'} text-white`}>
                      {msg.type === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`chat-bubble rounded-2xl p-4 glass-effect ${
                    msg.type === 'user' 
                      ? 'bg-purple-600/30 border border-purple-400/50' 
                      : 'bg-black/30 border border-purple-500/30'
                  }`}>
                    <p className="text-white leading-relaxed">{msg.content}</p>
                    <span className="text-purple-300/70 text-xs mt-2 block">{msg.timestamp}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-purple-500/30 p-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            {/* Tools */}
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleToolClick('Voice')}
                className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 transition-all duration-300 transform hover:scale-110"
              >
                <Mic className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleToolClick('Image')}
                className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 transition-all duration-300 transform hover:scale-110"
              >
                <Image className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleToolClick('Tools')}
                className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 transition-all duration-300 transform hover:scale-110"
              >
                <Wrench className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleToolClick('Call')}
                className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 transition-all duration-300 transform hover:scale-110"
              >
                <Phone className="w-5 h-5" />
              </Button>
            </div>

            {/* Input */}
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full bg-black/30 border-purple-500/30 text-white placeholder-purple-300/50 focus:border-purple-400 focus:ring-purple-400/20 glass-effect pr-12 py-3 rounded-xl"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
