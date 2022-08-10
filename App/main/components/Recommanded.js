import { TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Place from "./Place";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
		recommend: state.recommend,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateRecommend: recommend =>
			dispatch({
				type: "UPDATE_RECOMMEND",
				recommend,
			}),
	};
}

class Recommended extends React.Component {
	getRecommend = () => {
		// get recommendation list from db
		AsyncStorage.getItem("state")
			.then(serializedState => {
				const savedState = JSON.parse(serializedState);
				console.log("recommend");
				console.log(savedState);

				// if login - same as in LoginScreen
				if (savedState && savedState.token) {
					token = savedState.token;
					fetch("http://120.77.255.227:10089/users/get_recommend", {
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
				}

				// if not login - same as in LogoutView
				else {
					const token =
						"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJUZXN0MTEtW1Rlc3QxMV0iLCJpYXQiOjE2NTkwODYwMDAsImV4cCI6MTY1OTUxODAwMH0.VNzG9lGbLaAnrbKFZjXxwiAaONiSLpl195hO_kWJ07zHdTSToIRmPNWDtTPyNXaGGaj66oXWuSykcipZ3HKeZw";
					fetch("http://120.77.255.227:10089/users/get_recommend", {
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
				}
			})
			.catch(error => console.log(error));
	};

	componentDidMount() {
		this.getRecommend();
	}

	render() {
		return (
			<Container>
				<Subtitle>Recommended</Subtitle>

				<Query query={CardsQuery}>
					{({ loading, error, data }) => {
						if (loading) return <Message>Loading...</Message>;
						if (error) return <Message>Error...</Message>;

						var items = [];

						let recommend = this.props.recommend;
						if (!recommend) recommend = ["3hCqc4Bps5hbW3RHFMCWeq", "4BjlbWnAXFPNI89V2Pk0wg", "4GZu1Ih2Jqi4vPVAfu9SYN"];
						for (const element of data.cardsCollection.items) {
							if (recommend.includes(element.sys.id)) {
								items.push(element);
							}
						}

						return (
							<PlacesContainer>
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
										<Place
											id={card.sys.id}
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
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);

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

const Message = styled.Text`
	margin: 20px;
	color: #b8bece;
	font-size: 15px;
	font-weight: 500;
`;

const PlacesContainer = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	padding-left: 10px;
`;
