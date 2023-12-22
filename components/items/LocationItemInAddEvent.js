import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import themeStyle from '../../styles/theme.style';
import { ThemeContext } from '../../contexts/ThemeContext';

const LocationItemInAddEvent = ({ location }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <View style={[styles.container, { backgroundColor: theme.COLOR_ROWITEM }]}>
            <Text style={[styles.title, { color: theme.COLOR_TEXT }]}>{location.name}</Text>
            <Text style={{ color: theme.COLOR_TEXT }}>{location.address}</Text>
        </View>
    );
};

LocationItemInAddEvent.propTypes = {
    location: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: themeStyle.COLOR_WHITE,
        padding: 10,
        flex: 1,
    },
    title: {
        fontSize: themeStyle.FONT_SIZE_MEDIUM,
        fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
    },
});

export default LocationItemInAddEvent;
