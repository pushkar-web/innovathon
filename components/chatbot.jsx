"use client"

import { GoogleGenerativeAI } from "@google/generative-ai";
import { MessageSquare, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Welcome to Eklavya AI! I'm your career guidance and interview preparation assistant, designed specifically for Tier 2 & Tier 3 college students. How can I help you prepare for success today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const nodeRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Compile conversation history
    const conversationHistory = messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n");

    try {
      // Initialize Gemini API
      const genAI = new GoogleGenerativeAI("AIzaSyByyi7tkj1KTj7CQ-RU4e8KmNvl40yS-Sg");
    
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const systemPrompt = `You are INskillify Assistant, an AI career guidance and interview preparation coach for Tier 2 & Tier 3 college students.

ABOUT INskillify:
INskillify addresses core challenges faced by Tier 2 & Tier 3 college students, including limited access to structured learning resources, professional mentorship, and interview preparation. Our platform offers AI-powered interview simulations, personalized learning paths based on industry trends, mentorship from industry experts, automated resume analysis, and a gamified learning system.

RESPONSE STYLE:
- Use clear, supportive language
- Keep responses concise and practical 
- Be encouraging and empathetic to student challenges
- Provide actionable advice

When responding to student questions, focus on:
1. Practical career guidance tailored for Tier 2 & Tier 3 college students
2. Interview preparation strategies and practice questions
3. Resume improvement suggestions
4. Skill development recommendations based on industry trends
5. Mentorship guidance and professional networking tips

Your goal is to help students improve their employability through practical skills development, interview readiness, and career planning.

Previous conversation context:
${conversationHistory}

Current user query: ${input}`;

      const result = await model.generateContent(systemPrompt);
      const response = result.response.text();

      // Add assistant message - ensure proper formatting by removing any markdown-style formatting
      const cleanedResponse = response.replace(/\*\*/g, "");
      setMessages((prev) => [...prev, { role: "assistant", content: cleanedResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error processing your request. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      { role: "assistant", content: "Chat cleared. How can I help you with your career development today?" },
    ]);
  };

  return (
    <Draggable nodeRef={nodeRef} bounds="body" handle=".drag-handle">
      <div 
        ref={nodeRef} 
        className={`fixed z-50 ${isOpen ? 'bottom-6 right-6' : 'bottom-6 right-6'}`}
      >
        {/* Collapsed chat button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#6366f1] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative"
            aria-label="Open chat"
          >
            <MessageSquare size={22} />
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </button>
        )}

        {/* Expanded chat window */}
        {isOpen && (
          <div className="flex flex-col w-72 sm:w-80 h-96 bg-white rounded-lg shadow-xl border border-[#e0e1f6] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#3b82f6] to-[#6366f1] p-2.5 flex justify-between items-center drag-handle cursor-move">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-white rounded-full mr-2 animate-pulse"></div>
                <h3 className="text-white font-medium text-sm">INskillify Assistant</h3>
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={clearChat}
                  className="text-white/80 hover:text-white p-1 rounded transition"
                  aria-label="Clear chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white p-1 rounded transition"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#f8f9ff]">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isLoading && (
                <div className="flex items-center space-x-2 ml-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#3b82f6] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-[#4f46e5] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-[#6366f1] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[#e0e1f6] p-2 bg-white">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about career guidance or interview prep..."
                  className="flex-1 px-3 py-1.5 border border-[#e0e1f6] rounded-full text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-[#3b82f6] to-[#6366f1] text-white rounded-full w-7 h-7 flex items-center justify-center disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send size={12} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
}

function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[85%] rounded-xl px-3 py-2 text-sm
          ${isUser 
            ? "bg-gradient-to-r from-[#3b82f6] to-[#6366f1] text-white rounded-br-none" 
            : "bg-white text-gray-800 rounded-bl-none border border-[#e0e1f6] shadow-sm"
          }
        `}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
}