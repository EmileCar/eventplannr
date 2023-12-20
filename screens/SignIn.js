import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import themeStyle from '../styles/theme.style';
import { ThemeContext } from '../contexts/ThemeContext';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { theme } = useContext(ThemeContext)
  const { signInFunc } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await signInFunc(email, password);
    } catch (error) {
      console.error('Login Error:', error.message);
      setError(error.message)
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.COLOR_BACKGROUND_ROOT}]}>
      <Text style={[styles.title, {color: theme.COLOR_TEXT_AUTH}]}>Log in to Eventplannr</Text>
      {error ? <Text style={[styles.error, {color: theme.COLOR_ERROR}]}>{error}</Text> : null}
      <TextInput
        placeholder="Email"
        value={email}
        style={[styles.input, {backgroundColor: theme.COLOR_BACKGROUND, color: theme.COLOR_TEXT, borderColor: theme.COLOR_TEXT_AUTH}]}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        style={[styles.input, {backgroundColor: theme.COLOR_BACKGROUND, color: theme.COLOR_TEXT, borderColor: theme.COLOR_TEXT_AUTH}]}
        onChangeText={(text) => setPassword(text)}
      />
      <Pressable onPress={handleLogin}>
        <Text style={[styles.button, {backgroundColor: theme.COLOR_BUTTON, color: theme.COLOR_BUTTON_TEXT}]}>Log in</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('SignUp')}>
        <Text style={[styles.button, {backgroundColor: theme.COLOR_BUTTON, color: theme.COLOR_BUTTON_TEXT}]}>Or sign up</Text>
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
      backgroundColor: themeStyle.COLOR_PRIMARY,
      color: themeStyle.COLOR_WHITE,
      padding: 10,
      borderRadius: 5,
      textAlign: 'center',
      width: 200,
    },
    error: {
      paddingBottom: 10,
    },
});

export default SignIn;
