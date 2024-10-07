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


// Fetching all users
export async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/users/users'); // כתובת ה-API שלך
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}


// Login
export const checkEmail = async ({ email }: { email: string }) => {
  try {
      const response = await fetch('http://localhost:3000/api/users/checkEmail', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
      });

      const result = await response.json();
      return result;
  } catch (error) {
      console.error('Error in checkEmail:', error);
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
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  };