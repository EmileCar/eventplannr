import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import getDefaultImage from '../../utils/eventImageUtil';
import themeStyle from '../../styles/theme.style';
import { formatDate } from '../../utils/datetimeUtils';
import { ThemeContext } from '../../contexts/ThemeContext';

const EventItem = ({ event }) => {
  const defaultImage = getDefaultImage(event.title);
  const { theme } = useContext(ThemeContext)

  return (
    <View style={[styles.container, {backgroundColor: theme.COLOR_ITEM_BG}]}>
      <Image source={defaultImage} style={styles.image} />
      <View style={styles.content}>
        <Text style={[styles.title, {color: theme.COLOR_TEXT}]}>{event.title}</Text>
        <Text style={[styles.date, {color: theme.COLOR_TEXT}]}>{formatDate(event.startDateTime)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    minWidth: 200,
    maxWidth: 350,
    elevation: 2,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
  },
  date: {
    fontSize: themeStyle.FONT_SIZE_SMALL,
  },
});



export default EventItem;
