import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import themeStyle from '../../styles/theme.style';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getEventDay, getEventMonth } from '../../utils/datetimeUtils';

const UserEventItem = ({ event }) => {
    const navigation = useNavigation();
    const navigateToEventDetail = (eventId) => {
        navigation.navigate('EventDetailNavigator', { screen: 'EventDetail', params: { eventId } });
    };

    const renderEventMonthAndDay = (date) => {
        if (!date) {
          return <Text style={styles.dateText}> ? </Text>;
        }
        return <>
          <Text style={styles.dateText}>{getEventMonth(event.startDateTime)}</Text>
          <Text style={styles.dateText}>{getEventDay(event.startDateTime)}</Text>
        </>;
      }

  return (
    <TouchableOpacity onPress={() => navigateToEventDetail(event.id)}>
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                {renderEventMonthAndDay(event.startDateTime)}
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{event.title}</Text>
                <View style={styles.wrapper}>
                    <Ionicons name="location" size={themeStyle.FONT_SIZE_MEDIUM} color={themeStyle.COLOR_PRIMARY} />
                    {event.location ? <Text style={styles.text}>{event.location.name}</Text> : <Text>???</Text>}
                </View>
                <View style={styles.wrapper}>
                    <Ionicons name="person" size={themeStyle.FONT_SIZE_MEDIUM} color={themeStyle.COLOR_PRIMARY} />
                    {(event.organisators && event.organisators.length > 0) ? event.organisators.map((organisator) => (
                    <Text key={organisator.name} style={styles.text}>{organisator.name}</Text>
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
