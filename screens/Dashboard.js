import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getEvents } from '../services/eventService';

const Dashboard = () => {

  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents()
    .then(events => {
      setEvents(events)
      console.log(events)
    })
  }, [])

  return (
    <View>
      <Text>Welcome to the Home screen!</Text>
      <Text>Here are the events:</Text>
      {events.map(event => <Text key={event.id}>{event.title}</Text>)}

    </View>
  );
};

export default Dashboard;
