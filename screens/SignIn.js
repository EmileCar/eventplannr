// LoginScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Login Error:', error.message);
      // Handle login error (e.g., display an error message)
    }
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

export default SignIn;
