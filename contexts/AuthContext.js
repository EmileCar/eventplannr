import React, { createContext, useEffect, useState, useContext } from 'react';
import { getUser, signIn, signUp } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const signInFunc = async (email, password) => {
        signIn(email, password).then((res) => {
            console.log(res)
            setCurrentUser(res)
        })
    }

    const signUpFunc = async (email, password) =>{
        signUp(email, password).then((res) => {
            console.log(res)
            setCurrentUser(res)
        })
    }

    const logOut = async () => {
        console.log("logout")
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