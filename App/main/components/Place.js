import React from "react";
import styled from "styled-components";
import { Dimensions, TouchableOpacity } from "react-native";
import { BlurView } from "@react-native-community/blur";
import Ionicon from "react-native-vector-icons/Ionicons";

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
					{/* <BlurView
						blurType="light"
						blurAmount={3}
						style={{
							position: "absolute",
							width: "100%",
							height: "100%",
						}}
					/> */}
					<Wrapper>
						<Logo source={this.props.logo} resizeMode="contain" />
						<Type>{this.props.type}</Type>
					</Wrapper>
					<TouchableOpacity style={{ position: "absolute", top: 10, right: 10 }}>
						<Ionicon name="heart-outline" size={32} color="#f0f3f5" />
					</TouchableOpacity>
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
					<Subtitle>{this.props.distance}</Subtitle>
					<Title>{this.props.title}</Title>
				</Content>

				{/* <Content>
					<Caption>{this.props.caption}</Caption>
					<Name>{this.props.type}</Name>
				</Content> */}
			</Container>
		);
	}
}

export default Place;

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
	height: 100px;
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
