import { useState } from 'react';
import BookmarkItem from './BookmarkItem';
import useBookmarkStore from '../store/useBookmarkStore';
import { Search } from 'lucide-react';

export default function BookmarkList() {
  const { bookmarks, loading } = useBookmarkStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookmarks = bookmarks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 text-gray-600 dark:text-zinc-300 text-sm">
        Loading bookmarks...
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-3xl mx-auto px-4">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400 dark:text-zinc-400" size={18} />
        <input
          type="text"
          placeholder="Search by title or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {filteredBookmarks.length > 0 ? (
        <div className="space-y-4">
          {filteredBookmarks.map((bookmark) => (
            <BookmarkItem key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      ) : (
        <div className="text-center text-sm text-gray-500 dark:text-zinc-400 py-6">
          No bookmarks match your search.
        </div>
      )}
    </div>
  );
}
