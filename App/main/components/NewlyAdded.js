import { connect } from "react-redux";
import { ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import Card from "./Card";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const CardsQuery = gql`
	{
		cardsCollection(limit: 4) {
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

class NewlyAdded extends React.Component {
	render() {
		return (
			<Container>
				<Subtitle>What's new</Subtitle>

				<ScrollView horizontal={true} style={{ paddingBottom: 30 }} showsHorizontalScrollIndicator={false}>
					<Query query={CardsQuery}>
						{({ loading, error, data }) => {
							if (loading) return <Message>Loading...</Message>;
							if (error) return <Message>Error...</Message>;

							const items = data.cardsCollection.items;

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
							);
						}}
					</Query>
				</ScrollView>
			</Container>
		);
	}
}

export default NewlyAdded;

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
