// app/api/leaderboard/route.js
import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Code from '@/models/code';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');

  // Connect to database
  try {
    await connectDB();
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }

  try {
    // Get top users by score, limited to the specified number
    const users = await Code.find({})
      .sort({ score: -1 }) // Sort by score (descending)
      .limit(limit)
      .select('name score level solvedProblems'); // Only select these fields

    // Return the leaderboard data
    return NextResponse.json({ 
      success: true, 
      data: users.map(user => ({
        name: user.name,
        score: user.score,
        level: user.level,
        problemsSolved: user.solvedProblems.length
      }))
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    return NextResponse.json({ 
      error: 'Failed to get leaderboard data',
      details: error.message
    }, { status: 500 });
  }
}