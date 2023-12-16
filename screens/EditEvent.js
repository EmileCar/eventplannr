import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, Platform, ScrollView, Pressable, Switch, ActivityIndicator } from 'react-native';
import getDefaultImage from '../utils/eventImageUtil';
import themeStyle from '../styles/theme.style';
import EventDatePicker from '../components/input/EventDatePicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addEvent, updateEvent } from '../services/eventService';
import Select from '../components/input/Select';
import LocationItemInAddUser from '../components/items/LocationItemInAddUser';
import { formatCustomDateTime } from '../utils/datetimeUtils';

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

  useEffect(() => {
    console.log(event)
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
    const isoFormattedDateTime = formatCustomDateTime(new Date(startDateTime));

    if (event) {
      await updateEvent(event.id, { title, description, startDateTime: isoFormattedDateTime, locationId: location?.id || null, isPublic })
        .then(() => {
          navigate.goBack();
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    } else {
      await addEvent({ title, description, startDateTime: isoFormattedDateTime, locationId: location?.id || null, isPublic })
        .then(() => {
          navigate.goBack();
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    }

    setIsLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={defaultImage} style={styles.image} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        placeholder="Event title"
        value={title}
        style={[styles.input, styles.title]}
        onChangeText={(text) => setTitle(text)}
        placeholderTextColor={themeStyle.COLOR_INACTIVE}
      />
      <TextInput
        multiline={true}
        rows={3}
        placeholder="Enter event description here"
        value={description}
        style={[styles.input, styles.description]}
        onChangeText={(text) => setDescription(text)}
        placeholderTextColor={themeStyle.COLOR_INACTIVE}
      />
      <EventDatePicker value={startDateTime} onValueChange={setStartDateTime} />
      <View>
        <Text style={styles.label}>Select a location</Text>
        {location ? 
          <LocationItemInAddUser location={location} />
          : <Select onSelect={setLocation}/>}
        <Pressable onPress={() => navigate.navigate("AddLocation") }>
          <Text style={styles.link}>Not in list? Create a new location</Text>
        </Pressable>
      </View>
      <View >
        <Text style={styles.label}>Is this event public?</Text>
        <View style={styles.switch}>
          <Switch
            trackColor={{ false: themeStyle.COLOR_INACTIVE, true: themeStyle.COLOR_PRIMARY }}
            thumbColor={isPublic ? themeStyle.COLOR_WHITE : themeStyle.COLOR_WHITE}
            ios_backgroundColor={themeStyle.COLOR_INACTIVE}
            onValueChange={setIsPublic}
            value={isPublic}
          />
        </View>
      </View>
      <Pressable style={styles.button} onPress={() => handleSubmit()}>
        {isLoading ? (
          <ActivityIndicator size="small" color={themeStyle.COLOR_WHITE} />
        ) : (
          <Text style={styles.buttonText}>{
            event ? "Update event" : "Add event"
          }</Text>
        )}
      </Pressable>
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
    borderColor: themeStyle.COLOR_INACTIVE,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
  },
  description: {
    marginBottom: 25,
  },
  datePicker: {
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
    color: themeStyle.COLOR_PRIMARY,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: themeStyle.COLOR_PRIMARY,
    color: themeStyle.COLOR_WHITE,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    width: "100%",
    marginBottom: 30,
  },
  buttonText: {
      color: themeStyle.COLOR_WHITE,
      textAlign: 'center',
  },
  error: {
      color: themeStyle.COLOR_ERROR,
      paddingBottom: 10,
      textAlign: 'center',
  },
  switch: {
    paddingBottom: 10,
  },
});

export default EditEvent;
