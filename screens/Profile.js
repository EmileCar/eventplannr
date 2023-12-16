import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { logOut} = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text>Welcome to the Profile!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Profile;
