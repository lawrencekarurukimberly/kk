import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SignInPage({ onSignInSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error('Please enter both email and password', {
        icon: '❌',
        style: {
          background: '#EF4444',
          color: '#fff',
        }
      });
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Access Granted!', {
        icon: '🔓',
        style: {
          background: '#16A34A',
          color: '#fff',
          fontSize: '14px',
        }
      });
      onSignInSuccess();
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Authentication Failed', {
        icon: '⚠️',
        style: {
          background: '#EF4444',
          color: '#fff',
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeInOut' }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-500 via-green-600 to-lime-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-lg" />
      <div className="absolute inset-0 animate-pulse-slow">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-lime-500/20 rounded-full mix-blend-screen blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-emerald-500/20 rounded-full mix-blend-screen blur-2xl animate-float-delayed" />
      </div>

      <motion.form
        onSubmit={handleSignin}
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
              <Sparkles className="text-emerald-600" size={28} />
            </motion.div>
            <h2 className="text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              Welcome Back
            </h2>
          </div>
          <p className="text-gray-500 text-sm">Secure access to your account</p>
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
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none group-hover:shadow-sm dark:bg-gray-50"
                required
                disabled={isLoading}
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none group-hover:shadow-sm dark:bg-gray-50"
                required
                disabled={isLoading}
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden bg-gradient-to-br from-emerald-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </div>
              ) : (
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="bg-white/10 p-1 rounded-lg">
                    <Lock className="h-4 w-4" />
                  </span>
                  Secure Sign In
                </span>
              )}
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
              className="text-sm text-emerald-600 hover:text-emerald-800 font-medium transition-colors hover:underline underline-offset-4"
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