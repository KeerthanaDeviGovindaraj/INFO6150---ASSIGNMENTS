import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        username,
        password
      });
      
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Invalid credentials');
      } else if (error.request) {
        throw new Error('Cannot connect to server. Make sure backend is running on port 3000.');
      } else {
        throw new Error(error.message);
      }
    }
  }
};