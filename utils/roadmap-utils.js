// Utility functions for generating roadmap data

// Map topic names to icons
export const topicIcons = {
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
  export const stageColors = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#6366F1"];
  
  // Generate mock data for specific topics
  export function generateTopicMockData(topicName, stagesCount, experienceLevel) {
    // Create stages based on topic type
    let stages = [];
    
    switch(topicName) {
      case 'JavaScript':
        stages = [
          {
            title: "JavaScript Fundamentals",
            color: stageColors[0],
            items: [
              "Basic syntax and variables",
              "Data types and operators",
              "Control flow (conditionals, loops)",
              "Functions and scope",
              "Error handling with try/catch"
            ],
            resources: [
              "MDN Web Docs - JavaScript Guide",
              "JavaScript.info",
              "Eloquent JavaScript book"
            ]
          },
          {
            title: "DOM and Browser APIs",
            color: stageColors[1],
            items: [
              "Document Object Model",
              "Event handling",
              "DOM manipulation",
              "Browser storage (localStorage, sessionStorage)",
              "Fetch API and AJAX"
            ],
            resources: [
              "MDN Web Docs - DOM API",
              "JavaScript30 by Wes Bos",
              "Traversy Media DOM tutorials"
            ]
          },
          {
            title: "Modern JavaScript",
            color: stageColors[2],
            items: [
              "ES6+ features",
              "Destructuring",
              "Arrow functions",
              "Modules",
              "Promises and async/await"
            ],
            resources: [
              "ES6 for Everyone by Wes Bos",
              "You Don't Know JS: ES6 & Beyond",
              "Babel documentation"
            ]
          }
        ];
        break;
        
      case 'Python':
        stages = [
          {
            title: "Python Basics",
            color: stageColors[0],
            items: [
              "Syntax and data types",
              "Control flow",
              "Functions and modules",
              "File I/O",
              "Error handling"
            ],
            resources: [
              "Official Python Documentation",
              "Automate the Boring Stuff with Python",
              "Python Crash Course"
            ]
          },
          {
            title: "Intermediate Python",
            color: stageColors[1],
            items: [
              "Object-oriented programming",
              "Virtual environments",
              "Package management with pip",
              "Working with APIs",
              "Regular expressions"
            ],
            resources: [
              "Real Python tutorials",
              "Fluent Python",
              "Python Cookbook"
            ]
          },
          {
            title: "Advanced Python",
            color: stageColors[2],
            items: [
              "Generators and iterators",
              "Decorators",
              "Context managers",
              "Concurrency and parallelism",
              "Testing with pytest"
            ],
            resources: [
              "Python Tricks: The Book",
              "Effective Python",
              "Test-Driven Development with Python"
            ]
          }
        ];
        break;
        
      case 'React':
        stages = [
          {
            title: "React Fundamentals",
            color: stageColors[0],
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
            title: "React Hooks & Patterns",
            color: stageColors[1],
            items: [
              "useState and useEffect",
              "Custom hooks",
              "Context API",
              "Performance optimization",
              "React Router"
            ],
            resources: [
              "React Hooks documentation",
              "useHooks.com",
              "React Router documentation"
            ]
          },
          {
            title: "Advanced React",
            color: stageColors[2],
            items: [
              "State management (Redux/MobX)",
              "Server-side rendering",
              "Testing React applications",
              "React with TypeScript",
              "Next.js framework"
            ],
            resources: [
              "Redux documentation",
              "Testing Library",
              "Next.js documentation"
            ]
          }
        ];
        break;
        
      case 'Machine Learning':
      case 'Artificial Intelligence':
        stages = [
          {
            title: "ML Foundations",
            color: stageColors[0],
            items: [
              "Linear algebra and calculus review",
              "Statistics and probability",
              "Python for data science",
              "NumPy and Pandas",
              "Data visualization with Matplotlib/Seaborn"
            ],
            resources: [
              "Mathematics for Machine Learning book",
              "Python Data Science Handbook",
              "Khan Academy - Linear Algebra"
            ]
          },
          {
            title: "Machine Learning Basics",
            color: stageColors[1],
            items: [
              "Supervised vs. unsupervised learning",
              "Regression algorithms",
              "Classification algorithms",
              "Model evaluation metrics",
              "Feature engineering"
            ],
            resources: [
              "Hands-On Machine Learning with Scikit-Learn",
              "Andrew Ng's Machine Learning course",
              "Kaggle Learn"
            ]
          },
          {
            title: "Deep Learning",
            color: stageColors[2],
            items: [
              "Neural networks fundamentals",
              "TensorFlow/PyTorch",
              "Convolutional neural networks",
              "Recurrent neural networks",
              "Transfer learning"
            ],
            resources: [
              "Deep Learning by Ian Goodfellow",
              "Deep Learning with Python",
              "fast.ai courses"
            ]
          }
        ];
        break;
        
      default:
        // Generic stages for other topics
        stages = [
          {
            title: `${topicName} Fundamentals`,
            color: stageColors[0],
            items: [
              `Basic ${topicName} concepts`,
              `${topicName} environment setup`,
              `Core ${topicName} syntax`,
              `${topicName} best practices`,
              `Building simple ${topicName} projects`
            ],
            resources: [
              `${topicName} Official Documentation`,
              `${topicName} for Beginners tutorials`,
              `Community resources for ${topicName}`
            ]
          },
          {
            title: `Intermediate ${topicName}`,
            color: stageColors[1],
            items: [
              `Advanced ${topicName} features`,
              `${topicName} design patterns`,
              `${topicName} tools and libraries`,
              `Testing ${topicName} applications`,
              `${topicName} performance optimization`
            ],
            resources: [
              `${topicName} Design Patterns book`,
              `${topicName} community forums`,
              `Interactive ${topicName} learning platforms`
            ]
          },
          {
            title: `Advanced ${topicName}`,
            color: stageColors[2],
            items: [
              `${topicName} architecture`,
              `${topicName} at scale`,
              `Contributing to ${topicName} ecosystem`,
              `${topicName} security considerations`,
              `Cutting-edge ${topicName} techniques`
            ],
            resources: [
              `Advanced ${topicName} documentation`,
              `${topicName} conference talks`,
              `${topicName} open source projects`
            ]
          }
        ];  
    }
    
    // Adjust based on experience level
    if (experienceLevel === 'intermediate') {
      // Remove the first stage for intermediate learners
      stages = stages.slice(1);
      
      // Add an extra advanced stage
      stages.push({
        title: `${topicName} Mastery`,
        color: stageColors[3],
        items: [
          `Expert-level ${topicName} techniques`,
          `Optimizing ${topicName} for production`,
          `${topicName} system design`,
          `Teaching and mentoring ${topicName}`,
          `Innovating with ${topicName}`
        ],
        resources: [
          `${topicName} expert blogs`,
          `Advanced ${topicName} courses`,
          `${topicName} research papers`
        ]
      });
    } else if (experienceLevel === 'advanced') {
      // Remove the first two stages for advanced learners
      stages = stages.slice(2);
      
      // Add two extra advanced stages
      stages.push({
        title: `${topicName} Specialization`,
        color: stageColors[3],
        items: [
          `Specialized ${topicName} domains`,
          `Deep ${topicName} internals`,
          `Performance tuning for ${topicName}`,
          `${topicName} architecture patterns`,
          `Advanced debugging and profiling`
        ],
        resources: [
          `${topicName} internals documentation`,
          `${topicName} performance case studies`,
          `${topicName} expert community`
        ]
      });
      
      stages.push({
        title: `${topicName} Leadership`,
        color: stageColors[4],
        items: [
          `Leading ${topicName} projects`,
          `Defining ${topicName} best practices`,
          `${topicName} mentorship`,
          `Innovating in the ${topicName} space`,
          `Contributing to ${topicName} ecosystem`
        ],
        resources: [
          `${topicName} leadership books`,
          `${topicName} conferences and meetups`,
          `${topicName} open source contribution`
        ]
      });
    }
    
    // Ensure we don't exceed the requested stages count
    return stages.slice(0, stagesCount);
  }
  
  // Format date for Mermaid
  export function formatDate(date) {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }
  
  // Calculate duration in months from timeframe string
  export function calculateMonths(timeframe) {
    if (timeframe.includes('Month')) {
      return parseInt(timeframe);
    } else if (timeframe.includes('Year')) {
      return parseInt(timeframe) * 12;
    } else {
      // Default to 3 months
      return 3;
    }
  }
  
  // Generate Mermaid diagram code from roadmap data
  export function generateMermaidCode(roadmapData) {
    let code = 'gantt\n';
    code += `    title Roadmap for ${roadmapData.topics.map(t => t.name).join(', ')}\n`;
    code += '    dateFormat YYYY-MM-DD\n';
    code += '    axisFormat %b %d\n\n';
    
    // Calculate dates
    const startDate = new Date();
    let currentDate = new Date(startDate);
    
    // Convert timeframe to months
    let durationMonths = calculateMonths(roadmapData.timeframe);
    
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