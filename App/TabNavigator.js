import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Ionicon from "react-native-vector-icons/Ionicons";

import DiscoverScreen from "./main/screens/DiscoverScreen";
import SignupScreen from "./main/screens/SignupScreen";
import LoginScreen from "./main/screens/LoginScreen";
import HomeScreen from "./main/screens/HomeScreen";
import SectionScreen from "./main/screens/SectionScreen";

import MapEntry from "./map/map_entry";

import LoginPage from "./Personal/main";

import { createAppContainer } from "react-navigation";
import CollectionScreen from "./main/screens/CollectionScreen";

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const HomeStack = createStackNavigator(
	{
		Home: HomeScreen,
		Section: SectionScreen,
		Discover: DiscoverScreen,
		Signup: SignupScreen,
		Login: LoginScreen,
		Collection: CollectionScreen,
	},
	{
		mode: "modal",
		headerMode: "none",
	}
);

HomeStack.navigationOptions = ({ navigation }) => {
	var tabBarVisible = true;
	const routeName = navigation.state.routes[navigation.state.index].routeName;

	return {
		tabBarVisible,
		tabBarLabel: "Home",
		tabBarIcon: ({ focused }) => <Ionicon name="ios-home" size={26} color={focused ? activeColor : inactiveColor} />,
	};
};

const MapPage = ({ route, navigation }) => {
	return <MapEntry route={route} navigation={navigation} />;
};

const MapStack = createStackNavigator(
	{
		Map: MapPage,
	},
	{ headerMode: "none" }
);

MapStack.navigationOptions = {
	tabBarLabel: "Map",
	tabBarIcon: ({ focused }) => <Ionicon name="ios-map" size={26} color={focused ? activeColor : inactiveColor} />,
};

const UserStack = createStackNavigator({
	User: LoginPage,
});

UserStack.navigationOptions = {
	tabBarLabel: "User",
	tabBarIcon: ({ focused }) => <Ionicon name="ios-settings" size={26} color={focused ? activeColor : inactiveColor} />,
};

const TabNavigator = createBottomTabNavigator({
	HomeStack,
	MapStack,
	// UserStack,
});

export default createAppContainer(TabNavigator);
