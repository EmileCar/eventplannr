import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import themeStyle from '../../styles/theme.style';

const EventDatePicker = ({ value, onValueChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (date) => {
    setShowDatePicker(false);
    onValueChange(date);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.label}>When does your event start?</Text>
      <TouchableOpacity onPress={handleDatePress} style={styles.input}>
        <Text>{dayjs(value).format('YYYY-MM-DD HH:mm')}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={value}
          onValueChange={handleDateChange}
          mode="datetime"
          displayFullDays={true}
          headerContainerStyle={styles.headerContainer}
          headerTextStyle={styles.headerText}
          headerButtonStyle={styles.headerButton}
          buttonPrevIcon={<Text style={styles.buttonText}>{'<'}</Text>}
          buttonNextIcon={<Text style={styles.buttonText}>{'>'}</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#F5FCFF',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerButton: {
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  input: {
    width: '100%',
    borderRadius: 5,
    padding: 10,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontWeight: themeStyle.FONT_WEIGHT_LIGHT,
    borderColor: themeStyle.COLOR_INACTIVE,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: themeStyle.COLOR_WHITE,
  },
  label: {
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontWeight: themeStyle.FONT_WEIGHT_LIGHT,
    textAlign: 'left',
    width: '100%',
    marginBottom: 5,
  },
});

export default EventDatePicker;