import React, { useState, useEffect } from 'react';
import auth from './firebase'; // Import the firebase module
import { RootNavigator } from './AppNavigator';
import SignIn from '../screens/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/SignUp';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Only render NavigationContainer when the user is not logged in
  if (user === null) {
    return (
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen name="Login" component={SignIn} />
          <AuthStack.Screen name="Signup" component={SignUp} />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }

  // When the user is logged in, directly render the RootNavigator
  return <RootNavigator />;
};

export default AuthNavigator;
