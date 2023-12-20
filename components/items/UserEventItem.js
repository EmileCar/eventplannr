import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import themeStyle from '../../styles/theme.style';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getEventDay, getEventMonth } from '../../utils/datetimeUtils';
import { ThemeContext } from '../../contexts/ThemeContext';

const UserEventItem = ({ event }) => {
	const navigation = useNavigation();
	const { theme } = useContext(ThemeContext)
	const navigateToEventDetail = (eventId) => {
		navigation.navigate('EventDetailNavigator', { screen: 'EventDetail', params: { eventId } });
	};

	const renderEventMonthAndDay = (date) => {
		if (!date) {
		  	return <Text style={[styles.dateText, {color: theme.COLOR_TEXT_WHITE}]}> ? </Text>;
		}
		return <>
		  	<Text style={[styles.dateText, {color: theme.COLOR_TEXT_WHITE}]}>{getEventMonth(event.startDateTime)}</Text>
		  	<Text style={[styles.dateText, {color: theme.COLOR_TEXT_WHITE}]}>{getEventDay(event.startDateTime)}</Text>
		</>;
	  }

  return (
	<TouchableOpacity onPress={() => navigateToEventDetail(event.id)}>
		<View style={styles.container}>
			<View style={[styles.dateContainer, {backgroundColor: theme.COLOR_HEADER}]}>
				{renderEventMonthAndDay(event.startDateTime)}
			</View>
			<View style={styles.content}>
				<Text style={[styles.title, {color: theme.COLOR_TEXT}]}>{event.title}</Text>
				<View style={styles.wrapper}>
					<Ionicons name="location" size={themeStyle.FONT_SIZE_MEDIUM} color={theme.COLOR_ICON} />
					{event.location ? <Text style={[styles.text, {color: theme.COLOR_TEXT}]}>{event.location.name}</Text> : <Text style={{ color: theme.COLOR_TEXT}}>???</Text>}
				</View>
				<View style={styles.wrapper}>
					<Ionicons name="person" size={themeStyle.FONT_SIZE_MEDIUM} color={theme.COLOR_ICON} />
					{(event.organisators && event.organisators.length > 0) ? event.organisators.map((organisator) => (
					<Text key={organisator.name} style={[styles.text, {color: theme.COLOR_TEXT}]}>{organisator.name}</Text>
				)) : <Text style={{color: theme.COLOR_TEXT}}>???</Text>}
				</View>
			</View>
		</View>
	</TouchableOpacity>
  );
};

UserEventItem.propTypes = {
	event: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		startDateTime: PropTypes.instanceOf(Date).isRequired,
		location: PropTypes.shape({
	  		name: PropTypes.string,
		}),
		organisators: PropTypes.arrayOf(
	  	PropTypes.shape({
			name: PropTypes.string,
	  	})
		),
	}).isRequired,
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
		alignItems: 'center',
		justifyContent: 'center',
	},
	dateText: {
		textAlign: 'center',
		fontSize: themeStyle.FONT_SIZE_LARGE,
		fontWeight: themeStyle.FONT_WEIGHT_BOLD,
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
