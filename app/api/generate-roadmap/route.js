// Next.js API route using App Router (Next.js 13+)
// This route handles roadmap generation

import { NextResponse } from 'next/server';

// Default API key - in production, store this in environment variables
const DEFAULT_API_KEY = process.env.HUGGINGFACE_API_TOKEN;

export async function POST(request) {
  try {
    // Get request body
    const body = await request.json();
    const { topics, timeframe, experienceLevel } = body;

    // Validate inputs
    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return NextResponse.json({ error: 'Topics are required and must be an array' }, { status: 400 });
    }

    if (!timeframe) {
      return NextResponse.json({ error: 'Timeframe is required' }, { status: 400 });
    }

    // Convert timeframe to number of months
    let months;
    if (timeframe.includes('Month')) {
      months = parseInt(timeframe);
    } else if (timeframe.includes('Year')) {
      months = parseInt(timeframe) * 12;
    } else {
      months = 3; // Default fallback
    }

    // Generate roadmap using Hugging Face API
    try {
      const roadmapData = await generateRoadmapWithAPI(topics, months, experienceLevel);
      
      // Generate Mermaid diagram code
      const mermaidCode = generateMermaidCode(roadmapData);

      return NextResponse.json({ roadmapData, mermaidCode });
    } catch (error) {
      console.error('API Error:', error.message);
      
      // Return a fallback mock response in case of error
      if (error.message === 'Use fallback') {
        const mockData = generateMockRoadmap(topics, timeframe, experienceLevel);
        const mermaidCode = generateMermaidCode(mockData);
        
        return NextResponse.json({
          roadmapData: mockData,
          mermaidCode,
          note: 'Using fallback data due to API error'
        });
      }
      
      throw error; // Re-throw for the outer catch block
    }
  } catch (error) {
    console.error('Error generating roadmap:', error);
    return NextResponse.json({ error: 'Failed to generate roadmap' }, { status: 500 });
  }
}

// Function to call Hugging Face API with improved error handling
async function generateRoadmapWithAPI(topics, months, experienceLevel) {
  // Create the prompt for the API
  const prompt = `
    Create a learning roadmap for the following tech topics: ${topics.join(', ')}.
    The roadmap should span ${months} months and be for a ${experienceLevel} level learner.
    It should be organized into sequential phases.
    
    For each phase, provide:
    1. A clear phase name
    2. A list of specific tasks/skills to learn
    3. The duration in weeks
    4. Recommended resources
    
    Make sure all phases together add up to approximately ${months} months (about ${months * 4} weeks).
    
    Format your response ONLY as a JSON object with exactly this structure:
    {
      "steps": [
        {
          "phase": "Phase Name",
          "tasks": ["Task 1", "Task 2", "Task 3"],
          "duration": "X weeks",
          "resources": ["Resource 1", "Resource 2"]
        },
        ...
      ]
    }
    
    IMPORTANT: Only return the JSON object, no other text. No explanation, no preamble.
  `;
  
  // Make API request to Hugging Face
  const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
  const headers = {
    "Authorization": `Bearer ${DEFAULT_API_KEY}`,
    "Content-Type": "application/json"
  };
  
  const payload = {
    "inputs": prompt,
    "parameters": {
      "max_new_tokens": 2048,
      "temperature": 0.5,  // Lower temperature for more consistent output
      "top_p": 0.8,
      "top_k": 40,
      "return_full_text": false
    }
  };
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
      cache: 'no-store' // Ensure fresh response each time
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract the response text from the model
    const modelResponse = data[0]?.generated_text;
    
    if (!modelResponse) {
      throw new Error('No response from API');
    }
    
    // Try to extract JSON from the response
    const roadmapData = extractJsonFromText(modelResponse);
    
    if (roadmapData && roadmapData.steps) {
      // Process and format the data
      const formattedRoadmap = formatRoadmapData(roadmapData, topics, months, experienceLevel);
      return formattedRoadmap;
    } else {
      throw new Error('Use fallback');
    }
  } catch (error) {
    console.error('API Error:', error.message);
    throw new Error('Use fallback');
  }
}

// Function to extract JSON from text
function extractJsonFromText(text) {
  // Look for JSON pattern
  const jsonPattern = /\{[\s\S]*\}/;
  const match = text.match(jsonPattern);
  
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (e) {
      console.error('JSON parse error:', e);
      return null;
    }
  }
  return null;
}

// Format the roadmap data for frontend consumption
function formatRoadmapData(apiData, topics, months, experienceLevel) {
  // Define colors for stages
  const colors = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#6366F1"];
  
  // Map topic names to icons
  const topicIcons = {
    'JavaScript': '🟨',
    'HTML': '🟧',
    'CSS': '🟦',
    'React': '⚛️',
    'Node.js': '🟢',
    'Python': '🐍',
    'Java': '☕',
    'C++': '🔵',
    'Ruby': '♦️',
    'PHP': '🐘',
    'Swift': '🔶',
    'Kotlin': '🟪',
    'Go': '🔷',
    'Rust': '⚙️',
    'TypeScript': '🔷',
    'SQL': '🗄️',
    'MongoDB': '🍃',
    'GraphQL': '⬡',
    'Docker': '🐳',
    'Kubernetes': '☸️',
    'AWS': '☁️',
    'Azure': '☁️',
    'Git': '📋',
    'Machine Learning': '🧠',
    'Artificial Intelligence': '🤖'
  };
  
  // Create topic objects
  const roadmapTopics = topics.map((topicName, index) => {
    // Create stages from the API data
    const steps = apiData.steps || [];
    
    // Distribute steps among topics if needed
    const topicSteps = steps.map((step, stepIndex) => {
      return {
        title: step.phase,
        color: colors[stepIndex % colors.length],
        items: step.tasks || [],
        resources: step.resources || [`${topicName} Documentation`, `${topicName} Community Resources`]
      };
    });
    
    return {
      id: topicName.toLowerCase().replace(/[\s.]+/g, ''),
      name: topicName,
      icon: topicIcons[topicName] || '🔹',
      stages: topicSteps
    };
  });
  
  // Determine timeframe text
  let timeframeText;
  if (months === 1) {
    timeframeText = '1 Month';
  } else if (months === 12) {
    timeframeText = '1 Year';
  } else if (months === 24) {
    timeframeText = '2 Years';
  } else {
    timeframeText = `${months} Months`;
  }
  
  return {
    title: "Learning Roadmap",
    timeframe: timeframeText,
    topics: roadmapTopics
  };
}

// Fallback function with mock data
function generateMockRoadmap(topics, timeframe, experienceLevel) {
  // Simplified version of the mock data generation
  
  // Convert timeframe to months
  let months;
  if (timeframe.includes('Month')) {
    months = parseInt(timeframe);
  } else if (timeframe.includes('Year')) {
    months = parseInt(timeframe) * 12;
  } else {
    months = 3; // Default
  }
  
  // Map topic names to icons
  const topicIcons = {
    'JavaScript': '🟨',
    'HTML': '🟧',
    'CSS': '🟦',
    'React': '⚛️',
    'Node.js': '🟢',
    'Python': '🐍',
    'Java': '☕',
    'C++': '🔵',
    'Ruby': '♦️',
    'PHP': '🐘',
    'Swift': '🔶',
    'Kotlin': '🟪',
    'Go': '🔷',
    'Rust': '⚙️',
    'TypeScript': '🔷',
    'SQL': '🗄️',
    'MongoDB': '🍃',
    'GraphQL': '⬡',
    'Docker': '🐳',
    'Kubernetes': '☸️',
    'AWS': '☁️',
    'Azure': '☁️',
    'Git': '📋',
    'Machine Learning': '🧠',
    'Artificial Intelligence': '🤖'
  };
  
  // Define colors for stages
  const colors = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#6366F1"];
  
  // Create mock roadmap topics
  const roadmapTopics = topics.map(topicName => {
    const stagesCount = Math.min(6, Math.max(3, Math.floor(months / 2)));
    let stages = [];
    
    // Generate mock stages based on topic
    if (topicName === 'JavaScript') {
      stages = [
        {
          title: "JavaScript Foundations",
          color: colors[0],
          items: [
            "Basic syntax and variables",
            "Control flow and functions",
            "DOM manipulation",
            "ES6+ features",
            "Error handling"
          ],
          resources: [
            "MDN Web Docs",
            "JavaScript.info",
            "Eloquent JavaScript book"
          ]
        },
        {
          title: "Intermediate JavaScript",
          color: colors[1],
          items: [
            "Object-oriented JavaScript",
            "Functional programming concepts",
            "Asynchronous JavaScript",
            "Promises and async/await",
            "Working with APIs"
          ],
          resources: [
            "You Don't Know JS series",
            "JavaScript Design Patterns",
            "JavaScript30 challenge"
          ]
        },
        {
          title: "Advanced JavaScript",
          color: colors[2],
          items: [
            "Performance optimization",
            "Memory management",
            "Module patterns",
            "Testing JavaScript applications",
            "Browser DevTools mastery"
          ],
          resources: [
            "JavaScript: The Good Parts",
            "Secrets of the JavaScript Ninja",
            "Clean Code in JavaScript"
          ]
        }
      ];
    } else if (topicName === 'React') {
      stages = [
        {
          title: "React Fundamentals",
          color: colors[0],
          items: [
            "JSX syntax",
            "Components and props",
            "State and lifecycle",
            "Handling events",
            "Conditional rendering"
          ],
          resources: [
            "React official documentation",
            "React Dev Tools",
            "Create React App"
          ]
        },
        {
          title: "React Patterns",
          color: colors[1],
          items: [
            "Component composition",
            "Context API",
            "Hooks in depth",
            "Custom hooks",
            "React Router"
          ],
          resources: [
            "React Patterns",
            "useHooks collection",
            "React Router documentation"
          ]
        },
        {
          title: "Advanced React",
          color: colors[2],
          items: [
            "State management (Redux/MobX)",
            "Performance optimization",
            "Server-side rendering",
            "Testing React applications",
            "React with TypeScript"
          ],
          resources: [
            "Redux documentation",
            "Testing Library guides",
            "Next.js documentation"
          ]
        }
      ];
    } else if (topicName === 'Python') {
      stages = [
        {
          title: "Python Basics",
          color: colors[0],
          items: [
            "Syntax and data types",
            "Control structures",
            "Functions and modules",
            "Error handling",
            "Basic I/O operations"
          ],
          resources: [
            "Python.org documentation",
            "Automate the Boring Stuff with Python",
            "Python Crash Course"
          ]
        },
        {
          title: "Intermediate Python",
          color: colors[1],
          items: [
            "Object-oriented programming",
            "File handling",
            "Regular expressions",
            "Virtual environments",
            "Package management"
          ],
          resources: [
            "Real Python tutorials",
            "Fluent Python",
            "Python Cookbook"
          ]
        },
        {
          title: "Python for Applications",
          color: colors[2],
          items: [
            "Web development (Django/Flask)",
            "Data analysis (Pandas/NumPy)",
            "API development",
            "Testing Python code",
            "Deployment strategies"
          ],
          resources: [
            "Django documentation",
            "Python for Data Analysis",
            "Test-Driven Development with Python"
          ]
        }
      ];
    } else {
      // Generic stages for other topics
      for (let i = 0; i < stagesCount; i++) {
        stages.push({
          title: i === 0 ? `${topicName} Foundations` : 
                 i === stagesCount - 1 ? `Advanced ${topicName}` : 
                 `Intermediate ${topicName} ${i}`,
          color: colors[i % colors.length],
          items: [
            `${topicName} fundamentals and concepts`,
            `Core ${topicName} techniques`,
            `${topicName} tools and environment`,
            `Building projects with ${topicName}`,
            `${topicName} best practices`
          ],
          resources: [
            `${topicName} Documentation`,
            `${topicName} Community Resources`,
            `Advanced ${topicName} Techniques`
          ]
        });
      }
    }
    
    return {
      id: topicName.toLowerCase().replace(/[\s.]+/g, ''),
      name: topicName,
      icon: topicIcons[topicName] || '🔹',
      stages: stages
    };
  });
  
  // Determine timeframe text
  let timeframeText;
  if (months === 1) {
    timeframeText = '1 Month';
  } else if (months === 12) {
    timeframeText = '1 Year';
  } else if (months === 24) {
    timeframeText = '2 Years';
  } else {
    timeframeText = `${months} Months`;
  }
  
  return {
    title: "Learning Roadmap",
    timeframe: timeframeText,
    topics: roadmapTopics
  };
}

// Generate Mermaid diagram code
function generateMermaidCode(roadmapData) {
  let code = 'gantt\n';
  code += `    title Roadmap for ${roadmapData.topics.map(t => t.name).join(', ')}\n`;
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
  }
  
  // Add sections for each topic
  roadmapData.topics.forEach((topic, topicIndex) => {
    code += `    section ${topic.name}\n`;
    
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
}

// Format date for Mermaid
function formatDate(date) {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}