import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LocationItem = ({ location }) => {
    console.log(location)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{location.name}</Text>
      <Text style={styles.date}>{location.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#000",
        borderWidth: 2,
        width: 200,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    date: {
        fontSize: 14,
        textAlign: "center",
    },
});



export default LocationItem;
