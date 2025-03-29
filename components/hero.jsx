"use client"

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Company from "./company"

const Button = ({ children, variant = "primary", href }) => {
  const router = useRouter()
  const baseStyles = "w-full sm:w-auto px-6 py-3 text-base font-medium rounded transition-all duration-300 flex items-center justify-center"
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1",
    text: "text-blue-600 hover:text-blue-800 border-2 border-blue-500 hover:bg-blue-50 hover:shadow-md transform hover:-translate-y-1",
  }
  
  const handleClick = () => {
    if (href) {
      router.push(href)
    }
  }
  
  return (
    <motion.button 
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-20">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/a.avif"
          alt="Background"
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      
      <div className="container px-6 sm:px-6 flex flex-col items-center text-center relative z-10">
        <motion.div 
          className="max-w-[320px] mx-auto sm:max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[32px] leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Empower Your Career Journey
            <motion.span 
              className="block text-blue-600 mt-1 sm:mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              For Tier 2 & 3 College Students
            </motion.span>
          </h1>
          <motion.p 
            className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            INskillify AI provides AI-powered interview simulations, personalized learning paths, and expert 
            mentorship to help you secure better job opportunities and achieve career success.
          </motion.p>
          <motion.div 
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button href="/login">
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Button>
            <Button href="/about" variant="text">
              How It Works
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12 sm:mt-16 text-left">
          {[
            {
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>,
              title: "AI Interview Simulations",
              description: "Practice with realistic interview scenarios tailored to your field and receive instant AI feedback."
            },
            {
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>,
              title: "Personalized Learning",
              description: "Get customized learning paths based on your skills, goals, and industry requirements."
            },
            {
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>,
              title: "Expert Mentorship",
              description: "Connect with industry professionals who provide guidance tailored to your career goals."
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-300 hover:border-blue-500 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + (index * 0.2), duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Video Container with animation and blue border */}
        <motion.div 
          className="relative w-full max-w-5xl mx-auto mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="aspect-video rounded-lg border-3 border-blue-400 p-2 shadow-xl hover:shadow-2xl hover:border-blue-500 transition-all duration-300">
            <div className="relative w-full h-full bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
            <video
                src="/images/videoplayback.mp4"
                className="w-full h-full object-contain"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/images/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </motion.div>
        <Company />
      </div>
    </section>
  )
}