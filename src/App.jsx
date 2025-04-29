import { useEffect } from 'react';
import BookmarkForm from './components/BookmarkForm';
import BookmarkList from './components/BookmarkList';
import useBookmarkStore from './store/useBookmarkStore';

export default function App() {
  const { subscribe } = useBookmarkStore();

  useEffect(() => {
    const unsubscribe = subscribe();
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🔖 Interactive Bookmarks
      </h1>
      <BookmarkForm />
      <BookmarkList />
    </div>
  );
}