import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, User, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const LoginPanel = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({ title: 'Please fill in both fields.' });
      return;
    }

    toast({ title: '🎉 Logged in successfully!' });
    onLogin(); // 🔐 Unlock the app
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="w-96 bg-black/60 border border-purple-500/30 rounded-xl p-6 relative overflow-hidden shadow-xl">

        {/* Background orbs */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-purple-700/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 left-6 w-16 h-16 bg-purple-400/10 rounded-full blur-xl animate-ping" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome NONIPaa</h2>
            <p className="text-purple-300/70 text-sm">
              {isLoginMode ? 'Sign in to your account' : 'Create a new account'}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-gray-900/50 border-purple-500/30 text-white placeholder-purple-300/50 focus:border-purple-400 focus:ring-purple-400/20 glass-effect"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-gray-900/50 border-purple-500/30 text-white placeholder-purple-300/50 focus:border-purple-400 focus:ring-purple-400/20 glass-effect"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 pulse-glow"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {isLoginMode ? 'Sign In' : 'Sign Up'}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-center"
          >
            <button
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-300"
            >
              {isLoginMode ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 pt-6 border-t border-purple-500/20"
          >
            <div className="text-center">
              <p className="text-purple-300/70 text-xs mb-4">Or continue with</p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-purple-500/30 text-purple-300 hover:bg-purple-900/30 hover:border-purple-400 transition-all duration-300"
                  onClick={() => toast({ title: '🚧 Google login not implemented yet.' })}
                >
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-purple-500/30 text-purple-300 hover:bg-purple-900/30 hover:border-purple-400 transition-all duration-300"
                  onClick={() => toast({ title: '🚧 GitHub login not implemented yet.' })}
                >
                  Continue with GitHub
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;
