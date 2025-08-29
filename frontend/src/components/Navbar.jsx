import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { Link } from 'react-router-dom'
import Logout from "./Logout";

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

// Custom Auth Button Component with theme-based styling
const AuthButton = ({ to, children }) => {
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

  const buttonStyle = {
    backgroundColor: isDarkMode ? '#ec4899' : '#ef4444', // pink-500 : red-500
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontWeight: '500',
    fontSize: '14px',
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: 'none'
  };

  const hoverStyle = {
    backgroundColor: isDarkMode ? '#db2777' : '#dc2626' // pink-600 : red-600
  };

  return (
    <Link
      to={to}
      style={buttonStyle}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = hoverStyle.backgroundColor;
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = buttonStyle.backgroundColor;
      }}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [authUser, setAuthUser] = useState(null);
  const [sticky, setSticky] = useState(false);

  // Check for user on component mount and when localStorage changes
  useEffect(() => {
    const checkUser = () => {
      const user = getUserFromStorage();
      setAuthUser(user);
    };

    checkUser();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkUser();
    };

    // Listen for custom logout event
    const handleLogout = () => {
      checkUser();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLoggedOut', handleLogout);
    
    // Also check when the window gains focus (user comes back to tab)
    const handleFocus = () => {
      checkUser();
    };
    
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLoggedOut', handleLogout);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => { window.removeEventListener('scroll', handleScroll); }
  }, []);

  const navItems = (
    <>
      <li><Link to='/' className="text-gray-800 dark:text-white hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200" onClick={() => {
        // Trigger filtered data logging when home is clicked
        const event = new CustomEvent('homeClicked');
        window.dispatchEvent(event);
      }}>Home</Link></li>
      <li><Link to='/course' className="text-gray-800 dark:text-white hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200">Course</Link></li>
      <li><Link to='/contact' className="text-gray-800 dark:text-white hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200">Contact</Link></li>
      <li><Link to='/about' className="text-gray-800 dark:text-white hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200">About</Link></li>
    </>
  );

  return (
    <nav className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 ${
      sticky?"sticky-navbar shadow-md bg-base-200 dark:bg-gray-800 duration-300 transition-all ease-in-out":""
    }`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navItems}
          </ul>
        </div>
        <Link to="/" className="text-2xl font-bold cursor-pointer">bookStore</Link>
      </div>
      <div className='navbar-end space-x-3'>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems}
          </ul>
        </div>
        <div className='hidden md:block'>
          <label className="input bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
            <svg className="h-[1em] opacity-70 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input 
              type="search" 
              required 
              placeholder="Search courses..." 
              className='text-gray-900 dark:text-white bg-transparent border-none outline-none placeholder-gray-500 dark:placeholder-gray-400 focus:placeholder-gray-400 dark:focus:placeholder-gray-300 transition-colors duration-200' 
            />
          </label>
        </div>
        <div>
           <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />

              {/* sun icon */}
              <svg
                className="swap-off fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
        </div>
        {authUser ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Welcome, {authUser.fullname}!
            </span>
            <Logout/>
          </div>
        ) : (
          <div className="flex space-x-2">
            <AuthButton to="/login">Login</AuthButton>
            <AuthButton to="/signup">Signup</AuthButton>
          </div>
        )}
        
      </div>
    </nav>
  )
}

export default Navbar
