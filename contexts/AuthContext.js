import React, { createContext, useEffect, useState, useContext } from 'react';
import { getUser, signIn, signUp } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const signInFunc = async (email, password) => {
        const data = await signIn(email, password)
        await getUser(data.token).then((res) => setCurrentUser(res))
    }

    const signUpFunc = async (email, username, password) =>{
        const data = await signUp(email, username, password)
        await getUser(data.token).then((res) => setCurrentUser(res))
    }

    const logOut = async () => {
        AsyncStorage.removeItem('token');
        setCurrentUser(null);
    };

    useEffect(() =>{
      const loadUser = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (token) {
            await getUser(token).then((res) => setCurrentUser(res))
            .catch((err) => {
              console.error('Error loading user:', err);
              setCurrentUser(null);
            });
          }
        } catch (error) {
          console.error('Error loading user:', error);
          setCurrentUser(null);
        }
      };
    
      loadUser();
    }, [])

    const authInfo = {currentUser, signInFunc, signUpFunc, logOut}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};