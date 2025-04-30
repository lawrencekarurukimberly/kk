// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 


const firebaseConfig = {
  apiKey: "AIzaSyBxncX6q4IpZs5uiqkkk02iMgr5hNB-brc",
  authDomain: "vault-566ae.firebaseapp.com",
  projectId: "vault-566ae",
  storageBucket: "vault-566ae.firebasestorage.app",
  messagingSenderId: "1036161162981",
  appId: "1:1036161162981:web:bca8fa19794b31dd137e0c",
  measurementId: "G-Y6RZDFQ6B8"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const bookmarksCollection = collection(db, 'bookmarks');
export { auth };

export default db;
