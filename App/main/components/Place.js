import React from "react";
import styled from "styled-components";
import { Dimensions, TouchableOpacity, Alert } from "react-native";
import { BlurView } from "@react-native-community/blur";
import Ionicon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logoMap from "./LogoMap";

const screenWidth = Dimensions.get("window").width;

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

// match screen sizes
function getPlaceWidth(screenWidth) {
	var cardWidth = screenWidth - 40;
	// for tablets
	if (screenWidth >= 768) {
		cardWidth = (screenWidth - 60) / 2;
	}
	if (screenWidth >= 1024) {
		cardWidth = (screenWidth - 80) / 3;
	}
	return cardWidth;
}

class Place extends React.Component {
	state = {
		cardWidth: getPlaceWidth(screenWidth),
	};

	getCollectionDB = () => {
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
							// console.log(response);
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

	handleLike = () => {
		const id = this.props.id;
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
								Alert.alert("Success!");

								this.getCollectionDB();
							} else {
								Alert.alert("Something went wrong. Try again later :(");
							}
						})
						.catch(error => console.log(error));
				}
			})
			.catch(error => console.log(error));
	};

	componentDidMount() {
		Dimensions.addEventListener("change", this.adaptLayout);
		this.getCollectionDB();
	}

	adaptLayout = dimensions => {
		this.setState({
			cardWidth: getPlaceWidth(dimensions.window.width),
		});
	};

	render() {
		return (
			<Container style={{ width: this.state.cardWidth }}>
				<Cover>
					<Image source={this.props.image} />

					<Wrapper>
						<Logo source={logoMap.get(this.props.type)} resizeMode="contain" />
						<Type>{this.props.type}</Type>
					</Wrapper>
					{this.props.username != "Guest" && (
						<TouchableOpacity style={{ position: "absolute", top: 10, right: 10 }} onPress={this.handleLike}>
							{this.props.collection.includes(this.props.id) ? (
								<Ionicon name="heart" size={32} color="#f0f3f5" />
							) : (
								<Ionicon name="heart-outline" size={32} color="#f0f3f5" />
							)}
						</TouchableOpacity>
					)}
				</Cover>
				<Content>
					<BlurView
						blurType="light"
						blurAmount={10}
						style={{
							position: "absolute",
							bottom: 0,
							width: "100%",
							height: "100%",
						}}
					/>
					{/* <Subtitle>{this.props.distance}</Subtitle> */}
					<Title>{this.props.title}</Title>
				</Content>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Place);

const Wrapper = styled.View`
	flex-direction: row;
	position: absolute;
	top: 20px;
	left: 20px;
	align-items: center;
`;

const Logo = styled.Image`
	width: 24px;
	height: 24px;
`;

const Type = styled.Text`
	font-size: 15px;
	font-weight: 600;
	color: rgba(255, 255, 255, 0.8);
	margin-left: 5px;
	text-transform: uppercase;
`;

const Container = styled.View`
	width: 335px;
	height: 335px;
	background: white;
	margin: 10px 10px;
	border-radius: 14px;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
	height: 335px;
	border-radius: 14px;
	overflow: hidden;
	justify-content: flex-end;
`;

const Image = styled.Image`
	width: 100%;
	height: 100%;
	position: absolute;
`;

// const Logo = styled.Image`
// 	width: 48px;
// 	height: 48px;
// 	position: absolute;
// 	top: 30%;
// 	left: 50%;
// 	margin-left: -24px;
// `;

const Title = styled.Text`
	font-size: 24px;
	color: white;
	font-weight: 600;
	margin-top: 4px;
	margin-bottom: 10px;
	margin-left: 20px;
	width: ${getPlaceWidth(screenWidth) - 40};
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.95);
`;

const Subtitle = styled.Text`
	font-size: 15px;
	font-weight: 500;
	color: rgba(255, 255, 255, 0.8);
	text-transform: uppercase;
	margin-left: 20px;
	margin-top: 10px;
`;

const Content = styled.View`
	position: absolute;
	bottom: 0px;

	justify-content: center;
	height: 80px;
	width: 100%;
	border-bottom-left-radius: 14px;
	border-bottom-right-radius: 14px;
	overflow: hidden;
`;

const Caption = styled.Text`
	font-size: 14px;
	color: #3c4560;
	font-weight: 500;
`;

const Name = styled.Text`
	font-size: 13px;
	color: #b8bece;
	font-weight: 500;
	margin-top: 4px;
	text-transform: uppercase;
`;
