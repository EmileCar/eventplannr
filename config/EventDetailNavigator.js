import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditEvent from "../screens/EditEvent";
import EventDetail from "../screens/EventDetail";
import { ThemeContext } from "../contexts/ThemeContext";

export const EventDetailNavigator = () => {
    const EventDetailStack = createNativeStackNavigator();
    const { theme } = useContext(ThemeContext)
    return (
        <EventDetailStack.Navigator 
            options={() => ({
                headerShown: false,
            })}
        >
            <EventDetailStack.Screen
                options={() => ({
                    title: `Event Detail`,
                    headerStyle: {
                        backgroundColor: theme.COLOR_HEADER,
                    },
                    headerTintColor: theme.COLOR_TEXT_WHITE,
                })}
                name="EventDetail" component={EventDetail} />
            <EventDetailStack.Screen
                options={() => ({
                    title: `Edit Event`,
                    headerStyle: {
                        backgroundColor: theme.COLOR_HEADER,
                    },
                    headerTintColor: theme.COLOR_TEXT_WHITE,
                })}
                name="EditEvent" component={EditEvent} />
        </EventDetailStack.Navigator>
    );
};
