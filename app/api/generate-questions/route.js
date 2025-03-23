// app/api/generate-questions/route.js

import { NextResponse } from 'next/server';

// Use the same API key that works in the roadmap generator
const DEFAULT_API_KEY = process.env.HUGGINGFACE_API_TOKEN;

export async function POST(request) {
  try {
    const { name, numQuestions, topics } = await request.json();

    if (!name || !numQuestions || !topics || topics.length === 0) {
      return NextResponse.json(
        { error: 'Missing required parameters' }, 
        { status: 400 }
      );
    }

    // Try to generate questions using the Hugging Face API
    try {
      const questions = await generateQuestionsWithAPI(name, numQuestions, topics);
      return NextResponse.json({ questions });
    } catch (error) {
      console.error('API Error:', error.message);
      
      // If API fails, use fallback questions
      const fallbackQuestions = generateFallbackQuestions(topics, numQuestions);
      return NextResponse.json({
        questions: fallbackQuestions,
        note: 'Using fallback questions due to API error'
      });
    }
  } catch (error) {
    console.error('Error generating questions:', error);
    
    // Fallback in case of any error
    const { topics = ['JavaScript', 'React'], numQuestions = 5 } = await request.json().catch(() => ({}));
    const fallbackQuestions = generateFallbackQuestions(topics, numQuestions);
    
    return NextResponse.json({ 
      questions: fallbackQuestions,
      note: "Used fallback questions due to an error"
    });
  }
}

// Function to call Hugging Face API
async function generateQuestionsWithAPI(name, numQuestions, topics) {
  // Create the prompt for the API
  const prompt = `
    Generate a technical interview quiz with ${numQuestions} multiple-choice questions for ${name} on the following topics: ${topics.join(', ')}.

    For each question:
    1. Provide a clear, challenging but fair technical question.
    2. Include 4 possible answers (labeled as options).
    3. Indicate which option is correct (0-indexed, so first option is 0, second is 1, etc.).
    4. Include a hint that can help solve the question.

    Format each question as follows:
    {
      "question": "What is the correct way to create a React functional component?",
      "options": [
        "function MyComponent() { return <div>Hello</div>; }",
        "class MyComponent { render() { return <div>Hello</div>; } }",
        "const MyComponent = function() { <div>Hello</div>; }",
        "const MyComponent = () => <div>Hello</div>;"
      ],
      "correctAnswer": 3,
      "hint": "Arrow functions in React don't need explicit return statements for single expressions."
    }

    Return ONLY a valid JSON array with question objects. Do not include any explanatory text before or after the JSON array.
  `;
  
  // Make API request to Hugging Face - using the same model as the roadmap generator
  const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
  const headers = {
    "Authorization": `Bearer ${DEFAULT_API_KEY}`,
    "Content-Type": "application/json"
  };
  
  const payload = {
    "inputs": prompt,
    "parameters": {
      "max_new_tokens": 2048,
      "temperature": 0.7,
      "top_p": 0.8,
      "top_k": 40,
      "return_full_text": false
    }
  };
  
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
  const modelResponse = data[0]?.generated_text;
  
  if (!modelResponse) {
    throw new Error('No response from API');
  }
  
  // Try to extract and parse the JSON
  try {
    // First attempt: Try to parse the whole response as JSON
    try {
      const questions = JSON.parse(modelResponse);
      if (Array.isArray(questions) && validateQuestions(questions)) {
        return questions;
      }
    } catch (e) {
      console.log("Direct parsing failed, trying to extract JSON");
    }
    
    // Second attempt: Extract JSON array using regex
    const jsonArrayMatch = modelResponse.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (jsonArrayMatch) {
      try {
        const questions = JSON.parse(jsonArrayMatch[0]);
        if (Array.isArray(questions) && validateQuestions(questions)) {
          return questions;
        }
      } catch (e) {
        console.log("JSON array extraction failed, trying sanitization");
      }
    }
    
    // Third attempt: Try to fix common JSON issues
    let sanitizedText = modelResponse;
    
    // Remove markdown code blocks if present
    sanitizedText = sanitizedText.replace(/```json|```/g, '');
    
    // Try to find the beginning and end of the JSON array
    const startIdx = sanitizedText.indexOf('[');
    const endIdx = sanitizedText.lastIndexOf(']');
    
    if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
      sanitizedText = sanitizedText.substring(startIdx, endIdx + 1);
      
      // Fix common JSON issues
      sanitizedText = sanitizedText
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":') // Ensure property names are quoted
        .replace(/'/g, '"') // Replace single quotes with double quotes
        .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas
      
      try {
        const questions = JSON.parse(sanitizedText);
        if (Array.isArray(questions) && validateQuestions(questions)) {
          return questions;
        }
      } catch (e) {
        console.log("Sanitization failed:", e);
      }
    }
    
    // Final fallback: Try to manually extract individual questions
    const questionsData = extractQuestionsManually(modelResponse);
    if (questionsData.length > 0) {
      return questionsData;
    }
  } catch (error) {
    console.error("Error processing API response:", error);
  }
  
  // If all parsing attempts fail, throw an error
  throw new Error('Failed to parse valid questions from API response');
}

// Validate the structure of questions
function validateQuestions(questions) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return false;
  }
  
  return questions.every(q => 
    q.question && 
    Array.isArray(q.options) && 
    q.options.length === 4 &&
    typeof q.correctAnswer === 'number' &&
    q.correctAnswer >= 0 && 
    q.correctAnswer <= 3 &&
    typeof q.hint === 'string'
  );
}

// Extract questions manually from text as a last resort
function extractQuestionsManually(text) {
  const questions = [];
  
  // Look for patterns that indicate questions
  const questionBlocks = text.split(/Question\s*\d+:|[\d]+\.\s*/).filter(Boolean);
  
  for (const block of questionBlocks) {
    try {
      // Extract question text
      const questionMatch = block.match(/(?:"question"|question)[\s:"]*([^"]+?)["',}]/i);
      const question = questionMatch ? questionMatch[1].trim() : null;
      
      if (!question) continue;
      
      // Extract options array
      const optionsMatch = block.match(/(?:"options"|options)[\s:"]*\[([\s\S]*?)\]/i);
      let options = [];
      
      if (optionsMatch && optionsMatch[1]) {
        // Split by commas that are followed by a quote (to handle commas in the options)
        const optionItems = optionsMatch[1].split(/",\s*"|',\s*'/).map(o => o.trim());
        
        options = optionItems.map(option => 
          option
            .replace(/^["'\s]+|["'\s]+$/g, '') // Remove quotes and spaces
            .replace(/\\"/g, '"') // Replace escaped quotes
        ).filter(o => o);
        
        // Ensure we have exactly 4 options
        if (options.length !== 4) continue;
      } else {
        continue;
      }
      
      // Extract correct answer
      const correctAnswerMatch = block.match(/(?:"correctAnswer"|correctAnswer)[\s:"]*(\d+)/i);
      const correctAnswer = correctAnswerMatch ? parseInt(correctAnswerMatch[1]) : 0;
      
      if (correctAnswer < 0 || correctAnswer > 3) continue;
      
      // Extract hint
      const hintMatch = block.match(/(?:"hint"|hint)[\s:"]*([^"]+?)["',}]/i);
      const hint = hintMatch ? hintMatch[1].trim() : "Think about the core concepts.";
      
      questions.push({
        question,
        options,
        correctAnswer,
        hint
      });
    } catch (error) {
      console.error('Error extracting individual question data:', error);
      // Continue to the next block
    }
  }
  
  return questions;
}

// Generate fallback questions based on selected topics
function generateFallbackQuestions(topics, numQuestions) {
  // Pre-defined questions by topic
  const allQuestions = [
    // JavaScript questions
    {
      topic: 'JavaScript',
      question: "What is closure in JavaScript?",
      options: [
        "A function that has access to variables in its outer scope",
        "A method to close browser windows",
        "A way to terminate function execution",
        "A special type of JavaScript object"
      ],
      correctAnswer: 0,
      hint: "Think about scope and function's ability to remember its lexical environment."
    },
    {
      topic: 'JavaScript',
      question: "Which of the following is NOT a JavaScript data type?",
      options: [
        "String",
        "Boolean",
        "Float",
        "Symbol"
      ],
      correctAnswer: 2,
      hint: "JavaScript has primitive and non-primitive data types."
    },
    {
      topic: 'JavaScript',
      question: "What does the '===' operator do?",
      options: [
        "Checks only for equality of value",
        "Checks for equality of value and type",
        "Assigns a value to a variable",
        "Compares three variables"
      ],
      correctAnswer: 1,
      hint: "This operator performs strict equality comparison."
    },
    // React questions
    {
      topic: 'React',
      question: "What is the virtual DOM in React?",
      options: [
        "A complete separate copy of the real DOM",
        "A lightweight JavaScript representation of the real DOM",
        "A virtual machine that runs JavaScript code",
        "A DOM that only exists in memory and never gets rendered"
      ],
      correctAnswer: 1,
      hint: "It's an in-memory representation that React uses for performance optimization."
    },
    {
      topic: 'React',
      question: "Which hook would you use to handle side effects in a functional component?",
      options: [
        "useContext",
        "useState",
        "useEffect",
        "useReducer"
      ],
      correctAnswer: 2,
      hint: "This hook is used for data fetching, subscriptions, or manually changing the DOM."
    },
    // Node.js questions
    {
      topic: 'Node.js',
      question: "What is Node.js?",
      options: [
        "A front-end JavaScript framework",
        "A JavaScript runtime environment that runs on the server",
        "A database management system",
        "A testing framework for JavaScript"
      ],
      correctAnswer: 1,
      hint: "It allows developers to use JavaScript for server-side scripting."
    },
    // Frontend questions
    {
      topic: 'Frontend',
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Style System",
        "Colorful Style Sheets"
      ],
      correctAnswer: 1,
      hint: "It's used for describing the presentation of a document written in HTML."
    },
    // Database questions
    {
      topic: 'Database',
      question: "What is SQL?",
      options: [
        "Structured Query Language",
        "Simple Question Language",
        "Standard Query Logic",
        "System Quality License"
      ],
      correctAnswer: 0,
      hint: "It's a language designed for managing data in relational database management systems."
    },
    // Backend questions
    {
      topic: 'Backend',
      question: "What is an API?",
      options: [
        "Application Programming Interface",
        "Automated Program Installation",
        "Application Process Integration",
        "Accessible Protocol Interface"
      ],
      correctAnswer: 0,
      hint: "It defines interactions between multiple software applications."
    },
    // React Native questions
    {
      topic: 'React Native',
      question: "What is React Native?",
      options: [
        "A database for React applications",
        "A framework for building native apps using React",
        "A testing library for React",
        "A CSS framework for React"
      ],
      correctAnswer: 1,
      hint: "It allows you to create mobile applications for different platforms."
    }
  ];
  
  // Filter questions by selected topics
  let relevantQuestions = allQuestions.filter(q => 
    topics.some(topic => q.topic.toLowerCase() === topic.toLowerCase())
  );
  
  // If not enough relevant questions, add general questions
  if (relevantQuestions.length < numQuestions) {
    const generalQuestions = allQuestions.filter(q => 
      !topics.some(topic => q.topic.toLowerCase() === topic.toLowerCase())
    );
    relevantQuestions = [...relevantQuestions, ...generalQuestions];
  }
  
  // Randomize and limit to requested number
  return relevantQuestions
    .sort(() => 0.5 - Math.random())
    .slice(0, numQuestions)
    .map(({ topic, ...q }) => q); // Remove the topic field
}