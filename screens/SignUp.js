import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signUp} = useContext(AuthContext);

  const handleSignup = async () => {
    try {
      await signUp(email, password);
    } catch (error) {
      console.error('Signup Error:', error.message);
    }
  };

  return (
    <View>
      <Text>Signup Screen</Text>
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
      <Button title="Sign Up" onPress={handleSignup} />
      <Button
        title="Already have an account? Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default SignUp;