import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import getDefaultImage from '../../utils/eventImageUtil';
import themeStyle from '../../styles/theme.style';

const EventItem = ({ event }) => {
  const defaultImage = getDefaultImage(event.title);
  return (
    <View style={styles.container}>
      <Image source={defaultImage} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.date}>{event.startDate}</Text>
      </View>
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
