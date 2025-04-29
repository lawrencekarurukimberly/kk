import { create } from 'zustand';
import {
  addDoc, deleteDoc, doc,
  onSnapshot, orderBy, query
} from 'firebase/firestore';
import { bookmarksCollection } from '../firebase'; // Correct path relative to src/store

const useBookmarkStore = create((set) => ({
  bookmarks: [],
  loading: true,

  subscribe: () => {
    // Creates a real-time listener for the 'bookmarks' collection
    const q = query(bookmarksCollection, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookmarks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ bookmarks, loading: false }); // Update state with fetched bookmarks
    });
    return unsubscribe; // Return the unsubscribe function to clean up the listener
  },

  addBookmark: async (bookmark) => {
    // Adds a new document to the 'bookmarks' collection
    await addDoc(bookmarksCollection, {
      ...bookmark,
      createdAt: new Date().toISOString() // Add a timestamp
    });
  },

  deleteBookmark: async (id) => {
    // Deletes a document from the 'bookmarks' collection by ID
    await deleteDoc(doc(bookmarksCollection, id));
  },
}));

export default useBookmarkStore;