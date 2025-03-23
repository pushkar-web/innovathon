// app/api/resume/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Create a data directory if it doesn't exist
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export async function POST(request) {
  try {
    const resumeData = await request.json();
    
    // Generate a unique filename based on user's name and timestamp
    const timestamp = new Date().getTime();
    const name = resumeData.personalInfo.name || 'user';
    const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const filename = `${sanitizedName}-${timestamp}.json`;
    
    // Save the resume data to a file
    const filePath = path.join(dataDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(resumeData, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Resume saved successfully', 
      filename 
    });
  } catch (error) {
    console.error('Error saving resume:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save resume' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    
    if (!filename) {
      // Return a list of all saved resumes
      const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
      const resumes = files.map(file => {
        const filePath = path.join(dataDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return {
          filename: file,
          name: data.personalInfo.name,
          date: new Date(parseInt(file.split('-').pop().split('.')[0])).toLocaleDateString()
        };
      });
      
      return NextResponse.json({ success: true, resumes });
    } else {
      // Return a specific resume
      const filePath = path.join(dataDir, filename);
      if (!fs.existsSync(filePath)) {
        return NextResponse.json(
          { success: false, message: 'Resume not found' },
          { status: 404 }
        );
      }
      
      const resumeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return NextResponse.json({ success: true, resumeData });
    }
  } catch (error) {
    console.error('Error retrieving resume:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve resume' },
      { status: 500 }
    );
  }
}