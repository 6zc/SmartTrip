// import { setStatusBarStyle } from "expo-status-bar";
import { Platform, ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing, StatusBar } from "react-native";
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
// import ModalLogin from "../components/ModalLogin";

// Query to Contentful using GraphQL
const CardsQuery = gql`
	{
		cardsCollection {
			items {
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
	};
}

class HomeScreen extends React.Component {
	state = {
		scale: new Animated.Value(1),
		opacity: new Animated.Value(1),
	};

	componentDidMount() {
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

	render() {
		return (
			<RootView>
				<Menu navigation={this.props.navigation} />
				<AnimatedContainer style={{ transform: [{ scale: this.state.scale }], opacity: this.state.opacity }}>
					<SafeAreaView>
						<ScrollView>
							<TitleBar>
								<TouchableOpacity onPress={this.props.openLogin} style={{ position: "absolute", top: 0, left: 20 }}>
									<Avatar />
								</TouchableOpacity>
								<Title>Welcome back,</Title>
								<Name>{this.props.name}</Name>
								<DiscoverView>
									<TouchableOpacity
										onPress={() => {
											this.props.navigation.push("Discover", {});
										}}
									>
										<Ionicon
											name="compass"
											size={35}
											color="#5263ff"
											style={{
												shadowColor: "#c2cbff",
												shadowOpacity: 0.8,
												shadowRadius: 5,
												// iOS
												shadowOffset: {
													width: 0,
													height: 1,
												},
											}}
										></Ionicon>
									</TouchableOpacity>
								</DiscoverView>
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
							<Subtitle>Recent Places</Subtitle>
							<ScrollView horizontal={true} style={{ paddingBottom: 30 }} showsHorizontalScrollIndicator={false}>
								<Query query={CardsQuery}>
									{({ loading, error, data }) => {
										if (loading) return <Message>Loading...</Message>;
										if (error) return <Message>Error...</Message>;

										var items = data.cardsCollection.items;
										var length = items.length;
										console.log(items);
										var recentItems = items.slice(length - 3, length);

										return (
											<CardsContainer>
												{recentItems.map((card, index) => (
													<TouchableOpacity
														key={index}
														onPress={() => {
															this.props.navigation.push("Section", {
																// passing information to new screen
																section: card,
															});
														}}
													>
														<Card
															title={card.title}
															image={card.image}
															caption={card.caption}
															logo={card.logo}
															type={card.type}
															content={card.content}
														></Card>
													</TouchableOpacity>
												))}
											</CardsContainer>
										);
									}}
								</Query>
							</ScrollView>
							<Subtitle>Recommended Places</Subtitle>

							<Query query={CardsQuery}>
								{({ loading, error, data }) => {
									if (loading) return <Message>Loading...</Message>;
									if (error) return <Message>Error...</Message>;

									var items = data.cardsCollection.items;
									var length = items.length;
									console.log(items);
									var recomItems = items.slice(length - 7, length - 3);

									return (
										<PlacesContainer>
											{recomItems.map((card, index) => (
												<TouchableOpacity
													key={index}
													onPress={() => {
														this.props.navigation.push("Section", {
															// passing information to new screen
															section: card,
														});
													}}
												>
													<Place
														title={card.title}
														image={card.image}
														distance="0.5km"
														caption={card.caption}
														logo={card.logo}
														type={card.type}
														content={card.content}
													></Place>
												</TouchableOpacity>
											))}
										</PlacesContainer>
									);
								}}
							</Query>

							{/* <PlacesContainer>
								{places.map((place, index) => (
									<Place
										key={index}
										image={place.image}
										title={place.title}
										distance={place.distance}
										logo={place.logo}
										type={place.type}
										avatar={place.avatar}
										caption={place.caption}
									/>
								))}
							</PlacesContainer> */}
						</ScrollView>
					</SafeAreaView>
				</AnimatedContainer>
				{/* <ModalLogin /> */}
			</RootView>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const DiscoverView = styled.View`
	position: absolute;
	top: 5px;
	right: 20px;
`;

const PlacesContainer = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	padding-left: 10px;
`;

const Message = styled.Text`
	margin: 20px;
	color: #b8bece;
	font-size: 15px;
	font-weight: 500;
`;

const CardsContainer = styled.View`
	flex-direction: row;
	padding-left: 10px;
`;

const RootView = styled.View`
	background: black;
	flex: 1;
`;

const Subtitle = styled.Text`
	color: #b8bece;
	font-weight: 600;
	font-size: 15px;
	margin-left: 20px;
	margin-top: 20px;
	text-transform: uppercase;
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

const logos = [
	{
		image: require("../assets/restaurant.png"),
		text: "Restaurants",
	},

	{
		image: require("../assets/park.png"),
		text: "Parks",
	},
	{
		image: require("../assets/movie.png"),
		text: "Movies",
	},
	{
		image: require("../assets/museum.png"),
		text: "Museums",
	},
	{
		image: require("../assets/bookshop.png"),
		text: "Bookshops",
	},
	{
		image: require("../assets/theme-park.png"),
		text: "Theme Parks",
	},
	{
		image: require("../assets/shopping.png"),
		text: "Shopping",
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
		image: require("../assets/zoo.png"),
		text: "Zoos",
	},
	{
		image: require("../assets/grocery.png"),
		text: "Groceries",
	},
];
