import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust to your Flask server URL

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true // For session handling
});

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  register: async (name, email, password) => {
    try {
      const response = await api.post('/register', { name, email, password });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  logout: async () => {
    try {
      const response = await api.get('/logout');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export const omrService = {
  uploadOMR: async (file, answerKey) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('question', answerKey);
      
      const response = await api.post('/upload-omr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'OMR processing failed');
      }
      
      return response.data;
    } catch (error) {
      console.error('OMR Service Error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        throw new Error(error.response.data.message || error.response.statusText || 'OMR processing failed');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request
        throw new Error(error.message || 'OMR processing failed');
      }
    }
  }
};

export const textEvaluationService = {
  evaluateText: async (file, question) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('question', question);
      
      const response = await api.post('/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};