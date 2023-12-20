import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import themeStyle from '../../styles/theme.style';
import { ThemeContext } from '../../contexts/ThemeContext';

const EventDatePicker = ({ value, onValueChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useContext(ThemeContext)

  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (date) => {
    setShowDatePicker(false);
    onValueChange(date);
  };

  return (
    <>
      <Pressable onPress={handleDatePress} style={[styles.input, {backgroundColor: theme.COLOR_BACKGROUND, borderColor: theme.COLOR_INACTIVE}]}>
        <Text>{dayjs(value).format('YYYY-MM-DD HH:mm')}</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={value}
          onValueChange={handleDateChange}
          mode="datetime"
          displayFullDays={true}
          headerContainerStyle={{backgroundColor: theme.COLOR_ITEM_BG}}
          headerTextStyle={{fontSize: themeStyle.FONT_SIZE_SMALL, fontWeight: themeStyle.FONT_WEIGHT_BOLD}}
          headerButtonStyle={{padding: 10}}
          buttonPrevIcon={<Text style={{fontSize: themeStyle.FONT_SIZE_MEDIUM}}>{'<'}</Text>}
          buttonNextIcon={<Text style={{fontSize: themeStyle.FONT_SIZE_MEDIUM}}>{'>'}</Text>}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
  }
});

export default EventDatePicker;