import React from "react";
import styled from "styled-components";
import Ionicon from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";
import { BlurView } from "@react-native-community/blur";
import logoMap from "./LogoMap";

const screenWidth = Dimensions.get("window").width;
var cardWidth = screenWidth - 40;
if (screenWidth > 500) {
	cardWidth = 460;
}

const MenuCard = props => (
	<Container style={{ width: cardWidth }}>
		<Cover>
			<Image source={props.image} />
			<BlurView
				blurType="light"
				blurAmount={5}
				style={{
					position: "absolute",

					width: "100%",
					height: "100%",
				}}
			/>
			{/* <Subtitle>{props.subtitle}</Subtitle> */}
			<Wrapper>
				<Logo source={logoMap.get(props.type)} resizeMode="contain" />
				<Type>{props.type}</Type>
			</Wrapper>
			<Title>{props.title}</Title>
		</Cover>
	</Container>
);

export default MenuCard;

const Container = styled.View`
	width: 335px;
	height: 140px;
	margin: 10px 10px;
	border-radius: 24px;
	/* box-shadow: 0 10px 20px rgba(255, 255, 255, 0.95); */
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
	height: 140px;
	border-radius: 24px;
	overflow: hidden;
	justify-content: flex-end;
`;

const Image = styled.Image`
	width: 100%;
	height: 100%;
	position: absolute;
`;

const Title = styled.Text`
	font-size: 24px;
	color: white;
	font-weight: 600;
	margin-top: 4px;
	margin-bottom: 20px;
	margin-left: 20px;
	width: 300px;
	box-shadow: 0 6px 6px rgba(0, 0, 0, 0.95);
`;

const Subtitle = styled.Text`
	font-size: 15px;
	font-weight: 500;
	color: rgba(255, 255, 255, 0.8);
	text-transform: uppercase;
	margin-left: 20px;
`;

const Wrapper = styled.View`
	flex-direction: row;
	margin-left: 20px;
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
