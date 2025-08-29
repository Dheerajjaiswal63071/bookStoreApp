import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const About = () => {
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

  const handleExploreCourses = () => {
    navigate('/course');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="text-pink-500">bookStore</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Your gateway to endless knowledge and learning opportunities. We believe in making education accessible, engaging, and transformative for everyone.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                At bookStore, we're passionate about connecting learners with the best educational resources. Our platform is designed to make learning accessible, enjoyable, and effective for students of all ages and backgrounds.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                We believe that knowledge should be free and accessible to everyone, which is why we offer a wide range of courses and resources at no cost to our users.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Free Learning
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Access to quality education without any cost barriers
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Why Choose bookStore?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Quality Content
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Curated courses and materials from expert educators and professionals
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Learn at Your Pace
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Flexible learning schedules that fit your lifestyle and commitments
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Community Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Connect with fellow learners and get support from our community
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Our Impact
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-pink-500 mb-2">10K+</div>
                <div className="text-gray-600 dark:text-gray-300">Active Learners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500 mb-2">500+</div>
                <div className="text-gray-600 dark:text-gray-300">Free Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-300">Expert Instructors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500 mb-2">95%</div>
                <div className="text-gray-600 dark:text-gray-300">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already benefiting from our free educational resources. Start your learning journey today!
            </p>
            <button 
              onClick={handleExploreCourses}
              className="px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              style={{
                backgroundColor: isDarkMode ? '#ec4899' : '#ef4444', // pink-500 : red-500
                color: 'white',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = isDarkMode ? '#db2777' : '#dc2626'; // pink-600 : red-600
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = isDarkMode ? '#ec4899' : '#ef4444'; // pink-500 : red-500
              }}
            >
              Explore Courses
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
