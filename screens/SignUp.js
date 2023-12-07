import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import themeStyle from '../styles/theme.style';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const {signUpFunc} = useContext(AuthContext);

  const handleSignup = async () => {
    try {
      await signUpFunc(email, username, password);
    } catch (error) {
      console.error('Signup Error:', error.message);
      setError(error.message)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register to Eventplannr</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        placeholder="Email"
        value={email}
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Username"
        value={username}
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
      />
       <Pressable onPress={handleSignup}>
        <Text style={styles.button}>Create account</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.button}>Or log in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeStyle.COLOR_WHITE,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    gap: 10,
    padding: 20,
  },
  title: {
    fontSize: themeStyle.FONT_SIZE_LARGE,
    fontWeight: themeStyle.FONT_WEIGHT_BOLD,
    color: themeStyle.COLOR_PRIMARY,
    paddingBottom: themeStyle.DEFAULT_PADDING,
  },
  input: {
    backgroundColor: themeStyle.COLOR_WHITE,
    padding: 10,
    borderColor: themeStyle.COLOR_PRIMARY,
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  button: {
    backgroundColor: themeStyle.COLOR_PRIMARY,
    color: themeStyle.COLOR_WHITE,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    width: 200,
  },
  error: {
    color: themeStyle.COLOR_ERROR,
    paddingBottom: 10,
  },
});

export default SignUp;