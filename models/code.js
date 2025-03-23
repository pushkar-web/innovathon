// models/Code.js
import mongoose from 'mongoose';

const CodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  solvedProblems: {
    type: [Number],
    default: [],
  },
  level: {
    type: Number,
    default: 1,
  },
  levelProgress: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a method to calculate level and progress based on score
CodeSchema.methods.calculateLevelAndProgress = function() {
  // Level thresholds - each level requires more points than the previous one
  const levelThresholds = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];
  
  let level = 0;
  while (level < levelThresholds.length - 1 && this.score >= levelThresholds[level + 1]) {
    level++;
  }
  
  // Calculate progress percentage within the current level
  const currentLevelMin = levelThresholds[level];
  const nextLevelMin = levelThresholds[level + 1] || (currentLevelMin * 1.5);
  const progress = ((this.score - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
  
  // Update user's level and progress
  this.level = level + 1;
  this.levelProgress = Math.min(progress, 100);
  
  return {
    level: this.level,
    progress: this.levelProgress
  };
};

// Create model only if it doesn't exist already (prevents overwriting model in hot reload)
const Code = mongoose.models.Code || mongoose.model('Code', CodeSchema);

export default Code;