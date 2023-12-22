import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Pressable, ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';

const Button = ({ isLoading, onPress, text, color, icon }) => {
	const { theme } = useContext(ThemeContext)

	if(!color) {
		color = theme.COLOR_BUTTON;
	}

	return (
		<Pressable
			style={[styles.button, { backgroundColor: color, color: theme.COLOR_BUTTON_TEXT }]}
			onPress={onPress}
		>
			{isLoading ? (
				<ActivityIndicator size="small" color={theme.COLOR_BUTTON_TEXT} />
			) : (
				<View style={{flexDirection: "row", justifyContent: "center", gap: 8}}>
					{icon}
					<Text style={{textAlign: "center", color: theme.COLOR_BUTTON_TEXT}}>{text}</Text>
				</View>
			)}
		</Pressable>
	);
};

Button.propTypes = {
	isLoading: PropTypes.bool,
	onPress: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	color: PropTypes.string,
	icon: PropTypes.element,
};

const styles = StyleSheet.create({
	button: {
		padding: 10,
		borderRadius: 5,
		textAlign: 'center',
		width: "100%",
	}
});

export default Button;