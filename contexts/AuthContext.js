import React, { createContext, useEffect, useState, useContext } from 'react';
import { getUser, signIn, signUp } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, Text } from 'react-native';
import themeStyle from '../styles/theme.style';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
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
        setIsLoading(false);
      };
    
      loadUser();
    }, [])

    const authInfo = {currentUser, signInFunc, signUpFunc, logOut}

    return (
        <AuthContext.Provider value={authInfo}>
          {isLoading ? (
            <View style={{alignItems: "center", justifyContent: "center", width: "100%"}}>
              <Text style={{marginBottom: 10}}>Loading the application...</Text>
              <ActivityIndicator style={{alignSelf: "center", justifySelf: "center"}} size="large" color={themeStyle.COLOR_PRIMARY} />
            </View>
          ) : (
            children
          )}
        </AuthContext.Provider>
    );
};