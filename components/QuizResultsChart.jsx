"use client"
import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  Sector,
} from "recharts"

// Self-contained components (from your existing code)
const Card = ({ className, children }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className || ""}`}>{children}</div>
)

const CardHeader = ({ className, children }) => <div className={`p-4 ${className || ""}`}>{children}</div>

const CardTitle = ({ className, children }) => <h3 className={`text-xl font-bold ${className || ""}`}>{children}</h3>

const CardDescription = ({ className, children }) => <p className={`text-gray-500 ${className || ""}`}>{children}</p>

const CardContent = ({ className, children }) => <div className={`p-4 ${className || ""}`}>{children}</div>

// Icons (simplified versions)
const Icon = ({ children, className }) => <span className={`inline-flex ${className || ""}`}>{children}</span>
const Trophy = ({ className }) => <Icon className={className}>🏆</Icon>
const CheckCircle = ({ className }) => <Icon className={className}>✅</Icon>
const XCircle = ({ className }) => <Icon className={className}>❌</Icon>
const SkipForward = ({ className }) => <Icon className={className}>⏭️</Icon>
const Star = ({ className }) => <Icon className={className}>⭐</Icon>
const Code = ({ className }) => <Icon className={className}>💻</Icon>
const Medal = ({ className }) => <Icon className={className}>🏅</Icon>
const Crown = ({ className }) => <Icon className={className}>👑</Icon>
const Brain = ({ className }) => <Icon className={className}>🧠</Icon>
const Fire = ({ className }) => <Icon className={className}>🔥</Icon>
const Rocket = ({ className }) => <Icon className={className}>🚀</Icon>

// Badge component for rankings
const Badge = ({ rank, className }) => {
  let badgeColor = "bg-gray-100 text-gray-800"

  if (rank === 1) badgeColor = "bg-yellow-100 text-yellow-800 border-2 border-yellow-400"
  else if (rank === 2) badgeColor = "bg-gray-100 text-gray-800 border-2 border-gray-400"
  else if (rank === 3) badgeColor = "bg-amber-100 text-amber-800 border-2 border-amber-400"

  return (
    <div
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${badgeColor} ${className || ""}`}
    >
      {rank === 1 ? <Crown /> : rank === 2 ? "2" : rank === 3 ? "3" : rank}
    </div>
  )
}

// Progress bar component
const ProgressBar = ({ value, max, className, color = "bg-blue-500" }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className || ""}`}>
      <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
    </div>
  )
}

const QuizLeaderboard = () => {
  const [quizResults, setQuizResults] = useState([])
  const [codingLeaderboard, setCodingLeaderboard] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true)
  const [error, setError] = useState(null)
  const [leaderboardError, setLeaderboardError] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/quiz-results")

        if (!response.ok) {
          throw new Error("Failed to fetch quiz results")
        }

        const data = await response.json()
        setQuizResults(data.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching quiz results:", err)
        setError("Failed to load quiz results. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuizResults()
  }, [])

  // Fetch coding challenge leaderboard
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLeaderboardLoading(true)
        const response = await fetch("/api/leaderboard?limit=10")

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data")
        }

        const data = await response.json()
        setCodingLeaderboard(data.data)
        setLeaderboardError(null)
      } catch (err) {
        console.error("Error fetching leaderboard:", err)
        setLeaderboardError("Failed to load leaderboard. Please try again later.")
      } finally {
        setIsLeaderboardLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  // Process data for visualization
  const processedData = quizResults.map((result) => ({
    name: result.name,
    correct: result.correctAnswers,
    incorrect: result.incorrectAnswers,
    skipped: result.skipped,
    score: result.score,
    topics: Array.isArray(result.topics) ? result.topics.join(", ") : result.topics,
    date: new Date(result.createdAt).toLocaleDateString(),
  }))

  // Separate Parth's data from others
  const parthData = processedData.find((result) => result.name === "Parth")
  const otherUsersData = processedData.filter((result) => result.name !== "Parth")

  // Format data for bar charts
  const formatUserBarData = (user) => {
    if (!user) return []
    return [
      { name: "Correct", value: user.correct, fill: "#4ade80" },
      { name: "Incorrect", value: user.incorrect, fill: "#f87171" },
      { name: "Skipped", value: user.skipped, fill: "#fbbf24" },
    ]
  }

  // Prepare coding leaderboard data for visualization
  const leaderboardChartData = codingLeaderboard.map((user, index) => ({
    name: user.name,
    score: user.score,
    level: user.level,
    problemsSolved: user.problemsSolved,
    rank: index + 1,
  }))

  // Find top performers in each category
  const findTopPerformer = (data, category) => {
    if (!data || data.length === 0) return null
    return data.reduce((prev, current) => (prev[category] > current[category] ? prev : current))
  }

  const topScorer = findTopPerformer(leaderboardChartData, "score")
  const topLevel = findTopPerformer(leaderboardChartData, "level")
  const topProblemSolver = findTopPerformer(leaderboardChartData, "problemsSolved")

  // Find top quiz performers
  const topQuizScorer = findTopPerformer(processedData, "score")
  const topCorrectAnswers = findTopPerformer(processedData, "correct")

  // Prepare radar chart data for Parth (if available)
  const prepareRadarData = (user) => {
    if (!user) return []

    return [
      { subject: "Score", A: user.score, fullMark: 100 },
      { subject: "Correct", A: user.correct, fullMark: user.correct + user.incorrect + user.skipped },
      { subject: "Speed", A: 80, fullMark: 100 }, // Placeholder value
      { subject: "Accuracy", A: (user.correct / (user.correct + user.incorrect)) * 100, fullMark: 100 },
      { subject: "Consistency", A: 75, fullMark: 100 }, // Placeholder value
    ]
  }

  const radarData = parthData ? prepareRadarData(parthData) : []

  // Prepare pie chart data
  const preparePieData = (user) => {
    if (!user) return []

    return [
      { name: "Correct", value: user.correct, color: "#4ade80" },
      { name: "Incorrect", value: user.incorrect, color: "#f87171" },
      { name: "Skipped", value: user.skipped, color: "#fbbf24" },
    ]
  }

  // Custom active shape for pie chart
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props

    return (
      <g>
        <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#333" className="text-sm font-medium">
          {payload.name}
        </text>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#333" className="text-xl font-bold">
          {value}
        </text>
        <text x={cx} y={cy} dy={30} textAnchor="middle" fill="#999" className="text-xs">
          {`(${(percent * 100).toFixed(0)}%)`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  // Loading state
  if (isLoading && isLeaderboardLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl">
      {/* Header with title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          Coding Masters Leaderboard
        </h1>
        <p className="text-slate-600 mt-2">Track your progress and compete with others!</p>
      </div>

      {/* Top Performers Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {topScorer && (
          <Card className="border-l-4 border-yellow-500 overflow-hidden transform transition-all hover:scale-105">
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500 rounded-bl-full flex items-start justify-end p-2">
              <Trophy className="text-white text-xl" />
            </div>
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100">
              <CardTitle className="text-yellow-800">Top Scorer</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Badge rank={1} className="mr-3" />
                <div>
                  <h4 className="font-bold text-lg">{topScorer.name}</h4>
                  <p className="text-sm text-gray-500">Level {topScorer.level}</p>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Score</span>
                  <span className="text-sm font-bold text-yellow-600">{topScorer.score}</span>
                </div>
                <ProgressBar value={topScorer.score} max={100} color="bg-yellow-500" />
              </div>
            </CardContent>
          </Card>
        )}

        {topLevel && (
          <Card className="border-l-4 border-purple-500 overflow-hidden transform transition-all hover:scale-105">
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500 rounded-bl-full flex items-start justify-end p-2">
              <Rocket className="text-white text-xl" />
            </div>
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
              <CardTitle className="text-purple-800">Highest Level</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Badge rank={1} className="mr-3" />
                <div>
                  <h4 className="font-bold text-lg">{topLevel.name}</h4>
                  <p className="text-sm text-gray-500">Score {topLevel.score}</p>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Level</span>
                  <span className="text-sm font-bold text-purple-600">{topLevel.level}</span>
                </div>
                <ProgressBar value={topLevel.level} max={10} color="bg-purple-500" />
              </div>
            </CardContent>
          </Card>
        )}

        {topProblemSolver && (
          <Card className="border-l-4 border-green-500 overflow-hidden transform transition-all hover:scale-105">
            <div className="absolute top-0 right-0 w-16 h-16 bg-green-500 rounded-bl-full flex items-start justify-end p-2">
              <Code className="text-white text-xl" />
            </div>
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="text-green-800">Problem Solver</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Badge rank={1} className="mr-3" />
                <div>
                  <h4 className="font-bold text-lg">{topProblemSolver.name}</h4>
                  <p className="text-sm text-gray-500">Level {topProblemSolver.level}</p>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Problems Solved</span>
                  <span className="text-sm font-bold text-green-600">{topProblemSolver.problemsSolved}</span>
                </div>
                <ProgressBar value={topProblemSolver.problemsSolved} max={50} color="bg-green-500" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* AI Mock Test Leaderboard Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center">
            <Code className="mr-2 text-indigo-500" /> Coding Challenge Leaderboard
          </h2>
          {isLeaderboardLoading && (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
          )}
        </div>

        {leaderboardError ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-6 border border-red-200">
            <p className="font-semibold">Error:</p>
            <p>{leaderboardError}</p>
          </div>
        ) : (
          <>
            {/* Leaderboard visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="border-t-4 border-indigo-500 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                  <CardTitle className="text-indigo-800 flex items-center">
                    <Trophy className="mr-2" /> Top Performers
                  </CardTitle>
                  <CardDescription>Points earned by top 10 participants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={leaderboardChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={70}
                          interval={0}
                          tick={{ fill: "#6366f1", fontSize: 12 }}
                        />
                        <YAxis
                          label={{ value: "Points", angle: -90, position: "insideLeft", fill: "#6366f1" }}
                          tick={{ fill: "#6366f1" }}
                        />
                        <Tooltip
                          formatter={(value, name) => [value, "Score"]}
                          labelFormatter={(name) => `User: ${name}`}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Bar dataKey="score" name="Score">
                          {leaderboardChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                index === 0 ? "#fbbf24" : index === 1 ? "#94a3b8" : index === 2 ? "#d97706" : "#6366f1"
                              }
                              radius={[4, 4, 0, 0]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardTitle className="text-blue-800 flex items-center">
                    <Rocket className="mr-2" /> Level & Problems
                  </CardTitle>
                  <CardDescription>Progression levels and problems solved</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={leaderboardChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={70}
                          interval={0}
                          tick={{ fill: "#3b82f6", fontSize: 12 }}
                        />
                        <YAxis
                          yAxisId="left"
                          label={{ value: "Level", angle: -90, position: "insideLeft", fill: "#3b82f6" }}
                          tick={{ fill: "#3b82f6" }}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          label={{ value: "Problems", angle: 90, position: "insideRight", fill: "#10b981" }}
                          tick={{ fill: "#10b981" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="level"
                          stroke="#3b82f6"
                          activeDot={{ r: 8, fill: "#3b82f6", stroke: "#fff" }}
                          strokeWidth={3}
                          name="Level"
                          dot={{ stroke: "#3b82f6", strokeWidth: 2, r: 4, fill: "#fff" }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="problemsSolved"
                          stroke="#10b981"
                          strokeWidth={3}
                          name="Problems Solved"
                          dot={{ stroke: "#10b981", strokeWidth: 2, r: 4, fill: "#fff" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard table */}
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                <CardTitle className="flex items-center">
                  <Medal className="mr-2" /> Coding Challenge Leaderboard
                </CardTitle>
                <CardDescription className="text-indigo-100">Top 10 participants ranked by score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b-2 border-indigo-100 bg-indigo-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                          Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                          Level
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                          Problems Solved
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-indigo-100">
                      {codingLeaderboard.map((user, index) => (
                        <tr
                          key={index}
                          className={`${index < 3 ? "bg-indigo-50" : ""} hover:bg-blue-50 transition-colors`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {index === 0 && <Badge rank={1} className="mr-1" />}
                              {index === 1 && <Badge rank={2} className="mr-1" />}
                              {index === 2 && <Badge rank={3} className="mr-1" />}
                              {index > 2 && <span className="font-semibold text-gray-600">{index + 1}</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-indigo-600 font-bold">{user.score}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="relative w-full max-w-[100px]">
                                <ProgressBar value={user.level} max={10} color="bg-blue-500" />
                                <span className="absolute top-0 right-0 -mt-6 text-xs font-semibold text-blue-700">
                                  Lv.{user.level}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {user.problemsSolved}
                            </span>
                            {user.name === topProblemSolver?.name && (
                              <span className="ml-2 text-green-500">
                                <Trophy />
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* AI Mock Test Results Content */}
      {error ? (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center">
              <Brain className="mr-2 text-blue-500" /> AI Mock Test Results
            </h2>
          </div>

          {/* Top Quiz Performers */}
          {topQuizScorer && topCorrectAnswers && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card className="border-l-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardTitle className="text-blue-800 flex items-center">
                    <Trophy className="mr-2" /> Top Quiz Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <Badge rank={1} className="mr-3" />
                    <div>
                      <h4 className="font-bold text-lg">{topQuizScorer.name}</h4>
                      <p className="text-sm text-gray-500">Topics: {topQuizScorer.topics}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Score</span>
                      <span className="text-sm font-bold text-blue-600">{topQuizScorer.score}%</span>
                    </div>
                    <ProgressBar value={topQuizScorer.score} max={100} color="bg-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                  <CardTitle className="text-green-800 flex items-center">
                    <CheckCircle className="mr-2" /> Most Correct Answers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <Badge rank={1} className="mr-3" />
                    <div>
                      <h4 className="font-bold text-lg">{topCorrectAnswers.name}</h4>
                      <p className="text-sm text-gray-500">Score: {topCorrectAnswers.score}%</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Correct Answers</span>
                      <span className="text-sm font-bold text-green-600">{topCorrectAnswers.correct}</span>
                    </div>
                    <ProgressBar
                      value={topCorrectAnswers.correct}
                      max={topCorrectAnswers.correct + topCorrectAnswers.incorrect + topCorrectAnswers.skipped}
                      color="bg-green-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Parth's Results (if available) */}
          {parthData && (
            <Card className="mb-8 border-t-4 border-blue-500 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-200">
                <CardTitle className="text-blue-800 flex items-center">
                  <Star className="mr-2" /> {parthData.name}'s Performance Dashboard
                </CardTitle>
                <CardDescription>
                  Score: {parthData.score}% | Topics: {parthData.topics}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-700">Performance Breakdown</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={preparePieData(parthData)}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                          >
                            {preparePieData(parthData).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-700">Skill Radar</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={90} data={radarData}>
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: "#3b82f6" }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar name="Performance" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-center mb-2">
                      <CheckCircle className="mr-1 text-green-500" />{" "}
                      <span className="font-medium text-green-700">Correct</span>
                    </div>
                    <p className="text-3xl font-bold text-green-600">{parthData.correct}</p>
                    <ProgressBar
                      value={parthData.correct}
                      max={parthData.correct + parthData.incorrect + parthData.skipped}
                      className="mt-2"
                      color="bg-green-500"
                    />
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-center mb-2">
                      <XCircle className="mr-1 text-red-500" />{" "}
                      <span className="font-medium text-red-700">Incorrect</span>
                    </div>
                    <p className="text-3xl font-bold text-red-600">{parthData.incorrect}</p>
                    <ProgressBar
                      value={parthData.incorrect}
                      max={parthData.correct + parthData.incorrect + parthData.skipped}
                      className="mt-2"
                      color="bg-red-500"
                    />
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-center mb-2">
                      <SkipForward className="mr-1 text-yellow-500" />{" "}
                      <span className="font-medium text-yellow-700">Skipped</span>
                    </div>
                    <p className="text-3xl font-bold text-yellow-600">{parthData.skipped}</p>
                    <ProgressBar
                      value={parthData.skipped}
                      max={parthData.correct + parthData.incorrect + parthData.skipped}
                      className="mt-2"
                      color="bg-yellow-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Mock Test Participants */}
          <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
            <Fire className="mr-2" /> AI Mock Test Leaderboard
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherUsersData.map((user, index) => (
              <Card key={index} className="border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                  <div className="flex justify-between items-center">
                    <CardTitle>{user.name}</CardTitle>
                    <Badge rank={index + 1} />
                  </div>
                  <CardDescription>
                    Score: {user.score}% | {user.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={formatUserBarData(user)} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
                        <YAxis domain={[0, "dataMax"]} tick={{ fill: "#6b7280" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {formatUserBarData(user).map((entry) => (
                            <Cell key={entry.name} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-green-50 p-2 rounded-lg border border-green-100">
                      <p className="text-xs text-green-700 font-medium">Correct</p>
                      <p className="text-green-700 font-bold">{user.correct}</p>
                    </div>
                    <div className="bg-red-50 p-2 rounded-lg border border-red-100">
                      <p className="text-xs text-red-700 font-medium">Incorrect</p>
                      <p className="text-red-700 font-bold">{user.incorrect}</p>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded-lg border border-yellow-100">
                      <p className="text-xs text-yellow-700 font-medium">Skipped</p>
                      <p className="text-yellow-700 font-bold">{user.skipped}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default QuizLeaderboard

