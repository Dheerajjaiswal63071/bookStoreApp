import React, { useState, useEffect } from 'react';
import Cards from './Cards';

const Freebook = () => {
  const [book, setBook] = useState([]);
  
  useEffect(() => {
    const getBook = async () => {
      try {
        console.log("🔄 Freebook: Fetching data from backend...");
        const response = await fetch("http://localhost:4000/book")
        const data = await response.json();
        console.log("✅ Freebook: Backend data received:", data);
        console.log("📊 Freebook: Number of books:", data.length);
        
        // Filter books with category "Free"
        const freeBooks = data.filter(item => item.category === "Free");
        console.log("🆓 Freebook: Filtered free books:", freeBooks);
        console.log("📊 Freebook: Number of free books:", freeBooks.length);
        
        setBook(freeBooks);
      } catch (error) {
        console.log("❌ Freebook: Backend error:", error);
        setBook([]);
      }
    }
    getBook();
  }, [])

  return (
    <>
    <div className="max-w-screen-2xl container mx-auto px-3 sm:px-6 lg:px-8 xl:px-20 py-6 sm:py-8 lg:py-12">
      <div className="mb-6 sm:mb-8 lg:mb-12">
        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold pb-2 sm:pb-3 lg:pb-4 text-gray-900 dark:text-white text-center sm:text-left">
          Free Offered Courses
        </h1>
        <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto sm:mx-0 text-center sm:text-left">
          Explore our collection of premium courses available completely free! 
          From beginner-friendly tutorials to advanced skill development, these 
          carefully selected courses cover essential topics in technology, business, 
          and personal growth. Start your learning journey today without any cost barriers.
        </p>
      </div>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {book.map((item)=>(
          <div key={item._id || item.id}>
            <Cards item={item} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Freebook;
