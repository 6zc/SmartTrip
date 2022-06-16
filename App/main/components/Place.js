import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

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

	componentDidMount() {
		Dimensions.addEventListener("change", this.adaptLayout);
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
					<Logo source={this.props.logo} resizeMode="contain" />
					<Subtitle>{this.props.distance}</Subtitle>
					<Title>{this.props.title}</Title>
				</Cover>
				<Content>
					<Caption>{this.props.caption}</Caption>
					<Name>{this.props.type}</Name>
				</Content>
			</Container>
		);
	}
}

export default Place;

const Container = styled.View`
	width: 335px;
	height: 335px;
	background: white;
	margin: 10px 10px;
	border-radius: 14px;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
	height: 260px;
	border-top-left-radius: 14px;
	border-top-right-radius: 14px;
	overflow: hidden;
	justify-content: flex-end;
`;

const Image = styled.Image`
	width: 100%;
	height: 100%;
	position: absolute;
`;

const Logo = styled.Image`
	width: 48px;
	height: 48px;
	position: absolute;
	top: 90px;
	left: 50%;
	margin-left: -24px;
`;

const Title = styled.Text`
	font-size: 24px;
	color: white;
	font-weight: 600;
	margin-top: 4px;
	margin-bottom: 20px;
	margin-left: 20px;
	width: 170px;
`;

const Subtitle = styled.Text`
	font-size: 15px;
	font-weight: 500;
	color: rgba(255, 255, 255, 0.8);
	text-transform: uppercase;
	margin-left: 20px;
`;

const Content = styled.View`
	padding-left: 20px;
	justify-content: center;
	height: 75px;
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
