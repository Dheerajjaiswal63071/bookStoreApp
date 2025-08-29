import React, { useState, useEffect } from 'react'
import Home from './home/Home'
import Course from './components/Course'
import { Routes, Route, Navigate } from 'react-router-dom'
import Courses from './courses/Courses'
import { ThemeProvider } from './context/ThemeContext'
import Signup from './components/Signup'
import Login from './components/Login'
import Contact from './components/Contact'
import About from './components/About'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'

// Utility function to get user data from localStorage
const getUserFromStorage = () => {
  try {
    const userData = localStorage.getItem("Users")
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    console.error("Error parsing user data:", error)
    return null
  }
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasShownRedirect, setHasShownRedirect] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      const user = getUserFromStorage();
      setAuthUser(user);
      setLoading(false);
      
      // Show redirect message only once when user is not authenticated
      if (!user && !hasShownRedirect) {
        toast.error("Please login to access this page");
        setHasShownRedirect(true);
      }
    };

    checkUser();

    // Listen for storage changes and logout events
    const handleStorageChange = () => checkUser();
    const handleLogout = () => checkUser();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLoggedOut', handleLogout);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLoggedOut', handleLogout);
    };
  }, [hasShownRedirect]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route Component (redirects logged-in users to home)
const PublicRoute = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      const user = getUserFromStorage();
      setAuthUser(user);
      setLoading(false);
    };

    checkUser();

    // Listen for storage changes and logout events
    const handleStorageChange = () => checkUser();
    const handleLogout = () => checkUser();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLoggedOut', handleLogout);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLoggedOut', handleLogout);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/course" element={
          <ProtectedRoute>
            <Courses/>
          </ProtectedRoute>
        }/>
        <Route path="/signup" element={
          <PublicRoute>
            <Signup/>
          </PublicRoute>
        }/>
        <Route path="/login" element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
        }/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',
            },
          },
          error: {
            duration: 4000,
            theme: {
              primary: '#ff4b4b',
            },
          },
        }}
      />
    </ThemeProvider>
  )
}

export default App
