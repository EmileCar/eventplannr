import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import EventDetail from '../screens/EventDetail';
import UserEvents from '../screens/UserEvents';
import AddEvent from '../screens/EditEvent';
import AddLocation from '../screens/AddLocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import themeStyle from '../styles/theme.style';
import { EventDetailNavigator } from './EventDetailNavigator';

export const UserEventsNavigator = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const UserEventsStack = createNativeStackNavigator();

    return (
        <UserEventsStack.Navigator>
            <UserEventsStack.Screen
                name="UserEvents"
                component={UserEvents}
                options={{
                    title: 'Your Events',
                    headerStyle: {
                        backgroundColor: themeStyle.COLOR_PRIMARY,
                    },
                    headerTintColor: themeStyle.COLOR_WHITE,
                    headerRight: () => (
                        <Pressable
                            style={{ marginRight: 16 }}
                            onPress={() => navigation.navigate('AddEvent')}
                        >
                            <Ionicons name="add" size={24} color={themeStyle.COLOR_WHITE} />
                        </Pressable>
                    ),
                }}
            />
            <UserEventsStack.Screen
                name="EventDetailNavigator"
                component={EventDetailNavigator}
                options={{
                headerShown: false,
                }}
            />
            <UserEventsStack.Screen
                options={() => ({
                    title: 'Add Event',
                })}
                name="AddEvent" component={AddEvent} 
            />
            <UserEventsStack.Screen
                options={() => ({
                    title: `Add Location`,
                })}
                name="AddLocation" component={AddLocation} 
            />
        </UserEventsStack.Navigator>
    );
};
