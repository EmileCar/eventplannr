import AsyncStorage from '@react-native-async-storage/async-storage';
import environment from '../environment.json';

const API_BASE_URL = environment.apiBaseUrlDevelopment;

export const signIn = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    AsyncStorage.setItem('token', data.token);

    return data;
  } catch (error) {
    console.error('SignIn Error:', error.message);
    throw error;
  }
};

export const signUp = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    AsyncStorage.setItem('token', data.token);

    return data;
  } catch (error) {
    console.error('SignUp Error:', error.message);
    throw error;
  }
};

export const signOut = async () => {
  try {
    // Implement your logout logic using JWT
    // Clear the saved token from secure storage or state
    // Example using React Native Async Storage
    // AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('SignOut Error:', error.message);
    throw error;
  }
};

export const getUser = async (jwtToken) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/user`, {
            method: 'POST',
            headers: {
            "Content-Type": "text/plain",
            },
            body: jwtToken,
        });
    
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('GetUser Error:', error.message);
        throw error;
    }
    }