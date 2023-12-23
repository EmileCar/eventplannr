import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import getDefaultImage from '../utils/eventImageUtil';
import themeStyle from '../styles/theme.style';
import { deleteEvent, getEventById } from '../services/eventService';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import IonIcons from 'react-native-vector-icons/Ionicons';
import SwitchSelector from 'react-native-switch-selector';
import { changeAttendanceStatus, getAttendanceStatus } from '../services/userAttendanceService';
import { calculateTimeUntil, formatDate } from '../utils/datetimeUtils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../contexts/ThemeContext';
import Button from '../components/buttons/Button';

const EventDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultImage, setDefaultImage] = useState(null);
  const [event, setEvent] = useState({});
  const [statusNumber, setStatusNumber] = useState(null);
  const [error, setError] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext)

  const options = [
    { label: "Going", value: "GOING", testID: "switch-going", accessibilityLabel: "switch-to-going" },
    { label: "Maybe", value: "MAYBE", testID: "switch-maybe", accessibilityLabel: "switch-to-maybe" },
    { label: "Not going", value: "NOT_GOING", testID: "switch-notgoing", accessibilityLabel: "switch-to-not-going" }
  ];

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    setIsLoading(true);
    const eventId = route.params.eventId;
    if (!eventId) {
      setError('Event not found');
      return;
    }

    try {
      const eventDetails = await getEventById(eventId);
      setEvent(eventDetails);

      const attendanceStatus = await getAttendanceStatus(eventDetails.id);
      setStatusNumber(options.findIndex(option => option.value === attendanceStatus));

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (event.title) {
      const defaultImage = getDefaultImage(event.title);
      setDefaultImage(defaultImage);
    }
  }, [event]);

  useFocusEffect(
    useCallback(() => {
      fetchEventData();
    }, [])
  );

  const changeAttendance = async (value) => {
    try {
      await changeAttendanceStatus(event.id, value);
    } catch (err) {
      setError(err.message);
    }
  }

  const isOrganisator = () => {
    return event.organisators ? event.organisators.some(organizer => organizer.email === currentUser.email) : false;
  };

  const deleteEventFunc = async () => {
    try {
      await deleteEvent(event.id);
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
  }

  const renderRowItem = (iconName, primaryText, secondaryText) => (
    <View style={[styles.rowItem, { backgroundColor: theme.COLOR_ROWITEM }]}>
      <Ionicons style={styles.rowItemIcon} name={iconName} size={40} color={theme.COLOR_ICON} />
      <View>
        <Text style={[styles.text, { color: theme.COLOR_TEXT }]}>{primaryText}</Text>
        <Text style={[styles.text, { fontWeight: themeStyle.FONT_WEIGHT_MEDIUM, color: theme.COLOR_TEXT }]}>{secondaryText}</Text>
      </View>
    </View>
  );
    
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, backgroundColor: theme.COLOR_BACKGROUND_ROOT}}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.COLOR_ICON} />
        ) : (
          <>
            {error && <Text style={{color: theme.COLOR_ERROR, textAlign: "center"}}>{error}</Text>}
            <Image source={defaultImage} style={styles.image} />
            <Text style={[styles.text, styles.title, {color: theme.COLOR_TEXT}]}>{event.title}</Text>
            <Text style={[styles.text, {marginBottom: 16, color: theme.COLOR_TEXT}]}>{event.description}</Text>
            <View style={styles.row}>
              {renderRowItem("calendar", formatDate(event.startDateTime), calculateTimeUntil(event.startDateTime))}
              {renderRowItem("location", event.location ? event.location.name : "???", event.location ? event.location.address : "???")}
              {renderRowItem("person", "This event is from", event.organisators ? event.organisators.map(organizer => organizer.name) : ["???"])}
            </View>
            {statusNumber !== null && (
              <SwitchSelector
                initial={statusNumber}
                onPress={value => changeAttendance(value)}
                textColor={theme.COLOR_TEXT_AUTH}
                selectedColor={theme.COLOR_BACKGROUND}
                buttonColor={theme.COLOR_TEXT_AUTH}
                borderColor={theme.COLOR_BUTTON}
                backgroundColor={theme.COLOR_BACKGROUND}
                hasPadding
                options={options}
                style={{marginTop: 20, marginBottom: 16}}
                testID="attendance-switch-selector"
                accessibilityLabel="attendance-switch-selector"
              />
            )}
            {isOrganisator() && 
            <View style={{gap: 8}}>
              <Button icon={<IonIcons name="pencil" size={themeStyle.FONT_SIZE_SMALL} color={theme.COLOR_WHITE}/>} text="Edit event" onPress={() => navigation.navigate("EditEvent", { event })} />
              <Button icon={<IonIcons name="trash" size={themeStyle.FONT_SIZE_SMALL} color={theme.COLOR_WHITE}/>} text="Delete event" onPress={() => deleteEventFunc()} color={theme.COLOR_ERROR}/>
            </View>}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: themeStyle.DEFAULT_PADDING,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
  },
  text: {
    padding: 10,
    fontSize: themeStyle.FONT_SIZE_SMALL,
    fontWeight: themeStyle.FONT_WEIGHT_LIGHT,
    textAlign: 'center',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 0,
    fontSize: themeStyle.FONT_SIZE_LARGE,
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: themeStyle.DEFAULT_PADDING,
  },
  rowItem: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    minWidth: 150,
  },
  bold: {
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
  },
  null: {
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
    fontSize: themeStyle.FONT_SIZE_DISPLAY,
  },
  delete: {
    backgroundColor: themeStyle.COLOR_ERROR,
    marginBottom: 30,
  }
});

export default EventDetail;
