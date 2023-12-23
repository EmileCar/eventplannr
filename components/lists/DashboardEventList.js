import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import EventItem from '../items/EventItem'; // Assuming EventItem is your component rendering individual events
import { useNavigation } from '@react-navigation/native';

const DashboardEventList = ({ events }) => {
  const navigation = useNavigation();

  const navigateToEventDetail = (eventId) => {
    navigation.navigate('EventDetailNavigatorDashboard', { screen: 'EventDetail', params: { eventId } });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.eventContainer}
    >
      {events.map((event, index) => (
        <View key={event.id} style={styles.eventItemWrapper}>
          <TouchableOpacity onPress={() => navigateToEventDetail(event.id)}>
            <EventItem event={event} />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  eventItemWrapper: {
    marginRight: 16,
    overflow: 'visible',
  },
});

export default DashboardEventList;
