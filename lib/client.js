// lib/client.js
/**
 * Fetches user data from the API
 * @param {string} username - The user's name
 * @returns {Promise<Object|null>} - The user data or null if not found
 */
export async function fetchUserData(username) {
    try {
      const response = await fetch(`/api/getuser?name=${encodeURIComponent(username)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null; // User not found
        }
        throw new Error(`API error: ${response.status}`);
      }
      
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
  
  /**
   * Saves user progress to the API
   * @param {Object} userData - The user data to save
   * @returns {Promise<Object>} - The saved user data
   */
  export async function saveUserProgress(userData) {
    try {
      const response = await fetch('/api/save-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error('Error saving user progress:', error);
      throw error;
    }
  }
  
  /**
   * Gets the leaderboard data
   * @param {number} limit - Number of top users to fetch
   * @returns {Promise<Array>} - The leaderboard data
   */
  export async function getLeaderboard(limit = 10) {
    try {
      const response = await fetch(`/api/leaderboard?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  }