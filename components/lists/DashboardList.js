import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import EventItem from '../items/EventItem';

const DashboardList = ({events}) => {
  return (
    <View style={styles.eventContainer}>
        {events.map((event) => (
            <EventItem key={event.id} event={event} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
    eventContainer: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
});

export default DashboardList;
