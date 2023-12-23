import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import SectionHeader from '../components/header/SectionHeader';
import UserEventItem from '../components/items/UserEventItem';
import { getGoingEvents, getMaybeEvents } from '../services/eventService';
import themeStyle from '../styles/theme.style';
import { useFocusEffect } from '@react-navigation/native';

const UserEvents = () => {
  const [goingEvents, setGoingEvents] = useState([]);
  const [maybeEvents, setMaybeEvents] = useState([]);
  const [isLoadingGoingEvents, setIsLoadingGoingEvents] = useState(false);
  const [isLoadingMaybeEvents, setIsLoadingMaybeEvents] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchUserEventsData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserEventsData();
    }, [])
  );

  const fetchUserEventsData = async () => {
    setIsLoadingGoingEvents(true);
    setIsLoadingMaybeEvents(true);
    try {
      await getGoingEvents().then((events) => {
        setGoingEvents(events);
      });
      await getMaybeEvents().then((events) => {
        setMaybeEvents(events);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingGoingEvents(false);
      setIsLoadingMaybeEvents(false);
    }
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.COLOR_BACKGROUND_ROOT}]}>
      <SectionHeader title="Going" />
      {isLoadingGoingEvents ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.COLOR_ICON} />
        </View>
      ) : (
        <>
          {goingEvents.length === 0 ? <Text style={[styles.noEvents, {color: theme.COLOR_TEXT}]}>No events</Text> : null}
          {goingEvents.map((event) => (
            <UserEventItem event={event} key={event.id} />
          ))}
        </>
      )}

      <SectionHeader title="Maybe" />
      {isLoadingMaybeEvents ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.COLOR_ICON} />
        </View>
      ) : (
        <>
          {maybeEvents.length === 0 ? <Text style={[styles.noEvents, {color: theme.COLOR_TEXT}]}>No events</Text> : null}
          {maybeEvents.map((event) => (
            <UserEventItem event={event} key={event.id} />
          ))}
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
  sectionHeader: {
    marginTop: 10,
  },
  noEvents: {
    margin: 20,
  },
});

export default UserEvents;
