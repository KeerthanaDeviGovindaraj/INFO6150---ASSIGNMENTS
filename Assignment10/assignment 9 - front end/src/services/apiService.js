import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiService = {
  loginUser: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      }
      throw new Error('Cannot connect to server');
    }
  },

  getCompanyImages: async () => {
    try {
      const response = await axios.get(`${API_URL}/companies/images`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch images');
      } else if (error.request) {
        throw new Error('Cannot connect to server');
      } else {
        throw new Error(error.message);
      }
    }
  },
  
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch users');
      }
      throw new Error('Cannot connect to server');
    }
  },

  createJob: async (jobData) => {
    try {
      const response = await axios.post(`${API_URL}/create/job`, jobData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to create job');
      }
      throw new Error('Cannot connect to server');
    }
  },

  getAllJobs: async () => {
    try {
      const response = await axios.get(`${API_URL}/jobs`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch jobs');
      }
      throw new Error('Cannot connect to server');
    }
  },
};