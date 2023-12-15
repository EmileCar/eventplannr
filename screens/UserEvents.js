import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import themeStyle from '../styles/theme.style';
import SectionHeader from '../components/header/SectionHeader';
import UserEventItem from '../components/items/UserEventItem';
import { getGoingEvents, getMaybeEvents } from '../services/eventService';

const UserEvents = () => {
  const [goingEvents, setGoingEvents] = useState([])
  const [maybeEvents, setMaybeEvents] = useState([])
  const [isLoadingGoingEvents, setIsLoadingGoingEvents] = useState(false)
  const [isLoadingMaybeEvents, setIsLoadingMaybeEvents] = useState(false)

  useEffect(() => {
    fetchUserEventsData();
  }, [])

  const fetchUserEventsData = async () => {
    setIsLoadingGoingEvents(true);
    setIsLoadingMaybeEvents(true);
    await getGoingEvents().then((events) => { setGoingEvents(events) }).catch((err) => { console.log(err) });
    setIsLoadingGoingEvents(false);
    await getMaybeEvents().then((events) => { setMaybeEvents(events) }).catch((err) => { console.log(err) });
    setIsLoadingMaybeEvents(false);
  }

  return (
    <ScrollView style={styles.container}>
      <SectionHeader title="Going" />
      {isLoadingGoingEvents ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <ActivityIndicator size="large" color={themeStyle.COLOR_PRIMARY} />
        </View>
      ) : (
        <>
          {goingEvents.length === 0 ? <Text style={styles.noEvents}>No events</Text> : null}
          <FlatList
            data={goingEvents}
            renderItem={({ item }) => (
            <UserEventItem event={item} />)}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
      
      <SectionHeader title="Maybe" />
      {isLoadingMaybeEvents ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <ActivityIndicator size="large" color={themeStyle.COLOR_PRIMARY} />
        </View>
      ) : (
        <>
          {maybeEvents.length === 0 ? <Text style={styles.noEvents}>No events</Text> : null}
          <FlatList
            data={maybeEvents}
            renderItem={({ item }) => (
            <UserEventItem event={item} />)}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
      
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.BACKGROUND_COLOR,
    padding: themeStyle.DEFAULT_PADDING,
  },
  noEvents: {
    margin: 20,
  },
});

export default UserEvents;
