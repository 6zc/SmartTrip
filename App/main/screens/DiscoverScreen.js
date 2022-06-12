import React from "react";
import styled from "styled-components";
import { Button } from "react-native";
import DiscoverCard from "../components/DiscoverCard";
import { PanResponder, Animated, TouchableOpacity } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";

function getNextIndex(index) {
	var nextIndex = index + 1;
	if (nextIndex > cards.length - 1) {
		return 0;
	}
	return nextIndex;
}

class DiscoverScreen extends React.Component {
	state = {
		pan: new Animated.ValueXY(),
		scale: new Animated.Value(0.9),
		translateY: new Animated.Value(44),
		thirdScale: new Animated.Value(0.8),
		thirdTranslateY: new Animated.Value(-50),
		index: 0,
	};

	UNSAFE_componentWillMount() {
		this._panResponder = PanResponder.create({
			// enable gestures
			onMoveShouldSetPanResponder: () => true,

			// animation for showing the second/third card
			onPanResponderGrant: () => {
				// second card
				Animated.spring(this.state.scale, { useNativeDriver: false, toValue: 1 }).start();
				Animated.spring(this.state.translateY, { useNativeDriver: false, toValue: 0 }).start();
				// third card
				Animated.spring(this.state.thirdScale, { useNativeDriver: false, toValue: 0.9 }).start();
				Animated.spring(this.state.thirdTranslateY, { useNativeDriver: false, toValue: 44 }).start();
			},

			// move cards
			onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }], { useNativeDriver: false }),

			// release
			onPanResponderRelease: () => {
				const positionY = this.state.pan.y.__getValue();
				// console.log(positionY);
				// drop the card
				if (positionY > 280) {
					Animated.timing(this.state.pan, {
						useNativeDriver: false,
						toValue: { x: 0, y: 1000 },
					}).start(() => {
						this.state.pan.setValue({ x: 0, y: 0 });
						this.state.scale.setValue(0.9), this.state.translateY.setValue(44);
						this.state.thirdScale.setValue(0.8);
						this.state.thirdTranslateY.setValue(-50);
						this.setState({ index: getNextIndex(this.state.index) });
					});
				} else {
					// return first card to center
					Animated.spring(this.state.pan, {
						useNativeDriver: false,
						toValue: { x: 0, y: 0 },
					}).start();
					// return second card to smaller scale
					Animated.spring(this.state.scale, { useNativeDriver: false, toValue: 0.9 }).start();
					Animated.spring(this.state.translateY, { useNativeDriver: false, toValue: 44 }).start();
					// return third card to hidden
					Animated.spring(this.state.thirdScale, { useNativeDriver: false, toValue: 0.8 }).start();
					Animated.spring(this.state.thirdTranslateY, { useNativeDriver: false, toValue: -50 }).start();
				}
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
							title={cards[this.state.index].title}
							image={cards[this.state.index].image}
							subtitle={cards[this.state.index].subtitle}
							text={cards[this.state.index].text}
						/>
					</Animated.View>
					<Animated.View
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							zIndex: -1,
							width: "100%",
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
							transform: [{ scale: this.state.scale }, { translateY: this.state.translateY }],
						}}
					>
						<DiscoverCard
							title={cards[getNextIndex(this.state.index)].title}
							image={cards[getNextIndex(this.state.index)].image}
							subtitle={cards[getNextIndex(this.state.index)].subtitle}
							text={cards[getNextIndex(this.state.index)].text}
						/>
					</Animated.View>
					<Animated.View
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							zIndex: -3,
							width: "100%",
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
							transform: [{ scale: this.state.thirdScale }, { translateY: this.state.thirdTranslateY }],
						}}
					>
						<DiscoverCard
							title={cards[getNextIndex(this.state.index + 1)].title}
							image={cards[getNextIndex(this.state.index + 1)].image}
							subtitle={cards[getNextIndex(this.state.index + 1)].subtitle}
							text={cards[getNextIndex(this.state.index + 1)].text}
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

const cards = [
	{
		title: "Hong Kong Disneyland",
		image: require("../assets/background5.jpg"),
		subtitle: "Theme Park",
		text: "Hong Kong Disneyland is a theme park located on reclaimed land in Penny's Bay, Lantau Island. ",
	},
	{
		title: "Hong Kong Disneyland",
		image: require("../assets/background6.jpg"),
		subtitle: "Theme Park",
		text: "Hong Kong Disneyland is a theme park located on reclaimed land in Penny's Bay, Lantau Island. ",
	},
	{
		title: "Hong Kong Disneyland",
		image: require("../assets/background7.jpg"),
		subtitle: "Theme Park",
		text: "Hong Kong Disneyland is a theme park located on reclaimed land in Penny's Bay, Lantau Island. ",
	},
];
