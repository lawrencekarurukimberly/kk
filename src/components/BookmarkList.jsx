import { useState } from 'react';
import BookmarkItem from './BookmarkItem';
import useBookmarkStore from '../store/useBookmarkStore';
import { Search, Bookmark, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookmarkList() {
  const { bookmarks, loading, deleteBookmark } = useBookmarkStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookmarks = bookmarks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (id) => deleteBookmark(id);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative inline-block">
          <Loader className="w-12 h-12 text-blue-500 animate-spin" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-20 animate-pulse" />
        </div>
        <p className="text-gray-600 dark:text-zinc-400 text-sm font-medium">
          Loading your knowledge vault...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="mt-8 max-w-4xl mx-auto px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="text-gray-400 dark:text-zinc-500 transition-transform duration-300 group-focus-within:scale-110 group-focus-within:text-blue-500" />
          </div>
          <input
            type="text"
            placeholder="Search your vault..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-gray-900 dark:text-white text-sm rounded-xl border border-gray-200/50 dark:border-zinc-700/50 focus:ring-0 focus:border-transparent bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm placeholder-gray-400 dark:placeholder-zinc-500 transition-all duration-300 shadow-lg hover:shadow-xl focus:shadow-2xl"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-zinc-600 bg-gray-100/50 dark:bg-zinc-700/30 px-2 py-1 rounded-lg">
            {filteredBookmarks.length} entries
          </div>
        </div>
      </div>

      <AnimatePresence>
        {filteredBookmarks.length > 0 ? (
          <motion.ul
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredBookmarks.map((bookmark, index) => (
              <motion.li
                key={bookmark.id}
                variants={itemVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <BookmarkItem
                  bookmark={bookmark}
                  onDelete={handleDelete}
                />
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-12 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative text-gray-400 dark:text-zinc-600">
              <Bookmark className="w-16 h-16" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-10" />
            </div>
            <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">
              No treasures found in your vault...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}