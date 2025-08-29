import React, { useState, useEffect } from 'react'
import banner from "../../public/Banner1.jpg"

const Banner = () => {
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

  return (
    <>
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row items-center min-h-screen pt-20 pb-12'>
    <div className='order-2 md:order-1 w-full md:w-1/2 mt-8 md:mt-0 md:pr-8'>
   <div className='space-y-6'>
     <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white leading-tight'>
        Hello, welcome here to learn something {""}<span className="text-pink-500">new everyday</span> 
    </h1>
   <p className="text-base md:text-lg lg:text-xl dark:text-gray-300 leading-relaxed">
              Discover a world of knowledge with our curated collection of free educational resources. 
              From programming and design to business and personal development, we offer high-quality 
              courses designed to help you grow your skills and advance your career. Join thousands 
              of learners who are already transforming their lives through accessible education.
            </p>
   </div>
   <div className='mt-8'>
    <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </g>
  </svg>
  <input 
    type="email" 
    placeholder="Enter your email for updates" 
    required 
    className="dark:bg-gray-100 dark:text-gray-900 dark:placeholder-gray-500 text-gray-900 bg-white border-gray-300 dark:border-gray-400"
  />
</label>
   </div>
   <button 
     className="mt-6 duration-200"
     style={{
       backgroundColor: isDarkMode ? '#ec4899' : '#ef4444', // pink-500 : red-500
       color: 'white',
       padding: '12px 24px',
       borderRadius: '8px',
       cursor: 'pointer',
       transition: 'background-color 0.2s',
       fontWeight: '600',
       fontSize: '16px',
       border: 'none',
       display: 'inline-block',
       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
     }}
     onMouseEnter={(e) => {
       e.target.style.backgroundColor = isDarkMode ? '#db2777' : '#dc2626'; // pink-600 : red-600
     }}
     onMouseLeave={(e) => {
       e.target.style.backgroundColor = isDarkMode ? '#ec4899' : '#ef4444'; // pink-500 : red-500
     }}
   >
     Start Learning
   </button>
    </div>
    <div className='order-1 w-full md:w-1/2 flex justify-center md:justify-end'>
    <img 
      src={banner} 
      alt="Educational banner" 
      className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover rounded-lg shadow-lg"
    />
    </div>
    </div>
    </>
  )
}

export default Banner
