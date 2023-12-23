import React, { useContext, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getEvents } from '../services/eventService';
import UserEventItem from '../components/items/UserEventItem';
import themeStyle from '../styles/theme.style';

const SearchEvents = () => {
  const route = useRoute();
  const initialSearchValue = route.params?.searchValue || '';
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [events, setEvents] = useState([]);
  const { theme } = useContext(ThemeContext);

  const handleSearch = async () => {
    await getEvents(searchValue)
      .then((events) => {
        setEvents(events);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  const renderEvents = () => {
    if (searchValue === '') {
      return <Text style={[styles.text, { color: theme.COLOR_TEXT }]}>Search for events</Text>;
    } else if (events.length === 0) {
      return <Text style={[styles.text, { color: theme.COLOR_TEXT }]}>No events found</Text>;
    } else {
      return events.map((event) => {
        return <UserEventItem navigationLink="EventDetailNavigatorDashboard" style={styles.eventItem} key={event.id} event={event} />;
      });
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.COLOR_BACKGROUND_ROOT}]}>
      <View style={[styles.searchBar, { backgroundColor: theme.COLOR_BACKGROUND, borderColor: theme.COLOR_BORDER, color: theme.COLOR_TEXT }]}>
        <TextInput
          style={[styles.input, { color: theme.COLOR_TEXT }]}
          placeholder="Search for events"
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
          onSubmitEditing={handleSearch}
        />
        <Pressable onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="arrow-forward" size={24} color={theme.COLOR_TEXT} />
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>{renderEvents()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: themeStyle.DEFAULT_PADDING,
    flex: 1,
  },
  searchBar: {
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    padding: 16,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    borderBottomWidth: 0,
    width: '100%',
  },
  searchButton: {
    padding: 16,
  },
  text: {
    padding: 16,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    textAlign: 'center',
  },
  eventItem: {
    borderBottomColor: themeStyle.COLOR_INACTIVE,
    borderBottomWidth: 1,
  },
});

export default SearchEvents;
