import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getUpcomingEvents } from '../services/eventService';
import themeStyle from '../styles/theme.style';
import DashboardEventList from '../components/lists/DashboardEventList';
import { getTopLocations } from '../services/locationService';
import DashboardLocationList from '../components/lists/DashboardLocationList';
import DashboardHeader from '../components/header/DashboardHeader';
import { ThemeContext } from 'react-native-elements';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [topLocations, setTopLocations] = useState([])
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchDashboardData();
  }, [])

  const fetchDashboardData = async () => {
    setIsLoading(true);
    const events = await getUpcomingEvents();
    setUpcomingEvents(events);
    const locations = await getTopLocations();
    setTopLocations(locations);
    setIsLoading(false);
  }

  
  return (
    <ScrollView style={{flex: 1}}
    showsVerticalScrollIndicator={false}
    >
      <DashboardHeader />
      <View style={styles.content}>
        {isLoading ? (<ActivityIndicator size="large" color={theme.COLOR_PRIMARY} /> ) : 
          (
          <>
            <View style={{width: "100%"}}>
              <Text style={styles.subtitle}>Upcoming events</Text>
              <DashboardEventList events={upcomingEvents}/>
            </View>
            <View style={{width: "100%"}}>
              <Text style={styles.subtitle}>Top locations</Text>
              <DashboardLocationList locations={topLocations}/>
            </View>
          </>
          )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  }
});

export default Dashboard;
