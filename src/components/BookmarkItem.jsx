import { motion } from 'framer-motion';
import { Trash2, Star, Link2 } from 'lucide-react';
import { useState } from 'react';
import useBookmarkStore from '../store/useBookmarkStore';

export default function BookmarkItem({ bookmark }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { deleteBookmark } = useBookmarkStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-5 space-y-3 hover:shadow-lg transition-all"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
          >
            <Link2 size={16} className="text-blue-500 group-hover:text-blue-700 transition-colors" />
            <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-1">
              {bookmark.title}
            </h3>
          </a>

          {bookmark.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {bookmark.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-start gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-lg transition-colors ${
              isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-400'
            }`}
          >
            <Star size={18} className={isFavorite ? 'fill-yellow-400' : ''} />
          </button>

          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="p-2 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
