import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import themeStyle from '../../styles/theme.style';

const LocationItem = ({ location }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{location.name}</Text>
      <Text style={styles.date}>{location.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeStyle.COLOR_LIGHT_GRAY,
    borderRadius: 10,
    minWidth: 200,
    maxWidth: 350,
    shadowColor: themeStyle.COLOR_BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    padding: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
  },
  date: {
    fontSize: themeStyle.FONT_SIZE_SMALL,
  },
});



export default LocationItem;
