import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import themeStyle from '../../styles/theme.style';

const LocationItemInAddUser = ({location}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{location.name}</Text>
            <Text>{location.address}</Text>
        </View>
    );
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

export default LocationItemInAddUser;
