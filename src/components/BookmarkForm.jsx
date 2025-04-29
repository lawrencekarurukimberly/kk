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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6 space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <Sparkles size={20} className="text-blue-500" />
        Save a new bookmark
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
            className="peer w-full px-4 pt-5 pb-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <label className="absolute text-sm text-gray-500 left-4 top-2 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
            {field.label}
          </label>
        </div>
      ))}

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all"
      >
        <PlusCircle size={18} />
        Add Bookmark
      </button>
    </motion.form>
  );
}
