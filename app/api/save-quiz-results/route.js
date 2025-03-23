// app/api/save-quiz-results/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import QuizResult from '@/models/QuizResult';

export async function POST(request) {
  try {
    // Connect to database first
    await connectDB();
    
    // Parse request body
    const body = await request.json();
    
    const { 
      name, 
      topics, 
      score, 
      correctAnswers, 
      incorrectAnswers, 
      skipped, 
      timeTaken, 
      totalQuestions,
      points,
      level
    } = body;

    // Validate required fields
    if (!name || !topics || score === undefined || correctAnswers === undefined || 
        incorrectAnswers === undefined || skipped === undefined || 
        timeTaken === undefined || totalQuestions === undefined) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if a user with this name already exists
    const existingUser = await QuizResult.findOne({ name: name });

    let quizResult;

    if (existingUser) {
      // Update the existing user's record
      quizResult = await QuizResult.findOneAndUpdate(
        { name: name },
        {
          topics,
          score,
          correctAnswers,
          incorrectAnswers,
          skipped,
          timeTaken,
          totalQuestions,
          points,
          level,
          updatedAt: Date.now()
        },
        { new: true } // Return the updated document
      );
    } else {
      // Create new quiz result if user doesn't exist
      quizResult = await QuizResult.create({
        name,
        topics,
        score,
        correctAnswers,
        incorrectAnswers,
        skipped,
        timeTaken,
        totalQuestions,
        points,
        level
      });
    }

    return NextResponse.json(
      { success: true, data: quizResult },
      { status: existingUser ? 200 : 201 }
    );
  } catch (error) {
    console.error('Error saving quiz results:', error);
    
    // Return detailed error for debugging
    return NextResponse.json(
      { 
        message: 'Error saving quiz results', 
        error: error.message,
        // Include stack trace in development only
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      },
      { status: 500 }
    );
  }
}