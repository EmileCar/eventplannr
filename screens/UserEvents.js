import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
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
    <FlatList
      style={[styles.container, { backgroundColor: theme.COLOR_BACKGROUND_ROOT }]}
      ListHeaderComponent={() => <SectionHeader title="Going" />}
      ListFooterComponent={() => <SectionHeader title="Maybe" />}
      data={[...goingEvents, ...maybeEvents]}
      renderItem={({ item }) => <UserEventItem event={item} />}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={<Text style={[styles.noEvents, { color: theme.COLOR_TEXT }]}>No events</Text>}
      ListFooterComponentStyle={styles.sectionHeader}
      ListHeaderComponentStyle={styles.sectionHeader}
      refreshing={isLoadingGoingEvents || isLoadingMaybeEvents}
      onRefresh={fetchUserEventsData}
    />
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
