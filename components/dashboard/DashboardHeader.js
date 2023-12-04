import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import themeStyle from '../../styles/theme.style';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DashboardHeader = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        // Navigate to the results component with the search value
        navigation.navigate('Results', { searchValue });
      };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Discover events and parties!</Text>
        <View style={styles.searchBar}>
            <TextInput
            style={styles.input}
            placeholder="Search for events"
            value={searchValue}
            onChangeText={(text) => setSearchValue(text)}
            onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                <Ionicons name="arrow-forward" size={24} color="black" />
            </TouchableOpacity>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeStyle.COLOR_PRIMARY, 
    width: '100%',
    padding: themeStyle.DEFAULT_PADDING,
    paddingTop: 40,
    marginBottom: 50,
  },
  title: {
    fontSize: themeStyle.FONT_SIZE_DISPLAY,
    fontWeight: themeStyle.FONT_WEIGHT_BOLD,
    color: themeStyle.COLOR_WHITE,
  },
  searchBar: {
    position: 'relative',
    top: "50%",
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 8,
    shadowColor: themeStyle.COLOR_BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    padding: 16,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    borderColor: 'transparent',
    borderBottomWidth: 0, 
    outlineColor: 'transparent', 
    outlineStyle: 'none',
    width: '100%',
  },
  searchButton: {
    padding: 16,
  },
});

export default DashboardHeader;
