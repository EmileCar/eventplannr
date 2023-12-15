import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditEvent from "../screens/EditEvent";
import EventDetail from "../screens/EventDetail";

export const EventDetailNavigator = () => {
    const route = useRoute();
    const navigation = useNavigation();
    console.log(route.params)
    const EventDetailStack = createNativeStackNavigator();

    return (
        <EventDetailStack.Navigator 
            options={() => ({
                headerShown: false,
            })}
        >
            <EventDetailStack.Screen
                options={() => ({
                    title: `Event Detail`,
                })}
                name="EventDetail" component={EventDetail} />
            <EventDetailStack.Screen
                options={() => ({
                    title: `Edit Event`,
                })}
                name="EditEvent" component={EditEvent} />
        </EventDetailStack.Navigator>
    );
};
