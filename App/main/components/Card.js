import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { render } from "react-dom";

class Card extends React.Component {
	state = {
		liked: false,
	};

	render() {
		return (
			<Container style={{ elevation: 10 }}>
				<Cover>
					<Image source={this.props.image} />
					<Caption>{this.props.caption}</Caption>
					<TouchableOpacity style={{ position: "absolute", top: 10, right: 10 }}>
						<Ionicon name="heart-outline" size={32} color="#f0f3f5" />
					</TouchableOpacity>
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

export default Card;

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
