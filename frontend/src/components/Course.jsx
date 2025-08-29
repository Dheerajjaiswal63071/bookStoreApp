import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import { Link } from 'react-router-dom'
import axios from "axios"

const Course = () => {
  const [book, setBook] = useState([]);
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

  useEffect(() => {
    const getBook = async () => {
      try {
        console.log("🔄 Fetching data from backend...");
        const response = await fetch("http://localhost:4000/book")
        const data = await response.json();
        console.log("✅ Backend data received:", data);
        console.log("📊 Number of books:", data.length);
        setBook(data);
      } catch (error) {
        console.log("❌ Backend error:", error);
        setBook([]);
      }
    }
    getBook();
  }, [])

  return (
    <>
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-32">
        <div className="items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
            assumenda? Repellendus, iste corrupti? Tempore laudantium
            repellendus accusamus accusantium sed architecto odio, nisi expedita
            quas quidem nesciunt debitis dolore non aspernatur praesentium
            assumenda sint quibusdam, perspiciatis, explicabo sequi fugiat amet
            animi eos aut. Nobis quisquam reiciendis sunt quis sed magnam
            consequatur!
          </p>
           <Link to="/">
           <button 
             className="mt-6 px-4 py-2 rounded-md duration-300"
             style={{
               backgroundColor: isDarkMode ? '#ec4899' : '#ef4444', // pink-500 : red-500
               color: 'white',
               transition: 'background-color 0.2s',
               fontWeight: '500',
               fontSize: '14px',
               border: 'none',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
             }}
             onMouseEnter={(e) => {
               e.target.style.backgroundColor = isDarkMode ? '#db2777' : '#dc2626'; // pink-600 : red-600
             }}
             onMouseLeave={(e) => {
               e.target.style.backgroundColor = isDarkMode ? '#ec4899' : '#ef4444'; // pink-500 : red-500
             }}
           >
              Back
            </button>
           </Link>
          </div>
         <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {book.map((item) => (
            <Cards key={item._id || item.id} item={item} />
          ))}
        </div>
          </div>

    </>
  )
}

export default Course
