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

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="mt-8">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by title or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="space-y-3">
        {filteredBookmarks.map((bookmark) => (
          <BookmarkItem
            key={bookmark.id}
            bookmark={bookmark}
          />
        ))}
      </div>
    </div>
  );
}