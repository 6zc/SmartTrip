import React from "react";
import styled from "styled-components";
import { Button } from "react-native";
import DiscoverCard from "../components/DiscoverCard";
import { PanResponder, Animated, TouchableOpacity } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";

class DiscoverScreen extends React.Component {
	state = {
		pan: new Animated.ValueXY(),
	};

	UNSAFE_componentWillMount() {
		this._panResponder = PanResponder.create({
			// enable gestures
			onMoveShouldSetPanResponder: () => true,
			// move cards
			onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }], { useNativeDriver: false }),
			// release
			onPanResponderRelease: () => {
				Animated.spring(this.state.pan, {
					useNativeDriver: false,
					toValue: { x: 0, y: 0 },
				}).start();
			},
		});
	}

	render() {
		return (
			<Container>
				<Card>
					<Animated.View
						style={{ transform: [{ translateX: this.state.pan.x }, { translateY: this.state.pan.y }] }}
						{...this._panResponder.panHandlers}
					>
						<DiscoverCard
							title="Hong Kong Disneyland"
							image={require("../assets/background5.jpg")}
							subtitle="Theme Park"
							text="Hong Kong Disneyland is a theme park located on reclaimed land in Penny's Bay, Lantau Island. "
						/>
					</Animated.View>
				</Card>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.goBack();
					}}
					style={{ position: "absolute", bottom: 20, left: "50%", marginLeft: -30, zIndex: 1 }}
				>
					<CloseView>
						<Ionicon name="arrow-undo-outline" size={40} color="#546bfb" />
					</CloseView>
				</TouchableOpacity>
			</Container>
		);
	}
}

export default DiscoverScreen;

const Container = styled.View`
	flex: 1;
`;

const Card = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background: #f0f3f5;
`;

const CloseView = styled.View`
	width: 60px;
	height: 60px;
	border-radius: 30px;
	background: white;
	justify-content: center;
	align-items: center;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;
