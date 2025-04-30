import { Trash2, Star, Link2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function BookmarkItem({ bookmark, onDelete }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleDelete = () => {
    onDelete(bookmark.id);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    hover: { y: -4 }
  };

  const tagColors = {
    design: 'from-purple-500 to-pink-500',
    development: 'from-blue-500 to-cyan-500',
    inspiration: 'from-orange-500 to-amber-500',
    default: 'from-gray-500 to-slate-500'
  };

  const getTagColor = (tag) => {
    const baseTag = tag.toLowerCase();
    return tagColors[baseTag] || tagColors.default;
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group relative bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-transparent dark:hover:border-transparent hover:bg-gradient-to-br hover:from-white/90 hover:to-gray-50/90 dark:hover:from-zinc-800/90 dark:hover:to-zinc-700/90"
    >
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group-hover:text-blue-500 transition-colors duration-200"
            >
              <Link2
                size={18}
                className="text-blue-500 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
              />
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1 text-lg">
                {bookmark.title}
              </h3>
            </a>

            {bookmark.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {bookmark.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    className={`px-2.5 py-1 text-xs font-medium bg-gradient-to-br ${getTagColor(tag)} text-white rounded-full backdrop-blur-sm`}
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>
            )}
          </div>

          {/* Buttons Container */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setIsFavorite(!isFavorite)}
              title="Mark as Favorite"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-all duration-300 ${
                isFavorite
                  ? 'text-yellow-400 hover:bg-yellow-100/50 dark:hover:bg-yellow-900/50'
                  : 'text-gray-400 hover:text-yellow-400 hover:bg-gray-100/50 dark:hover:bg-zinc-700/50'
              }`}
            >
              <Star
                size={20}
                className={`transition-transform ${
                  isFavorite ? 'fill-yellow-400 scale-110' : ''
                }`}
              />
            </motion.button>

            <motion.button
              onClick={handleDelete}
              title="Delete Bookmark"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100/50 dark:hover:bg-zinc-700/50 transition-colors duration-300"
            >
              <Trash2 size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute top-2 right-2 text-xs text-gray-500 dark:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm px-2 py-1 rounded-full bg-white/50 dark:bg-zinc-800/50"
        initial={{ x: 10 }}
        animate={{ x: 0 }}
      >
        Updated 2 days ago
      </motion.div>

      {/* Hover gradient effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-sm" />
      </div>
    </motion.div>
  );
}