import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import LocationItem from '../items/LocationItem';

const DashboardLocationList = ({locations}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.locationContainer}>
      <View style={styles.locationItemWrapper}>
        {locations.map((location) => (
            <LocationItem key={location.id} location={location} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 8, 
    paddingRight: 8,
  },
  locationItemWrapper: {
    flexDirection: 'row',
    gap: 16,
    marginRight: 16,
    overflow: 'visible',
  },
});

export default DashboardLocationList;
