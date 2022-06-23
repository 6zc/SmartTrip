import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import AppNavigator from "./navigator/AppNavigator";
import { LogBox } from "react-native";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// client access to Contentful
const client = new ApolloClient({
	uri: "https://graphql.contentful.com/content/v1/spaces/z5ui7o420lkc",
	credentials: "same-origin",
	headers: {
		Authorization: `Bearer qxbc_UQWulK8HYHtWVowQoTNj14vFHhiYeQ_9QX-19A`,
	},
});

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreLogs(["Expected style"]);

// initial state for redux
const initialState = {
	action: "",
	name: "",
	place: "",
};

// set up redux - save states in reducer to use as props
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "OPEN_MENU":
			return { ...state, action: "openMenu", place: action.place };
		case "CLOSE_MENU":
			return { ...state, action: "closeMenu" };
		case "UPDATE_NAME":
			return { ...state, name: action.name };
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

const Main = () => (
	<ApolloProvider client={client}>
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	</ApolloProvider>
);

export default Main;
