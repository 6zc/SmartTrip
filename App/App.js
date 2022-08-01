import React, { useEffect, useState } from "react";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import EIcon from "react-native-vector-icons/Ionicons";
import AIcon from "react-native-vector-icons/AntDesign";
import User from "react-native-vector-icons/Entypo";
import { LogBox } from "react-native";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createStore } from "redux";
import { Provider } from "react-redux";
import TabNavigator from "./TabNavigator";

EIcon.loadFont();
AIcon.loadFont();
User.loadFont();

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreLogs(["Possible Unhandled Promise Rejection"]);

const Tabs = AnimatedTabBarNavigator();
const client = new ApolloClient({
	uri: "https://graphql.contentful.com/content/v1/spaces/z5ui7o420lkc",
	credentials: "same-origin",
	headers: {
		Authorization: `Bearer qxbc_UQWulK8HYHtWVowQoTNj14vFHhiYeQ_9QX-19A`,
	},
});

// initial state for redux
const initialState = {
	action: "",
	name: "Guest",
	collection: [],
	recommend: [],
	token: "",
	place: "",
	avatar: "https://cl.ly/55da82beb939/download/avatar-default.jpg",
};

// set up redux - save states in reducer to use as props
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "OPEN_MENU":
			return { ...state, action: "openMenu", place: action.place };
		case "CLOSE_MENU":
			return { ...state, action: "closeMenu" };
		case "OPEN_LOGOUT":
			return { ...state, action: "openLogout" };
		case "CLOSE_LOGOUT":
			return { ...state, action: "closeLogout" };
		case "UPDATE_NAME":
			return { ...state, name: action.name };
		case "UPDATE_AVATAR":
			return { ...state, avatar: action.avatar };
		case "UPDATE_TOKEN":
			return { ...state, token: action.token };
		case "UPDATE_COLLECTION":
			return { ...state, collection: action.collection };
		case "UPDATE_RECOMMEND":
			return { ...state, recommend: action.recommend };
		case "OPEN_CARD":
			return { ...state, action: "openCard" };
		case "CLOSE_CARD":
			return { ...state, action: "closeCard" };
		case "OPEN_LOGIN":
			return { ...state, action: "openLogin" };
		case "CLOSE_LOGIN":
			return { ...state, action: "closeLogin" };
		default:
			return state;
	}
};

const store = createStore(reducer);

const App = () => (
	<ApolloProvider client={client}>
		<Provider store={store}>
			<TabNavigator />
		</Provider>
	</ApolloProvider>
);

export default App;
