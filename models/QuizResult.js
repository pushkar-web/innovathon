// models/QuizResult.js
import mongoose from 'mongoose';

const QuizResultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    unique: true // Make name field unique
  },
  topics: {
    type: [String],
    required: [true, 'Please provide at least one topic'],
  },
  score: {
    type: Number,
    required: [true, 'Please provide a score'],
  },
  correctAnswers: {
    type: Number,
    required: [true, 'Please provide number of correct answers'],
  },
  incorrectAnswers: {
    type: Number,
    required: [true, 'Please provide number of incorrect answers'],
  },
  skipped: {
    type: Number,
    required: [true, 'Please provide number of skipped questions'],
  },
  timeTaken: {
    type: Number,
    required: [true, 'Please provide time taken'],
  },
  totalQuestions: {
    type: Number,
    required: [true, 'Please provide total questions'],
  },
  points: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Check if the model already exists before creating a new one
// This is important for Next.js hot-reloading in development
const QuizResult = mongoose.models.QuizResult || mongoose.model('QuizResult', QuizResultSchema);

export default QuizResult;