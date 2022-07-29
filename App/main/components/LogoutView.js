import React from "react";
import styled from "styled-components";
import { Animated, TouchableOpacity, Dimensions } from "react-native";

import { connect } from "react-redux";

import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
var cardWidth = screenWidth;
if (screenWidth > 500) {
	cardWidth = 500;
}

function mapStateToProps(state) {
	return {
		action: state.action,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		closeLogout: () =>
			dispatch({
				type: "CLOSE_LOGOUT",
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
		updateRecommend: recommend =>
			dispatch({
				type: "UPDATE_RECOMMEND",
				recommend,
			}),
	};
}

const screenHeight = Dimensions.get("window").height;

// stateful component
class LogoutView extends React.Component {
	state = {
		top: new Animated.Value(screenHeight),
		// Query to Contentful using GraphQL
	};

	handleLogout = () => {
		// Alert.alert("Logged Out", "You've logged out successfully!");
		// log out
		this.props.updateAvatar("https://cl.ly/55da82beb939/download/avatar-default.jpg");
		this.props.updateName("Guest");
		this.props.updateToken("");
		this.props.updateCollection([]);
		this.getRecommend();

		AsyncStorage.clear();
		this.props.closeLogout();
	};

	getRecommend = () => {
		// get recommendation list from db
		const token =
			"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJUZXN0MTEtW1Rlc3QxMV0iLCJpYXQiOjE2NTkwODYwMDAsImV4cCI6MTY1OTUxODAwMH0.VNzG9lGbLaAnrbKFZjXxwiAaONiSLpl195hO_kWJ07zHdTSToIRmPNWDtTPyNXaGGaj66oXWuSykcipZ3HKeZw";
		fetch("http://39.108.191.242:10089/users/get_recommend", {
			method: "GET",
			headers: { Authorization: token },
			redirect: "follow",
			cache: "no-cache",
		})
			.then(response => {
				if (response.status === 200) {
					response.json().then(value => {
						// console.log(value.recommends);
						this.props.updateRecommend(value.recommends);
					});
				}
			})
			.catch(error => console.log(error));
	};

	componentDidMount() {
		this.toggleLogout();
	}

	componentDidUpdate() {
		this.toggleLogout();
	}

	toggleLogout = () => {
		if (this.props.action == "openLogout") {
			Animated.spring(this.state.top, {
				useNativeDriver: false,
				toValue: screenHeight - 380,
			}).start();
		}
		if (this.props.action == "closeLogout") {
			Animated.spring(this.state.top, {
				useNativeDriver: false,
				toValue: screenHeight,
			}).start();
		}
	};

	render() {
		return (
			<AnimatedContainer style={{ top: this.state.top }}>
				<LottieContainer>
					<LottieView source={require("../assets/lottie-logout.json")} autoPlay={true} loop={true} />
				</LottieContainer>

				<ButtonRow>
					<TouchableOpacity onPress={this.props.closeLogout}>
						<CancelButton>
							<ButtonText>Cancel</ButtonText>
						</CancelButton>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							this.handleLogout();
						}}
					>
						<Button>
							<ButtonText>Logout</ButtonText>
						</Button>
					</TouchableOpacity>
				</ButtonRow>
			</AnimatedContainer>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutView);

const ButtonRow = styled.View`
	flex-direction: row;
	margin-right: 20px;
`;

const ButtonText = styled.Text`
	color: white;
	font-weight: 600;
	font-size: 20px;
	text-transform: uppercase;
`;

const CancelButton = styled.View`
	background: black;
	width: ${(cardWidth - 60) / 2};
	height: 50px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
	margin-top: 20px;
	margin-left: 20px;
`;

const Button = styled.View`
	background: #c054fe;
	width: ${(cardWidth - 60) / 2};
	height: 50px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	box-shadow: 0 5px 10px rgba(192, 84, 254, 0.7);
	margin-top: 20px;
	margin-left: 20px;
`;

const LottieContainer = styled.View`
	height: 180px;
`;

const Mask = styled.View`
	position: absolute;
	height: 100%;
`;
const RootView = styled.View`
	background: rgba(0, 0, 0, 0);
	flex: 1;
`;

const Container = styled.View`
	position: absolute;
	background: white;
	width: ${cardWidth};
	align-self: center;
	height: 100%;
	z-index: 100;
	border-radius: 32px;
	overflow: hidden;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
