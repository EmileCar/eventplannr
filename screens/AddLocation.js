import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, Platform, ScrollView, Pressable, ActivityIndicator, Switch } from 'react-native';
import getDefaultImage from '../utils/eventImageUtil';
import themeStyle from '../styles/theme.style';
import { SelectList } from 'react-native-dropdown-select-list';
import EventDatePicker from '../components/input/EventDatePicker';
import { useNavigation } from '@react-navigation/native';
import { addLocation } from '../services/locationService';

const AddLocation = ({route}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigation();

    const handleSubmit = async () => {
      setIsLoading(true);
      await addLocation({name, address, isPublic}).then(() => {
          setError(null);
          navigate.goBack();
      }).catch(error => {
          setError(error.message);
      })
      setIsLoading(false);
    };

    return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>Add new location</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View>
            <Text style={styles.label}>Enter location name</Text>
            <TextInput
                placeholder="Location name"
                value={name}
                style={styles.input}
                onChangeText={(text) => setName(text)}
                placeholderTextColor={themeStyle.COLOR_INACTIVE}
            />
        </View>
        <View>
            <Text style={styles.label}>Enter location adress</Text>
            <TextInput
                placeholder="Location adress"
                value={address}
                style={styles.input}
                onChangeText={(text) => setAddress(text)}
                placeholderTextColor={themeStyle.COLOR_INACTIVE}
            />
        </View>
        <View >
        <Text style={styles.label}>Is this location public?</Text>
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
      {!isPublic && <Text style={styles.warning}>Warning! If your event is public, the location will still be shown for this event.</Text>}
      <Pressable style={styles.button} onPress={() => handleSubmit()}>
        {isLoading ? (
            <ActivityIndicator size="small" color={themeStyle.COLOR_WHITE} />
        ) : (
            <Text style={styles.buttonText}>Add location</Text>
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
  warning: {
    color: themeStyle.COLOR_WARNING,
    paddingBottom: 10,
    textAlign: 'left',
  }
});

export default AddLocation;
