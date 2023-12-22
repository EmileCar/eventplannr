import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import themeStyle from '../../styles/theme.style';
import { ThemeContext } from '../../contexts/ThemeContext';

const LocationItem = ({ location }) => {
  const { theme } = useContext(ThemeContext)
  return (
    <View style={[styles.container, {backgroundColor: theme.COLOR_ITEM_BG}]}>
      <Text style={[styles.title, {color: theme.COLOR_TEXT}]}>{location.name}</Text>
      <Text style={[styles.date, {color: theme.COLOR_TEXT}]}>{location.address}</Text>
    </View>
  );
};

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    minWidth: 200,
    maxWidth: 350,
    elevation: 2,
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
