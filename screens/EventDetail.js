import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Platform } from 'react-native';
import getDefaultImage from '../utils/eventImageUtil';
import themeStyle from '../styles/theme.style';
import { Text } from 'react-native';
import { getEventById } from '../services/eventService';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';

const AddEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultImage, setDefaultImage] = useState(null)
  const [event, setEvent] = useState({});
  const [error, setError] = useState(null);
  const route = useRoute();

  const {currentUser} = useContext(AuthContext);
  console.log(currentUser)

  useEffect(() => {
    const eventId = route.params.eventId;
    if(!eventId) {
      setError('Event not found');
      return;
    }
    getEventById(eventId).then(event => {
      setEvent(event);
    }).catch(err => {
      setError(err.message);
    })
  }, []);

  useEffect(() => {
    if(event.title){
      const defaultImage = getDefaultImage(event.title);
      setDefaultImage(defaultImage);
    }
  }, [event]);

  return (
    <View style={styles.container}>
      <Image source={defaultImage} style={styles.image} />
      <Text style={[styles.text, styles.title]}>{event.title}</Text>
      <Text style={[styles.text, styles.description]}>{event.description}</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.text}>{event.startDate}</Text>
        <Text style={styles.text}>{event.endDate}</Text>
      </View>
      {event.location && <Text>{event.location.name}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: themeStyle.DEFAULT_PADDING,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
  },
  text: {
    padding: 10,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontWeight: themeStyle.FONT_WEIGHT_LIGHT,
    marginBottom: 10,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 0,
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
  },
  description: {
    textAlign: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    gap: themeStyle.DEFAULT_PADDING,
  },
  date: {
    width: '100%',
    borderRadius: 5,
    padding: 10,
    borderColor: themeStyle.COLOR_INACTIVE,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontWeight: themeStyle.FONT_WEIGHT_LIGHT,
    borderColor: themeStyle.COLOR_INACTIVE,
    borderWidth: 1,
    marginBottom: 10,
    fontFamily: "inherit",
  },
});

export default AddEvent;
