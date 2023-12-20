import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import themeStyle from '../../styles/theme.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../contexts/ThemeContext';

const DashboardHeader = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext)

    const handleSearch = () => {
      navigation.navigate('SearchEvents', { searchValue });
    };

    return (
        <View style={[styles.container, {backgroundColor: theme.COLOR_PRIMARY}]}>
          <Text style={[styles.title, {color: theme.COLOR_TEXT_HEADER}]}>Discover events and parties!</Text>
          <View style={[styles.searchBar, {backgroundColor: theme.COLOR_BACKGROUND}]}>
            <TextInput
              style={styles.input}
              placeholder="Search for events"
              value={searchValue}
              onChangeText={(text) => setSearchValue(text)}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                <Ionicons name="arrow-forward" size={24} color={theme.COLOR_TEXT} />
            </TouchableOpacity>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: themeStyle.DEFAULT_PADDING,
    paddingTop: 40,
    paddingBottom: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: themeStyle.FONT_SIZE_DISPLAY,
    fontWeight: themeStyle.FONT_WEIGHT_BOLD,
  },
  searchBar: {
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 40,
  },
  input: {
    padding: 16,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    width: '100%',
  },
  searchButton: {
    padding: 16,
  },
});

export default DashboardHeader;
