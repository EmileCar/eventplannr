import React, { createContext, useEffect, useState, useContext } from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import auth from '../config/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    const signIn = async (email, password) => {
        console.log(auth)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signUp = async (email, password) =>{
      return createUserWithEmailAndPassword(auth, email, password);
    }

    const logOut = async () => {
      try {
        await signOut(auth);
        setCurrentUser({});
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    useEffect(() =>{
        auth.onAuthStateChanged(async (firebaseUser) => {
            setCurrentUser(firebaseUser);
        })
    }, [])

    const authInfo = {currentUser, signIn, signUp, logOut}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};