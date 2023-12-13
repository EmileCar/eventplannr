import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getUpcomingEvents } from '../services/eventService';
import themeStyle from '../styles/theme.style';
import { FlatList } from 'react-native-web';
import EventItem from '../components/items/EventItem';
import DashboardEventList from '../components/lists/DashboardEventList';
import { getTopLocations } from '../services/locationService';
import DashboardLocationList from '../components/lists/DashboardLocationList';
import DashboardHeader from '../components/header/DashboardHeader';

const Dashboard = () => {

  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [topLocations, setTopLocations] = useState([])

  useEffect(() => {
    getUpcomingEvents()
    .then(events => {
      setUpcomingEvents(events)
    })
    getTopLocations()
    .then(locations => {
      setTopLocations(locations)
    })
  }, [])
  
  return (
    <ScrollView style={styles.container}
    showsVerticalScrollIndicator={false}
    >
      <DashboardHeader />
      <View style={styles.content}>
        <View style={styles.itemContainer}>
          <Text style={styles.subtitle}>Upcoming events</Text>
          <DashboardEventList events={upcomingEvents}/>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.subtitle}>Top locations</Text>
          <DashboardLocationList locations={topLocations}/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.BACKGROUND_COLOR,
  },
  content: {
    flex: 1,
    padding: themeStyle.DEFAULT_PADDING,
    gap: themeStyle.DEFAULT_PADDING,
  },
  subtitle: {
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemContainer: {
    width: "100%",
    backgroundColor: themeStyle.BACKGROUND_COLOR_LIGHT,
  },
});

export default Dashboard;
