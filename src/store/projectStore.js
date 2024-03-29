/* eslint-disable no-undef */
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

  projectRequestById: async (id) => {
    try {
      const token = getToken(); // Get the token from cookies
      const response = await axios.get(`${BASE_URL}/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
      });
      set({ project: response.data.data });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  },



  projectDeleteByID : async (id) => {
    try {
      const token = getToken();
      await axios.delete(`${BASE_URL}/project-delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refetch the list of projects after deletion
      projectRequest();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  },

  

  
   createProject: async (projectData) => {
      try {
          const token = getToken();
          const response = await axios.post(`${BASE_URL}/create-project`, projectData, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          })
          return response.data; 
      }
      catch (error) {
          console.error('Error creating project:', error);
      }
  },

  searchKeyword: async (keyword) => {
    try {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}/projects?keyword=${keyword}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ project: response.data.data });
    } catch (error) {
      console.error('Error searching projects:', error);
    }
  },



  // update project
  updateProject: async (id, projectData) => {
    try {
      const token = getToken();
      const response = await axios.post(`${BASE_URL}/project-update/${id}`, projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error updating project:', error);
    }
  },

}));

export default projectStore;  
