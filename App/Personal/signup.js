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
				<Menu />
				<AnimatedContainer style={{ transform: [{ scale: this.state.scale }], opacity: this.state.opacity }}>
					<SafeAreaView>
						<ScrollView>
							<TitleBar>
								<TouchableOpacity style={{ position: "absolute", top: 0, left: 20 }}>
									<Avatar />
								</TouchableOpacity>
								<Title>Welcome back,</Title>
								<Name>{this.props.name}</Name>
								<NotificationIcon style={{ position: "absolute", right: 20, top: 5 }}></NotificationIcon>
							</TitleBar>
							<ScrollView
								style={{ flexDirection: "row", padding: 20, paddingLeft: 12, paddingTop: 30 }}
								horizontal={true}
								showsHorizontalScrollIndicator={false}
							>
								{logos.map((logo, index) => (
									<TouchableOpacity key={index} onPress={this.props.openMenu}>
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

										console.log(data.cardsCollection.items);

										return (
											<CardsContainer>
												{data.cardsCollection.items.map((card, index) => (
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
															subtitle={card.subtitle}
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
							<PlacesContainer>
								{places.map((place, index) => (
									<Place
										key={index}
										image={place.image}
										title={place.title}
										subtitle={place.subtitle}
										logo={place.logo}
										author={place.author}
										avatar={place.avatar}
										caption={place.caption}
									/>
								))}
							</PlacesContainer>
						</ScrollView>
					</SafeAreaView>
				</AnimatedContainer>
			</RootView>
		);
	}
}


