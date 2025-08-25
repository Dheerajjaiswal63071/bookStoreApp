import React from 'react'
import Home from './home/Home'
import Course from './components/Course'
import { Routes,Route } from 'react-router-dom'
import Courses from './courses/Courses'
import { ThemeProvider } from './context/ThemeContext'
import Signup from './components/Signup'
import Login from './components/Login'
import Contact from './components/Contact'

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/course" element={<Courses/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App
