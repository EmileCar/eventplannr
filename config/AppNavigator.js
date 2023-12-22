import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DashboardNavigator } from './DashboardNavigator';
import { UserEventsNavigator } from './UserEventsNavigator';
import { ProfileNavigator } from './ProfileNavigator';
import { ThemeContext } from '../contexts/ThemeContext';

// ROOT NAVIGATOR
const RootStack = createNativeStackNavigator();
export const RootNavigator = () => {
	return (
		<NavigationContainer>
			<RootStack.Navigator>
				<RootStack.Screen name="Tabs" component={TabNavigator} options={{headerShown : false}}/>
				{/* <RootStack.Screen name="Settings" component={Settings} /> */}
			</RootStack.Navigator>
		</NavigationContainer>
	);
};

// BOTTOM TAB NAVIGATOR
const BottomTab = createBottomTabNavigator();
const TabNavigator = () => {
	const { theme } = useContext(ThemeContext)
	return (
		<BottomTab.Navigator
			screenOptions={{
				tabBarActiveTintColor: theme.COLOR_WHITE,
				tabBarInactiveTintColor: theme.COLOR_INACTIVE,
				headerShown: false,
				tabBarBackgroundColor: theme.COLOR_BACKGROUND,
				tabBarActiveBackgroundColor: theme.COLOR_TABBARACTIVE,
				tabBarInactiveBackgroundColor: theme.COLOR_TABBARINACTIVE,
			}}
		>
			<BottomTab.Screen
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
					<Ionicons name="list" color={color} size={size} />
					),
				}}
				name="DashboardTab"
				component={DashboardNavigator}
			/>
			<BottomTab.Screen
				options={{
					tabBarLabel: 'User Events',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person" color={color} size={size} />
					),
					headerShown: false,
				}}
				name="UserEventsTab"
				component={UserEventsNavigator}
			/>
			<BottomTab.Screen
				options={{
					tabBarLabel: 'Your Profile',
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person" color={color} size={size} />
					),
				}}
				name="ProfileTab"
				component={ProfileNavigator}
			/>
		</BottomTab.Navigator>
	);
}
