/* eslint-disable no-useless-catch */
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8000/api/v1';

// Function to register a user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user-registration`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to register user');
  }
};

// Function to verify OTP
export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.get(`${BASE_URL}/verify-otp/${email}/${otp}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to verify OTP');
  }
};


export const loginUser = async (email, password) => {
  try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      const token = response.data.token;
      
      // Store the token in session storage
      sessionStorage.setItem('token', token);

      console.log('Token:', token);
      
      // Store the token in a cookie
      Cookies.set('token', token, { expires: 1 }); // Adjust expiry date as needed
      
      return { status: 'success', message: 'Login successful' };
  } catch (error) {
      throw new Error('Failed to login');
  }
};





export const getUserProfile = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
};
  
  
export const updateUserProfile = async (password, image) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.post(
      `${BASE_URL}/updateProfile`,
      { password, image },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to update profile');
  }
};  
  
export const brandList = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/brandList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to update profile');
  }
};


export const createBrand = async (brand) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/create-brand`, brand, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to update profile');
  }
};

// Assuming you have imported Axios and set up the baseURL

export const updateBrand = async (id, data) => {
  try {
    const token = Cookies.get("token"); // Get the authorization token
    const response = await axios.post(`${BASE_URL}/brand/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the authorization token in the headers
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBrandById = async (id) => {
  try {
    const token = Cookies.get('token'); // Get the token from cookies
    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the request headers
    };
    const response = await axios.get(`${BASE_URL}/getbrand/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching brand by ID:', error);
    throw error;
  }
};


export const deleteBrand = async (id) => {
  try {
    // Get the token from cookies
    const token = Cookies.get("token");

    // Set the headers with authorization token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make the DELETE request to the backend API
    const response = await axios.get(`${BASE_URL}/deleteBrand/${id}`, { headers });

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors
    throw error;
  }
};


// catergory api here



export const createCategory = async (category) => {
  try {
    const token = sessionStorage.getItem('token');
const response = await axios.post(`${BASE_URL}/create-category`, category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to update profile');
  }
};


export const categoryList = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to get category');
  }
};


export const updateCategory = async (id, data) => {
  try {
    const token = Cookies.get("token"); // Get the authorization token
    const response = await axios.post(`${BASE_URL}/category-update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the authorization token in the headers
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    // Get the token from cookies
    const token = Cookies.get("token");

    // Set the headers with authorization token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make the DELETE request to the backend API
    const response = await axios.get(`${BASE_URL}/category-delete/${id}`, { headers });

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors
    throw error;
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const token = Cookies.get('token'); // Get the token from cookies
    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the request headers
    };
    const response = await axios.get(`${BASE_URL}/getByCategory/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching brand by ID:', error);
    throw error;
  }
};
// catergory api here


// all product her =============
export const productList = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return response.data;
  }
  catch (e) {
    console.log(e)
  }
}

export const productByBrand = async (brandID)=> {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/product-brand/${brandID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
      });

      return response.data;
  }
  catch (e) {
    console.log(e)
  }
}


export const productListByCategory  = async (categoryID)=> {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/product-category/${categoryID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
      });

      return response.data;
  }
  catch (e) {
    console.log(e)
  }
}


export const createProduct = async (formData)=> {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/create-product/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
      });

      return response.data;
  }
  catch (e) {
    console.log(e)
  }
}


export const updateProduct = async (id, data)=> {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/products/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
      });
      return response.data;
  }
  catch (e) {
    console.log(e)
  }
}


export const deleteProduct = async (id) => {
  try {
    // Get the token from cookies
    const token = Cookies.get("token");

    // Set the headers with authorization token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make the DELETE request to the backend API
    const response = await axios.delete(`${BASE_URL}/products/${id}`, { headers });

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors
    throw error;
  }
};