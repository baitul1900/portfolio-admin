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

const commentStore = create((set) => ({
  // Token management functions
  setToken,
  getToken,
  clearToken,

  comment: [],

  commentRquest: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/comments`);
      set({ comment: response.data.data });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  },

  toggleApproval: async (id) => {
    try {
      const token = getToken(); // Assuming you have a function to get the token
      if (!token) {
        console.error('No token found. User is not authenticated.');
        return;
      }

      await axios.post(`${BASE_URL}/approve-comment/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the approved status locally for immediate UI update
      set((state) => ({
        comment: state.comment.map((c) =>
          c._id === id ? { ...c, approved: !c.approved } : c
        ),
      }));
    } catch (error) {
      console.error('Error toggling approval status:', error);
    }
  },

  commentDeleteByID : async (id) => {
    try {
      const token = getToken();
      await axios.delete(`${BASE_URL}/delete-comment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refetch the list of projects after deletion
      commentRquest();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  },
  

}));

export default commentStore;  
