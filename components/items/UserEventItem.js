import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import themeStyle from '../../styles/theme.style';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserEventItem = ({ event }) => {
    const navigation = useNavigation();

    const navigateToEventDetail = (eventId) => {
        navigation.navigate('EventDetail', { eventId });
    };

    const getEventMonth = () => {
        const month = new Date(event.startDate).toLocaleString('default', { month: 'short' });
        
        return month;
    };

    const getEventDay = () => {
        const day = new Date(event.startDate).toLocaleString('default', { day: 'numeric' });
        return day;
    }

  return (
    <TouchableOpacity onPress={() => navigateToEventDetail(event.id)}>
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{getEventMonth()}</Text>
                <Text style={styles.dateText}>{getEventDay()}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{event.title}</Text>
                <View style={styles.wrapper}>
                    <Ionicons name="location" size={themeStyle.FONT_SIZE_MEDIUM} color={themeStyle.COLOR_PRIMARY} />
                    {event.location ? <Text style={styles.text}>{event.location.name}</Text> : <Text>???</Text>}
                </View>
                <View style={styles.wrapper}>
                    <Ionicons name="person" size={themeStyle.FONT_SIZE_MEDIUM} color={themeStyle.COLOR_PRIMARY} />
                    {event.organisators == [] ? event.organisators.map((organisator) => (
                    <Text key={organisator.id} style={styles.text}>{organisator.name}</Text>
                )) : <Text>???</Text>}
                </View>
                
            </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: themeStyle.DEFAULT_PADDING,
        marginBottom: 10,
        marginTop: 10,
    },
    dateContainer: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: themeStyle.COLOR_PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateText: {
        textAlign: 'center',
        fontSize: themeStyle.FONT_SIZE_LARGE,
        fontWeight: themeStyle.FONT_WEIGHT_BOLD,
        color: themeStyle.COLOR_WHITE,
    },
    content: {
        flex: 1,
    },
    title: {
      fontSize: themeStyle.FONT_SIZE_MEDIUM,
      fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
    },
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    text: {
      fontSize: themeStyle.FONT_SIZE_SMALL,
    },
});

export default UserEventItem;
