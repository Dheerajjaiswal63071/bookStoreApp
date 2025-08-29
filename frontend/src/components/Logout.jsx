import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

function Logout() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if dark mode is active
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleLogout = () => {
    try {
      // Check if user is actually logged in
      const user = getUserFromStorage();
      if (!user) {
        toast.error("No user logged in");
        navigate('/login');
        return;
      }

      // Clear user data from localStorage
      localStorage.removeItem("Users");
      toast.success("Logout successful!");

      // Dispatch custom event to notify other components
      const logoutEvent = new CustomEvent('userLoggedOut');
      window.dispatchEvent(logoutEvent);

      // Navigate to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout. Please try again.");
    }
  };

  const buttonStyle = {
    backgroundColor: isDarkMode ? '#ec4899' : '#ef4444', // pink-500 : red-500
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontWeight: '500',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: 'none'
  };

  const hoverStyle = {
    backgroundColor: isDarkMode ? '#db2777' : '#dc2626' // pink-600 : red-600
  };

  return (
    <div>
      <button
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = hoverStyle.backgroundColor;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = buttonStyle.backgroundColor;
        }}
        onClick={handleLogout}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Logout</span>
      </button>
    </div>
  );
}

export default Logout;