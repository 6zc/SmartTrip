import { TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Place from "./Place";

const ids = ["3hCqc4Bps5hbW3RHFMCWeq", "4BjlbWnAXFPNI89V2Pk0wg", "4GZu1Ih2Jqi4vPVAfu9SYN"];

const idd = "4KThjrfS9cpzmX6PX87UPH";

const CardsQuery = gql`
	{
		cardsCollection(where: { sys: { id_in: ["3hCqc4Bps5hbW3RHFMCWeq", "4BjlbWnAXFPNI89V2Pk0wg", "4GZu1Ih2Jqi4vPVAfu9SYN"] } }) {
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

class Recommended extends React.Component {
	render() {
		return (
			<Container>
				<Subtitle>Recommended</Subtitle>

				<Query query={CardsQuery}>
					{({ loading, error, data }) => {
						if (loading) return <Message>Loading...</Message>;
						if (error) return <Message>Error...</Message>;

						var items = data.cardsCollection.items;

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

export default Recommended;

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
