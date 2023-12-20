import React, { useContext } from 'react';
import { RootNavigator } from './AppNavigator';
import SignIn from '../screens/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/SignUp';
import { AuthContext } from '../contexts/AuthContext';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  
  const { currentUser } = useContext(AuthContext);

  // Only render NavigationContainer when the user is not logged in
  if (currentUser === null || currentUser == {}) {
    return (
      <NavigationContainer>
        <AuthStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <AuthStack.Screen name="Login" component={SignIn} />
          <AuthStack.Screen name="SignUp" component={SignUp} />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }

  // When the user is logged in, directly render the RootNavigator
  return <RootNavigator />;
};

export default AuthNavigator;
