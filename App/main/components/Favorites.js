import { connect } from "react-redux";
import { ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import Card from "./Card";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const ids = ["4KThjrfS9cpzmX6PX87UPH", "12PUdEJqgJ9Jw6v0Vtv6ng", "52q2QvQ82QNgwyd3yQyj2M"];

const idd = "4KThjrfS9cpzmX6PX87UPH";

const CardsQuery = gql`
	{
		cardsCollection(where: { sys: { id_in: ["4KThjrfS9cpzmX6PX87UPH", "12PUdEJqgJ9Jw6v0Vtv6ng", "52q2QvQ82QNgwyd3yQyj2M"] } }) {
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
	};
}

class Favorites extends React.Component {
	render() {
		return (
			<Container>
				{this.props.name != "Guest" && <Subtitle>Favorite Places</Subtitle>}
				{this.props.name != "Guest" && (
					<ScrollView horizontal={true} style={{ paddingBottom: 30 }} showsHorizontalScrollIndicator={false}>
						<Query query={CardsQuery}>
							{({ loading, error, data }) => {
								if (loading) return <Message>Loading...</Message>;
								if (error) return <Message>Error...</Message>;

								var items = data.cardsCollection.items;
								var length = items.length;
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
				)}
			</Container>
		);
	}
}

export default connect(mapStateToProps)(Favorites);

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
