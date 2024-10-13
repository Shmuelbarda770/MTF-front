import axios from 'axios';

// Adding new user
export const createUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
}) => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/createUser', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Fetching all users (function renamed to avoid duplication)
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/users/users');
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Login
export const checkEmail = async (userData: { email: string }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/login', userData);
    return response.data;
  } catch (error) {
    console.error('Error checking email:', error);
    throw error;
  }
};

// Updating user
export const updateUser = async (id: string, updatedData: {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  phoneNumber?: string;
}) => {
  try {
    const response = await axios.patch(`http://localhost:3000/api/users/updateUser/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Deleting user
export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/users/deleteUser/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Searching users (function renamed to avoid duplication)
export const searchUsers = async (searchCriteria: any) => {
  try {
    console.log()
    const response = await axios.post('http://localhost:3000/api/users/users/searchUsers', searchCriteria);
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export const checkToken = async (token:string) => {
    try {
        const response = await axios.post('http://localhost:3000/api/users/auth/google', { token });
        return response.data;
    } catch (error) {
        console.error('Error searching users:', error);
        throw error;
    }
};
