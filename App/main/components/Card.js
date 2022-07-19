import React from "react";
import styled from "styled-components";
import { TouchableOpacity, Alert } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

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

class Card extends React.Component {
	state = {
		liked: false,
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
							console.log(response);
							if (response.status === 200) {
								response.json().then(value => {
									// console.log("home: collect");
									// console.log(value.data);
									var collection = [];
									for (const element of value.data) {
										if (element.collectId == this.props.id) {
											this.setState({ liked: true });
										}
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
		const liked = this.state.liked;
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

								this.setState({ liked: !liked });
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
		this.getCollectionDB();
	}

	render() {
		return (
			<Container style={{ elevation: 10 }}>
				<Cover>
					<Image source={this.props.image} />
					<Caption>{this.props.caption}</Caption>
					{this.props.username != "Guest" && (
						<TouchableOpacity style={{ position: "absolute", top: 10, right: 10 }} onPress={this.handleLike}>
							{this.props.collection.includes(this.props.id) ? (
								<Ionicon name="heart" size={28} color="#f0f3f5" />
							) : (
								<Ionicon name="heart-outline" size={28} color="#f0f3f5" />
							)}
						</TouchableOpacity>
					)}
				</Cover>
				<Content>
					<Logo source={this.props.logo} />
					<Wrapper>
						<Title>{this.props.title}</Title>
						<Subtitle>{this.props.type}</Subtitle>
					</Wrapper>
				</Content>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
// export default Card;

const Content = styled.View`
	padding-left: 20px;
	flex-direction: row;
	align-items: center;
	height: 80px;
`;

const Logo = styled.Image`
	width: 44px;
	height: 44px;
`;

const Title = styled.Text`
	color: #3c4560;
	font-size: 20px;
	font-weight: 600;
	width: 230px;
`;

const Subtitle = styled.Text`
	color: #b8bece;
	font-weight: 600;
	font-size: 15px;
	text-transform: uppercase;
	margin-top: 4px;
`;

const Wrapper = styled.View`
	margin-left: 10px;
`;

const Container = styled.View`
	background: white;
	width: 315px;
	height: 280px;
	border-radius: 14px;
	margin: 20px 10px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
	width: 100%;
	height: 200px;
	border-top-left-radius: 14px;
	border-top-right-radius: 14px;
	overflow: hidden;
`;

const Image = styled.Image`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
`;

const Caption = styled.Text`
	color: white;
	font-size: 24px;
	font-weight: bold;
	margin-top: 20px;
	margin-left: 20px;
	width: 170px;
`;
