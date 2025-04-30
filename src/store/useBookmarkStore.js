import { create } from 'zustand';
import {
  addDoc, deleteDoc, doc,
  onSnapshot, orderBy, query
} from 'firebase/firestore';
import { bookmarksCollection } from '../firebase';

const useBookmarkStore = create((set) => ({
  bookmarks: [],
  loading: true,

  subscribe: () => {

    const q = query(bookmarksCollection, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookmarks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ bookmarks, loading: false });
    });
    return unsubscribe;
  },

  addBookmark: async (bookmark) => {

    await addDoc(bookmarksCollection, {
      ...bookmark,
      createdAt: new Date().toISOString()
    });
  },

  deleteBookmark: async (id) => {

    await deleteDoc(doc(bookmarksCollection, id));
  },
}));

export default useBookmarkStore;