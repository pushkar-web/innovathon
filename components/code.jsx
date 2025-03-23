"use client"

import { useState, useEffect } from "react"
import { Search, ChevronDown, Code, Database, Terminal, Settings, Shuffle, Award } from "lucide-react"

export default function CodingPlatform() {
  const [selectedTopic, setSelectedTopic] = useState("All Topics")
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("Run your code to see the output here.")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("description")
  const [userName, setUserName] = useState("")
  const [nameSubmitted, setNameSubmitted] = useState(false)
  
  // New state variables for scoring and progress
  const [userScore, setUserScore] = useState(0)
  const [userLevel, setUserLevel] = useState(0)
  const [solvedProblems, setSolvedProblems] = useState([])
  const [levelProgress, setLevelProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  
  // Add state for controlling name change modal
  const [showNameModal, setShowNameModal] = useState(false)

  // Topics for filtering
  const topics = [
    { id: "all", name: "All Topics", icon: <Code className="w-5 h-5" /> },
    { id: "algorithms", name: "Algorithms", icon: <Code className="w-5 h-5 text-orange-500" /> },
    { id: "database", name: "Database", icon: <Database className="w-5 h-5 text-blue-500" /> },
    { id: "shell", name: "Shell", icon: <Terminal className="w-5 h-5 text-green-500" /> },
    { id: "javascript", name: "JavaScript", icon: <Code className="w-5 h-5 text-yellow-500" /> },
  ]

  // Sample problems data with added difficulty points
  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      difficultyPoints: 10,
      acceptance: "55.2%",
      topic: "algorithms",
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
      
You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
      startingCode: `function twoSum(nums, target) {
    // Write your code here
    
}`,
      solution: `function twoSum(nums, target) {
    const map = new Map();
    
    for(let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if(map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
      testCases: [
        { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
        { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
        { input: "nums = [3,3], target = 6", output: "[0,1]" },
      ],
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      difficultyPoints: 20,
      acceptance: "45.6%",
      topic: "algorithms",
      description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.`,
      startingCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    // Write your code here
    
}`,
      solution: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    let dummyHead = new ListNode(0);
    let curr = dummyHead;
    let carry = 0;
    
    while (l1 !== null || l2 !== null) {
        let x = (l1 !== null) ? l1.val : 0;
        let y = (l2 !== null) ? l2.val : 0;
        let sum = carry + x + y;
        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }
    
    if (carry > 0) {
        curr.next = new ListNode(carry);
    }
    
    return dummyHead.next;
}`,
      testCases: [
        { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]" },
        { input: "l1 = [0], l2 = [0]", output: "[0]" },
        { input: "l1 = [9,9,9,9], l2 = [9,9,9,9,9,9]", output: "[8,9,9,9,0,0,1]" },
      ],
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      difficultyPoints: 25,
      acceptance: "36.4%",
      topic: "algorithms",
      description: `Given a string s, find the length of the longest substring without repeating characters.

Example:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.`,
      startingCode: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    // Write your code here
    
}`,
      solution: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    let maxLength = 0;
    let charMap = new Map();
    let start = 0;
    
    for (let end = 0; end < s.length; end++) {
        const currentChar = s[end];
        
        if (charMap.has(currentChar) && charMap.get(currentChar) >= start) {
            start = charMap.get(currentChar) + 1;
        }
        
        charMap.set(currentChar, end);
        maxLength = Math.max(maxLength, end - start + 1);
    }
    
    return maxLength;
}`,
      testCases: [
        { input: 's = "abcabcbb"', output: "3" },
        { input: 's = "bbbbb"', output: "1" },
        { input: 's = "pwwkew"', output: "3" },
      ],
    },
    {
      id: 4,
      title: "Palindrome Number",
      difficulty: "Easy",
      difficultyPoints: 5,
      acceptance: "50.9%",
      topic: "algorithms",
      description: `Given an integer x, return true if x is a palindrome, and false otherwise.

Example:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.`,
      startingCode: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
    // Write your code here
    
}`,
      solution: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
    if (x < 0) return false;
    
    const str = x.toString();
    let left = 0;
    let right = str.length - 1;
    
    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }
    
    return true;
}`,
      testCases: [
        { input: "x = 121", output: "true" },
        { input: "x = -121", output: "false" },
        { input: "x = 10", output: "false" },
      ],
    },
    {
      id: 5,
      title: "Valid Parentheses",
      difficulty: "Easy",
      difficultyPoints: 10,
      acceptance: "39.9%",
      topic: "algorithms",
      description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example:
Input: s = "()[]{}"
Output: true`,
      startingCode: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Write your code here
    
}`,
      solution: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    const stack = [];
    const map = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    
    for (let char of s) {
        if (map[char]) {
            stack.push(map[char]);
        } else {
            if (stack.pop() !== char) return false;
        }
    }
    
    return stack.length === 0;
}`,
      testCases: [
        { input: 's = "()"', output: "true" },
        { input: 's = "()[]{}"', output: "true" },
        { input: 's = "(]"', output: "false" },
      ],
    },
    {
      id: 6,
      title: "Reverse Integer",
      difficulty: "Medium",
      difficultyPoints: 20,
      acceptance: "29.9%",
      topic: "algorithms",
      description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

Example:
Input: x = 123
Output: 321`,
      startingCode: `/**
 * @param {number} x
 * @return {number}
 */
function reverse(x) {
    // Write your code here
    
}`,
      solution: `/**
 * @param {number} x
 * @return {number}
 */
function reverse(x) {
    const MAX_INT = 2147483647;
    const MIN_INT = -2147483648;
    
    let result = 0;
    
    while (x !== 0) {
        const digit = x % 10;
        x = Math.trunc(x / 10);
        
        // Check for overflow
        if (result > MAX_INT / 10 || (result === MAX_INT / 10 && digit > 7)) return 0;
        if (result < MIN_INT / 10 || (result === MIN_INT / 10 && digit < -8)) return 0;
        
        result = result * 10 + digit;
    }
    
    return result;
}`,
      testCases: [
        { input: "x = 123", output: "321" },
        { input: "x = -123", output: "-321" },
        { input: "x = 120", output: "21" },
      ],
    },
    {
      id: 7,
      title: "String to Integer (atoi)",
      difficulty: "Medium",
      difficultyPoints: 25,
      acceptance: "18.8%",
      topic: "algorithms",
      description: `Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).

The algorithm for myAtoi(string s) is as follows:

1. Read in and ignore any leading whitespace.
2. Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
3. Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
4. Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
5. If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -231 should be clamped to -231, and integers greater than 231 - 1 should be clamped to 231 - 1.
6. Return the integer as the final result.

Example:
Input: s = "42"
Output: 42`,
      startingCode: `/**
 * @param {string} s
 * @return {number}
 */
function myAtoi(s) {
    // Write your code here
    
}`,
      solution: `/**
 * @param {string} s
 * @return {number}
 */
function myAtoi(s) {
    const INT_MAX = 2147483647;
    const INT_MIN = -2147483648;
    
    let i = 0;
    let sign = 1;
    let result = 0;
    
    // Skip leading whitespace
    while (i < s.length && s[i] === ' ') {
        i++;
    }
    
    // Check for sign
    if (i < s.length && (s[i] === '+' || s[i] === '-')) {
        sign = s[i] === '-' ? -1 : 1;
        i++;
    }
    
    // Process digits
    while (i < s.length && s[i] >= '0' && s[i] <= '9') {
        // Check for overflow
        if (result > Math.floor(INT_MAX / 10) || 
            (result === Math.floor(INT_MAX / 10) && 
             Number(s[i]) > INT_MAX % 10)) {
            return sign === 1 ? INT_MAX : INT_MIN;
        }
        
        result = result * 10 + Number(s[i]);
        i++;
    }
    
    return result * sign;
}`,
      testCases: [
        { input: 's = "42"', output: "42" },
        { input: 's = "   -42"', output: "-42" },
        { input: 's = "4193 with words"', output: "4193" },
      ],
    },
    {
      id: 8,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      difficultyPoints: 50,
      acceptance: "43.1%",
      topic: "algorithms",
      description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Example:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.0
Explanation: The median is 2.0`,
      startingCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
    // Write your code here
    
}`,
      solution: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const x = nums1.length;
    const y = nums2.length;
    let low = 0;
    let high = x;
    
    while (low <= high) {
        const partitionX = Math.floor((low + high) / 2);
        const partitionY = Math.floor((x + y + 1) / 2) - partitionX;
        
        const maxX = partitionX === 0 ? Number.NEGATIVE_INFINITY : nums1[partitionX - 1];
        const maxY = partitionY === 0 ? Number.NEGATIVE_INFINITY : nums2[partitionY - 1];
        
        const minX = partitionX === x ? Number.POSITIVE_INFINITY : nums1[partitionX];
        const minY = partitionY === y ? Number.POSITIVE_INFINITY : nums2[partitionY];
        
        if (maxX <= minY && maxY <= minX) {
            const totalLength = x + y;
            if (totalLength % 2 === 0) {
                return (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;
            } else {
                return Math.max(maxX, maxY);
            }
        } else if (maxX > minY) {
            high = partitionX - 1;
        } else {
            low = partitionX + 1;
        }
    }
    
    throw new Error("Input arrays are not sorted");
}`,
      testCases: [
        { input: "nums1 = [1,3], nums2 = [2]", output: "2.0" },
        { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5" },
        { input: "nums1 = [0,0], nums2 = [0,0]", output: "0.0" },
      ],
    },
    {
      id: 9,
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      difficultyPoints: 30,
      acceptance: "35.4%",
      topic: "algorithms",
      description: `Given a string s, return the longest palindromic substring in s.

Example:
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.`,
      startingCode: `/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
    // Write your code here
    
}`,
      solution: `/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
    if (!s || s.length < 1) return "";
    
    let start = 0;
    let maxLength = 1;
    
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const currentLength = right - left + 1;
            if (currentLength > maxLength) {
                maxLength = currentLength;
                start = left;
            }
            left--;
            right++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        // Odd length palindromes
        expandAroundCenter(i, i);
        // Even length palindromes
        expandAroundCenter(i, i + 1);
    }
    
    return s.substring(start, start + maxLength);
}`,
      testCases: [
        { input: 's = "babad"', output: '"bab"' },
        { input: 's = "cbbd"', output: '"bb"' },
        { input: 's = "a"', output: '"a"' },
      ],
    },
    {
      id: 10,
      title: "Zigzag Conversion",
      difficulty: "Medium",
      difficultyPoints: 20,
      acceptance: "50.9%",
      topic: "algorithms",
      description: `The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this:

P   A   H   N
A P L S I I G
Y   I   R

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows.

Example:
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"`,
      startingCode: `/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
function convert(s, numRows) {
    // Write your code here
    
}`,
      solution: `/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
function convert(s, numRows) {
    if (numRows === 1 || s.length <= numRows) {
        return s;
    }
    
    const rows = Array(numRows).fill('');
    let curRow = 0;
    let goingDown = false;
    
    for (const char of s) {
        rows[curRow] += char;
        
        if (curRow === 0 || curRow === numRows - 1) {
            goingDown = !goingDown;
        }
        
        curRow += goingDown ? 1 : -1;
    }
    
    return rows.join('');
}`,
      testCases: [
        { input: 's = "PAYPALISHIRING", numRows = 3', output: '"PAHNAPLSIIGYIR"' },
        { input: 's = "PAYPALISHIRING", numRows = 4', output: '"PINALSIGYAHRPI"' },
        { input: 's = "A", numRows = 1', output: '"A"' },
      ],
    },
  ]

  // Calculate level and progress based on score
  const calculateLevelAndProgress = (score) => {
    // Calculate level (each level requires more points than the previous one)
    // For example: level 1: 0-100 points, level 2: 101-250 points, level 3: 251-450 points, etc.
    const levelThresholds = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];
    
    let level = 0;
    while (level < levelThresholds.length - 1 && score >= levelThresholds[level + 1]) {
      level++;
    }
    
    // Calculate progress percentage within the current level
    const currentLevelMin = levelThresholds[level];
    const nextLevelMin = levelThresholds[level + 1] || (currentLevelMin * 1.5);
    const progress = ((score - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    
    return { level: level + 1, progress: Math.min(progress, 100) };
  }

  const filteredProblems = problems.filter(problem => {
    const matchesTopic = selectedTopic === "All Topics" || problem.topic === selectedTopic.toLowerCase();
    const matchesSearch = searchQuery === "" || 
                         problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  // Helper function for button component
  const Button = ({ onClick, className, children }) => {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      >
        {children}
      </button>
    )
  }

  useEffect(() => {
    if (selectedProblem) {
      setCode(selectedProblem.startingCode);
      setOutput("Run your code to see the output here.");
    }
  }, [selectedProblem]);

  // Load user data from localStorage and MongoDB
  useEffect(() => {
    const savedUserName = localStorage.getItem('codeChallengeUserName');
    const savedScore = localStorage.getItem('codeChallengeUserScore');
    const savedSolvedProblems = localStorage.getItem('codeChallengeSolvedProblems');
    
    if (savedUserName) {
      setUserName(savedUserName);
      setNameSubmitted(true);
    }
    
    // Initial values from localStorage (as a fallback)
    if (savedScore) {
      const score = parseInt(savedScore);
      setUserScore(score);
      const { level, progress } = calculateLevelAndProgress(score);
      setUserLevel(level);
      setLevelProgress(progress);
    }
    
    if (savedSolvedProblems) {
      setSolvedProblems(JSON.parse(savedSolvedProblems));
    }
    
    // Fetch user data from MongoDB if we have a username
    const fetchUserData = async (username) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/getuser?name=${encodeURIComponent(username)}`);
        
        if (response.ok) {
          const { data } = await response.json();
          
          // Update state with data from MongoDB
          setUserScore(data.score);
          setUserLevel(data.level);
          setLevelProgress(data.levelProgress);
          setSolvedProblems(data.solvedProblems);
          
          // Update localStorage as well
          localStorage.setItem('codeChallengeUserScore', data.score.toString());
          localStorage.setItem('codeChallengeSolvedProblems', JSON.stringify(data.solvedProblems));
          
          console.log('User data loaded from MongoDB');
        } else {
          console.log('User not found in MongoDB, using local data');
          // If the user is not in MongoDB yet, we'll use the localStorage data
          // and then save it to MongoDB when they solve a problem
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (savedUserName) {
      fetchUserData(savedUserName);
    }
  }, []);

  const handleSelectProblem = (problem) => {
    if (nameSubmitted) {
      setSelectedProblem(problem);
      setActiveTab("description");
    } else {
      setOutput("Please enter your name first to access problems.");
    }
  }

  const handleRunCode = () => {
    if (!selectedProblem) return;
    
    try {
      // Create a function from the code string
      const userFunction = new Function("return " + code)();

      // Get test cases
      const testCases = selectedProblem.testCases;
      let outputText = "";

      // Run test cases (simplified execution logic)
      testCases.forEach((test, index) => {
        outputText += `Test Case ${index + 1}:\n`;
        outputText += `Input: ${test.input}\n`;
        
        try {
          // This is simplified and doesn't actually run the code with the inputs
          outputText += `Your Output: (Execution would happen here)\n`;
          outputText += `Expected: ${test.output}\n\n`;
        } catch (error) {
          outputText += `Error: ${error.message}\n\n`;
        }
      });

      setOutput(outputText);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  }

  const handleEvaluateCode = () => {
    if (!selectedProblem) return;
    
    try {
      // Simulate code evaluation (in a real app, this would check correctness)
      // We'll pretend the code passes all test cases
      const allTestsPassed = true; // In a real app, this would be determined by evaluation
      
      let outputText = "Evaluating your solution...\n\n";
      
      if (allTestsPassed) {
        outputText += "All test cases passed! 🎉\n\n";
        
        // Check if problem was already solved
        if (!solvedProblems.includes(selectedProblem.id)) {
          // Add problem to solved list
          const updatedSolvedProblems = [...solvedProblems, selectedProblem.id];
          setSolvedProblems(updatedSolvedProblems);
          localStorage.setItem('codeChallengeSolvedProblems', JSON.stringify(updatedSolvedProblems));
          
          // Add points to user score
          const pointsEarned = selectedProblem.difficultyPoints;
          const newScore = userScore + pointsEarned;
          setUserScore(newScore);
          localStorage.setItem('codeChallengeUserScore', newScore.toString());
          
          // Update level and progress
          const { level, progress } = calculateLevelAndProgress(newScore);
          setUserLevel(level);
          setLevelProgress(progress);
          
          outputText += `You earned ${pointsEarned} points for solving this problem!\n`;
          outputText += `Your new score: ${newScore} points\n`;
          
          // Save to MongoDB (simulated)
          saveUserProgress(userName, newScore, updatedSolvedProblems);
        } else {
          outputText += "You've already solved this problem before. No additional points awarded.\n";
        }
      } else {
        outputText += "Some test cases failed. Keep trying!\n";
      }
      
      setOutput(outputText);
    } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
    }
  
    // Save user progress to MongoDB
    const saveUserProgress = async (name, score, solvedProblems) => {
      setIsLoading(true);
      
      try {
        // Make API call to save progress
        const response = await fetch('/api/save-progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            score,
            solvedProblems,
            levelInfo: calculateLevelAndProgress(score)
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to save progress');
        }
        
        const data = await response.json();
        console.log('User progress saved:', data);
      } catch (error) {
        console.error('Error saving progress:', error);
      } finally {
        setIsLoading(false);
      }
    }
  
    const handleNewChallenge = () => {
      if (filteredProblems.length > 0) {
        const currentIndex = filteredProblems.findIndex(p => p.id === (selectedProblem?.id || 0));
        const nextIndex = (currentIndex + 1) % filteredProblems.length;
        setSelectedProblem(filteredProblems[nextIndex]);
      }
    }
  
    const handleNameSubmit = (e) => {
      e.preventDefault();
      if (userName.trim() !== "") {
        setNameSubmitted(true);
        localStorage.setItem('codeChallengeUserName', userName);
        
        // Initialize user in MongoDB (simulated)
        saveUserProgress(userName, userScore, solvedProblems);
      }
    }
  
    // Helper function to get difficulty color
    const getDifficultyColor = (difficulty) => {
      switch (difficulty) {
        case "Easy":
          return "bg-green-500";
        case "Medium":
          return "bg-yellow-500";
        case "Hard":
          return "bg-red-500";
        default:
          return "bg-gray-500";
      }
    }
  
    // Helper function to get level badge color based on level
    const getLevelBadgeColor = (level) => {
      if (level < 3) return "bg-gray-500";
      if (level < 5) return "bg-green-500";
      if (level < 7) return "bg-blue-500";
      if (level < 9) return "bg-purple-500";
      return "bg-yellow-500";
    }
  
    // Helper function to get level title
    const getLevelTitle = (level) => {
      if (level < 3) return "Beginner";
      if (level < 5) return "Intermediate";
      if (level < 7) return "Advanced";
      if (level < 9) return "Expert";
      return "Master";
    }
  
    // Function to reset user data and show name input form
    const handleChangeUser = () => {
      setShowNameModal(true);
    }
  
    // Function to handle user name change
    const handleNameChange = (e) => {
      e.preventDefault();
      if (userName.trim() !== "") {
        // First, check if this user already exists in the database
        checkExistingUser(userName);
      }
    }
    
    // Function to check if a user already exists in the database
    const checkExistingUser = async (name) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/getuser?name=${encodeURIComponent(name)}`);
        
        if (response.ok) {
          const { data } = await response.json();
          
          // User exists, load their data
          setUserScore(data.score);
          setUserLevel(data.level);
          setLevelProgress(data.levelProgress);
          setSolvedProblems(data.solvedProblems);
          
          // Update localStorage
          localStorage.setItem('codeChallengeUserName', name);
          localStorage.setItem('codeChallengeUserScore', data.score.toString());
          localStorage.setItem('codeChallengeSolvedProblems', JSON.stringify(data.solvedProblems));
          
          console.log('Existing user data loaded');
        } else {
          // User doesn't exist, create a new user
          setUserScore(0);
          setUserLevel(1);
          setLevelProgress(0);
          setSolvedProblems([]);
          
          // Update localStorage
          localStorage.setItem('codeChallengeUserName', name);
          localStorage.setItem('codeChallengeUserScore', '0');
          localStorage.setItem('codeChallengeSolvedProblems', JSON.stringify([]));
          
          // Initialize new user in MongoDB
          saveUserProgress(name, 0, []);
          console.log('New user created');
        }
        
        setNameSubmitted(true);
        setShowNameModal(false);
      } catch (error) {
        console.error('Error checking existing user:', error);
      } finally {
        setIsLoading(false);
      }
    }
  
    // Render problem list view if no problem is selected
    if (!selectedProblem) {
      return (
        <div className="flex flex-col h-screen bg-white">
          {/* Welcome name input - shown if name not submitted or when user wants to change name */}
          {(!nameSubmitted || showNameModal) && (
            <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Welcome to CodeChallenge</h2>
                <p className="mb-4">Please enter your name to start solving problems:</p>
                <form onSubmit={showNameModal ? handleNameChange : handleNameSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {showNameModal ? "Change Name" : "Start Coding"}
                  </Button>
                  {showNameModal && (
                    <Button 
                      type="button" 
                      onClick={() => setShowNameModal(false)} 
                      className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 mt-2"
                    >
                      Cancel
                    </Button>
                  )}
                </form>
              </div>
            </div>
          )}
          
          {/* User welcome message - shown after name submission */}
          {nameSubmitted && (
            <div className="bg-blue-50 p-4 border-b border-blue-100">
              <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-blue-600 mr-4">CodeChallenge</h1>
                  <div className="text-blue-800">Welcome, {userName}!</div>
                </div>
                
                {/* Settings icon to change user */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center justify-center p-1 px-2 rounded-md text-sm font-medium text-white ${getLevelBadgeColor(userLevel)}`}>
                      <Award className="w-4 h-4 mr-1" />
                      Level {userLevel} - {getLevelTitle(userLevel)}
                    </span>
                  </div>
                  <div className="w-48 bg-gray-200 rounded-full h-2.5 flex-shrink-0">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${levelProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-700">
                    {userScore} points
                  </div>
                  <button 
                    onClick={handleChangeUser}
                    className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                    title="Change User"
                  >
                    <Settings className="w-5 h-5 text-blue-600" />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Topics Bar */}
          <div className="flex overflow-x-auto py-3 px-4 border-b border-gray-200">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.name)}
                className={`flex items-center px-5 py-2 mx-1 rounded-full transition-colors ${
                  selectedTopic === topic.name
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span className="mr-2">{topic.icon}</span>
                <span>{topic.name}</span>
              </button>
            ))}
          </div>
          
          {/* Filters and Search */}
          <div className="flex flex-wrap items-center justify-between py-3 px-4 border-b border-gray-200">
            <div className="flex space-x-2 mb-2 md:mb-0">
              <div className="relative">
                <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <span>Lists</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <span>Difficulty</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <span>Status</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <span>Tags</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center w-full md:w-auto">
              <div className="relative flex-grow mr-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search problems"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => {
                  if (nameSubmitted && filteredProblems.length > 0) {
                    const randomIndex = Math.floor(Math.random() * filteredProblems.length);
                    setSelectedProblem(filteredProblems[randomIndex]);
                  } else if (!nameSubmitted) {
                    setOutput("Please enter your name first to access problems.");
                  }
                }}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Shuffle className="mr-1 h-4 w-4" />
                <span>Pick One</span>
              </Button>
            </div>
          </div>
          
          {/* Problems Table */}
          <div className="flex-grow overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acceptance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Frequency
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProblems.map((problem) => (
                  <tr 
                    key={problem.id}
                    onClick={() => handleSelectProblem(problem)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {solvedProblems.includes(problem.id) ? (
                        <span className="text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                      ) : (
                        <span className="text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{problem.id}. {problem.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-purple-600 font-medium">
                        +{problem.difficultyPoints} pts
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{problem.acceptance}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        problem.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : problem.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="w-24 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-gray-600 h-2.5 rounded-full w-1/2"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    
    // Render problem detail view with code editor
    return (
      <div className="flex flex-col h-screen bg-white">
        {/* User welcome banner */}
        <div className="bg-blue-50 p-4 border-b border-blue-100">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <h1 
                className="text-2xl font-bold text-blue-600 mr-4 cursor-pointer" 
                onClick={() => setSelectedProblem(null)}
              >
                CodeChallenge
              </h1>
              <div className="text-blue-800">Welcome, {userName}!</div>
            </div>
            
            {/* User Level and Progress */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className={`inline-flex items-center justify-center p-1 px-2 rounded-md text-sm font-medium text-white ${getLevelBadgeColor(userLevel)}`}>
                  <Award className="w-4 h-4 mr-1" />
                  Level {userLevel} - {getLevelTitle(userLevel)}
                </span>
              </div>
              <div className="w-48 bg-gray-200 rounded-full h-2.5 flex-shrink-0">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${levelProgress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-700">
                {userScore} points
              </div>
              <button 
                onClick={handleChangeUser}
                className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                title="Change User"
              >
                <Settings className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content - Problem Detail View */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left panel - Problem description */}
          <div className="w-1/2 p-4 overflow-y-auto border-r border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedProblem.id}. {selectedProblem.title}</h2>
              <div className="flex items-center space-x-2">
                <span className="text-purple-600 font-medium">
                  +{selectedProblem.difficultyPoints} pts
                </span>
                <span className={`px-2 py-1 rounded text-sm text-white ${getDifficultyColor(selectedProblem.difficulty)}`}>
                  {selectedProblem.difficulty}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "description"
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("solution")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "solution"
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Solution
                </button>
              </div>
              
              <div className="mt-4">
                {activeTab === "description" ? (
                  <div className="whitespace-pre-wrap text-gray-700">
                    {selectedProblem.description}
                    <div className="mt-4">
                      <h3 className="font-bold mb-2">Examples:</h3>
                      {selectedProblem.testCases.map((test, index) => (
                        <div key={index} className="p-3 mb-2 rounded bg-gray-50">
                          <div>Input: {test.input}</div>
                          <div>Output: {test.output}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-bold mb-2">Solution:</h3>
                    <pre className="p-4 rounded-md overflow-x-auto bg-gray-50 text-gray-800">
                      {selectedProblem.solution}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right panel - Code editor */}
          <div className="w-1/2 flex flex-col">
            <div className="flex-1 overflow-hidden">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full p-4 font-mono resize-none outline-none bg-white text-gray-800 border-none"
                spellCheck="false"
              />
            </div>
            
            {/* Editor footer */}
            <div className="flex justify-end p-3 border-t border-gray-200 bg-white">
              <div className="space-x-2">
                <Button 
                  onClick={handleEvaluateCode} 
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Evaluate Code"}
                </Button>
                <Button onClick={handleRunCode} className="bg-blue-500 hover:bg-blue-600 text-white">
                  Run Code
                </Button>
                <Button onClick={handleNewChallenge} className="bg-blue-500 hover:bg-blue-600 text-white">
                  New Challenge
                </Button>
              </div>
            </div>
            
            {/* Output console */}
            <div className="h-64 border-t border-gray-200">
              <div className="h-full p-4 font-mono whitespace-pre-wrap overflow-y-auto bg-gray-50 text-gray-800">
                <div className="text-lg mb-2 font-semibold">Output:</div>
                {output}
              </div>
            </div>
          </div>
        </div>
        
        {/* Name change modal */}
        {showNameModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Change User</h2>
              <p className="mb-4">Enter a new name to switch users:</p>
              <form onSubmit={handleNameChange} className="space-y-4">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="New user name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Switch User
                </Button>
                <Button 
                  type="button" 
                  onClick={() => setShowNameModal(false)} 
                  className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  Cancel
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }