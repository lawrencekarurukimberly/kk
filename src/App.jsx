// src/App.jsx
import { useEffect, useState } from 'react';
import BookmarkForm from './components/BookmarkForm';
import BookmarkList from './components/BookmarkList';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/LoginPage'; // Added import statement
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Import BrowserRouter, Routes, Route, and Link
import useBookmarkStore from './store/useBookmarkStore';
import { auth } from './firebase';

export default function App() {
const { subscribe } = useBookmarkStore();
const [isSignedIn, setIsSignedIn] = useState(false);

useEffect(() => {
  const unsubscribe = subscribe();

  const unsubscribeAuth = auth.onAuthStateChanged((user) => {
    if (user) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  });

  return () => {
    unsubscribe();
    unsubscribeAuth();
  };
}, []);

const handleSignInSuccess = () => {
  setIsSignedIn(true);
};

const handleSignOut = async () => {
  try {
    await auth.signOut();
    setIsSignedIn(false);
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

return (
  <BrowserRouter> {/* Wrap the entire content with BrowserRouter */}
    <div className="max-w-2xl mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🔖 Interactive Bookmarks
      </h1>
      <Routes> {/* Define the routes */}
        <Route
          path="/"
          element={
            isSignedIn ? (
              <>
                <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
                  Sign Out
                </button>
                <BookmarkForm />
                <BookmarkList />
              </>
            ) : (
              <>
                <SignInPage onSignInSuccess={handleSignInSuccess} />
                <Link to="/signup">Create an Account</Link>
              </>
            )
          }
        />
        <Route path="/signup" element={<SignUpPage />} /> {/* Route for the signup page */}
         <Route path="/login" element={<SignInPage onSignInSuccess={handleSignInSuccess} />} />
      </Routes>
    </div>
  </BrowserRouter>
);
}
