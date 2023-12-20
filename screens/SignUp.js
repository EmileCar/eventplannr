import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import themeStyle from '../styles/theme.style';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { signUpFunc } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const handleSignup = async () => {
    try {
      await signUpFunc(email, username, password);
    } catch (error) {
      console.error('Signup Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.COLOR_BACKGROUND_ROOT }]}>
      <Text style={[styles.title, { color: theme.COLOR_TEXT_AUTH }]}>
        Register to Eventplannr
      </Text>
      {error ? (
        <Text style={[styles.error, { color: theme.COLOR_ERROR }]}>{error}</Text>
      ) : null}
      <TextInput
        placeholder="Email"
        value={email}
        style={[
          styles.input,
          {
            backgroundColor: theme.COLOR_BACKGROUND,
            color: theme.COLOR_TEXT,
            borderColor: theme.COLOR_TEXT_AUTH,
          },
        ]}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Username"
        value={username}
        style={[
          styles.input,
          {
            backgroundColor: theme.COLOR_BACKGROUND,
            color: theme.COLOR_TEXT,
            borderColor: theme.COLOR_TEXT_AUTH,
          },
        ]}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        style={[
          styles.input,
          {
            backgroundColor: theme.COLOR_BACKGROUND,
            color: theme.COLOR_TEXT,
            borderColor: theme.COLOR_TEXT_AUTH,
          },
        ]}
        onChangeText={(text) => setPassword(text)}
      />
      <Pressable onPress={handleSignup}>
        <Text
          style={[
            styles.button,
            {
              backgroundColor: theme.COLOR_BUTTON,
              color: theme.COLOR_BUTTON_TEXT,
            },
          ]}
        >
          Create account
        </Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text
          style={[
            styles.button,
            {
              backgroundColor: theme.COLOR_BUTTON,
              color: theme.COLOR_BUTTON_TEXT,
            },
          ]}
        >
          Or log in
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 20,
  },
  title: {
    fontSize: themeStyle.FONT_SIZE_LARGE,
    fontWeight: themeStyle.FONT_WEIGHT_BOLD,
    paddingBottom: themeStyle.DEFAULT_PADDING,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    width: 200,
  },
  error: {
    paddingBottom: 10,
  },
});

export default SignUp;
