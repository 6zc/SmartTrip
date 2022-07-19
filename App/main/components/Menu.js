import React from "react";
import styled from "styled-components";
import { Animated, TouchableOpacity, Dimensions } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import Ionicon from "react-native-vector-icons/Ionicons";
import MenuItem from "./MenuItem";
import { connect } from "react-redux";
import MenuCard from "./MenuCard";
import { ScrollView } from "react-native-gesture-handler";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const screenWidth = Dimensions.get("window").width;
var cardWidth = screenWidth;
if (screenWidth > 500) {
	cardWidth = 500;
}

function mapStateToProps(state) {
	return {
		action: state.action,
		place: state.place,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		closeMenu: () =>
			dispatch({
				type: "CLOSE_MENU",
			}),
	};
}

// Query to Contentful using GraphQL
function getContent(contentType) {
	return gql`
		{
			cardsCollection(where: { contentType: "${contentType}" }) {
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
}

const screenHeight = Dimensions.get("window").height;

// stateful component
class Menu extends React.Component {
	state = {
		top: new Animated.Value(screenHeight),
		// Query to Contentful using GraphQL
	};

	componentDidMount() {
		this.toggleMenu();
	}

	componentDidUpdate() {
		this.toggleMenu();
	}

	toggleMenu = () => {
		if (this.props.action == "openMenu") {
			Animated.spring(this.state.top, {
				useNativeDriver: false,
				toValue: 54,
			}).start();
		}
		if (this.props.action == "closeMenu") {
			Animated.spring(this.state.top, {
				useNativeDriver: false,
				toValue: screenHeight,
			}).start();
		}
	};

	render() {
		return (
			<AnimatedContainer style={{ top: this.state.top }}>
				<Cover>
					<Image source={require("../assets/background2.jpg")} />
					<Title>{this.props.place}</Title>
					{/* <Subtitle>Found {this.state.number} places nearby</Subtitle> */}
				</Cover>
				<TouchableOpacity
					onPress={this.props.closeMenu}
					style={{ position: "absolute", top: 120, left: "50%", marginLeft: -22, zIndex: 1 }}
				>
					<CloseView>
						<Ionicon name="ios-close" size={44} color="#5263ff" />
					</CloseView>
				</TouchableOpacity>
				{/* <Content>
					{items.map((item, index) => (
						<MenuItem key={index} icon={item.icon} title={item.title} text={item.text} />
					))}
				</Content> */}
				<ScrollView>
					<Content>
						<Query query={getContent(this.props.place)}>
							{({ loading, error, data }) => {
								if (loading) return <Message>Loading...</Message>;
								if (error) return <Message>Error...</Message>;

								var items = data.cardsCollection.items;
								var length = items.length;
								// this.setState({ number: length });
								// console.log(items);

								return (
									<CardsContainer>
										{items.map((card, index) => (
											<TouchableOpacity
												key={index}
												onPress={() => {
													this.props.navigation.push("Section", {
														// passing information to new screen
														section: card,
													});
												}}
											>
												<MenuCard key={index} image={card.image} title={card.title} subtitle="0.8km" />
											</TouchableOpacity>
										))}
									</CardsContainer>
								);
							}}
						</Query>
					</Content>
				</ScrollView>
			</AnimatedContainer>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const CardsContainer = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	// padding-left: 10px;
`;

const Message = styled.Text`
	margin: 20px;
	color: #b8bece;
	font-size: 15px;
	font-weight: 500;
`;

const Image = styled.Image`
	position: absolute;
	width: 100%;
	height: 100%;
`;

const Title = styled.Text`
	color: white;
	font-size: 24px;
	font-weight: 600;
`;

const Subtitle = styled.Text`
	font-size: 13px;
	color: rgba(255, 255, 255, 0.5);
	margin-top: 8px;
`;

const CloseView = styled.View`
	width: 44px;
	height: 44px;
	border-radius: 22px;
	background: white;
	justify-content: center;
	align-items: center;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Container = styled.View`
	position: absolute;
	background: #f0f3f5;
	width: ${cardWidth};
	align-self: center;
	height: 100%;
	z-index: 100;
	border-radius: 10px;
	overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
	height: 142px;
	background: black;
	justify-content: center;
	align-items: center;
`;

const Content = styled.View`
	background: #f0f3f5;
	padding-top: 35px;
	padding-left: 10px;
	padding-bottom: 55px;
`;
