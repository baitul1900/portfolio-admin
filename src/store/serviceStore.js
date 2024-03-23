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

const serviceStore = create((set) => ({
  // Token management functions
  setToken,
  getToken,
  clearToken,

  serviceList: [],

  serviceRequestList: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/service`);
      set({ serviceList: res.data.data });
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  },


  serviceRequestById: async (id) => {
    try {
      const token = getToken(); // Get the token from cookies
      const response = await axios.get(`${BASE_URL}/service/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
      });
      set((state) => ({
        serviceList: Array.isArray(response.data.data) ? response.data.data : [response.data.data]
      }));
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  },

  createService: async (serviceData) => {
    try {
        const token = getToken();
        const response = await axios.post(`${BASE_URL}/create-service`, serviceData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data.data; 
    }
    catch (error) {
        console.error('Error creating project:', error);
    }
},

  updateService: async (id, serviceData) => {
    try {
      const token = getToken();
      const response = await axios.post(`${BASE_URL}/service-update/${id}`, serviceData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error updating service:', error);
    }
  }
  

}));

export default serviceStore;  
