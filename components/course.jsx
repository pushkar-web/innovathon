"use client"
import { useState } from "react"
import courses from "@/lib/courses"

// Helper function for consistent number formatting
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const CoursePlatform = () => {
  // State to track the selected course and current video
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  // Function to handle course selection
  const handleCourseClick = (course) => {
    setSelectedCourse(course)
    setCurrentVideoIndex(0)
    window.scrollTo(0, 0)
  }

  // Function to handle back button click
  const handleBackClick = () => {
    setSelectedCourse(null)
    setCurrentVideoIndex(0)
  }

  // Function to handle video selection from playlist
  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index)
  }

  // Function to navigate to next video
  const handleNextVideo = () => {
    if (currentVideoIndex < selectedCourse.lessons.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1)
    }
  }

  // Function to navigate to previous video
  const handlePrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1)
    }
  }

  // If a course is selected, display the course view with playlist
  if (selectedCourse) {
    const currentVideo = selectedCourse.lessons[currentVideoIndex]

    return (
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <button
            onClick={handleBackClick}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Courses
          </button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Video player area */}
            <div className="relative bg-black w-full" style={{ height: "450px" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={currentVideo.videoUrl}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              {/* Video navigation controls */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <button
                  onClick={handlePrevVideo}
                  disabled={currentVideoIndex === 0}
                  className={`bg-white bg-opacity-80 rounded-full p-2 ${currentVideoIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-100"} transition-all`}
                >
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button
                  onClick={handleNextVideo}
                  disabled={currentVideoIndex === selectedCourse.lessons.length - 1}
                  className={`bg-white bg-opacity-80 rounded-full p-2 ${currentVideoIndex === selectedCourse.lessons.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-100"} transition-all`}
                >
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Course title and navigation */}
            <div className="p-4 border-b">
              <h1 className="text-2xl font-bold">{currentVideo.title}</h1>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <span>
                  Video {currentVideoIndex + 1} of {selectedCourse.lessons.length}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b overflow-x-auto">
              <button className="px-6 py-3 font-medium text-blue-600 border-b-2 border-blue-600 whitespace-nowrap">
                Overview
              </button>
              <button className="px-6 py-3 font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">Q&A</button>
              <button className="px-6 py-3 font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">
                Downloads
              </button>
              <button className="px-6 py-3 font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">
                Announcements
              </button>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Main content */}
              <div className="p-6 md:w-2/3">
                <h2 className="text-xl font-bold mb-4">Lesson Overview</h2>
                <p className="text-gray-700 mb-6">{currentVideo.overview}</p>

                {currentVideo.qna && currentVideo.qna.length > 0 && (
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Common Questions:</h3>
                    <div className="space-y-4">
                      {currentVideo.qna.map((item, index) => (
                        <div key={index} className="space-y-1">
                          <p className="font-medium">{item.question}</p>
                          <p className="text-gray-700">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Video navigation buttons (mobile-friendly) */}
                <div className="flex justify-between mt-6 md:hidden">
                  <button
                    onClick={handlePrevVideo}
                    disabled={currentVideoIndex === 0}
                    className={`flex items-center px-4 py-2 rounded ${currentVideoIndex === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-100 text-blue-600 hover:bg-blue-200"}`}
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Previous
                  </button>
                  <button
                    onClick={handleNextVideo}
                    disabled={currentVideoIndex === selectedCourse.lessons.length - 1}
                    className={`flex items-center px-4 py-2 rounded ${currentVideoIndex === selectedCourse.lessons.length - 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-100 text-blue-600 hover:bg-blue-200"}`}
                  >
                    Next
                    <svg
                      className="w-5 h-5 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Playlist sidebar */}
              <div className="bg-gray-50 p-4 md:w-1/3 border-l">
                <h3 className="font-bold mb-4">Course Content</h3>
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {selectedCourse.lessons.map((video, index) => (
                    <div
                      key={video.id}
                      className={`flex items-start p-2 rounded cursor-pointer transition-colors ${index === currentVideoIndex ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-100"}`}
                      onClick={() => handleVideoSelect(index)}
                    >
                      {index === currentVideoIndex ? (
                        <div className="w-5 h-5 mr-3 mt-1 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 mr-3 mt-1 border border-gray-300 rounded-full flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
                          {index + 1}
                        </div>
                      )}
                      <div className="flex-1">
                        <p
                          className={`text-sm ${index === currentVideoIndex ? "font-medium text-blue-700" : "text-gray-700"}`}
                        >
                          {video.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Video navigation buttons (desktop) */}
                <div className="mt-6 hidden md:flex justify-between">
                  <button
                    onClick={handlePrevVideo}
                    disabled={currentVideoIndex === 0}
                    className={`flex items-center px-4 py-2 rounded ${currentVideoIndex === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-100 text-blue-600 hover:bg-blue-200"} transition-colors`}
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Previous
                  </button>
                  <button
                    onClick={handleNextVideo}
                    disabled={currentVideoIndex === selectedCourse.lessons.length - 1}
                    className={`flex items-center px-4 py-2 rounded ${currentVideoIndex === selectedCourse.lessons.length - 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-100 text-blue-600 hover:bg-blue-200"} transition-colors`}
                  >
                    Next
                    <svg
                      className="w-5 h-5 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Otherwise, display the course catalog
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Featured Courses</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:transform hover:scale-105"
              onClick={() => handleCourseClick(course)}
            >
              {/* Course thumbnail */}
              <div className="relative">
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
                <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-3 py-1">{course.difficulty}</div>
              </div>

              {/* Course info */}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                {/* Course metadata */}
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">{course.difficulty}</span>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="ml-1 text-sm font-medium">{course.rating}</span>
                  </div>
                </div>

                {/* Course stats */}
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    {course.lessons.length} lessons
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      ></path>
                    </svg>
                    {formatNumber(course.students)}
                  </div>
                </div>

                {/* Course tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Progress bar */}
                {course.progress && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                )}

                {/* Call to action */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
                  Start Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CoursePlatform