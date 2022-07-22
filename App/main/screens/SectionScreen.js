import React from "react";
import styled, { withTheme } from "styled-components";
import { TouchableOpacity, StatusBar, Linking, ScrollView, Alert } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import Ionicon from "react-native-vector-icons/Ionicons";
// import { setStatusBarHidden } from "expo-status-bar";
import { WebView } from "react-native-webview";
import Markdown from "react-native-showdown";
import Rating from "../../utils/rating";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logoMap from "../components/LogoMap";

function mapStateToProps(state) {
	return {
		action: state.action,
		username: state.name,
		collection: state.collection,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateCollection: collection =>
			dispatch({
				type: "UPDATE_COLLECTION",
				collection,
			}),
	};
}

class SectionScreen extends React.Component {
	state = {
		liked: false,
	};

	getCollectionDB = id => {
		var token = "";
		AsyncStorage.getItem("state")
			.then(serializedState => {
				const savedState = JSON.parse(serializedState);

				if (savedState && savedState.token) {
					token = savedState.token;
					fetch("http://39.108.191.242:10089/collect", {
						method: "GET",
						headers: { Authorization: token },
						redirect: "follow",
						cache: "no-cache",
					})
						.then(response => {
							console.log(response);
							if (response.status === 200) {
								response.json().then(value => {
									// console.log("home: collect");
									// console.log(value.data);
									var collection = [];
									for (const element of value.data) {
										collection.push(element.collectId);
									}
									this.props.updateCollection(collection);
									// console.log(this.state.collection);
								});
							}
						})
						.catch(error => console.log(error));
				}
			})
			.catch(error => console.log(error));
	};

	handleLike = id => {
		const liked = this.props.collection.includes(id);
		AsyncStorage.getItem("state")
			.then(serializedState => {
				const savedState = JSON.parse(serializedState);
				if (savedState && savedState.token) {
					const token = savedState.token;
					fetch(`http://39.108.191.242:10089/collect/${id}`, {
						method: liked ? "PUT" : "POST",
						headers: {
							Authorization: token,
						},
						redirect: "follow",
						cache: "no-cache",
					})
						.then(response => {
							if (response.status === 200) {
								// Alert.alert("Success!");

								this.getCollectionDB(id);
							} else {
								// Alert.alert("Something went wrong. Try again later :(");
							}
						})
						.catch(error => console.log(error));
				}
			})
			.catch(error => console.log(error));
	};

	// fade in status bar
	componentDidMount() {
		// receive data
		const { navigation } = this.props;
		const section = navigation.getParam("section");
		const id = section.sys.id;
		this.getCollectionDB(id);
		// setStatusBarHidden(true, "fade");
		StatusBar.setBarStyle("light-content", true);
	}
	componentWillUnmount() {
		// setStatusBarHidden(false, "fade");
		StatusBar.setBarStyle("dark-content", true);
	}

	render() {
		const { navigation } = this.props;
		const section = navigation.getParam("section");
		const id = section.sys.id;
		return (
			<ScrollView style={{ backgroundColor: "white" }}>
				<Container>
					<StatusBar hidden />
					<Cover>
						<Image source={section.image} />
						<Wrapper>
							<Logo source={logoMap.get(section.type)} />
							<Subtitle>{section.type}</Subtitle>
						</Wrapper>
						<Title>{section.title}</Title>
						<Caption>{section.caption}</Caption>
					</Cover>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.goBack();
						}}
						style={{ position: "absolute", top: 20, right: 20 }}
					>
						<CloseView>
							<Ionicon name="ios-close" size={32} color="#5263ff" />
						</CloseView>
					</TouchableOpacity>

					{this.props.username != "Guest" && (
						<TouchableOpacity
							onPress={() => {
								this.handleLike(id);
							}}
							style={{ position: "absolute", top: 20, right: 70 }}
						>
							<CloseView>
								<IconView>
									{this.props.collection.includes(id) ? (
										<Ionicon name="heart" size={24} color="#5263ff" />
									) : (
										<Ionicon name="heart-outline" size={24} color="#5263ff" />
									)}
								</IconView>
							</CloseView>
						</TouchableOpacity>
					)}

					<TouchableOpacity
						onPress={() => {
							setTimeout(() => {
								this.props.navigation.navigate("Map", {
									itemID: section.sys.id,
								});
							}, 400);
						}}
						style={{ position: "absolute", top: 320, right: 0 }}
					>
						<MapView>
							<Ionicon name="navigate-circle-outline" size={24} color="#5263ff" />
							<MapText>Map</MapText>
						</MapView>
					</TouchableOpacity>

					<Content>
						{/* <WebView
						source={{ html: section.content + htmlStyles }}
						scalesPageToFit={false}
						scrollEnabled={false}
						ref="webview"
						onNavigationStateChange={event => {
							// open in Safari
							console.log(event);
							if (event.url != "about:blank") {
								this.refs.webview.stopLoading();
								Linking.openURL(event.url);
							}
						}}
					></WebView> */}
						<ContentTitle>Overall Rating</ContentTitle>
						<Rating width={140} rate={4} rateAble={false} id={id} />
						{this.props.username != "Guest" && <ContentTitle>Your Rate</ContentTitle>}

						{this.props.username != "Guest" && <Rating width={140} rate={0} rateAble={true} id={id} />}

						<Markdown
							body={section.content}
							pureCSS={htmlStyles}
							scalesPageToFit={false}
							scrollEnabled={false}
							// ref="webview"
							// onNavigationStateChange={event => {
							// 	// open in Safari
							// 	console.log(event);
							// 	if (event.url != "about:blank") {
							// 		// this.refs.webview.stopLoading();
							// 		Linking.openURL(event.url);
							// 	}
							// }}
						/>
					</Content>
				</Container>
			</ScrollView>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionScreen);

const IconView = styled.View`
	margin-top: 2px;
`;

const MapView = styled.View`
	flex-direction: row;
	background: white;
	height: 44px;
	padding: 10px 16px 10px;
	border-radius: 22px;
	box-shadow: 0 8px 12px rgba(0, 0, 0, 0.35);
	align-items: center;
	margin: 0 8px;
`;

const MapText = styled.Text`
	font-weight: 600;
	font-size: 17px;
	margin-left: 8px;
`;

// demo content
const htmlContent = `

<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

	<h2>This is a title</h2>
	<p>This <strong>is</strong> a <a href="http://google.com">link</a></p>
	<img src="https://cl.ly/8861f359ed6d/download/Wave14.jpg" />
	</body></html>
`;

const htmlStyles = `
	
		* {
			font-family: -apple-system, Roboto;
			margin: 0;
			padding: 0;
			font-size: 17px;
			font-weight: normal;
			color: #3c4560;
			line-height: 24px;
		}

		h2 {
			font-size: 20px;
			text-transform: uppercase;
			color: #b8bece;
			font-weight: 600;
			margin-top: 50px;
		}

		p {
			margin-top: 20px;
		}

		a {
			color: #4775f2;
			font-weight: 600;
			text-decoration: none;
		}

		strong {
			font-weight: 700;
		}

		img {
			width: 100%;
			border-radius: 10px;
			margin-top: 20px;
		}
	
`;
const Button = styled.View`
	background: #5263ff;
	width: 295px;
	height: 50px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	box-shadow: 0 10px 20px rgba(40, 27, 90, 0.8);
	margin-top: 20px;
	margin-left: 20px;
`;

const ButtonText = styled.Text`
	color: white;
	font-weight: 600;
	font-size: 20px;
	text-transform: uppercase;
`;

const ContentTitle = styled.Text`
	font-size: 20px;
	text-transform: uppercase;
	color: #b8bece;
	font-weight: 600;
	margin-top: 50px;
	margin-bottom: 20px;
`;

const Content = styled.View`
	height: 2000px;
	padding: 20px;
`;

const Container = styled.View`
	flex: 1;
`;

const Cover = styled.View`
	height: 375px;
`;

const Image = styled.Image`
	width: 100%;
	height: 100%;
	position: absolute;
`;

const Title = styled.Text`
	font-size: 24px;
	color: white;
	font-weight: bold;
	width: 170px;
	position: absolute;
	top: 78px;
	left: 20px;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.95);
`;

const Caption = styled.Text`
	color: white;
	font-size: 17px;
	position: absolute;
	left: 20px;
	bottom: 20px;
	width: 300px;
`;

const CloseView = styled.View`
	width: 32px;
	height: 32px;
	background: white;
	border-radius: 16px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
	justify-content: center;
	align-items: center;
`;

const Wrapper = styled.View`
	flex-direction: row;
	position: absolute;
	top: 40px;
	left: 20px;
	align-items: center;
`;

const Logo = styled.Image`
	width: 24px;
	height: 24px;
`;

const Subtitle = styled.Text`
	font-size: 15px;
	font-weight: 600;
	color: rgba(255, 255, 255, 0.8);
	margin-left: 5px;
	text-transform: uppercase;
`;
