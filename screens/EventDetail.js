import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import getDefaultImage from '../utils/eventImageUtil';
import themeStyle from '../styles/theme.style';
import { getEventById } from '../services/eventService';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import IonIcons from 'react-native-vector-icons/Ionicons';
import SwitchSelector from 'react-native-switch-selector';
import { changeAttendanceStatus, getAttendanceStatus } from '../services/userAttendanceService';

const AddEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultImage, setDefaultImage] = useState(null);
  const [event, setEvent] = useState({});
  const [statusNumber, setStatusNumber] = useState(null);
  const [error, setError] = useState(null);
  const route = useRoute();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const eventId = route.params.eventId;
    if (!eventId) {
      setError('Event not found');
      return;
    }
    getEventById(eventId)
      .then(async (event) => {
        setEvent(event);
        const attendanceStatus = await getAttendanceStatus(event.id).catch((err) => { console.log(err) });
        switch (attendanceStatus) {
          case 'GOING':
            setStatusNumber(0);
            break;
          case 'MAYBE':
            setStatusNumber(1);
            break;
          case 'NOT_GOING':
            setStatusNumber(2);
            break;
          default:
            setStatusNumber(2);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    if (event.title) {
      const defaultImage = getDefaultImage(event.title);
      setDefaultImage(defaultImage);
    }
  }, [event]);

  useEffect(() => {
    console.log(statusNumber)
  } , [statusNumber])

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const calculateDaysUntil = (date) => {
    const eventDate = new Date(date);
    const currentDate = new Date();
    const timeDifference = eventDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
  };

  const options = [
    { label: "Going", value: "GOING", testID: "switch-going", accessibilityLabel: "switch-to-going" },
    { label: "Maybe", value: "MAYBE", testID: "switch-maybe", accessibilityLabel: "switch-to-maybe" },
    { label: "Not going", value: "NOT_GOING", testID: "switch-notgoing", accessibilityLabel: "switch-to-not-going" }
  ];

  const changeAttendance = async (value) => {
    await changeAttendanceStatus(event.id, value).then(() => {
      console.log('success')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={defaultImage} style={styles.image} />
        <Text style={[styles.text, styles.title]}>{event.title}</Text>
        <Text style={[styles.text, styles.description]}>{event.description}</Text>
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <IonIcons style={styles.rowItemIcon} name="calendar" size={40} color={themeStyle.COLOR_PRIMARY} />
            <View>
              <Text style={styles.text}>{formatDate(event.startDate)}</Text>
              <Text style={[styles.text, {fontWeight: themeStyle.FONT_WEIGHT_MEDIUM}]}>{`in ${calculateDaysUntil(
                event.startDate
              )} days`}</Text>
            </View>
          </View>
          <View style={styles.rowItem}>
            <IonIcons style={styles.rowItemIcon} name="location" size={40} color={themeStyle.COLOR_PRIMARY} />
            <View>
              {event.location ? 
                <>
                  <Text style={[styles.text, styles.bold]}>{event.location.name}</Text>
                  <Text style={styles.text}>{event.location.address}</Text>
                </>
              : <Text style={styles.null}>???</Text>}
            </View>
          </View>
          <View style={styles.rowItem}>
            <IonIcons style={styles.rowItemIcon} name="person" size={40} color={themeStyle.COLOR_PRIMARY} />
            <View>
              {event.organisators && event.organisators.length > 0 ? 
              
                <>
                  <Text style={styles.text}>This event is from</Text>
                  {event.organisators.map(organisator => {
                    return <Text style={[styles.text, styles.bold]} key={organisator.name}>{organisator.name}</Text>
                  })}
                </>
              : <Text style={styles.null}>???</Text>}
            </View>          
          </View>
        </View>
        {statusNumber !== null &&
          <SwitchSelector
          initial={statusNumber}
          onPress={value => changeAttendance(value)}
          textColor={themeStyle.COLOR_PRIMARY}
          selectedColor={themeStyle.COLOR_WHITE}
          buttonColor={themeStyle.COLOR_PRIMARY}
          borderColor={themeStyle.COLOR_PRIMARY}
          hasPadding
          options={options}
          style={styles.switchSelector}
          testID="attendance-switch-selector"
          accessibilityLabel="attendance-switch-selector"
        />
        }
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
  description: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: themeStyle.DEFAULT_PADDING,
  },
  rowItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeStyle.COLOR_WHITE,
    borderRadius: 10,
    padding: 10,
    shadowColor: themeStyle.COLOR_BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    minWidth: 150,
  },
  rowItemIcon: {
  },
  bold: {
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
  },
  null: {
    color: themeStyle.COLOR_INACTIVE,
    fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
    fontSize: themeStyle.FONT_SIZE_DISPLAY,
  },
  switchSelector: {
    marginTop: 20,
  }
});

export default AddEvent;
