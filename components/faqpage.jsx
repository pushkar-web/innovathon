"use client";
import { ChevronDown, ChevronUp, Mail, MessageSquare, Phone, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Footer from './footer';
import Navbar from './header';

export default function EklavyaPlus() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredFaqs, setFilteredFaqs] = useState([]);

  const categories = [
    { id: 'all', name: 'All Features' },
    { id: 'interview', name: 'Interview Prep' },
    { id: 'learning', name: 'Learning Paths' },
    { id: 'mentorship', name: 'Mentorship' },
    { id: 'resume', name: 'Resume Builder' }
  ];

  const faqs = [
    {
      category: 'interview',
      question: "How do AI-powered interview simulations work?",
      answer: "Our AI-powered interview simulations create realistic mock interviews based on industry standards and company-specific questions. The system analyzes your responses, provides real-time feedback on both verbal and non-verbal cues, and offers personalized improvement suggestions. You can practice unlimited times with different difficulty levels and track your progress over time."
    },
    {
      category: 'learning',
      question: "How are personalized learning paths created?",
      answer: "Eklavya AI analyzes current industry trends, your academic background, skill gaps, and career aspirations to generate tailored learning paths. These pathways include curated video tutorials, interactive coding exercises, industry-relevant projects, and skill assessments. The AI continuously adapts your learning journey based on your progress and changing market demands."
    },
    {
      category: 'mentorship',
      question: "How does the industry expert mentorship program work?",
      answer: "Our platform connects you with industry professionals who provide one-on-one guidance sessions, career advice, and insider knowledge about their field. Mentors are matched based on your career goals and skill requirements. The program includes scheduled video calls, regular check-ins, and personalized roadmaps to help you navigate from academics to industry."
    },
    {
      category: 'resume',
      question: "What does the automated resume analysis feature offer?",
      answer: "Our AI-powered resume analyzer evaluates your resume against industry benchmarks, identifies missing keywords, suggests improvements for better ATS compatibility, and provides formatting recommendations. It also offers customization options for different job applications and generates tailored cover letters based on your resume and the job description."
    },
    {
      category: 'interview',
      question: "Can I get feedback on my interview performance?",
      answer: "Yes! Each practice interview session is recorded and analyzed. You'll receive detailed metrics on your response quality, speech patterns, confidence level, technical accuracy, and overall impression. The system also provides comparison with successful interview patterns and specific suggestions for improvement in areas like communication clarity and technical depth."
    },
    {
      category: 'learning',
      question: "How does the gamified learning system work?",
      answer: "Our gamified learning incorporates points, badges, leaderboards, and challenges to make skill development engaging. You earn points by completing learning modules, solving coding challenges, participating in mock interviews, and receiving positive feedback. These points contribute to your Eklavya AI and regional ranking, unlocking premium resources and priority mentorship opportunities."
    },
    {
      category: 'mentorship',
      question: "How are mentors selected for the platform?",
      answer: "Mentors are carefully vetted industry professionals with at least 3+ years of experience in their respective fields. They undergo a thorough selection process including background verification, expertise assessment, and teaching aptitude evaluation. Many mentors are also hiring managers or technical interviewers at top companies, providing inside perspectives on recruitment processes."
    },
    {
      category: 'resume',
      question: "Can Eklavya AI help me showcase projects in my portfolio?",
      answer: "Absolutely! Beyond resume building, Eklavya AI helps you develop an impressive digital portfolio highlighting your projects, skills, and achievements. The platform guides you through creating detailed project documentation, includes GitHub integration for code repositories, and offers templates for showcasing your work effectively to potential employers."
    }
  ];

  useEffect(() => {
    const filtered = faqs.filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredFaqs(filtered);
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Image Background */}
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

        <div className="relative z-10 h-[35rem] container mx-auto px-4">
          <div className="flex flex-col items-center justify-center h-full space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black text-center mb-2 md:mb-4">
              HELP AND 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700"> SUPPORT</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Empowering
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700"> Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bridging the gap between academics and industry requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:border-blue-400/30 transition-all shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Interview Simulations</h3>
              <p className="text-gray-600">Practice with realistic AI-powered interviews and receive instant feedback</p>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:border-blue-400/30 transition-all shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Learning</h3>
              <p className="text-gray-600">Custom learning paths based on your skills, goals, and industry requirements</p>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:border-blue-400/30 transition-all shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Mentorship</h3>
              <p className="text-gray-600">Connect with industry professionals for guidance and career advice</p>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:border-blue-400/30 transition-all shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Resume Enhancement</h3>
              <p className="text-gray-600">AI-powered resume analysis and improvement suggestions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions about Eklavya AI..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700"> Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about Eklavya AI and how it empowers your career
            </p>
          </div>

          <div className="grid gap-8 max-w-3xl mx-auto">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-blue-400/30 shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-6 w-6 text-blue-400" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-blue-400" />
                  )}
                </button>
                <div
                  className={`px-6 transition-all duration-300 ${
                    openIndex === index ? 'pb-6 opacity-100' : 'h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Need More
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700"> Information?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our team and mentors are here to help you succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:border-blue-400/30 transition-all shadow-sm">
              <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600">support@Eklavya AIplusplus.com</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:border-blue-400/30 transition-all shadow-sm">
              <MessageSquare className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat Support</h3>
              <p className="text-gray-600">Available 24/7</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:border-blue-400/30 transition-all shadow-sm">
              <Phone className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Schedule a Demo</h3>
              <p className="text-gray-600">Book a 30-minute session</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}