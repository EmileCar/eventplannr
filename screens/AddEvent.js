import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, Platform, ScrollView, Pressable, Switch } from 'react-native';
import getDefaultImage from '../utils/eventImageUtil';
import themeStyle from '../styles/theme.style';
import { SelectList } from 'react-native-dropdown-select-list';
import EventDatePicker from '../components/input/EventDatePicker';
import { useNavigation } from '@react-navigation/native';
import { getTopLocations } from '../services/locationService';
import { addEvent } from '../services/eventService';

const AddEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultImage, setDefaultImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [locationId, setLocationId] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigation();

  useEffect(() => {
    const defaultImage = getDefaultImage(title);
    setDefaultImage(defaultImage);
  }, [title]);

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {  
    await getTopLocations().then(locations => {
      const transformedLocations = locations.map(location => ({
        key: location.id.toString(),
        value: location.name,
      }));
      setLocations(transformedLocations);
    }).catch(err => {
      console.log(err);
    })
  }

  const handleSubmit = async () => {
    console.log(locationId);
    const isoFormattedDateTime = formatCustomDateTime(new Date(startDateTime));
    addEvent({title, description, startDateTime: isoFormattedDateTime, locationId, isPublic}).then(() => {
      navigate.goBack();
    }).catch(error => {
      console.log(error);
      setError(error.message);
    })
  };

  function formatCustomDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
  }

  const handleLocationUpdate = async () => {
    await fetchLocations();
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
        <SelectList
          onPress={() => fetchLocations()}
          setSelected={(val) => setLocationId(val)}
          data={locations}
          save="id"
          placeholder="Select location"
          search={true}
          searchPlaceholder="Search locations"
          dropdownShown={false}
          boxStyles={{ borderRadius: 5 }}
          inputStyles={styles.locationInput}
          dropdownStyles={{ maxHeight: 200 }}
          dropdownItemStyles={{ borderBottomWidth: 1, borderBottomColor: 'lightgray' }}
          dropdownTextStyles={{ paddingVertical: 10, fontSize: themeStyle.FONT_SIZE_SMALL }}
        />
        <Pressable onPress={() => navigate.navigate("AddLocation", { onUpdate: handleLocationUpdate }) }>
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
            <Text style={styles.buttonText}>Add event</Text>
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

export default AddEvent;
