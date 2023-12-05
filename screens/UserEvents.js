import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import themeStyle from '../styles/theme.style';
import SectionHeader from '../components/header/SectionHeader';
import UserEventItem from '../components/items/UserEventItem';
import { getGoingEvents, getMaybeEvents } from '../services/eventService';

const UserEvents = () => {
  const [goingEvents, setGoingEvents] = useState([])
  const [maybeEvents, setMaybeEvents] = useState([])

  useEffect(() => {
    getGoingEvents()
    .then(events => {
      setGoingEvents(events)
    })
    getMaybeEvents()
    .then(events => {
      setMaybeEvents(events)
    })
  }, [])

  return (
    <ScrollView style={styles.container}>
      <SectionHeader title="Going" />
      <FlatList
        data={goingEvents}
        renderItem={({ item }) => (
        console.log(item),
        <UserEventItem event={item} />)}
        keyExtractor={(item) => item.id.toString()}
      />
      <SectionHeader title="Maybe" />
      <FlatList
        data={maybeEvents}
        renderItem={({ item }) => (
        console.log(item),
        <UserEventItem event={item} />)}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.BACKGROUND_COLOR,
    padding: themeStyle.DEFAULT_PADDING,
  },
});

export default UserEvents;
