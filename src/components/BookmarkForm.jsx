import { motion } from 'framer-motion';
import { PlusCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import useBookmarkStore from '../store/useBookmarkStore';
import { toast } from 'react-hot-toast';

export default function BookmarkForm() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const addBookmark = useBookmarkStore((state) => state.addBookmark);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBookmark({
        url,
        title: title || new URL(url).hostname,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      });
      toast.success('Bookmark saved!');
      setUrl('');
      setTitle('');
      setTags('');
    } catch (error) {
      toast.error('Failed to save');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-lg mx-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-zinc-700 shadow-2xl rounded-3xl px-6 py-8 space-y-8 transition-colors"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <Sparkles size={22} className="text-indigo-500 animate-pulse" />
        Save a New Bookmark
      </h2>

      {[
        { label: 'URL', value: url, setter: setUrl, type: 'url', placeholder: 'https://example.com', required: true },
        { label: 'Title', value: title, setter: setTitle, type: 'text', placeholder: 'Optional title', required: false },
        { label: 'Tags', value: tags, setter: setTags, type: 'text', placeholder: 'Comma-separated tags', required: false }
      ].map((field, index) => (
        <div className="relative" key={index}>
          <input
            type={field.type}
            value={field.value}
            onChange={(e) => field.setter(e.target.value)}
            placeholder=" "
            required={field.required}
            className="peer w-full px-4 pt-5 pb-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
          <label className="absolute text-sm text-gray-500 dark:text-zinc-400 left-4 top-2 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
            {field.label}
          </label>
        </div>
      ))}

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-tr from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg hover:shadow-xl transition-all"
      >
        <PlusCircle size={18} />
        Add Bookmark
      </button>
    </motion.form>
  );
}
