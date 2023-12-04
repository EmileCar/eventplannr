import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import LocationItem from '../items/LocationItem';

const DashboardLocationList = ({locations}) => {
  return (
    <View style={styles.eventContainer}>
        {locations.map((location) => (
            <LocationItem key={location.id} location={location} />
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

export default DashboardLocationList;
