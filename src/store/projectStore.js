import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8000/api/v1';

// Define token management functions
const setToken = (token) => {
  Cookies.set('token', token, { expires: 1 });
};

const getToken = () => {
  return Cookies.get('token');
};

const clearToken = () => {
  Cookies.remove('token');
};

const projectStore = create((set) => ({
  // Token management functions
  setToken,
  getToken,
  clearToken,

  project: [],

  projectRequest: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/project`);
      set({ project: response.data.data });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  },
}));

export default projectStore;
