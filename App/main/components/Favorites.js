import { connect } from "react-redux";
import { ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import Card from "./Card";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const idd = "4KThjrfS9cpzmX6PX87UPH";

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
		// collection
		// query写成函数，传入collection，在其他页面添加/删除收藏时更新collection
		// 问题：section加入redux？ 不能 - 如何刷新favorites

		// 两个方案：收藏单独做个页面 - 实现简单，跳到section再返回刷新可以用addlistener

		// 根本问题：如何刷新收藏？？？？
	};
}

class Favorites extends React.Component {
	componentDidMount() {
		// console.log(this.props.collection);
	}

	render() {
		return (
			<Container>
				{this.props.name != "Guest" && <Subtitle>Favorite Places</Subtitle>}
				{this.props.name != "Guest" && (
					<ScrollView horizontal={true} style={{ paddingBottom: 30 }} showsHorizontalScrollIndicator={false}>
						<Query query={getCollection()}>
							{({ loading, error, data }) => {
								if (loading) return <Message>Loading...</Message>;
								if (error) return <Message>Error...</Message>;
								var collection = this.props.collection;
								var items = [];

								for (const element of data.cardsCollection.items) {
									if (collection.includes(element.sys.id)) {
										items.push(element);
									}
								}
								console.log(items);

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
