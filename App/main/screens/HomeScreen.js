// import { setStatusBarStyle } from "expo-status-bar";
import { Alert, Platform, ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing, StatusBar } from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Place from "../components/Place";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import React from "react";
import Avatar from "../components/Avatar";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Ionicon from "react-native-vector-icons/Ionicons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import NewlyAdded from "../components/NewlyAdded";
import Recommended from "../components/Recommanded";

// Query to Contentful using GraphQL
const CardsQuery = gql`
	{
		cardsCollection {
			items {
				sys {
					id
				}
				title
				type
				image {
					title
					description
					contentType
					fileName
					size
					url
					width
					height
				}

				caption
				logo {
					title
					description
					contentType
					fileName
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

function mapStateToProps(state) {
	return {
		action: state.action,
		name: state.name,
		place: state.place,
		collection: state.collection,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		openMenu: place =>
			dispatch({
				type: "OPEN_MENU",
				place: place,
			}),
		openLogin: () =>
			dispatch({
				type: "OPEN_LOGIN",
			}),
		updateName: name => {
			dispatch({
				type: "UPDATE_NAME",
				name,
			});
		},
		updateAvatar: avatar =>
			dispatch({
				type: "UPDATE_AVATAR",
				avatar,
			}),
		updateToken: token =>
			dispatch({
				type: "UPDATE_TOKEN",
				token,
			}),
		updateCollection: collection =>
			dispatch({
				type: "UPDATE_COLLECTION",
				collection,
			}),
	};
}

class HomeScreen extends React.Component {
	state = {
		scale: new Animated.Value(1),
		opacity: new Animated.Value(1),

		// toggleUpdate: 1,
	};

	componentDidMount() {
		// if (!this.props.name) {
		// 	this.props.updateName("Guest");
		// }

		// setStatusBarStyle("dark");
		StatusBar.setBarStyle("dark-content", true);

		if (Platform.OS == "android") StatusBar.setBarStyle("light-content", true);
	}

	componentDidUpdate() {
		this.toggleMenu();
	}

	toggleMenu = () => {
		if (this.props.action == "openMenu") {
			Animated.timing(this.state.scale, {
				useNativeDriver: false,
				toValue: 0.9,
				duration: 300,
				easing: Easing.in(),
			}).start();
			Animated.spring(this.state.opacity, {
				useNativeDriver: false,
				toValue: 0.5,
			}).start();

			// setStatusBarStyle("light");
			StatusBar.setBarStyle("light-content", true);
		}

		if (this.props.action == "closeMenu") {
			Animated.timing(this.state.scale, {
				useNativeDriver: false,
				toValue: 1,
				duration: 300,
				easing: Easing.in(),
			}).start();
			Animated.spring(this.state.opacity, {
				useNativeDriver: false,
				toValue: 1,
			}).start();
			// setStatusBarStyle("dark");
			StatusBar.setBarStyle("dark-content", true);
		}
	};

	handleAvatar = () => {
		if (this.props.name != "Guest") {
			Alert.alert("Logged Out", "You've logged out successfully!");
			// log out
			this.props.updateName("Guest");
			this.props.updateToken("");
			this.props.updateCollection([]);
			this.props.updateAvatar("https://cl.ly/55da82beb939/download/avatar-default.jpg");
			AsyncStorage.clear();
		} else {
			this.props.navigation.push("Login", {});
		}
	};

	render() {
		return (
			<RootView>
				<Menu navigation={this.props.navigation} />
				<AnimatedContainer style={{ transform: [{ scale: this.state.scale }], opacity: this.state.opacity }}>
					<SafeAreaView>
						<ScrollView>
							<TitleBar>
								<TouchableOpacity onPress={this.handleAvatar} style={{ position: "absolute", top: 0, left: 20 }}>
									<Avatar />
								</TouchableOpacity>
								{this.props.name == "Guest" && <Title>Welcome,</Title>}
								{this.props.name != "Guest" && <Title>Welcome back,</Title>}

								<Name>{this.props.name}</Name>
								<TouchableOpacity
									onPress={() => {
										this.props.navigation.push("Collection", {});
									}}
									style={{ position: "absolute", top: 5, right: 20 }}
								>
									<CollectionView>
										<IconView>
											<Ionicon name="heart" size={28} color="#5263ff"></Ionicon>
										</IconView>
									</CollectionView>
								</TouchableOpacity>
							</TitleBar>
							<ScrollView
								style={{ flexDirection: "row", padding: 20, paddingLeft: 12, paddingTop: 30 }}
								horizontal={true}
								showsHorizontalScrollIndicator={false}
							>
								{logos.map((logo, index) => (
									<TouchableOpacity
										key={index}
										onPress={() => {
											this.props.openMenu(logo.text);
										}}
									>
										<Logo image={logo.image} text={logo.text} />
									</TouchableOpacity>
								))}
							</ScrollView>

							{/* <ScrollView horizontal={true} style={{ paddingBottom: 30 }} showsHorizontalScrollIndicator={false}>

							</ScrollView> */}
							<NewlyAdded navigation={this.props.navigation} />
							<Recommended navigation={this.props.navigation} />
						</ScrollView>
					</SafeAreaView>
				</AnimatedContainer>
			</RootView>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const IconView = styled.View`
	margin-top: 2px;
`;

const CollectionView = styled.View`
	width: 42px;
	height: 42px;
	background: white;
	border-radius: 21px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
	justify-content: center;
	align-items: center;
`;

const RootView = styled.View`
	background: black;
	flex: 1;
`;

const Container = styled.View`
	flex: 1;
	background-color: #f0f3f5;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
	font-size: 16px;
	color: #b8bece;
	font-weight: 500;
`;

const Name = styled.Text`
	font-size: 20px;
	color: #3c4560;
	font-weight: bold;
`;

const TitleBar = styled.View`
	width: 100%;
	margin-top: 50px;
	padding-left: 80px;
`;

const CardsContainer = styled.View`
	flex-direction: row;
	padding-left: 10px;
`;

const logos = [
	{
		image: require("../assets/restaurant.png"),
		text: "Restaurants",
	},
	{
		image: require("../assets/museum.png"),
		text: "Museums",
	},
	{
		image: require("../assets/park.png"),
		text: "Parks",
	},
	{
		image: require("../assets/theme-park.png"),
		text: "Theme Parks",
	},
	{
		image: require("../assets/movie.png"),
		text: "Movies",
	},

	{
		image: require("../assets/bookshop.png"),
		text: "Bookshops",
	},
	{
		image: require("../assets/coffee.png"),
		text: "Coffee",
	},
	{
		image: require("../assets/bar.png"),
		text: "Bars",
	},
	{
		image: require("../assets/shopping.png"),
		text: "Shopping",
	},
	{
		image: require("../assets/grocery.png"),
		text: "Groceries",
	},

	{
		image: require("../assets/zoo.png"),
		text: "Zoos",
	},
];
