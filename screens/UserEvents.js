import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import SectionHeader from '../components/header/SectionHeader';
import UserEventItem from '../components/items/UserEventItem';
import { getGoingEvents, getMaybeEvents } from '../services/eventService';
import themeStyle from '../styles/theme.style';

const UserEvents = () => {
  const [goingEvents, setGoingEvents] = useState([]);
  const [maybeEvents, setMaybeEvents] = useState([]);
  const [isLoadingGoingEvents, setIsLoadingGoingEvents] = useState(false);
  const [isLoadingMaybeEvents, setIsLoadingMaybeEvents] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchUserEventsData();
  }, []);

  const fetchUserEventsData = async () => {
    setIsLoadingGoingEvents(true);
    setIsLoadingMaybeEvents(true);
    await getGoingEvents().then((events) => { setGoingEvents(events) }).catch((err) => { console.log(err) });
    setIsLoadingGoingEvents(false);
    await getMaybeEvents().then((events) => { setMaybeEvents(events) }).catch((err) => { console.log(err) });
    setIsLoadingMaybeEvents(false);
  };

  return (
    <ScrollView style={styles.container}>
      <SectionHeader title="Going" />
      {isLoadingGoingEvents ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.COLOR_PRIMARY} />
        </View>
      ) : (
        <>
          {goingEvents.length === 0 ? <Text style={[styles.noEvents, {color: theme.COLOR_TEXT}]}>No events</Text> : null}
          <FlatList
            data={goingEvents}
            renderItem={({ item }) => <UserEventItem event={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}

      <SectionHeader title="Maybe" />
      {isLoadingMaybeEvents ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.COLOR_PRIMARY} />
        </View>
      ) : (
        <>
          {maybeEvents.length === 0 ? <Text style={[styles.noEvents, {color: theme.COLOR_TEXT}]}>No events</Text> : null}
          <FlatList
            data={maybeEvents}
            renderItem={({ item }) => <UserEventItem event={item} />}
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
    padding: themeStyle.DEFAULT_PADDING,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noEvents: {
    margin: 20,
  },
});

export default UserEvents;
