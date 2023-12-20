import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { Avatar, ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteEvent, getEventsOfUser } from '../services/eventService';
import getDefaultImage from '../utils/eventImageUtil';
import { formatDate } from '../utils/datetimeUtils';
import { useNavigation } from '@react-navigation/native';
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
      <ListItem bottomDivider>
      <Pressable onPress={() => toggleTheme()}>
        <ListItem.Content>
          <ListItem.Title>Change theme</ListItem.Title>
        </ListItem.Content>
      </Pressable>
      <ListItem.Swipeable />
    </ListItem>

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
                <ListItem.Subtitle>{formatDate(event.startDateTime)}</ListItem.Subtitle>
              </View>
              <View style={styles.buttons}>
                <Pressable style={styles.button} onPress={() => navigation.navigate("EditEvent", {event})}>
                  <Ionicons name='pencil' size={"large"} color={theme.COLOR_ICON}/>
                </Pressable>
                <Pressable style={styles.button} onPress={() => {
                  setEventToDelete(event);
                  setShowDeleteAlert(true);
                }}>
                  <Ionicons name='trash' size={"large"} color={theme.COLOR_ICON}/>
                </Pressable>
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </ListItem.Accordion>
      <Pressable onPress={() => logOut()} style={{ marginTop: 30 }}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Sign out</ListItem.Title>
          </ListItem.Content>
          <Ionicons name='arrow-forward' size={"large"} color={theme.COLOR_ICON}/>
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
    with: "100%",
  },
  topSectionContent: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  username: {
    fontSize: themeStyle.FONT_SIZE_DISPLAY,
    fontWeight: themeStyle.FONT_WEIGHT_BOLD,
    with: "100%",
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
