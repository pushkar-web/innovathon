// app/api/save-progress/route.js
import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Code from '@/models/code';

export async function POST(request) {
  // Connect to database
  try {
    await connectDB();
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }

  // Extract user data from request body
  const data = await request.json();
  const { name, score, solvedProblems, levelInfo } = data;

  // Validate required fields
  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  try {
    // Find user by name or create a new one
    const user = await Code.findOneAndUpdate(
      { name }, 
      { 
        name, 
        score, 
        solvedProblems,
        level: levelInfo.level, 
        levelProgress: levelInfo.progress,
        updatedAt: Date.now() 
      },
      { 
        upsert: true,  // Create if doesn't exist
        new: true,     // Return updated document
        setDefaultsOnInsert: true // Apply defaults when creating new document
      }
    );

    // Return the updated user
    return NextResponse.json({ 
      success: true, 
      data: user
    });
  } catch (error) {
    console.error('Save progress error:', error);
    return NextResponse.json({ 
      error: 'Failed to save progress',
      details: error.message
    }, { status: 500 });
  }
}