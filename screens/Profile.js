import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { Avatar, ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteEvent, getEventsOfUser } from '../services/eventService';
import getDefaultImage from '../utils/eventImageUtil';
import { formatDate, formatShortDateTime } from '../utils/datetimeUtils';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import themeStyle from '../styles/theme.style';
import { ThemeContext } from '../contexts/ThemeContext';

const Profile = () => {
  const { currentUser, logOut} = useContext(AuthContext)
  const [userEvents, setUserEvents] = useState(null) 
  const [expandedEvents, setExpandedEvents] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const navigation = useNavigation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if(currentUser){
      fetchUserData()
    }
  }, [currentUser])

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const fetchUserData = async () => {
    await getEventsOfUser(currentUser.id).then((data) => { 
      setUserEvents(data)
    }).catch((err) => { console.log(err) })
  }

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      const updatedEvents = userEvents.filter(event => event.id !== eventId);
      setUserEvents(updatedEvents);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.COLOR_BACKGROUND_ROOT}]}>
      <View style={[styles.topSection, {backgroundColor: theme.COLOR_HEADER}]}>
        <Text style={[styles.header, {color: theme.COLOR_TEXT_WHITE}]}>Profile Settings</Text>
        <View style={styles.topSectionContent}>
          <Text style={[styles.username, {color: theme.COLOR_TEXT_WHITE}]}>{currentUser.username}</Text>
          <Text style={[styles.email, {color: theme.COLOR_TEXT_WHITE}]}>{currentUser.email}</Text>
          {userEvents &&
            <Text style={[styles.eventsCreated, {color: theme.COLOR_TEXT_WHITE}]}>Events created: {userEvents.length}</Text>
          }
        </View>
      </View>
      <Pressable onPress={() => toggleTheme()}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ color: "black" }}>Change theme</ListItem.Title>
          </ListItem.Content>
          <ListItem.Swipeable />
        </ListItem>
      </Pressable>


    <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title>Your events</ListItem.Title>
            <ListItem.Subtitle>Tap to expand</ListItem.Subtitle>
          </ListItem.Content>
        }
        isExpanded={expandedEvents}
        onPress={() => {
          setExpandedEvents(!expandedEvents);
        }}
      >
        {userEvents && userEvents.map((event) => (
          <ListItem key={event.id}>
            <Avatar
              rounded
              source={getDefaultImage(event.title)}
            />
            <ListItem.Content style={styles.eventContent}>
              <View>
                <ListItem.Title>{event.title}</ListItem.Title>
                <ListItem.Subtitle>{formatShortDateTime(new Date(event.startDateTime))}</ListItem.Subtitle>
              </View>
              <View style={styles.buttons}>
                <Pressable style={styles.button} onPress={() => navigation.navigate("EditEvent", {event})}>
                  <Text style={{color: theme.COLOR_ICON}}>Edit</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => {
                  setEventToDelete(event);
                  setShowDeleteAlert(true);
                }}>
                  <Text style={{color: theme.COLOR_ERROR}}>Delete</Text>
                </Pressable>
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </ListItem.Accordion>
      <Pressable onPress={() => logOut()}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ color: "black" }}>Sign out</ListItem.Title>
          </ListItem.Content>
          <ListItem.Swipeable />
        </ListItem>
      </Pressable>
      <AwesomeAlert
        show={showDeleteAlert}
        title="Confirm Deletion"
        message="Are you sure you want to delete this event?"
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Delete"
        confirmButtonColor={theme.COLOR_ERROR}
        onCancelPressed={() => {
          setShowDeleteAlert(false);
          setEventToDelete(null);
        }}
        onConfirmPressed={() => {
          handleDeleteEvent(eventToDelete.id);
          setShowDeleteAlert(false);
          setEventToDelete(null);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 500,
    width: "100%",
  },
  topSectionContent: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  username: {
    fontSize: themeStyle.FONT_SIZE_DISPLAY,
    fontWeight: 500,
    width: "100%",
    textAlign: "center",
    alignSelf: "center",
  },
  email: {
    textAlign: "center",
  },
  eventsCreated: {
    textAlign: "center",
    paddingTop: 16,
  },
  eventContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttons: {
    alignSelf: "end",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
  },
});

export default Profile;
