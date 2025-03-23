"use client";
import React, { useState } from 'react';

const MentoringPlatform = () => {
  const [showContact, setShowContact] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const mentors = [
    {
      id: 1,
      name: "Aman Gupta",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Frontend Development",
      secondaryRole: "UI/UX Design",
      description: "Expert in creating intuitive and responsive user interfaces with 10+ years of experience.",
      whatsapp: "+91 98765 43210"
    },
    {
      id: 2,
      name: "Ritesh Mane",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      role: "Backend Development",
      secondaryRole: "Database Design",
      description: "Specializes in scalable backend architectures and efficient database systems.",
      whatsapp: "+91 87654 32109"
    },
    {
      id: 3,
      name: "Prajjval Jaiswal",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      role: "Full Stack Development",
      secondaryRole: "DevOps",
      description: "Full stack developer with expertise in cloud technologies and CI/CD pipelines.",
      whatsapp: "+91 76543 21098"
    },
    {
      id: 4,
      name: "Neha Sharma",
      image: "https://randomuser.me/api/portraits/women/26.jpg",
      role: "Mobile Development",
      secondaryRole: "Cross-platform Solutions",
      description: "Specialized in developing high-performance mobile applications for iOS and Android.",
      whatsapp: "+91 65432 10987"
    },
    {
      id: 5,
      name: "Vikram Reddy",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      role: "Data Science",
      secondaryRole: "Machine Learning",
      description: "Expert in building predictive models and extracting insights from complex datasets.",
      whatsapp: "+91 54321 09876"
    },
    {
      id: 6,
      name: "Priya Patel",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "Product Management",
      secondaryRole: "Agile Methodologies",
      description: "Experienced in leading cross-functional teams and delivering successful digital products.",
      whatsapp: "+91 43210 98765"
    }
  ];

  const handleContactWhatsApp = (mentor) => {
    setSelectedMentor(mentor);
    setShowContact(true);
  };

  const handleCloseContact = () => {
    setShowContact(false);
    setSelectedMentor(null);
  };

  const WhatsAppContact = ({ mentor }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md rounded-lg overflow-hidden flex flex-col">
          <div className="p-4 bg-green-600 text-white flex justify-between items-center">
            <h2 className="text-xl font-bold">Contact {mentor.name}</h2>
            <button 
              onClick={handleCloseContact}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <div className="p-6 bg-gray-100 flex flex-col items-center justify-center">
            <div className="text-center mb-6">
              <img 
                src={mentor.image} 
                alt={mentor.name} 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{mentor.name}</h3>
              <p className="text-gray-600">{mentor.role}</p>
            </div>
            <div className="text-center w-full">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">📱</div>
                <h4 className="text-xl font-semibold mb-2">WhatsApp Contact</h4>
                <p className="text-gray-600 mb-4">Connect with {mentor.name} via WhatsApp</p>
                <p className="bg-gray-100 p-3 rounded-lg text-green-600 font-medium mb-4">{mentor.whatsapp}</p>
                <div className="flex space-x-2">
                  <a 
                    href={`https://wa.me/${mentor.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex-1 text-center"
                  >
                    Open WhatsApp
                  </a>
                  <button 
                    onClick={handleCloseContact}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition flex-1"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MentorCard = ({ mentor }) => {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg">
        <div className="h-48 relative bg-gradient-to-b from-blue-100 to-blue-500">
          <img 
            src={mentor.image} 
            alt={mentor.name}
            className="w-24 h-24 rounded-full absolute bottom-0 left-4 transform translate-y-1/2 border-4 border-white object-cover"
          />
        </div>
        <div className="pt-16 p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{mentor.name}</h2>
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mr-2">
              {mentor.role}
            </span>
            <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              {mentor.secondaryRole}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{mentor.description}</p>
          <button
            onClick={() => handleContactWhatsApp(mentor)}
            className="flex items-center justify-center w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <span className="mr-2">📱</span> Contact via WhatsApp
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map(mentor => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>

      {showContact && selectedMentor && (
        <WhatsAppContact mentor={selectedMentor} />
      )}
    </div>
  );
};

export default MentoringPlatform;