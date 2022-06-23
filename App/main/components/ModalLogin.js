import React from "react";
import styled from "styled-components";
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { BlurView } from "@react-native-community/blur";
import Success from "./Success";
import Loading from "./Loading";
import { Alert, Animated, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { connect } from "react-redux";

function mapStateToProps(state) {
	return { action: state.action };
}

function mapDispatchToProps(dispatch) {
	return {
		closeLogin: () =>
			dispatch({
				type: "CLOSE_LOGIN",
			}),
		updateName: name =>
			dispatch({
				type: "UPDATE_NAME",
				name,
			}),
	};
}

const screenHeight = Dimensions.get("window").height;

class ModalLogin extends React.Component {
	state = {
		email: "",
		password: "",
		iconEmail: require("../assets/icon-email.png"),
		iconPassword: require("../assets/icon-password.png"),
		isSuccessful: false,
		isLoading: false,
		top: new Animated.Value(screenHeight),
		scale: new Animated.Value(1.3),
		translateY: new Animated.Value(0),
	};

	componentDidMount() {
		this.retrieveName();
	}

	// detect change in redux
	componentDidUpdate() {
		if (this.props.action == "openLogin") {
			Animated.timing(this.state.top, { useNativeDriver: false, toValue: 0, duration: 0 }).start();
			Animated.spring(this.state.scale, { useNativeDriver: false, toValue: 1 }).start();
			Animated.timing(this.state.translateY, { useNativeDriver: false, toValue: 0, duration: 0 }).start();
		}

		if (this.props.action == "closeLogin") {
			setTimeout(() => {
				Animated.timing(this.state.top, { useNativeDriver: false, toValue: screenHeight, duration: 0 }).start();
				Animated.spring(this.state.scale, { useNativeDriver: false, toValue: 1.3 }).start();
			}, 500);

			Animated.timing(this.state.translateY, { useNativeDriver: false, toValue: 1000, duration: 500 }).start();
		}
	}

	// store the data
	storeName = async name => {
		try {
			await AsyncStorage.setItem("name", name);
		} catch (error) {
			console.log("store error");
			console.log(error);
		}
	};

	// get user name
	retrieveName = async () => {
		try {
			const name = await AsyncStorage.getItem("name");
			if (name != null) {
				console.log(name);
				this.props.updateName(name);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// login function
	handleLogin = () => {
		// console.log(this.state.email, this.state.password);

		Keyboard.dismiss();

		this.setState({
			isLoading: true,
		});

		// do the api call here
		const email = this.state.email;
		const password = this.state.password;
		// ...
		// simulate api call
		setTimeout(() => {
			this.setState({ isLoading: false });
			this.setState({ isSuccessful: true });

			// send alert
			// Alert.alert("Congrats", "You've logged in successfully!");

			// store user name
			this.storeName(email);
			// update user name
			this.props.updateName(email);

			// auto hide login
			setTimeout(() => {
				this.props.closeLogin();
				this.setState({ isSuccessful: false });
			}, 1000);
		}, 1000);
	};

	// animation for email icon
	focusEmail = () => {
		this.setState({
			iconEmail: require("../assets/icon-email-animated.gif"),
			iconPassword: require("../assets/icon-password.png"),
		});
	};

	// animation for password icon
	focusPassword = () => {
		this.setState({
			iconEmail: require("../assets/icon-email.png"),
			iconPassword: require("../assets/icon-password-animated.gif"),
		});
	};

	tapBackground = () => {
		Keyboard.dismiss();
		this.props.closeLogin();
	};

	render() {
		return (
			<AnimatedContainer style={{ top: this.state.top }}>
				<TouchableWithoutFeedback onPress={this.tapBackground}>
					<BlurView
						blurType="dark"
						blurAmount={5}
						style={{
							position: "absolute",
							width: "100%",
							height: "100%",
						}}
					/>
				</TouchableWithoutFeedback>
				<AnimatedModal
					style={{
						transform: [
							{
								scale: this.state.scale,
							},
							{ translateY: this.state.translateY },
						],
					}}
				>
					<LottieView
						source={require("../assets/lottie-login.json")}
						autoPlay={true}
						loop={true}
						ref={animation => {
							this.animation = animation;
						}}
						style={{
							height: 200,
							position: "absolute",
							top: 0,
						}}
					/>
					{/* <Logo source={require("../assets/point-of-interest.png")} /> */}
					<Text>Start your trip</Text>
					<EmailInput
						onChangeText={email => this.setState({ email })}
						placeholder="Email"
						keyboardType="email-address"
						onFocus={this.focusEmail}
					/>
					<PasswordInput
						onChangeText={password => this.setState({ password })}
						placeholder="Password"
						secureTextEntry={true}
						onFocus={this.focusPassword}
					/>
					<IconEmail source={this.state.iconEmail} />
					<IconPassword source={this.state.iconPassword} />
					<TouchableOpacity
						onPress={this.handleLogin}
						style={{
							position: "absolute",
							top: 272,
						}}
					>
						<Button>
							<ButtonText>Log In</ButtonText>
						</Button>
					</TouchableOpacity>
				</AnimatedModal>
				<Success isActive={this.state.isSuccessful} />
				<Loading isActive={this.state.isLoading} />
			</AnimatedContainer>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);

const Container = styled.View`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.75);
	justify-content: center;
	align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Modal = styled.View`
	width: 335px;
	height: 370px;
	background: white;
	border-radius: 20px;
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
	align-items: center;
`;

const AnimatedModal = Animated.createAnimatedComponent(Modal);

const Logo = styled.Image`
	width: 44px;
	height: 44px;
	margin-top: 50px;
`;

const Text = styled.Text`
	margin-top: 20px;
	font-size: 15px;
	font-weight: 600;
	text-transform: uppercase;
	width: 200px;
	text-align: center;
	color: #b8bece;
	position: absolute;
	top: 117px;
`;

const EmailInput = styled.TextInput`
	border: 1px solid #dbdfea;
	width: 295px;
	height: 44px;
	border-radius: 10px;
	font-size: 17px;
	color: #3c4560;
	margin-top: 20px;
	padding-left: 44px;
	position: absolute;
	top: 144px;
`;

const PasswordInput = styled.TextInput`
	border: 1px solid #dbdfea;
	width: 295px;
	height: 44px;
	border-radius: 10px;
	font-size: 17px;
	color: #3c4560;
	margin-top: 20px;
	padding-left: 44px;
	position: absolute;
	top: 208px;
`;

const Button = styled.View`
	background: #5263ff;
	width: 295px;
	height: 50px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	box-shadow: 0 10px 20px #c2cbff;
	margin-top: 20px;
`;

const ButtonText = styled.Text`
	color: white;
	font-weight: 600;
	font-size: 20px;
	text-transform: uppercase;
`;

const IconEmail = styled.Image`
	width: 24px;
	height: 16px;
	position: absolute;
	top: 179px;
	left: 31px;
`;

const IconPassword = styled.Image`
	width: 18px;
	height: 24px;
	position: absolute;
	top: 239px;
	left: 35px;
`;
