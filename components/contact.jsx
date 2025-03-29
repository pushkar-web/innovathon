"use client";
import { BookOpen, Mail, MapPin, Phone, Rocket, Users } from 'lucide-react';
import { useState } from 'react';
import Footer from "./footer";
import Navbar from "./header";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form submitted:', formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section with Image */}
      <section className="relative h-[20rem] sm:h-[25rem] md:h-[35rem] overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0 z-0 overflow-hidden hidden md:block">
          <img
            src="/images/a.avif"
            alt="Students studying with technology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 " />
        </div>

        {/* White background for mobile */}
        <div className="absolute inset-0 bg-white md:hidden" />

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 h-full">
          <div className="flex flex-col items-center justify-center h-full space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black text-center mb-2 md:mb-4">
              CONTACT
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600"> US</span>
            </h1>
         
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <main className="flex-grow bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {/* Contact Information */}
            <div className="space-y-8 md:space-y-12">
              <div>
                <h3 className="text-indigo-600 text-base md:text-lg mb-2 md:mb-3">AI-Powered Career Platform</h3>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
                  Connect with 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"> Eklavya AI</span>
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  INskillify AI bridges the employability gap for Tier 2 & Tier 3 college students through AI-powered interview simulations, 
                  personalized learning paths, industry expert mentorship, automated resume analysis, and gamified learning systems.
                </p>
              </div>

              <div className="space-y-6 md:space-y-10">
                {[
                  { 
                    title: 'AI Interview Simulations',
                    content: 'Practice with our AI system that simulates real interview scenarios with personalized feedback',
                    icon: <Rocket className="text-indigo-600" size={24} />
                  },
                  { 
                    title: 'Personalized Learning',
                    content: 'Custom learning paths based on industry trends and your skill gaps',
                    icon: <BookOpen className="text-indigo-600" size={24} />
                  },
                  { 
                    title: 'Industry Mentorship',
                    content: 'Connect with experts who guide your career journey and provide valuable insights',
                    icon: <Users className="text-indigo-600" size={24} />
                  }
                ].map(({ title, content, icon }) => (
                  <div key={title} className="flex items-start space-x-4 md:space-x-6">
                    <div className="mt-1">
                      {icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 md:mb-2 text-indigo-600 text-base md:text-lg">{title}</h4>
                      <p className="text-gray-600 text-sm md:text-base">{content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <Phone className="text-indigo-600" size={20} />
                  <p className="text-gray-700">+91 98765 43210</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-indigo-600" size={20} />
                  <p className="text-gray-700">contact@Eklavya AIplusplus.edu</p>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-indigo-600" size={20} />
                  <p className="text-gray-700">Tech Hub, Innovation Park, Bangalore</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl border border-indigo-100 mt-4 md:mt-7">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Career Guidance</h3>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all duration-300 text-sm md:text-base"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all duration-300 text-sm md:text-base"
                    required
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all duration-300 text-sm md:text-base"
                  required
                />
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all duration-300 text-sm md:text-base"
                  required
                >
                  <option value="">Select Service</option>
                  <option value="Interview Preparation">Interview Preparation</option>
                  <option value="Career Guidance">Career Guidance</option>
                  <option value="Resume Building">Resume Building</option>
                  <option value="Mentorship">Mentorship</option>
                  <option value="Other">Other</option>
                </select>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your career goals and how we can help"
                  rows="4"
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all duration-300 resize-none text-sm md:text-base"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg text-base md:text-lg"
                >
                  Request Career Guidance
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How INskillify AI Empowers Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "AI-Powered Interviews",
                description: "Practice with our realistic AI interview simulator that provides real-time feedback and improvement suggestions",
                icon: "🤖"
              },
              {
                title: "Personalized Learning",
                description: "Custom learning paths based on industry requirements and your individual skill assessment",
                icon: "📊"
              },
              {
                title: "Expert Mentorship",
                description: "Connect with industry professionals who provide guidance, feedback, and networking opportunities",
                icon: "👨‍💼"
              },
              {
                title: "Resume Enhancement",
                description: "AI-driven resume analysis with specific improvement recommendations for better response rates",
                icon: "📝"
              },
              {
                title: "Gamified Learning",
                description: "Earn points, unlock achievements, and compete on leaderboards while building your skills",
                icon: "🎮"
              },
              {
                title: "Career Tracking",
                description: "Monitor your progress, skill development, and readiness for your target roles",
                icon: "📈"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="h-[300px] md:h-[400px] w-full mt-8 md:mt-16">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0268236583383!2d77.63996307547853!3d12.97252911784466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1671aaaaaad%3A0xca5e73036e52aab9!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1705067287411!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="INskillify AI Office Location"
          ></iframe>
        </div>
      </main>

      <Footer />
    </div>
  );
}