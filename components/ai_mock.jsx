"use client"
import { useEffect, useState } from "react"
import React from "react"

import { useRouter } from "next/navigation"
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Self-contained components
const Card = ({ className, children }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className || ""}`}>{children}</div>
)

const CardHeader = ({ className, children }) => <div className={`p-4 ${className || ""}`}>{children}</div>

const CardTitle = ({ className, children }) => <h3 className={`text-xl font-bold ${className || ""}`}>{children}</h3>

const CardDescription = ({ className, children }) => <p className={`text-gray-500 ${className || ""}`}>{children}</p>

const CardContent = ({ className, children }) => <div className={`p-4 ${className || ""}`}>{children}</div>

const CardFooter = ({ className, children }) => (
  <div className={`p-4 border-t border-gray-100 ${className || ""}`}>{children}</div>
)

const Badge = ({ className, children }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className || ""}`}>
    {children}
  </span>
)

const Progress = ({ value, className }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className || ""}`}>
    <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${value}%` }}></div>
  </div>
)

const Tabs = ({ defaultValue, className, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  // Clone children and pass activeTab state
  const childrenWithProps = React.Children.map(children, (child) => {
    if (child.type.name === "TabsContent") {
      return React.cloneElement(child, {
        active: child.props.value === activeTab,
      })
    }
    if (child.type.name === "TabsList") {
      return React.cloneElement(child, {
        activeTab,
        setActiveTab,
      })
    }
    return child
  })

  return <div className={className || ""}>{childrenWithProps}</div>
}

const TabsList = ({ className, activeTab, setActiveTab, children }) => {
  // Clone children and pass activeTab state
  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      active: child.props.value === activeTab,
      onClick: () => setActiveTab(child.props.value),
    })
  })

  return <div className={`flex space-x-1 rounded-lg bg-gray-100 p-1 ${className || ""}`}>{childrenWithProps}</div>
}

const TabsTrigger = ({ value, active, onClick, className, children }) => (
  <button
    className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
      active ? "bg-white shadow text-black" : "text-gray-600 hover:text-gray-900"
    } ${className || ""}`}
    onClick={onClick}
  >
    {children}
  </button>
)

const TabsContent = ({ value, active, className, children }) => (
  <div className={`mt-2 ${active ? "block" : "hidden"} ${className || ""}`}>{children}</div>
)

// Icons (simplified versions)
const Icon = ({ children, className }) => <span className={`inline-flex ${className || ""}`}>{children}</span>

const Trophy = ({ className }) => <Icon className={className}>🏆</Icon>

const Clock = ({ className }) => <Icon className={className}>⏱️</Icon>

const Brain = ({ className }) => <Icon className={className}>🧠</Icon>

const Award = ({ className }) => <Icon className={className}>🎖️</Icon>

const Star = ({ className }) => <Icon className={className}>⭐</Icon>

const Zap = ({ className }) => <Icon className={className}>⚡</Icon>

const CheckCircle = ({ className }) => <Icon className={className}>✅</Icon>

const XCircle = ({ className }) => <Icon className={className}>❌</Icon>

const HelpCircle = ({ className }) => <Icon className={className}>❓</Icon>

const ArrowLeft = ({ className }) => <Icon className={className}>←</Icon>

const ArrowRight = ({ className }) => <Icon className={className}>→</Icon>

const Lightbulb = ({ className }) => <Icon className={className}>💡</Icon>

const RotateCcw = ({ className }) => <Icon className={className}>🔄</Icon>

const Home = ({ className }) => <Icon className={className}>🏠</Icon>

// Simple confetti implementation
const confetti = ({ particleCount = 100, spread = 70, origin = { y: 0.6 } }) => {
  // Create confetti elements
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]

  for (let i = 0; i < particleCount; i++) {
    const confettiEl = document.createElement("div")
    confettiEl.style.position = "fixed"
    confettiEl.style.zIndex = "1000"
    confettiEl.style.width = "10px"
    confettiEl.style.height = "10px"
    confettiEl.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confettiEl.style.borderRadius = "50%"
    confettiEl.style.left = `${(origin.x || 0.5) * 100}%`
    confettiEl.style.top = `${origin.y * 100}%`
    confettiEl.style.transform = `translate(-50%, -50%)`
    confettiEl.style.pointerEvents = "none"

    document.body.appendChild(confettiEl)

    // Animate
    const angle = Math.random() * Math.PI * 2
    const velocity = 30 + Math.random() * 30
    const tx = Math.cos(angle) * velocity * (Math.random() - 0.5) * spread
    const ty = Math.sin(angle) * velocity * -1

    confettiEl.animate(
      [
        { transform: "translate(-50%, -50%)" },
        { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`, opacity: 0 },
      ],
      {
        duration: 1000 + Math.random() * 1000,
        easing: "cubic-bezier(0, .9, .57, 1)",
        fill: "forwards",
      },
    )

    // Remove after animation
    setTimeout(() => {
      document.body.removeChild(confettiEl)
    }, 2000)
  }
}

export default function AiMock() {
  const router = useRouter()
  const [step, setStep] = useState("settings") // settings, test, results
  const [name, setName] = useState("")
  const [topics, setTopics] = useState([
    { id: "react", name: "React", selected: true, icon: "⚛️" },
    { id: "javascript", name: "JavaScript", selected: false, icon: "𝙅𝙎" },
    { id: "nodejs", name: "Node.js", selected: false, icon: "🟢" },
    { id: "backend", name: "Backend", selected: false, icon: "🖥️" },
    { id: "database", name: "Database", selected: false, icon: "🗄️" },
    { id: "frontend", name: "Frontend", selected: false, icon: "🎨" },
    { id: "reactnative", name: "React Native", selected: false, icon: "📱" },
  ])

  // Fixed values
  const timeLimit = 10 // Fixed at 10 minutes
  const numQuestions = 5 // Fixed number of questions

  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [explanations, setExplanations] = useState({})
  const [savingResults, setSavingResults] = useState(false)
  const [streakCount, setStreakCount] = useState(0)
  const [points, setPoints] = useState(0)
  const [level, setLevel] = useState(1)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [hintUsed, setHintUsed] = useState({})

  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    skipped: 0,
    timeTaken: 0,
  })

  // Fetch questions from Gemini API
  const fetchQuestionsFromAI = async () => {
    setLoading(true)

    try {
      // Make API call to our Next.js API route which will call Gemini
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          numQuestions: numQuestions,
          topics: topics.filter((t) => t.selected).map((t) => t.name),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch questions from API")
      }

      const data = await response.json()

      // Process the questions received from Gemini
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions)
        setTimeLeft(timeLimit * 60)
        setLoading(false)
        setStep("test")
      } else {
        throw new Error("No questions received from API")
      }
    } catch (error) {
      console.error("Error fetching questions:", error)
      setLoading(false)
      alert("Failed to generate questions. Please try again.")
    }
  }

  // Start the quiz
  const startQuiz = () => {
    if (!name.trim()) {
      alert("Please enter your name to proceed")
      return
    }

    if (!topics.some((topic) => topic.selected)) {
      alert("Please select at least one topic")
      return
    }

    // Reset game state
    setStreakCount(0)
    setPoints(0)
    setLevel(1)
    setHintUsed({})

    fetchQuestionsFromAI()
  }

  // Handle timer
  useEffect(() => {
    let timer
    if (step === "test" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            // Time's up - move to results
            calculateResults()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [step, timeLeft])

  // Handle topic selection
  const toggleTopic = (id) => {
    setTopics(topics.map((topic) => (topic.id === id ? { ...topic, selected: !topic.selected } : topic)))
  }

  // Handle answer selection
  const selectAnswer = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerIndex,
    })

    // Show feedback
    const isAnswerCorrect = answerIndex === questions[currentQuestionIndex].correctAnswer
    setIsCorrect(isAnswerCorrect)
    setShowAnswerFeedback(true)

    // Update streak and points
    if (isAnswerCorrect) {
      const newStreakCount = streakCount + 1
      setStreakCount(newStreakCount)

      // Calculate points - base points + streak bonus + time bonus
      const basePoints = 100
      const streakBonus = Math.min(newStreakCount * 10, 50) // Cap streak bonus at 50
      const timeBonus = Math.floor((timeLeft / (timeLimit * 60)) * 50) // Time bonus up to 50 points
      const hintPenalty = hintUsed[currentQuestionIndex] ? -25 : 0 // Penalty for using hint

      const questionPoints = basePoints + streakBonus + timeBonus + hintPenalty
      setPoints((prev) => prev + questionPoints)

      // Check for level up (every 300 points)
      const newLevel = Math.floor(points / 300) + 1
      if (newLevel > level) {
        setLevel(newLevel)
        setShowLevelUp(true)
        // Trigger confetti effect for level up
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })

        setTimeout(() => {
          setShowLevelUp(false)
        }, 3000)
      }
    } else {
      setStreakCount(0) // Reset streak on wrong answer
    }

    // Automatically move to next question after feedback
    setTimeout(() => {
      setShowAnswerFeedback(false)
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
      } else {
        calculateResults()
      }
    }, 1500)
  }

  // Navigation between questions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setShowHint(false)
    } else {
      calculateResults()
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setShowHint(false)
    }
  }

  // Calculate final results and fetch explanations for each question
  const calculateResults = async () => {
    const totalQuestions = questions.length
    let correctCount = 0

    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correctCount++
      }
    })

    const incorrectCount = Object.keys(selectedAnswers).length - correctCount
    const skippedCount = totalQuestions - Object.keys(selectedAnswers).length

    const calculatedResults = {
      score: Math.round((correctCount / totalQuestions) * 100),
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      skipped: skippedCount,
      timeTaken: timeLimit * 60 - timeLeft,
    }

    setResults(calculatedResults)

    // Get explanations for each question from Gemini
    try {
      const response = await fetch("/api/generate-explanations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questions: questions,
          selectedAnswers: selectedAnswers,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setExplanations(data.explanations)
      }
    } catch (error) {
      console.error("Error fetching explanations:", error)
    }

    // Save results to MongoDB
    await saveResultsToDatabase(calculatedResults, totalQuestions)

    setStep("results")

    // Trigger confetti for good scores
    if (calculatedResults.score >= 70) {
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 },
      })
    }
  }

  // Save quiz results to MongoDB
  const saveResultsToDatabase = async (resultsData, totalQuestions) => {
    setSavingResults(true)
    try {
      const response = await fetch("/api/save-quiz-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          topics: topics.filter((t) => t.selected).map((t) => t.name),
          score: resultsData.score,
          correctAnswers: resultsData.correctAnswers,
          incorrectAnswers: resultsData.incorrectAnswers,
          skipped: resultsData.skipped,
          timeTaken: resultsData.timeTaken,
          totalQuestions: totalQuestions,
          points: points,
          level: level,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to save results to database")
      }

      console.log("Results saved to database successfully")
      return true
    } catch (error) {
      console.error("Error saving results to database:", error)

      // Show user-friendly error message
      alert(
        `Failed to save your quiz results: ${error.message}. Your results are still displayed but won't be stored for future reference.`,
      )

      // Return false to indicate failure
      return false
    } finally {
      setSavingResults(false)
    }
  }

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Show hint for current question
  const toggleHint = () => {
    if (!showHint && !hintUsed[currentQuestionIndex]) {
      setHintUsed({ ...hintUsed, [currentQuestionIndex]: true })
    }
    setShowHint(!showHint)
  }

  // Restart the entire process
  const restartTest = () => {
    setStep("settings")
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setQuestions([])
    setShowHint(false)
    setExplanations({})
    setStreakCount(0)
    setPoints(0)
    setLevel(1)
    setHintUsed({})
  }

  // Get badge for score
  const getScoreBadge = (score) => {
    if (score >= 90) return { label: "Expert", color: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white" }
    if (score >= 80) return { label: "Master", color: "bg-gradient-to-r from-blue-400 to-blue-600 text-white" }
    if (score >= 70) return { label: "Proficient", color: "bg-gradient-to-r from-green-400 to-green-600 text-white" }
    if (score >= 60)
      return { label: "Intermediate", color: "bg-gradient-to-r from-orange-400 to-orange-600 text-white" }
    return { label: "Beginner", color: "bg-gradient-to-r from-red-400 to-red-600 text-white" }
  }

  // CSS for animations
  const animationStyles = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-in-out;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-25%); }
    }
    .animate-bounce {
      animation: bounce 1s infinite;
    }
  `

  // Render Settings Screen
  const renderSettingsScreen = () => (
    <div className="max-w-4xl mx-auto">
      <style>{animationStyles}</style>
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold text-blue-600">AI Mock Test</CardTitle>
              <CardDescription className="text-lg mt-1">Test your knowledge and earn points!</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-lg font-medium">Enter Your Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all"
              placeholder="Your name"
              required
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              Select Topics:
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => toggleTopic(topic.id)}
                  className={`p-3 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 ${
                    topic.selected ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  style={{
                    transform: topic.selected ? "scale(1.05)" : "scale(1)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span className="text-xl">{topic.icon}</span>
                  <span>{topic.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Time Limit:</h3>
                <p className="text-lg font-bold">{timeLimit} minutes</p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-purple-500 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Number of Questions:</h3>
                <p className="text-lg font-bold">{numQuestions} questions</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4 border-l-4 border-yellow-400">
            <h3 className="font-semibold text-yellow-800 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Game Features:
            </h3>
            <ul className="mt-2 space-y-1 text-yellow-700">
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 flex-shrink-0" />
                Earn points for correct answers
              </li>
              <li className="flex items-center gap-2">
                <Award className="h-4 w-4 flex-shrink-0" />
                Build streaks for bonus points
              </li>
              <li className="flex items-center gap-2">
                <Trophy className="h-4 w-4 flex-shrink-0" />
                Level up as you earn more points
              </li>
            </ul>
          </div>
        </CardContent>

        <CardFooter>
          <button
            onClick={startQuiz}
            className="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all font-bold text-lg shadow-md flex items-center justify-center gap-2"
            style={{
              transition: "all 0.2s ease",
              transform: "scale(1)",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Zap className="h-5 w-5" />
            Start Challenge
          </button>
        </CardFooter>
      </Card>
    </div>
  )

  // Render Test Screen
  const renderTestScreen = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-64 p-8">
          <div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
            style={{
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <p className="text-lg font-medium text-center">Generating your personalized challenge using AI...</p>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Crafting questions based on{" "}
            {topics
              .filter((t) => t.selected)
              .map((t) => t.name)
              .join(", ")}
          </p>
        </div>
      )
    }

    if (questions.length === 0) {
      return <div>No questions available. Please try again.</div>
    }

    const currentQuestion = questions[currentQuestionIndex]
    const progressPercentage = (currentQuestionIndex / questions.length) * 100

    return (
      <div className="max-w-2xl mx-auto">
        <style>{animationStyles}</style>
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center">
                    {currentQuestionIndex + 1}
                  </span>
                  <span>of {questions.length}</span>
                </CardTitle>
                <Progress value={progressPercentage} className="h-2 mt-2" />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4" />
                  <span className="font-bold">{points}</span>
                  <span className="text-xs">pts</span>
                </div>

                <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  <Award className="h-4 w-4" />
                  <span className="font-bold">Lvl {level}</span>
                </div>

                <div className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4" />
                  <span className="font-bold">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            {streakCount > 1 && (
              <div
                className="mt-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1"
                style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
              >
                <Zap className="h-4 w-4" />
                {streakCount} streak! +{Math.min(streakCount * 10, 50)} bonus points
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-lg font-medium mb-1">{currentQuestion.question}</h3>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  disabled={showAnswerFeedback}
                  className={`w-full text-left p-4 rounded-xl ${
                    showAnswerFeedback && index === currentQuestion.correctAnswer
                      ? "bg-green-100 border-green-500 border-2"
                      : showAnswerFeedback && selectedAnswers[currentQuestionIndex] === index
                        ? "bg-red-100 border-red-500 border-2"
                        : selectedAnswers[currentQuestionIndex] === index
                          ? "bg-blue-100 border-blue-400 border-2"
                          : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                  style={{
                    transition: "all 0.2s ease",
                    transform: selectedAnswers[currentQuestionIndex] === index ? "translateX(4px)" : "translateX(0)",
                  }}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        showAnswerFeedback && index === currentQuestion.correctAnswer
                          ? "bg-green-500 text-white"
                          : showAnswerFeedback && selectedAnswers[currentQuestionIndex] === index
                            ? "bg-red-500 text-white"
                            : selectedAnswers[currentQuestionIndex] === index
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {showHint && (
              <div
                className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg"
                style={{ animation: "fadeIn 0.3s ease-in-out" }}
              >
                <div className="flex gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <p className="text-yellow-800">{currentQuestion.hint}</p>
                </div>
              </div>
            )}

            {showAnswerFeedback && (
              <div
                className={`p-4 rounded-lg ${isCorrect ? "bg-green-50 border-l-4 border-green-500" : "bg-red-50 border-l-4 border-red-500"}`}
                style={{ animation: "fadeIn 0.3s ease-in-out" }}
              >
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <p className={`font-medium ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                    {isCorrect ? "Correct! +100 points" : "Incorrect!"}
                  </p>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0 || showAnswerFeedback}
              className={`px-4 py-2 rounded-lg flex items-center gap-1 ${
                currentQuestionIndex === 0 || showAnswerFeedback
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            <button
              onClick={toggleHint}
              disabled={showAnswerFeedback}
              className={`px-4 py-2 rounded-lg flex items-center gap-1 ${
                showAnswerFeedback
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : showHint
                    ? "bg-yellow-200 text-yellow-700 hover:bg-yellow-300"
                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              }`}
            >
              <Lightbulb className="h-4 w-4" />
              {showHint ? "Hide Hint" : "Show Hint"}
              {!showHint && !hintUsed[currentQuestionIndex] && <span className="text-xs ml-1">(-25 pts)</span>}
            </button>

            <button
              onClick={goToNextQuestion}
              disabled={showAnswerFeedback}
              className={`px-4 py-2 rounded-lg flex items-center gap-1 ${
                showAnswerFeedback
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {currentQuestionIndex === questions.length - 1 ? "Finish" : "Skip"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </CardFooter>
        </Card>

        {showLevelUp && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div
              className="bg-purple-500 p-8 rounded-xl text-white text-center shadow-lg"
              style={{ animation: "bounce 1s infinite" }}
            >
              <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
              <h2 className="text-2xl font-bold mb-2">Level Up!</h2>
              <p className="text-xl">You reached Level {level}!</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Render Results Screen
  const renderResultsScreen = () => {
    const COLORS = ["#4CAF50", "#F44336", "#FFEB3B"]

    const pieData = [
      { name: "Correct", value: results.correctAnswers },
      { name: "Incorrect", value: results.incorrectAnswers },
      { name: "Skipped", value: results.skipped },
    ]

    const progressData = Array.from({ length: questions.length }, (_, i) => ({
      question: `Q${i + 1}`,
      score: selectedAnswers[i] === questions[i]?.correctAnswer ? 1 : 0,
    }))

    const scoreBadge = getScoreBadge(results.score)

    return (
      <div className="max-w-4xl mx-auto">
        <style>{animationStyles}</style>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold">Challenge Results</CardTitle>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className={`px-4 py-1 rounded-full text-lg font-bold ${scoreBadge.color}`}>{scoreBadge.label}</span>
            </div>
            <CardDescription className="text-lg mt-1">
              Great effort, <span className="font-semibold">{name}</span>! Here's how you did:
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-blue-50 border-0">
                <CardContent className="p-4 text-center">
                  <p className="text-blue-600 mb-1 text-sm font-medium">Score</p>
                  <p className="text-3xl font-bold text-blue-700">{results.score}%</p>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-0">
                <CardContent className="p-4 text-center">
                  <p className="text-purple-600 mb-1 text-sm font-medium">Time</p>
                  <p className="text-3xl font-bold text-purple-700">{formatTime(results.timeTaken)}</p>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-0">
                <CardContent className="p-4 text-center">
                  <p className="text-green-600 mb-1 text-sm font-medium">Points</p>
                  <p className="text-3xl font-bold text-green-700">{points}</p>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-0">
                <CardContent className="p-4 text-center">
                  <p className="text-yellow-600 mb-1 text-sm font-medium">Level</p>
                  <p className="text-3xl font-bold text-yellow-700">{level}</p>
                </CardContent>
              </Card>
            </div>

            {results.score >= 70 ? (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Trophy className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-green-800">Achievement Unlocked: Knowledge Master!</h3>
                    <p className="text-green-700">
                      Congratulations! You've mastered this challenge with flying colors. Your expertise is impressive!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-yellow-800">Keep Going!</h3>
                    <p className="text-yellow-700">
                      You're on the right track! With a bit more practice, you'll be a master in no time. Try again to
                      improve your score.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Tabs defaultValue="charts" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="charts">Performance Charts</TabsTrigger>
                <TabsTrigger value="answers">Question Review</TabsTrigger>
              </TabsList>

              <TabsContent value="charts" className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Results Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Question Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="question" />
                            <YAxis domain={[0, 1]} ticks={[0, 1]} />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="score"
                              stroke="#8884d8"
                              activeDot={{ r: 8 }}
                              name="Correct/Incorrect"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="answers" className="pt-4">
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader
                        className={`py-3 ${
                          selectedAnswers[index] === question.correctAnswer
                            ? "bg-green-50 border-b border-green-200"
                            : "bg-red-50 border-b border-red-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {selectedAnswers[index] === question.correctAnswer ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <CardTitle className="text-base font-medium">Question {index + 1}</CardTitle>
                          {selectedAnswers[index] === question.correctAnswer && (
                            <Badge className="ml-auto bg-green-100 text-green-800 border-green-200">+100 points</Badge>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="p-4 space-y-3">
                        <p className="font-medium">{question.question}</p>

                        <div className="space-y-2">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`px-3 py-2 rounded-lg ${
                                question.correctAnswer === optIndex
                                  ? "bg-green-100 border-l-4 border-green-500"
                                  : selectedAnswers[index] === optIndex
                                    ? "bg-red-100 border-l-4 border-red-500"
                                    : "bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                                    question.correctAnswer === optIndex
                                      ? "bg-green-500 text-white"
                                      : selectedAnswers[index] === optIndex
                                        ? "bg-red-500 text-white"
                                        : "bg-gray-200 text-gray-700"
                                  }`}
                                >
                                  {String.fromCharCode(65 + optIndex)}
                                </div>
                                <span>{option}</span>
                                {question.correctAnswer === optIndex && (
                                  <span className="ml-2 text-green-600 font-semibold text-sm">(Correct)</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg mt-2">
                          <h4 className="font-semibold text-blue-800 flex items-center gap-1 mb-1">
                            <HelpCircle className="h-4 w-4" />
                            Explanation:
                          </h4>
                          <p className="text-blue-700 text-sm">{explanations[index] || "Loading explanation..."}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={restartTest}
              className="flex-1 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all font-semibold flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Take Another Challenge
            </button>

            <button
              onClick={() => router.push("/main")}
              className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" />
              Back to Dashboard
            </button>
          </CardFooter>
        </Card>

        {savingResults && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              <p className="font-medium">Saving your results...</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Render the appropriate screen based on the current step
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {step === "settings" && renderSettingsScreen()}
      {step === "test" && renderTestScreen()}
      {step === "results" && renderResultsScreen()}
    </div>
  )
}

