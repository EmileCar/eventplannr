import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditEvent from "../screens/EditEvent";
import EventDetail from "../screens/EventDetail";
import Profile from "../screens/Profile";

export const ProfileNavigator = () => {
    const ProfileStack = createNativeStackNavigator();

    return (
        <ProfileStack.Navigator 
            options={() => ({
                headerShown: false,
            })}
        >
            <ProfileStack.Screen
                options={() => ({
                    title: `Your profile`,
                    headerShown: false,
                })}
                name="Profile" component={Profile} />
            <ProfileStack.Screen
                options={() => ({
                    title: `Edit Event`,
                })}
                name="EditEvent" component={EditEvent} />
            <ProfileStack.Screen
                options={() => ({
                    title: `Event Detail`,
                })}
                name="EventDetail" component={EventDetail} />
        </ProfileStack.Navigator>
    );
};