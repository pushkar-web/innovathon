"use client";

import { BookOpen, FileText, MessageSquare, User, Award, Video } from 'lucide-react';
import Image from "next/image";

function ServiceCard({ title, icon: Icon, image, iconColor, description }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 " />
      </div>
      <div className="absolute left-6 top-6">
        <div className={`rounded-2xl ${
          iconColor === "green" 
            ? "bg-blue-50/90 hover:bg-blue-100" 
            : "bg-blue-50/90 hover:bg-blue-100"
        } p-3 backdrop-blur-sm transition-all duration-300 group-hover:scale-110`}>
          <Icon className={`h-7 w-7 ${
            iconColor === "green" ? "text-blue-600" : "text-blue-600"
          }`} />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-3 text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const services = [
    {
      title: "AI Interview Simulator",
      icon: Video,
      image: "/images/a.jpg",
      iconColor: "blue",
      description: "Practice with realistic interview scenarios and receive instant AI feedback on your performance."
    },
    {
      title: "Resume Enhancement",
      icon: FileText,
      image: "/images/b.jpg",
      iconColor: "green",
      description: "AI-powered resume analysis and optimization to help you stand out to potential employers."
    },
    {
      title: "Personalized Learning",
      icon: BookOpen,
      image: "/images/c.jpg",
      iconColor: "blue",
      description: "Custom learning paths based on your skills, goals, and industry demands to fill your knowledge gaps."
    },
    {
      title: "Skill Assessment",
      icon: Award,
      image: "/images/d.jpg",
      iconColor: "green",
      description: "Comprehensive assessment of technical and soft skills with detailed feedback and improvement strategies."
    },
    {
      title: "AI Career Assistant",
      icon: MessageSquare,
      image: "/images/e.jpg",
      iconColor: "blue",
      description: "24/7 AI-powered career guidance and job search assistance for immediate support."
    },
    {
      title: "Expert Mentorship",
      icon: User,
      image: "/images/f.jpg",
      iconColor: "green",
      description: "Connect with industry professionals for personalized guidance, career advice, and networking opportunities."
    }
  ];

  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Career Services
            </span>
          </h2>
          <div className="max-w-2xl">
            <p className="text-lg text-gray-600 sm:text-xl">
              We provide comprehensive career development tools and resources to help Tier 2 & Tier 3 college students 
              build skills, prepare for interviews, and connect with opportunities.
            </p>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              icon={service.icon}
              image={service.image}
              iconColor={service.iconColor}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;