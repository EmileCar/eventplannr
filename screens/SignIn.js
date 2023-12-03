import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signInFunc} = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await signInFunc(email, password);
    } catch (error) {
      console.error('Login Error:', error.message);
      // Handle login error (e.g., display an error message)
    }
  };

  return (
    <View style={styles.authContainer}>
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

const styles = StyleSheet.create({
    authContainer: {
        display: 'grid',
        placeItems: 'center',
        border: '1px solid black',
    },
});

export default SignIn;
