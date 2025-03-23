// app/api/getuser/route.js
import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Code from '@/models/code';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  // Connect to database
  try {
    await connectDB();
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }

  try {
    // Find user by name
    const user = await Code.findOne({ name });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({ 
      success: true, 
      data: {
        name: user.name,
        score: user.score,
        solvedProblems: user.solvedProblems,
        level: user.level,
        levelProgress: user.levelProgress,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ 
      error: 'Failed to get user data',
      details: error.message
    }, { status: 500 });
  }
}