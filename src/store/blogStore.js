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

const blogStore = create((set) => ({
  // Token management functions
  setToken,
  getToken,
  clearToken,

  blogList: [],

  blogRequest: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/blog`);
      set({ blogList: response.data.data });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  },

  blogRequestById: async (id) => {
    try {
      const token = getToken(); // Get the token from cookies
      const response = await axios.get(`${BASE_URL}/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
      });
      set({ blogList: response.data.data });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  },



  blogDeleteByID : async (id) => {
    try {
      const token = getToken();
      await axios.delete(`${BASE_URL}/blog-delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refetch the list of projects after deletion
      blogRequest();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  },

  

  
   createBlog: async (blogData) => {
      try {
          const token = getToken();
          const response = await axios.post(`${BASE_URL}/create-blog`, blogData, {
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

  



  // update project
  updateBlog: async (id, blogData) => {
    try {
      const token = getToken();
      const response = await axios.post(`${BASE_URL}/blog-update/${id}`, blogData, {
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

export default blogStore;  
