import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import getDefaultImage from '../utils/eventImageUtil';
import themeStyle from '../styles/theme.style';
import DatePickers from '../components/event/DatePickers';
import { SelectList } from 'react-native-dropdown-select-list';

const AddEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultImage, setDefaultImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    const defaultImage = getDefaultImage(title);
    setDefaultImage(defaultImage);
  }, [title]);

  const onSubmit = (values) => {
    // TODO: Implement your logic to submit the event request
    console.log(values);
  };

  const locations = [
    { key: '1', value: 'Location 1' },
    { key: '2', value: 'Location 2' },
    // Add more locations as needed
  ];

  const test = (val) => {
    console.log(val);
  };

  return (
    <View style={styles.container}>
      <Image source={defaultImage} style={styles.image} />
      <TextInput
        placeholder="Event title"
        value={title}
        style={[styles.input, styles.title]}
        onChangeText={(text) => setTitle(text)}
        placeholderTextColor={themeStyle.COLOR_INACTIVE}
      />
      <TextInput
        multiline={true}
        numberOfLines={3}
        placeholder="Enter event description here"
        value={description}
        style={[styles.input, styles.description]}
        onChangeText={(text) => setDescription(text)}
        placeholderTextColor={themeStyle.COLOR_INACTIVE}
      />
      <View style={styles.dateContainer}>
        <DatePickers datePickerStyle={styles.datePicker} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
      </View>
      <SelectList
        setSelected={(val) => test(val)}
        data={locations}
        save="key"
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
    </View>
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
  description: {},
  dateContainer: {
    flexDirection: 'row',
    gap: themeStyle.DEFAULT_PADDING,
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
});

export default AddEvent;
