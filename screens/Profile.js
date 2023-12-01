import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { logOut} = useContext(AuthContext)

  return (
    <View>
      <Text>Welcome to the Profile!</Text>
      <TouchableOpacity onPress={logOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
