import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import themeStyle from '../styles/theme.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getEvents } from '../services/eventService';
import UserEventItem from '../components/items/UserEventItem';

const SearchEvents = () => {
    const route = useRoute();
    const initialSearchValue = route.params?.searchValue || '';
    const [searchValue, setSearchValue] = useState(initialSearchValue);
    const [events, setEvents] = useState([]);

    const handleSearch = async () => {
        await getEvents(searchValue).then(events => {
            setEvents(events);
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        handleSearch();
    }, [searchValue]);


    const renderEvents = () => {  
        if(searchValue == ""){
            return <Text style={styles.text}>Search for events</Text>
        } else if(events.length == 0){
            return <Text style={styles.text}>No events found</Text>
        } else {
            return events.map(event => {
                return <UserEventItem style={styles.eventItem} key={event.id} event={event} />
            })
        }
    }

  return (
    <View style={styles.container}>
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
        <ScrollView>
            {renderEvents()}
        </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      padding: themeStyle.DEFAULT_PADDING,
    },
    searchBar: {
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 8,
        borderColor: themeStyle.COLOR_BLACK,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
      color: themeStyle.COLOR_BLACK,
    },
    text: {
        padding: 16,
        fontSize: themeStyle.FONT_SIZE_SMALL,
        textAlign: 'center',
    },
    eventItem: {
        borderBottomColor: themeStyle.COLOR_INACTIVE,
        borderBottomWidth: 1,
    }
  });

export default SearchEvents;
