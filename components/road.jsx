"use client";
import React, { useState, useEffect } from 'react';

export default function RoadmapGenerator() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [timeframe, setTimeframe] = useState('3 Months');
  const [customTimeframe, setCustomTimeframe] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);
  const [error, setError] = useState(null);
  const [showMermaidDiagram, setShowMermaidDiagram] = useState(false);
  const [mermaidCode, setMermaidCode] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('beginner');

  // Topic data with icons and descriptions
  const topics = [
    { id: 'javascript', name: 'JavaScript', icon: '🟨', description: 'High-level programming language core to web development' },
    { id: 'html', name: 'HTML', icon: '🟧', description: 'Markup language for creating web pages' },
    { id: 'css', name: 'CSS', icon: '🟦', description: 'Style sheet language for designing web pages' },
    { id: 'react', name: 'React', icon: '⚛️', description: 'JavaScript library for building user interfaces' },
    { id: 'nodejs', name: 'Node.js', icon: '🟢', description: 'JavaScript runtime for server-side programming' },
    { id: 'python', name: 'Python', icon: '🐍', description: 'High-level programming language for general purposes' },
    { id: 'java', name: 'Java', icon: '☕', description: 'Object-oriented programming language' },
    { id: 'cpp', name: 'C++', icon: '🔵', description: 'Extension of C with classes and objects' },
    { id: 'ruby', name: 'Ruby', icon: '♦️', description: 'Dynamic, object-oriented programming language' },
    { id: 'php', name: 'PHP', icon: '🐘', description: 'Server-side scripting language for web development' },
    { id: 'swift', name: 'Swift', icon: '🔶', description: 'Programming language for iOS and macOS development' },
    { id: 'kotlin', name: 'Kotlin', icon: '🟪', description: 'Cross-platform, statically typed language' },
    { id: 'go', name: 'Go', icon: '🔷', description: 'Statically typed language by Google' },
    { id: 'rust', name: 'Rust', icon: '⚙️', description: 'Systems programming with memory safety' },
    { id: 'typescript', name: 'TypeScript', icon: '🔷', description: 'JavaScript with static type definitions' },
    { id: 'sql', name: 'SQL', icon: '🗄️', description: 'Language for managing relational databases' },
    { id: 'mongodb', name: 'MongoDB', icon: '🍃', description: 'NoSQL database program' },
    { id: 'graphql', name: 'GraphQL', icon: '⬡', description: 'Query language for APIs' },
    { id: 'docker', name: 'Docker', icon: '🐳', description: 'Platform for developing, shipping, and running applications' },
    { id: 'kubernetes', name: 'Kubernetes', icon: '☸️', description: 'Container orchestration system' },
    { id: 'aws', name: 'AWS', icon: '☁️', description: 'Amazon Web Services cloud platform' },
    { id: 'azure', name: 'Azure', icon: '☁️', description: 'Microsoft cloud computing service' },
    { id: 'git', name: 'Git', icon: '📋', description: 'Distributed version control system' },
    { id: 'ml', name: 'Machine Learning', icon: '🧠', description: 'Artificial intelligence discipline' },
    { id: 'ai', name: 'Artificial Intelligence', icon: '🤖', description: 'Intelligence demonstrated by machines' }
  ];

  // Timeframe options
  const timeframes = [
    '1 Month',
    '3 Months',
    '6 Months',
    '1 Year',
    '2 Years',
    'Custom'
  ];

  // Experience level options
  const experienceLevels = [
    { id: 'beginner', name: 'Beginner', description: 'Little to no prior knowledge' },
    { id: 'intermediate', name: 'Intermediate', description: 'Some experience, looking to advance' },
    { id: 'advanced', name: 'Advanced', description: 'Experienced, looking to master' }
  ];

  // Toggle topic selection
  const toggleTopic = (topicId) => {
    if (selectedTopics.includes(topicId)) {
      setSelectedTopics(selectedTopics.filter(id => id !== topicId));
    } else {
      // Limit to 3 topics max for better roadmap quality
      if (selectedTopics.length < 3) {
        setSelectedTopics([...selectedTopics, topicId]);
      } else {
        setError("Please select a maximum of 3 topics for a focused roadmap");
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  // Generate roadmap using the backend API
  const generateRoadmap = async () => {
    if (selectedTopics.length === 0) {
      setError("Please select at least one topic");
      return;
    }
    
    if (timeframe === 'Custom' && (!customTimeframe || isNaN(parseInt(customTimeframe)))) {
      setError("Please enter a valid number of months for custom timeframe");
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      // Get the selected topic names for the API call
      const selectedTopicNames = selectedTopics.map(topicId => 
        topics.find(topic => topic.id === topicId).name
      );
      
      // Determine the timeframe in a format the API can understand
      let timeframeValue = timeframe;
      if (timeframe === 'Custom') {
        timeframeValue = `${customTimeframe} Months`;
      }
      
      // Call the API with the selected parameters
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topics: selectedTopicNames,
          timeframe: timeframeValue,
          experienceLevel: experienceLevel
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate roadmap');
      }
      
      const data = await response.json();
      
      if (data.roadmapData) {
        setRoadmapData(data.roadmapData);
        
        // Generate Mermaid code if provided
        if (data.mermaidCode) {
          setMermaidCode(data.mermaidCode);
        } else {
          // Generate Mermaid code on the client side if not provided by API
          const generatedMermaidCode = generateMermaidCode(data.roadmapData);
          setMermaidCode(generatedMermaidCode);
        }
      } else {
        throw new Error('Invalid roadmap data received');
      }
      
      setIsGenerating(false);
    } catch (err) {
      console.error("Error generating roadmap:", err);
      setError("Failed to generate roadmap. Please try again.");
      setIsGenerating(false);
    }
  };
  
  // Generate Mermaid diagram code (client-side fallback)
  const generateMermaidCode = (roadmapData) => {
    let code = 'gantt\n';
    code += '    title Roadmap for ' + roadmapData.topics.map(t => t.name).join(', ') + '\n';
    code += '    dateFormat YYYY-MM-DD\n';
    code += '    axisFormat %b %d\n\n';
    
    // Calculate dates
    const startDate = new Date();
    let currentDate = new Date(startDate);
    
    // Convert timeframe to months
    let durationMonths = 3; // default
    if (roadmapData.timeframe.includes('Month')) {
      durationMonths = parseInt(roadmapData.timeframe);
    } else if (roadmapData.timeframe.includes('Year')) {
      durationMonths = parseInt(roadmapData.timeframe) * 12;
    } else if (roadmapData.timeframe === 'Custom') {
      durationMonths = parseInt(customTimeframe) || 3;
    }
    
    // Add sections for each topic
    roadmapData.topics.forEach((topic, topicIndex) => {
      code += '    section ' + topic.name + '\n';
      
      // Reset date for each topic
      currentDate = new Date(startDate);
      
      // Calculate duration for each stage
      const stageDuration = Math.floor(durationMonths / topic.stages.length);
      
      topic.stages.forEach((stage, stageIndex) => {
        const stageStartDate = new Date(currentDate);
        
        // Calculate end date based on stage duration
        currentDate.setDate(currentDate.getDate() + (stageDuration * 30)); // Approx 30 days per month
        
        // Format dates
        const startFormatted = formatDate(stageStartDate);
        const endFormatted = formatDate(currentDate);
        
        // Add task
        code += `    ${stage.title} :${startFormatted}, ${endFormatted}\n`;
        
        // For the last stage of each topic, add a milestone
        if (stageIndex === topic.stages.length - 1) {
          code += `    ${topic.name} Completion :milestone, ${endFormatted}, 0d\n`;
        }
      });
    });
    
    return code;
  };
  
  // Format date for Mermaid
  const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-2">AI-Powered Learning Roadmap</h1>
        <p className="text-center text-gray-600 mb-8">Generate a personalized learning path with detailed milestones</p>
        
        {/* Experience Level Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Experience Level:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {experienceLevels.map(level => (
              <div 
                key={level.id}
                onClick={() => setExperienceLevel(level.id)}
                className={`flex flex-col p-4 rounded-lg cursor-pointer transition-all ${
                  experienceLevel === level.id 
                    ? 'bg-indigo-100 border-2 border-indigo-500 shadow-md' 
                    : 'bg-white border border-gray-200 hover:border-indigo-300'
                }`}
              >
                <span className="font-semibold text-gray-800 mb-1">{level.name}</span>
                <span className="text-sm text-gray-600">{level.description}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Topics Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Select Topics (Max 3):</h2>
          <p className="text-sm text-gray-600 mb-4">Choose technologies you want to learn</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {topics.map(topic => (
              <div 
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`flex flex-col p-3 rounded-lg cursor-pointer transition-all ${
                  selectedTopics.includes(topic.id) 
                    ? 'bg-indigo-100 border-2 border-indigo-500 shadow-md' 
                    : 'bg-white border border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 flex items-center justify-center mr-2 text-lg">
                    {topic.icon}
                  </div>
                  <span className="text-gray-800 font-medium">{topic.name}</span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Timeframe Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Learning Timeframe:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {timeframes.map(option => (
              <div 
                key={option}
                onClick={() => setTimeframe(option)}
                className={`px-4 py-3 rounded-lg cursor-pointer text-center transition-all ${
                  timeframe === option 
                    ? 'bg-indigo-500 text-white font-medium shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-300'
                }`}
              >
                {option}
              </div>
            ))}
          </div>
          
          {/* Custom timeframe input */}
          {timeframe === 'Custom' && (
            <div className="mt-4">
              <label htmlFor="custom-timeframe" className="block text-sm font-medium text-gray-700 mb-1">
                Number of months:
              </label>
              <input
                type="number"
                id="custom-timeframe"
                min="1"
                max="60"
                value={customTimeframe}
                onChange={(e) => setCustomTimeframe(e.target.value)}
                className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter months"
              />
            </div>
          )}
        </div>
        
        {/* Generate Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={generateRoadmap}
            disabled={selectedTopics.length === 0 || isGenerating}
            className={`flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg transition-all ${
              selectedTopics.length === 0 || isGenerating
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating AI Roadmap...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                Generate AI Roadmap
              </>
            )}
          </button>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8 text-center">
            {error}
          </div>
        )}
        
        {/* View Toggle Buttons */}
        {roadmapData && (
          <div className="flex justify-center mb-6 space-x-4">
            <button
              onClick={() => setShowMermaidDiagram(false)}
              className={`px-4 py-2 rounded-lg transition-all ${
                !showMermaidDiagram 
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700'
              }`}
            >
              <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Timeline View
            </button>
            <button
              onClick={() => setShowMermaidDiagram(true)}
              className={`px-4 py-2 rounded-lg transition-all ${
                showMermaidDiagram 
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700'
                }`}
                >
                  <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                  </svg>
                  Gantt Chart
                </button>
                <button
                  onClick={() => {
                    // Export roadmap as JSON
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(roadmapData));
                    const downloadAnchorNode = document.createElement('a');
                    downloadAnchorNode.setAttribute("href", dataStr);
                    downloadAnchorNode.setAttribute("download", "roadmap.json");
                    document.body.appendChild(downloadAnchorNode);
                    downloadAnchorNode.click();
                    downloadAnchorNode.remove();
                  }}
                  className="px-4 py-2 rounded-lg transition-all bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Export
                </button>
              </div>
            )}
            
            {/* Mermaid Gantt Chart */}
            {roadmapData && showMermaidDiagram && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                  {roadmapData.title} Gantt Chart ({roadmapData.timeframe})
                </h2>
                
                <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                  <pre className="text-xs overflow-x-auto">{mermaidCode}</pre>
                  
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => {
                        // Copy mermaid code to clipboard
                        navigator.clipboard.writeText(mermaidCode);
                        setError("Mermaid code copied to clipboard!");
                        setTimeout(() => setError(null), 2000);
                      }}
                      className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-sm hover:bg-gray-300"
                    >
                      Copy Mermaid Code
                    </button>
                    <a 
                      href={`https://mermaid.live/edit#${encodeURIComponent(mermaidCode)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-2 px-3 py-1 rounded bg-indigo-100 text-indigo-700 text-sm hover:bg-indigo-200"
                    >
                      Open in Mermaid Live Editor
                    </a>
                  </div>
                </div>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  This Gantt chart can be viewed using any Mermaid-compatible viewer or edited in the Mermaid Live Editor
                </p>
              </div>
            )}
            
            {/* Roadmap Display (Timeline View) */}
            {roadmapData && !showMermaidDiagram && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                  {roadmapData.title} ({roadmapData.timeframe})
                </h2>
                
                <div className="space-y-12">
                  {roadmapData.topics.map(topic => (
                    <div key={topic.id} className="border-b border-gray-200 pb-8 last:border-0">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 flex items-center justify-center text-2xl mr-3">
                          {topic.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">{topic.name}</h3>
                      </div>
                      
                      <div className="relative">
                        {/* Connection Line */}
                        <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200 rounded"></div>
                        
                        <div className="space-y-8">
                          {topic.stages.map((stage, index) => (
                            <div key={index} className="relative flex">
                              {/* Dot on timeline */}
                              <div 
                                className="absolute left-6 w-4 h-4 rounded-full transform -translate-x-1/2 z-10" 
                                style={{ backgroundColor: stage.color, top: '1.25rem' }}
                              ></div>
                              
                              {/* Content box */}
                              <div className="ml-12 flex-grow">
                                <div 
                                  className="rounded-lg p-5 shadow-md" 
                                  style={{ backgroundColor: `${stage.color}15`, borderLeft: `4px solid ${stage.color}` }}
                                >
                                  <h4 className="font-medium text-lg mb-3" style={{ color: stage.color }}>
                                    {stage.title}
                                  </h4>
                                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    {stage.items.map((item, i) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                  
                                  {/* Resources Section */}
                                  {stage.resources && stage.resources.length > 0 && (
                                    <div className="mt-4 pt-3 border-t border-gray-200">
                                      <h5 className="text-sm font-semibold text-gray-600 mb-2">Recommended Resources:</h5>
                                      <ul className="list-none space-y-1">
                                        {stage.resources.map((resource, i) => (
                                          <li key={i} className="text-sm text-indigo-600 flex items-center">
                                            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                            </svg>
                                            {resource}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
    
                <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-3">Personalized Learning Tips</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-indigo-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                      </svg>
                      <span>Create small, achievable goals for each stage of your learning journey</span>
                    </li>
                    <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-indigo-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                      </svg>
                      <span>Practice consistently - aim for at least 20 minutes of focused learning daily</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-indigo-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                      </svg>
                      <span>Build projects to apply what you're learning at each stage</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-indigo-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                      </svg>
                      <span>Join communities and forums related to your learning topics</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
    
          
          </div>
          
          
        </div>
      
  );
}