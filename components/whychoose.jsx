import { BookOpen, Code, FileCheck, Users } from 'lucide-react';
import Image from 'next/image';

export default function WhyChooseUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Why Choose INskillify?</h1>
        <p className="text-gray-500 max-w-3xl mx-auto">
          We provide comprehensive career development services through an AI-powered platform,
          connecting Tier 2 & 3 college students with learning resources, interview practice, and mentorship.
        </p>
      </div>

      {/* Modified Grid Layout */}
      <div className="grid md:grid-cols-12 gap-8 max-w-6xl mx-auto">
        {/* First Card - Full width image */}
        <div className="md:col-span-7 bg-gray-50 rounded-3xl overflow-hidden border border-gray-300">
          <div className="w-full h-64 relative">
            <Image 
              src="/images/a.jpg" 
              alt="Interview Preparation" 
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
          <div className="p-11">
            <h3 className="text-2xl font-semibold mb-2">AI-Powered Interview Simulations</h3>
            <p className="text-gray-500">
              Practice with our realistic interview scenarios designed to prepare you for real-world job interviews.
              Our AI-powered platform provides instant feedback on your responses, communication skills, and body language.
              Track your progress over time and build confidence as you master the art of interviewing. 
              Get exposed to industry-specific questions tailored to your desired career path.
            </p>
          </div>
        </div>

        {/* Second Card - Properly spaced image */}
        <div className="md:col-span-5 bg-gray-50 rounded-3xl p-8 border border-gray-300">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <BookOpen className="w-16 h-16 text-blue-600" />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Explore Resources
              </button>
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-2">Personalized Learning Paths</h3>
          <p className="text-gray-500 mb-8">
            Get customized learning resources based on your skills, goals, and industry requirements.
            Our AI analyzes your strengths and areas for improvement to create targeted development plans.
          </p>
          <div className="flex mt-2 px-2">
            <Image 
              src="/images/b.jpg" 
              alt="Learning Resources" 
              width={400} 
              height={100}
              className="object-contain"
            />
          </div>
        </div>

        {/* Second Row - Asymmetric Cards */}
        <div className="md:col-span-4 bg-gray-50 rounded-3xl p-8 border border-gray-300">
          <div className="flex mb-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center"
                >
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white text-sm">
                +50
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-2">Expert Mentorship Network</h3>
          <p className="text-gray-500">
            Connect with industry professionals who provide personalized guidance on career development,
            interview strategies, and industry-specific insights.
          </p>
        </div>

        <div className="md:col-span-8 bg-gray-50 rounded-3xl border border-gray-300 p-8">
          <div className="mb-6">
            <div className="bg-white rounded-lg p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-6 h-6 text-blue-600" />
                  <span className="text-sm text-gray-600">Resume Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Code className="w-6 h-6 text-blue-600" />
                  <span className="text-sm text-gray-600">Technical Skills</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  <span className="text-sm text-gray-600">Soft Skills</span>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-2">Comprehensive Career Development</h3>
          <p className="text-gray-500">
            From resume building and interview preparation to technical skill development and soft skills training,
            we offer everything you need to succeed in your career journey on a single platform.
          </p>
        </div>
      </div>
    </div>
  );
}