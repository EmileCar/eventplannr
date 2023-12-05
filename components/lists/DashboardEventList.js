import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import EventItem from '../items/EventItem'; // Assuming EventItem is your component rendering individual events
import { useNavigation } from '@react-navigation/native';

const DashboardEventList = ({ events }) => {
  const navigation = useNavigation();

  const navigateToEventDetail = (eventId) => {
    navigation.navigate('EventDetail', { eventId });
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
    paddingLeft: 8, // Adjust this margin as needed
    paddingRight: 8, // Adjust this margin as needed
  },
  eventItemWrapper: {
    marginRight: 16, // Adjust this margin as needed
    overflow: 'visible', // Allow content to overflow
  },
});

export default DashboardEventList;
