"use client";
import { Award, BookOpen, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="w-full bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left side content */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              About{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">Eklavya AI</span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              INskillify is dedicated to bridging the employability gap for students from Tier 2 and Tier 3 
              colleges through AI-powered tools, personalized learning resources, and professional mentorship.
            </p>
            
            <div className="flex items-start gap-4 mt-3">
              <div className="p-3 bg-blue-100 rounded-lg shrink-0">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Tailored Learning Resources</h3>
                <p className="text-gray-600">
                  We provide curated learning paths based on industry trends and requirements. Our AI-powered 
                  system analyzes your strengths and areas for improvement to create a personalized development plan.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 mt-3">
              <div className="p-3 bg-blue-100 rounded-lg shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Industry Expert Mentorship</h3>
                <p className="text-gray-600">
                  Connect with professionals who understand your journey and can provide guidance on career 
                  development, interview preparation, and industry insights.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 mt-3">
              <div className="p-3 bg-blue-100 rounded-lg shrink-0">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Skill Development</h3>
                <p className="text-gray-600">
                  Develop technical and soft skills through interactive workshops, hands-on projects, 
                  and practical assessments designed to enhance your professional portfolio.
                </p>
              </div>
            </div>
            
          </div>
          
          {/* Right side image */}
          <div className="flex-1 lg:ml-6 flex justify-center items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="/images/student2.webp"
                alt="INskillify AI Platform"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;