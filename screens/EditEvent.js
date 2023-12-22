import React, { useContext, useEffect, useState } from 'react';
import { TextInput, StyleSheet, Text, Image, ScrollView, Pressable } from 'react-native';
import getDefaultImage from '../utils/eventImageUtil';
import themeStyle from '../styles/theme.style';
import EventDatePicker from '../components/input/EventDatePicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addEvent, updateEvent } from '../services/eventService';
import { formatCustomDateTime } from '../utils/datetimeUtils';
import { ThemeContext } from '../contexts/ThemeContext';
import Button from '../components/buttons/Button';
import LocationSelect from '../components/input/LocationSelect';
import SwitchPublic from '../components/input/SwitchPublic';

const EditEvent = () => {
  const route = useRoute();
  let event = null;
  if (route.params?.event) {
    event = route.params.event;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [defaultImage, setDefaultImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [location, setLocation] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigation();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setStartDateTime(new Date(event.startDateTime));
      setLocation(event.location);
      setIsPublic(event.isPublic);
    }
  }, [event]);

  useEffect(() => {
    const defaultImage = getDefaultImage(title);
    setDefaultImage(defaultImage);
  }, [title]);

  const handleSubmit = async () => {
    setIsLoading(true);
  
    try {

      const isoFormattedDateTime = formatCustomDateTime(new Date(startDateTime));
      const eventData = { title, description, startDateTime: isoFormattedDateTime, locationId: location?.id || null, isPublic };
  
      if (event) {
        await updateEvent(event.id, eventData);
      } else {
        await addEvent(eventData);
      }
  
      navigate.goBack();
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.COLOR_BACKGROUND_ROOT}]}>
      <Image source={defaultImage} style={styles.image} />
      {error ? <Text style={[styles.error, {color: theme.COLOR_ERROR}]}>{error}</Text> : null}
      <TextInput
        placeholder="Event title"
        value={title}
        style={[styles.input, styles.title, {borderColor: theme.COLOR_INACTIVE, backgroundColor: theme.COLOR_BACKGROUND}]}
        onChangeText={(text) => setTitle(text)}
        placeholderTextColor={theme.COLOR_INACTIVE}
      />
      <TextInput
        multiline={true}
        rows={3}
        placeholder="Enter event description here"
        value={description}
        style={[styles.input, {borderColor: theme.COLOR_BORDER, backgroundColor: theme.COLOR_BACKGROUND , color: theme.COLOR_TEXT}]}
        onChangeText={(text) => setDescription(text)}
        placeholderTextColor={theme.COLOR_INACTIVE}
      />
      <Text style={[styles.label, {color: theme.COLOR_TEXT}]}>When does your event start?</Text>
      <EventDatePicker 
        value={startDateTime} 
        onValueChange={setStartDateTime} 
      />
      <Text style={[styles.label, {color: theme.COLOR_TEXT}]}>Select a location</Text>
      <LocationSelect location={location} setLocation={setLocation} />
      <Pressable onPress={() => navigate.navigate("AddLocation") }>
        <Text style={[styles.link, {color: theme.COLOR_ICON}]}>Not in list? Create a new location</Text>
      </Pressable>
      <Text style={[styles.label, {color: theme.COLOR_TEXT}]}>Is this event public?</Text>
      <SwitchPublic isPublic={isPublic} setIsPublic={setIsPublic} />
      <Button onPress={handleSubmit} text={event ? "Update event" : "Add event"} isLoading={isLoading}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: themeStyle.DEFAULT_PADDING,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
  },
  input: {
    borderRadius: 5,
    padding: 10,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontWeight: themeStyle.FONT_WEIGHT_LIGHT,
    borderWidth: 1,
    marginBottom: 10,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: themeStyle.FONT_SIZE_LARGE,
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
  },
  label: {
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontWeight: themeStyle.FONT_WEIGHT_LIGHT,
    textAlign: 'left',
    width: '100%',
    marginBottom: 5,
  },
  link: {
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontWeight: themeStyle.FONT_WEIGHT_LIGHT,
    textAlign: 'right',
    width: '100%',
    marginTop: 5,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  error: {
    paddingBottom: 10,
    textAlign: 'center',
  }
});

export default EditEvent;
