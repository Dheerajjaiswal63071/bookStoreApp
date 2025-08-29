import React, { useState, useEffect } from "react";

function Cards({ item }) {
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
      <div className="p-1 sm:p-2">
        <div className="card w-full bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border rounded-lg overflow-hidden">
          <figure className="relative">
            <img 
              src={item.image} 
              alt={item.name || "Course"} 
              className="w-full h-32 sm:h-40 md:h-48 object-cover"
            />
            {item.category === "Free" && (
              <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                F
              </div>
            )}
          </figure>
          <div className="card-body p-3 sm:p-4">
            <h2 className="card-title text-sm sm:text-base lg:text-lg mb-2">
              {item.name}
              <div className="badge badge-secondary text-xs">{item.category}</div>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
              {item.title}
            </p>
            <div className="card-actions justify-between items-center">
              <div className="badge badge-outline text-xs sm:text-sm font-semibold">
                ${item.price}
              </div>
              <button 
                className="cursor-pointer px-2 sm:px-3 py-1 sm:py-2 rounded-full border-[2px] duration-200 text-xs sm:text-sm font-medium"
                style={{
                  backgroundColor: isDarkMode ? '#ec4899' : '#ef4444', // pink-500 : red-500
                  color: 'white',
                  borderColor: isDarkMode ? '#ec4899' : '#ef4444',
                  transition: 'background-color 0.2s, border-color 0.2s',
                  fontWeight: '500',
                  fontSize: '12px',
                  boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = isDarkMode ? '#db2777' : '#dc2626'; // pink-600 : red-600
                  e.target.style.borderColor = isDarkMode ? '#db2777' : '#dc2626';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = isDarkMode ? '#ec4899' : '#ef4444'; // pink-500 : red-500
                  e.target.style.borderColor = isDarkMode ? '#ec4899' : '#ef4444';
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;