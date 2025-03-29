"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <motion.header
      className="bg-white shadow-lg sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center">
        <Link href="/main" className="text-2xl font-bold text-blue-600 flex items-center">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-poppins">INskillify AI</span>
        </Link>
        
        {/* Main navigation - in one line */}
        <nav className="hidden md:flex items-center space-x-8 mx-auto">
          <Link href="/course" className="text-gray-700 hover:text-blue-600 transition-colors">Courses</Link>
          <Link href="/generator" className="text-gray-700 hover:text-blue-600 transition-colors">Road Map</Link>
          <Link href="/mentor" className="text-gray-700 hover:text-blue-600 transition-colors">Mentorship</Link>
          <Link href="/resume-builder" className="text-gray-700 hover:text-blue-600 transition-colors">Resume Builder</Link>
          <Link href="/mock" className="text-gray-700 hover:text-blue-600 transition-colors">Ai Mock</Link>
          
          <Link href="/code" className="text-gray-700 hover:text-blue-600 transition-colors">Challenges</Link>
          <Link href="/quiz-result" className="text-gray-700 hover:text-blue-600 transition-colors">Leader Board</Link>
        </nav>
        
        {/* Right side button */}
        <div className="hidden md:block">
        <Link href="/" 
         className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-md transition-all duration-300"
         >
        Logout
        </Link>
        </div>
        
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="text-blue-600" /> : <Menu className="text-blue-600" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center py-4 space-y-4">
          <Link href="/course" className="text-gray-700 hover:text-blue-600 transition-colors">Courses</Link>
          <Link href="/generator" className="text-gray-700 hover:text-blue-600 transition-colors">Road Map</Link>
          <Link href="/mentor" className="text-gray-700 hover:text-blue-600 transition-colors">Mentorship</Link>
          <Link href="/resume-builder" className="text-gray-700 hover:text-blue-600 transition-colors">Resume Builder</Link>
          <Link href="/mock" className="text-gray-700 hover:text-blue-600 transition-colors">Ai mock</Link>
          <Link href="/code" className="text-gray-700 hover:text-blue-600 transition-colors">Challenges</Link>
          <Link href="/quiz-result" className="text-gray-700 hover:text-blue-600 transition-colors">Leader Board</Link>
              <button
                 className="w-full max-w-xs bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
              <Link href="/">
                 Logout
              </Link>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}