import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

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
  }
};