import React from "react";
import styled from "styled-components";
import { Animated, TouchableOpacity, Dimensions } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import Ionicon from "react-native-vector-icons/Ionicons";
import MenuItem from "./MenuItem";
import { connect } from "react-redux";
import MenuCard from "./MenuCard";
import { ScrollView } from "react-native-gesture-handler";

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

const screenHeight = Dimensions.get("window").height;

// stateful component
class Menu extends React.Component {
	state = {
		top: new Animated.Value(screenHeight),
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
					<Title>Nearby {this.props.place}</Title>
					<Subtitle>Found 1000 places nearby</Subtitle>
				</Cover>
				<TouchableOpacity
					onPress={this.props.closeMenu}
					style={{ position: "absolute", top: 120, left: "50%", marginLeft: -22, zIndex: 1 }}
				>
					<CloseView>
						<Ionicon name="ios-close" size={44} color="#546bfb" />
					</CloseView>
				</TouchableOpacity>
				{/* <Content>
					{items.map((item, index) => (
						<MenuItem key={index} icon={item.icon} title={item.title} text={item.text} />
					))}
				</Content> */}
				<ScrollView>
					<Content>
						{cards.map((card, index) => (
							<MenuCard key={index} image={card.image} title={card.title} subtitle={card.subtitle} />
						))}
					</Content>
				</ScrollView>
			</AnimatedContainer>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

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

const cards = [
	{
		image: require("../assets/background12.jpg"),
		title: "Nearby Place 1",
		subtitle: "0.5km",
	},
	{
		image: require("../assets/background13.jpg"),
		title: "Nearby Place 2",
		subtitle: "0.8km",
	},
	{
		image: require("../assets/background14.jpg"),
		title: "Nearby Place 3",
		subtitle: "1.2km",
	},
	{
		image: require("../assets/background15.jpg"),
		title: "Nearby Place 4",
		subtitle: "2.1km",
	},
	{
		image: require("../assets/background16.jpg"),
		title: "Nearby Place 5",
		subtitle: "2.7km",
	},
	{
		image: require("../assets/background11.jpg"),
		title: "Nearby Place 6",
		subtitle: "3.5km",
	},
];

const items = [
	{
		icon: "american-football",
		title: "WHEN",
		text: "we all",
	},
	{
		icon: "ios-card",
		title: "FALL",
		text: "asleep",
	},
	{
		icon: "ios-compass",
		title: "WHERE",
		text: "do we",
	},
	{
		icon: "ios-exit",
		title: "GO",
		text: "?",
	},
];
