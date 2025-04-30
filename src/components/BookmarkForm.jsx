import { motion } from 'framer-motion';
import { PlusCircle, Sparkles, Link, Tag, TextCursorInput } from 'lucide-react';
import { useState } from 'react';
import useBookmarkStore from '../store/useBookmarkStore';
import { toast } from 'react-hot-toast';

export default function BookmarkForm() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addBookmark = useBookmarkStore((state) => state.addBookmark);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addBookmark({
        url,
        title: title || new URL(url).hostname,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      });
      toast.success('Bookmark saved!', {
        icon: '🎉',
        style: {
          background: '#6366F1',
          color: '#fff',
          fontSize: '14px',
        }
      });
      setUrl('');
      setTitle('');
      setTags('');
    } catch (error) {
      toast.error('Failed to save', {
        icon: '❌',
        style: {
          background: '#EF4444',
          color: '#fff',
        }
      });
    } finally {
      setIsSubmitting(false);
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

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeInOut' }
    },
  };

  const fieldConfig = [
    {
      label: 'URL',
      icon: <Link className="h-5 w-5" />,
      value: url,
      setter: setUrl,
      type: 'url',
      placeholder: 'https://example.com',
      required: true
    },
    {
      label: 'Title',
      icon: <TextCursorInput className="h-5 w-5" />,
      value: title,
      setter: setTitle,
      type: 'text',
      placeholder: 'Optional title',
      required: false
    },
    {
      label: 'Tags',
      icon: <Tag className="h-5 w-5" />,
      value: tags,
      setter: setTags,
      type: 'text',
      placeholder: 'comma, separated, tags',
      required: false
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-600 to-purple-700 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-lg" />
      <div className="absolute inset-0 animate-pulse-slow">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/20 rounded-full mix-blend-screen blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-500/20 rounded-full mix-blend-screen blur-2xl animate-float-delayed" />
      </div>

      <motion.form
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/95 dark:bg-zinc-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10 transition-all duration-300 hover:shadow-3xl border border-white/20 dark:border-zinc-700"
      >
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'backOut' }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="text-indigo-500 mr-2" size={28} />
          </motion.div>
          <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            New Bookmark
          </h2>
        </motion.div>

        <div className="space-y-6">
          {fieldConfig.map((field, index) => (
            <motion.div
              key={index}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <label htmlFor={field.label} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {field.label}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-500 transition-colors">
                  {field.icon}
                </div>
                <input
                  type={field.type}
                  id={field.label}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/20 transition-all outline-none bg-white dark:bg-zinc-700/30 text-gray-700 dark:text-gray-200 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            </motion.div>
          ))}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full relative overflow-hidden bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-300 hover:from-indigo-600 hover:to-blue-700"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <PlusCircle className="mr-2" size={18} />
                <span className="relative z-10">Add Bookmark</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
              </div>
            )}
          </motion.button>
        </div>
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