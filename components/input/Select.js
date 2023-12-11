import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';

const Select = ({ options, onSelect }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelect = (option) => {
        onSelect(option);
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>Select an option</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide">
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSelect(item)}>
                            <Text>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                />

                <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default Select;
