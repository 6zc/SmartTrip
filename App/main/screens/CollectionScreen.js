import { connect } from "react-redux";
import { ScrollView, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import styled from "styled-components";
import Ionicon from "react-native-vector-icons/Ionicons";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../components/Card";
import LottieView from "lottie-react-native";

function getCollection() {
	// console.log(`${collection}`);
	return gql`
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
					contentType
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

function mapStateToProps(state) {
	return {
		action: state.action,
		name: state.name,
		token: state.token,
	};
}

class CollectionScreen extends React.Component {
	state = {
		collection: [],
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
							if (response.status === 200) {
								response.json().then(value => {
									console.log("home: collect");
									console.log(value.data);
									var collection = [];
									for (const element of value.data) {
										collection.push(element.collectId);
									}
									this.setState({ collection: collection });
									// console.log(this.state.collection);
								});
							}
						})
						.catch(error => console.log(error));
				}
			})
			.catch(error => console.log(error));
	};
	componentDidMount() {
		// console.log(this.props.collection);
		this.getCollectionDB();
	}

	render() {
		return (
			<Container>
				<StatusBar hidden />

				<Cover>
					<LottieView source={require("../assets/lottie-background.json")} autoPlay={true} loop={true} />
					<Title>Favorites</Title>

					<TouchableOpacity
						onPress={() => {
							this.props.navigation.goBack();
						}}
						style={{ position: "absolute", top: 36, right: 20 }}
					>
						<CloseView>
							<Ionicon name="ios-close" size={32} color="#5263ff" />
						</CloseView>
					</TouchableOpacity>
				</Cover>
				<ScrollView>
					{this.props.name != "Guest" && this.state.collection.length != 0 ? (
						<Query query={getCollection()}>
							{({ loading, error, data }) => {
								if (loading) return <Message>Loading...</Message>;
								if (error) return <Message>Error...</Message>;
								var collection = this.state.collection;
								var items = [];
								var map = new Map();

								for (const element of data.cardsCollection.items) {
									if (collection.includes(element.sys.id)) {
										const type = element.type;
										if (map.has(type)) {
											map.get(type).push(element);
										} else {
											map.set(type, [element]);
										}

										// items.push(element);
									}
								}
								// console.log(items);
								console.log(map);

								var length = items.length;
								// console.log(items);

								var output = [];
								var index = 0;
								for (const [key, value] of map) {
									// console.log(key);
									index++;
									var tempOutput = (
										<Favorites key={index}>
											<Subtitle>Favorite {key}s</Subtitle>
											<ScrollView
												horizontal={true}
												style={{ paddingBottom: 10 }}
												showsHorizontalScrollIndicator={false}
											>
												<CardsContainer>
													{value.map((card, index) => (
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
																id={card.sys.id}
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
											</ScrollView>
										</Favorites>
									);
									output.push(tempOutput);
								}

								return output;
							}}
						</Query>
					) : (
						<EmptyContainer>
							<LottieView source={require("../assets/lottie-empty.json")} autoPlay={true} loop={true} />
							{/* <EmptyMessage>Looks like there's nothing here...</EmptyMessage> */}
							<EmptyMessage>When you gaze into the abyss...</EmptyMessage>
						</EmptyContainer>
					)}
				</ScrollView>
			</Container>
		);
	}
}

export default connect(mapStateToProps)(CollectionScreen);

const EmptyContainer = styled.View`
	width: 100%;
	height: 300px;
	// justify-content: center;
	align-items: center;
`;

const EmptyMessage = styled.Text`
	position: absolute;
	top: 300px;
	margin: 20px;
	color: #b8bece;
	font-size: 15px;
	font-weight: 500;
`;

const Favorites = styled.View`
	flex: 1;
`;

const Container = styled.View`
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

const CardsContainer = styled.View`
	flex-direction: row;
	padding-left: 10px;
`;

const Message = styled.Text`
	margin: 20px;
	color: #b8bece;
	font-size: 15px;
	font-weight: 500;
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

const Title = styled.Text`
	color: white;
	font-size: 24px;
	font-weight: 600;
`;

const Cover = styled.View`
	height: 230px;
	background: black;
	justify-content: center;
	align-items: center;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
`;
