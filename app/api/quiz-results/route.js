import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import QuizResult from '@/models/QuizResult';

export async function GET() {
  try {
    // Connect to database
    await connectDB();
    
    // Fetch all quiz results, sorted by creation date (newest first)
    const results = await QuizResult.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(
      { success: true, data: results },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    
    return NextResponse.json(
      {
        message: 'Error fetching quiz results',
        error: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      },
      { status: 500 }
    );
  }
}