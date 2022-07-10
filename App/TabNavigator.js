import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Ionicon from "react-native-vector-icons/Ionicons";

import DiscoverScreen from "./main/screens/DiscoverScreen";
import SignupScreen from "./main/screens/SignupScreen";
import LoginScreen from "./main/screens/LoginScreen";
import HomeScreen from "./main/screens/HomeScreen";
import SectionScreen from "./main/screens/SectionScreen";

import Oops from "./map/oops";
import DynamicSearchBar from "./top_searchbar/dynamic_search_bar";
import MapWrapper from "./map/map";

import LoginPage from "./Personal/main";

import { Query } from "react-apollo";
import gql from "graphql-tag";
import { createAppContainer } from "react-navigation";

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const CardsQuery = gql`
	{
		cardsCollection {
			items {
				sys {
					id
				}
				district
				title
				type
				image {
					size
					url
					width
					height
				}
				location {
					lat
					lon
				}
				caption
				logo {
					size
					url
					width
					height
				}
				content
			}
		}
	}
`;

const HomeStack = createStackNavigator(
	{
		Home: HomeScreen,
		Section: SectionScreen,
		Discover: DiscoverScreen,
		Signup: SignupScreen,
		Login: LoginScreen,
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
	return (
		<Query query={CardsQuery}>
			{({ loading, error, data }) => {
				if (loading || error) return <Oops loading={loading}></Oops>;
				return (
					<View>
						<DynamicSearchBar
							route={route}
							navigation={navigation}
							itemList={data.cardsCollection.items}
						/>
						<MapWrapper
							route={route}
							navigation={navigation}
							itemList={data.cardsCollection.items}
						/>
					</View>
				);
			}}
		</Query>
	);
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
	UserStack,
});

export default createAppContainer(TabNavigator);
