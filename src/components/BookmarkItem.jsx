import { Trash2, Star, Link2 } from 'lucide-react';
import { useState } from 'react';

export default function BookmarkItem({ bookmark = {
  id: '1',
  url: 'https://example.com',
  title: 'Example Website',
  tags: ['demo', 'example', 'react']
} }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock delete function since we don't have the actual store
  const deleteBookmark = (id) => {
    console.log('Deleting bookmark with id:', id);
  };

  return (
    <div
      className="bg-white/80 dark:bg-zinc-900/70 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-sm p-5 space-y-3 transition-all hover:shadow-lg"
      style={{
        backdropFilter: 'blur(12px)',
        transform: 'translateY(0)',
        opacity: 1
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
          >
            <Link2
              size={16}
              className="text-indigo-500 group-hover:text-indigo-700 transition-colors"
            />
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-indigo-700 transition-colors line-clamp-1">
              {bookmark.title}
            </h3>
          </a>
          {bookmark.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {bookmark.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-300/10 dark:text-indigo-300 rounded-full hover:scale-105 transition-transform"
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
            title="Mark as Favorite"
            className={`p-2 rounded-lg transition-colors ${
              isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-400'
            }`}
            style={{
              transform: 'scale(1)',
              transition: 'transform 0.2s ease'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.9)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseEnter={(e) => {
              if (isFavorite) {
                e.currentTarget.style.transform = 'scale(1.1) rotate(-10deg)';
              } else {
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Star
              size={18}
              className={`transition-transform ${
                isFavorite ? 'fill-yellow-400' : ''
              }`}
            />
          </button>
          <button
            onClick={() => deleteBookmark(bookmark.id)}
            title="Delete Bookmark"
            className="p-2 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
            style={{
              transform: 'scale(1)',
              transition: 'transform 0.2s ease'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.9)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}