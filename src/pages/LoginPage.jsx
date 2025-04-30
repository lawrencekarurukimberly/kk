import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Lock, Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!', {
        icon: '🔓',
        style: {
          background: '#4F46E5',
          color: '#fff',
          fontSize: '14px',
        }
      });
      navigate('/');
    } catch (error) {
      // Error handling remains the same
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-600 to-purple-700 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-lg" />
      <div className="absolute inset-0 animate-pulse-slow">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/20 rounded-full mix-blend-screen blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-500/20 rounded-full mix-blend-screen blur-2xl animate-float-delayed" />
      </div>

      <motion.form
        onSubmit={handleLogin}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10 transition-all duration-300 hover:shadow-3xl border border-white/20"
      >
        <motion.div
          className="text-center mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-indigo-600" size={28} />
            </motion.div>
            <h2 className="text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Welcome Back
            </h2>
          </div>
          <p className="text-gray-500 text-sm">Secure access to your Vault</p>
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
        >
          {/* Email Input */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none group-hover:shadow-sm"
                required
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none group-hover:shadow-sm"
                required
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <button
              type="submit"
              className="w-full relative overflow-hidden bg-gradient-to-br from-indigo-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="bg-white/10 p-1 rounded-lg">
                  <Lock className="h-4 w-4" />
                </span>
                Unlock Your Vault
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>

          {/* Links Section */}
          <motion.div
            className="flex items-center justify-between mt-4"
            variants={itemVariants}
          >
            <a
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors hover:underline underline-offset-4"
            >
              Forgot Password?
            </a>
            <a
              href="/signup"
              className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors hover:underline underline-offset-4"
            >
              Create Account
            </a>
          </motion.div>
        </motion.div>
      </motion.form>

      {/* Animated Footer */}
      <motion.div
        className="absolute bottom-4 text-center w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-white/80">
          &copy; {new Date().getFullYear()} Vault. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}