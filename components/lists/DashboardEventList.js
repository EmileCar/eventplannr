import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import EventItem from '../items/EventItem'; // Assuming EventItem is your component rendering individual events

const DashboardEventList = ({ events }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.eventContainer}
    >
      {events.map((event, index) => (
        <View key={event.id} style={styles.eventItemWrapper}>
          <EventItem event={event} />
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
