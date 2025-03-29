"use client";
import Footer from '@/components/footer';
import Header from '@/components/header';
import Testimonial from '@/components/testimonial';
import { Award, BookOpen, Building2, GraduationCap, Laptop, Rocket, Shield, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AboutUsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "2023", label: "Founded", icon: <Building2 className="h-6 w-6" /> },
    { number: "100+", label: "Industry Mentors", icon: <Users className="h-6 w-6" /> },
    { number: "5000+", label: "Students Helped", icon: <GraduationCap className="h-6 w-6" /> },
    { number: "92%", label: "Interview Success", icon: <Award className="h-6 w-6" /> }
  ];

  const values = [
    {
      icon: <Rocket className="h-12 w-12" />,
      title: "Career Acceleration",
      description: "Committed to accelerating the career growth of Tier 2 & Tier 3 college students through AI and mentorship"
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Personalized Learning",
      description: "Creating tailored learning paths that address individual student needs and industry requirements"
    },
    {
      icon: <BookOpen className="h-12 w-12" />,
      title: "Practical Skill Development",
      description: "Focusing on real-world skill development through AI-powered interview simulations and practical assessments"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[35rem] overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden hidden md:block">
          <img
            src="/images/a.avif"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" />
        </div>

        {/* White background for mobile */}
        <div className="absolute inset-0 bg-white md:hidden" />

        <div className="container mx-auto px-4 relative z-20 h-full">
          <div className="flex flex-col items-center justify-center h-full space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black text-center mb-2 md:mb-4">
              ABOUT
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700">US</span>
            </h1>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 ">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden h-96">
                <img 
                  src="/images/student2.webp"
                  alt="Students Learning"
                  className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-blue-600 font-semibold tracking-wider uppercase">Who We Are</span>
              <h2 className="text-4xl font-bold text-gray-900">
                AI-Driven Career Development Platform
              </h2>
              <p className="text-gray-600 text-lg">
                Founded in 2023, INskillify has emerged as an innovative platform bridging the gap for students from Tier 2 & Tier 3 colleges. 
                We leverage AI technology and industry expert mentorship to provide personalized learning paths, interview simulations, and 
                resume analysis, ensuring students develop practical skills that meet industry requirements.
              </p>
              <div className="flex gap-4 pt-4">
                <Laptop className="text-blue-600 h-6 w-6" />
                <div>
                  <h3 className="text-gray-900 font-semibold">Our Mission</h3>
                  <p className="text-gray-600">To empower students from Tier 2 & Tier 3 colleges with the skills, confidence, and opportunities needed to excel in their careers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="text-blue-600 mb-4">{stat.icon}</div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gray-900">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 mx-auto max-w-2xl">
              The principles that guide our AI-powered career development platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-blue-600 mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
     
      <Testimonial />
      <Footer />
    </main>
  );
}