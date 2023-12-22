import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, Switch } from 'react-native';
import themeStyle from '../styles/theme.style';
import { useNavigation } from '@react-navigation/native';
import { addLocation } from '../services/locationService';
import { ThemeContext } from '../contexts/ThemeContext';
import Button from '../components/buttons/Button';
import SwitchPublic from '../components/input/SwitchPublic';

const AddLocation = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigation();
    const { theme } = useContext(ThemeContext)

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
    <ScrollView style={[styles.container, {backgroundColor: theme.COLOR_BACKGROUND_ROOT}]}>
        <Text style={[styles.title, {color: theme.COLOR_TEXT}]}>Add new location</Text>
        {error ? <Text style={[styles.error, {color: theme.COLOR_ERROR}]}>{error}</Text> : null}
        <View>
          <Text style={[styles.label, {color: theme.COLOR_TEXT}]}>Enter location name</Text>
          <TextInput
            placeholder="Location name"
            value={name}
            style={[styles.input, {borderColor: theme.COLOR_INACTIVE, backgroundColor: theme.COLOR_BACKGROUND, color: theme.COLOR_TEXT}]}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={theme.COLOR_INACTIVE}
          />
        </View>
        <View>
          <Text style={[styles.label, {color: theme.COLOR_TEXT}]}>Enter location adress</Text>
          <TextInput
            placeholder="Location adress"
            value={address}
            style={[styles.input, {borderColor: theme.COLOR_BORDER, backgroundColor: theme.COLOR_BACKGROUND, color: theme.COLOR_TEXT}]}
            onChangeText={(text) => setAddress(text)}
            placeholderTextColor={theme.COLOR_INACTIVE}
          />
        </View>
        <View >
        <Text style={[styles.label, {color: theme.COLOR_TEXT}]}>Is this location public?</Text>
        <View style={{paddingBottom: 10}}>
          <SwitchPublic isPublic={isPublic} setIsPublic={setIsPublic} />
        </View>
      </View>
      {!isPublic && <Text style={[styles.warning, {color: theme.COLOR_WARNING}]}>Warning! If your event is public, the location will still be shown for this event.</Text>}
      <Button isLoading={isLoading} onPress={handleSubmit} text="Add location" />
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
    fontSize: themeStyle.FONT_SIZE_MEDIUM,
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
  },
  description: {
    marginBottom: 25,
  },
  label: {
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontWeight: themeStyle.FONT_WEIGHT_LIGHT,
    textAlign: 'left',
    width: '100%',
    marginBottom: 5,
  },
  error: {
    paddingBottom: 10,
    textAlign: 'center',
  },
  warning: {
    paddingBottom: 10,
    textAlign: 'left',
  }
});

export default AddLocation;