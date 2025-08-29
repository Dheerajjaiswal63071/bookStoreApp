import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { useForm } from "react-hook-form"
import axios from 'axios'
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

const Login = () => {
  const navigate = useNavigate()
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async(data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    }
    
    try {
      const res = await axios.post("http://localhost:4000/user/login", userInfo)
      console.log("Login response:", res.data)
      
      if(res.data && res.data.user){
       // alert("Login successful!")
        toast.success("Login successful!");
        localStorage.setItem("Users", JSON.stringify(res.data.user))
        console.log("User data stored:", res.data.user)
        navigate('/') // Navigate to home page after successful login
      } else {
        //alert("Login successful but no user data received")
        toast.success("Login successful but no user data received");
        navigate('/')
      }
    } catch (err) {
      if(err.response){
        //alert(err.response.data.message)
        toast.error(err.response.data.message);
        console.log(err.response.data.message)
      }
      else{
        console.log(err)
        //alert("An error occurred. Please try again.")
        toast.error("An error occurred. Please try again.");
      }
    }
  }
  // console.log(data)
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Or{' '}
                <Link to="/signup" className="font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500">
                  create a new account
                </Link>
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                  />
                    {errors.email && <span className='text-sm text-red-500'> This field is required</span>}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
                    placeholder="Enter your password"
                    {...register("password", { required: true })}
                  />
                    {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: isDarkMode ? '#ec4899' : '#ef4444', // pink-500 : red-500
                    color: 'white',
                    width: '100%',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    fontWeight: '500',
                    fontSize: '14px',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = isDarkMode ? '#db2777' : '#dc2626'; // pink-600 : red-600
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = isDarkMode ? '#ec4899' : '#ef4444'; // pink-500 : red-500
                  }}
                >
                  Sign in
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/signup" className="font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500">
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
