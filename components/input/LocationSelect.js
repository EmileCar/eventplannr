import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Modal, FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import themeStyle from '../../styles/theme.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getLocations, getTopLocations } from '../../services/locationService';
import { ThemeContext } from '../../contexts/ThemeContext';
import Button from '../buttons/Button';
import LocationItemInAddEvent from '../items/LocationItemInAddEvent';

const LocationSelect = ({ location, setLocation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [locations, setLocations] = useState([]);
    const { theme } = useContext(ThemeContext)

    const handleSelect = (option) => {
        setLocation(option);
        setModalVisible(false);
    };

    useEffect(() => {
        fetchTopLocations();
    }, []);

    useEffect(() => {
        if (searchValue.length > 0) {
            fetchLocations();
        } else {
            fetchTopLocations();
        }
    }, [searchValue]);

    const fetchLocations = async () => {
        await getLocations(searchValue).then(locations => {
            setLocations(locations);
        }).catch(err => {
            console.log(err);
        })
    }

    const fetchTopLocations = async () => {  
        await getTopLocations().then(locations => {
          
          setLocations(locations);
        }).catch(err => {
          console.log(err);
        })
      }

    return (
        <>
            {location ? (
                <View>
                    <Pressable onPress={() => setModalVisible(true)}>
                        <LocationItemInAddEvent location={location}/>
                    </Pressable>
                </View>
            ) : (
                <View>
                    <Pressable style={[styles.button, {backgroundColor: theme.COLOR_BACKGROUND, borderColor: theme.COLOR_BORDER}]} onPress={() => setModalVisible(true)}>
                        <Text style={{color: theme.COLOR_TEXT}}>Select an option</Text>
                        <Ionicons name="chevron-down-outline" size={20} color={theme.COLOR_TEXT} />
                    </Pressable>
                </View>
            )}
            <Modal visible={modalVisible} animationType="slide">
                <View style={{backgroundColor: theme.COLOR_BACKGROUND_ROOT, flex:1}}>
                    <TextInput
                        placeholder="Search"
                        value={searchValue}
                        onChangeText={(value) => setSearchValue(value)}
                        style={[styles.input, { color: theme.COLOR_TEXT, backgroundColor: theme.COLOR_BACKGROUND, borderColor: theme.COLOR_BORDER}]}
                    />
                    <FlatList
                        data={locations}
                        renderItem={({ item }) => (
                            <Pressable style={[styles.listItem, { borderBottomColor: theme.COLOR_BORDER}]} onPress={() => handleSelect(item)}>
                                <Text style={[styles.name, {color: theme.COLOR_TEXT}]}>{item.name}</Text>
                                <Text style={{color: theme.COLOR_TEXT}}>{item.address}</Text>    
                            </Pressable>
                        )}
                    />
                    <View style={{margin: themeStyle.DEFAULT_PADDING}} >
                        <Button text="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </>
    );
};

LocationSelect.propTypes = {
    location: PropTypes.object, 
    setLocation: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        fontSize: themeStyle.FONT_SIZE_SMALL,
        fontWeight: themeStyle.FONT_WEIGHT_LIGHT,
        borderWidth: 1,
        flexDirection: 'row',
    },
    input: {
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        fontSize: themeStyle.FONT_SIZE_SMALL,
        fontWeight: themeStyle.FONT_WEIGHT_LIGHT,
        borderWidth: 1,
        margin: 10,
    },
    listItem: {
        padding: 10,
        flex: 1,
        borderBottomWidth: 1,
    },
    name: {
        fontSize: themeStyle.FONT_SIZE_MEDIUM,
        fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
    }
});

export default LocationSelect;
