// app/api/generate-explanations/route.js

import { NextResponse } from 'next/server';

// Use the same API key for consistency
const DEFAULT_API_KEY = process.env.HUGGINGFACE_API_TOKEN;

export async function POST(request) {
  try {
    const { questions, selectedAnswers } = await request.json();

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { error: 'Questions data is required' }, 
        { status: 400 }
      );
    }

    // Generate explanations using Hugging Face API
    try {
      const explanations = await generateExplanationsWithAPI(questions, selectedAnswers);
      return NextResponse.json({ explanations });
    } catch (error) {
      console.error('API Error:', error.message);
      
      // If API fails, use fallback explanations
      const fallbackExplanations = generateFallbackExplanations(questions, selectedAnswers);
      return NextResponse.json({
        explanations: fallbackExplanations,
        note: 'Using fallback explanations due to API error'
      });
    }
  } catch (error) {
    console.error('Error generating explanations:', error);
    return NextResponse.json({ 
      error: 'Failed to generate explanations',
      explanations: {}
    }, { status: 500 });
  }
}

// Function to call Hugging Face API for explanations
async function generateExplanationsWithAPI(questions, selectedAnswers) {
  const explanations = {};
  
  // Process each question to get an explanation
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const selectedAnswer = selectedAnswers[i] !== undefined ? selectedAnswers[i] : "not answered";
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    // Create the prompt for this specific question
    const prompt = `
      Question: ${question.question}
      
      Options:
      0: ${question.options[0]}
      1: ${question.options[1]}
      2: ${question.options[2]}
      3: ${question.options[3]}
      
      Correct answer: ${question.correctAnswer} (${question.options[question.correctAnswer]})
      User selected: ${selectedAnswer !== "not answered" ? `${selectedAnswer} (${question.options[selectedAnswer]})` : "Question was not answered"}
      
      Provide a clear, concise explanation (about 3-4 sentences) of the correct answer. 
      Explain why it's correct and, if the user selected a wrong answer, briefly explain why their choice was incorrect.
      Keep the explanation focused on the technical aspects and offer a helpful tip for remembering this concept.
    `;
    
    try {
      const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
      const headers = {
        "Authorization": `Bearer ${DEFAULT_API_KEY}`,
        "Content-Type": "application/json"
      };
      
      const payload = {
        "inputs": prompt,
        "parameters": {
          "max_new_tokens": 256,
          "temperature": 0.5,
          "top_p": 0.9,
          "return_full_text": false
        }
      };
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      const explanationText = data[0]?.generated_text;
      
      if (explanationText) {
        // Clean up the explanation text (remove any JSON artifacts, quotes, etc.)
        const cleanedText = explanationText
          .replace(/^["'{]*/, '')
          .replace(/[}"']*$/, '')
          .trim();
          
        explanations[i] = cleanedText;
      } else {
        throw new Error(`No explanation generated for question ${i}`);
      }
    } catch (error) {
      console.error(`Error generating explanation for question ${i}:`, error);
      
      // Use a fallback explanation for this question
      explanations[i] = generateSingleFallbackExplanation(question, selectedAnswer);
    }
  }
  
  return explanations;
}

// Generate a single fallback explanation for a question
function generateSingleFallbackExplanation(question, selectedAnswer) {
  const isCorrect = selectedAnswer === question.correctAnswer;
  const correctOption = question.options[question.correctAnswer];
  
  if (isCorrect) {
    return `Correct! ${correctOption} is the right answer. ${question.hint}`;
  } else if (selectedAnswer === "not answered") {
    return `You didn't answer this question. The correct answer is: ${correctOption}. ${question.hint}`;
  } else {
    const selectedOption = question.options[selectedAnswer];
    return `The answer "${selectedOption}" is incorrect. The correct answer is: ${correctOption}. ${question.hint}`;
  }
}

// Generate fallback explanations for all questions
function generateFallbackExplanations(questions, selectedAnswers) {
  const explanations = {};
  
  for (let i = 0; i < questions.length; i++) {
    explanations[i] = generateSingleFallbackExplanation(
      questions[i], 
      selectedAnswers[i] !== undefined ? selectedAnswers[i] : "not answered"
    );
  }
  
  return explanations;
}