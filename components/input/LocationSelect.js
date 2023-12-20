import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import themeStyle from '../../styles/theme.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getLocations, getTopLocations } from '../../services/locationService';
import LocationItemInAddUser from '../items/LocationItemInAddUser';

const LocationSelect = ({ location, setLocation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [locations, setLocations] = useState([]);

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
                <Pressable onPress={() => setModalVisible(true)}>
                    <LocationItemInAddUser location={location}/>
                </Pressable>
            ) : (
                <View>
                    <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
                        <Text>Select an option</Text>
                        <Ionicons name="chevron-down-outline" size={20} />
                    </Pressable>
                </View>
            )}
            <Modal visible={modalVisible} animationType="slide">
                <TextInput
                    placeholder="Search"
                    value={searchValue}
                    onChangeText={(value) => setSearchValue(value)}
                    style={styles.input}
                />
                <FlatList
                    data={locations}
                    renderItem={({ item }) => (
                        <Pressable style={styles.listItem} onPress={() => handleSelect(item)}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text>{item.address}</Text>    
                        </Pressable>
                    )}
                />

                <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 5,
        padding: 10,
        fontSize: themeStyle.FONT_SIZE_SMALL,
        fontWeight: themeStyle.FONT_WEIGHT_LIGHT,
        borderColor: themeStyle.COLOR_INACTIVE,
        borderWidth: 1,
        flexDirection: 'row',
    },
    input: {
        borderRadius: 5,
        padding: 10,
        fontSize: themeStyle.FONT_SIZE_SMALL,
        fontWeight: themeStyle.FONT_WEIGHT_LIGHT,
        borderColor: themeStyle.COLOR_INACTIVE,
        borderWidth: 1,
        margin: 10,
    },
    listItem: {
        padding: 10,
        flex: 1,
        borderBottomColor: themeStyle.COLOR_INACTIVE,
        borderBottomWidth: 1,
    },
    name: {
        fontSize: themeStyle.FONT_SIZE_MEDIUM,
        fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
    },
    closeButton: {
        backgroundColor: themeStyle.COLOR_PRIMARY,
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    closeButtonText: {
        color: themeStyle.COLOR_WHITE,
        textAlign: 'center',
    },  
});

export default LocationSelect;