import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getEvents } from '../services/eventService';
import themeStyle from '../styles/theme.style';

const Dashboard = () => {

  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents()
    .then(events => {
      setEvents(events)
      console.log(events)
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to back to Eventplannr!</Text>
      <View style={styles.itemContainer}>
        <Text style={styles.subtitle}>Here are the events:</Text>
        {events.map(event => <Text key={event.id}>{event.title}</Text>)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.BACKGROUND_COLOR_LIGHT,
    alignItems: 'center',
  },
  title: {
    fontSize: themeStyle.FONT_SIZE_LARGE,
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
    padding: 10
  },
  subtitle: {
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
    padding: 10
  },
  itemContainer: {
    width: "100%",
    backgroundColor: themeStyle.BACKGROUND_COLOR_LIGHT,
  },
});

export default Dashboard;
