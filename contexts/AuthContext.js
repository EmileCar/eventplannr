import React, { createContext, useEffect, useState, useContext } from 'react';
import { getUser, signIn, signUp } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, Text } from 'react-native';
import themeStyle from '../styles/theme.style';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [showDelayedMessage, setShowDelayedMessage] = useState(false);
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

    useEffect(() => {
      if (isLoading) {
        const timeoutId = setTimeout(() => {
          setShowDelayedMessage(true);
        }, 6000);
  
        return () => clearTimeout(timeoutId);
      }
    }, [isLoading]);

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
            <View style={{alignItems: "center", justifyContent: "center", width: "100%", height: "100%"}}>
              <Text style={{marginBottom: 10}}>Loading the application...</Text>
              {showDelayedMessage && (
                <Text style={{ marginBottom: 10 , padding: 16, textAlign: "center"}}>
                  If this is your first time starting the application, the API takes very long to load. So please be patient and keep the page loading, the API will start up shortly. This can take up about 2-3 minutes.
                </Text>
              )}
              <ActivityIndicator style={{alignSelf: "center", justifySelf: "center"}} size="large" color={themeStyle.COLOR_PRIMARY} />
            </View>
          ) : (
            children
          )}
        </AuthContext.Provider>
    );
};