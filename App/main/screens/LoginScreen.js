import React from "react";
import styled from "styled-components";
import { Dimensions, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { BlurView } from "@react-native-community/blur";
import LottieView from "lottie-react-native";
import { Divider } from "@rneui/base";
import Ionicon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveState } from "../components/AsyncStorage";
import Success from "../components/Success";
import Loading from "../components/Loading";
import { connect } from "react-redux";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
	return { action: state.action };
}

function mapDispatchToProps(dispatch) {
	return {
		updateName: name =>
			dispatch({
				type: "UPDATE_NAME",
				name,
			}),
		updateAvatar: avatar =>
			dispatch({
				type: "UPDATE_AVATAR",
				avatar,
			}),
	};
}

class LoginScreen extends React.Component {
	state = {
		email: "",
		password: "",
		emailColor: "rgba(255,255,255, 0.6)",
		passwordColor: "rgba(255,255,255, 0.6)",
		isSuccessful: false,
		isLoading: false,
	};

	// store the data
	storeName = async name => {
		try {
			await AsyncStorage.setItem("name", name);
		} catch (error) {
			console.log("store error");
			console.log(error);
		}
	};

	fetchUser = () => {
		fetch("https://randomuser.me/api/")
			// transform to json first
			.then(response => response.json())
			// using the response
			.then(response => {
				const name = response.results[0].name.first;
				const avatar = response.results[0].picture.thumbnail;
				saveState({ name, avatar });
				this.props.updateName(name);
				this.props.updateAvatar(avatar);
			});
	};

	// login function
	handleLogin = () => {
		// console.log(this.state.email, this.state.password);

		this.tapBackground();

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
			// this.storeName(email);

			this.fetchUser();

			// update user name
			// this.props.updateName(email);

			// auto hide login
			setTimeout(() => {
				this.props.navigation.goBack();
				this.setState({ isSuccessful: false });
			}, 1000);
		}, 1000);
	};

	focusEmail = () => {
		this.setState({
			userColor: "rgba(255,255,255, 0.6)",
			emailColor: "#5263ff",
			passwordColor: "rgba(255,255,255, 0.6)",
		});
	};

	focusPassword = () => {
		this.setState({
			userColor: "rgba(255,255,255, 0.6)",
			emailColor: "rgba(255,255,255, 0.6)",
			passwordColor: "#5263ff",
		});
	};

	tapBackground = () => {
		Keyboard.dismiss();
		this.setState({
			emailColor: "rgba(255,255,255, 0.6)",
			passwordColor: "rgba(255,255,255, 0.6)",
		});
	};

	render() {
		return (
			<Container>
				<TouchableWithoutFeedback onPress={this.tapBackground}>
					<Image source={require("../assets/bg.png")} />
				</TouchableWithoutFeedback>
				<BlurView
					blurType="ultraThinMaterialDark"
					blurAmount={10}
					style={{
						position: "absolute",
						width: 335,
						height: 400,
						borderRadius: 30,
					}}
				/>
				<Background></Background>

				<Content>
					<Title>Sign In</Title>
					<Caption>Start your trip.</Caption>

					<TextField
						onChangeText={email => this.setState({ email })}
						placeholder="Email"
						placeholderTextColor="rgba(255,255,255,0.5)"
						keyboardType="email-address"
						onFocus={this.focusEmail}
					/>
					<TextField
						onChangeText={password => this.setState({ password })}
						placeholder="Password"
						placeholderTextColor="rgba(255,255,255,0.5)"
						secureTextEntry={true}
						onFocus={this.focusPassword}
					/>
					<Ionicon
						name="mail"
						size={24}
						color={this.state.emailColor}
						style={{
							position: "absolute",
							top: 128,
							left: 31,
						}}
					/>
					<Ionicon
						name="lock-closed"
						size={24}
						color={this.state.passwordColor}
						style={{
							position: "absolute",
							top: 191,
							left: 32,
						}}
					/>
					<TouchableOpacity onPress={this.handleLogin}>
						<Button>
							<ButtonText>Sign in</ButtonText>
						</Button>
					</TouchableOpacity>
					<Divider
						style={{
							marginTop: 15,
							marginLeft: 20,
							marginRight: 20,
							height: 1,
							opacity: 0.6,
						}}
					></Divider>
					<Hint>
						<FootNote>Don't have an account?</FootNote>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.push("Signup", {});
							}}
						>
							<HintText>Sign up</HintText>
						</TouchableOpacity>
					</Hint>
					<Hint>
						<FootNote>Forgot password?</FootNote>
						<HintText>Reset Password</HintText>
					</Hint>
				</Content>
				<TouchableOpacity
					style={{ position: "absolute", bottom: 60 }}
					onPress={() => {
						this.props.navigation.goBack();
					}}
				>
					<CloseView>
						<BlurView
							blurType="ultraThinMaterialDark"
							blurAmount={10}
							style={{
								position: "absolute",
								top: 0,
								width: "100%",
								height: "100%",
								borderRadius: 18,
							}}
						/>
						<Ionicon name="close" size={24} color={"rgba(255,255,255, 0.6)"} />
					</CloseView>
				</TouchableOpacity>
				<Success isActive={this.state.isSuccessful} />
				<Loading isActive={this.state.isLoading} />
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const HintText = styled.Text`
	font-weight: 700;
	font-size: 14px;
	color: #5263ff;
	margin-top: 15px;
`;

const Hint = styled.View`
	flex-direction: row;

	align-items: center;
`;

const CloseView = styled.View`
	width: 36px;
	height: 36px;
	background: rgba(40, 27, 90, 0.6);
	border-radius: 18px;
	box-shadow: 0 30px 60px rgba(42, 28, 91, 0.5);
	justify-content: center;
	align-items: center;
	border: 1px solid rgba(255, 255, 255, 0.3);
`;

const FootNote = styled.Text`
	color: rgba(255, 255, 255, 0.6);
	font-size: 12px;
	margin-left: 20px;
	margin-right: 5px;
	margin-top: 15px;
`;

const ButtonText = styled.Text`
	color: white;
	font-weight: 600;
	font-size: 20px;
	text-transform: uppercase;
`;

const Button = styled.View`
	background: #5263ff;
	width: 295px;
	height: 50px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	box-shadow: 0 10px 20px rgba(40, 27, 90, 0.8);
	margin-top: 20px;
	margin-left: 20px;
`;

const TextField = styled.TextInput`
	border: 1px solid #5263ff;
	width: 295px;
	height: 44px;
	border-radius: 16px;
	font-size: 17px;
	color: white;
	background: rgba(40, 27, 90, 0.8);
	margin-top: 20px;
	padding-left: 44px;
	margin-left: 20px;
`;

const PasswordInput = styled.TextInput`
	border: 1px solid #5263ff;
	width: 295px;
	height: 44px;
	border-radius: 16px;
	font-size: 17px;
	color: #3c4560;
	background: rgba(40, 27, 90, 0.8);
	margin-top: 20px;
	padding-left: 44px;
	margin-left: 20px;
`;

const Background = styled.View`
	position: absolute;
	width: 335px;
	height: 400px;
	background-color: #281b5a;
	opacity: 0.3;
	border-radius: 30px;
	box-shadow: 0 30px 60px rgba(42, 28, 91, 0.5);
`;

const Container = styled.View`
	justify-content: center;
	align-items: center;
`;

const Image = styled.Image`
	width: 100%;
	height: 100%;
`;

const Content = styled.View`
	position: absolute;
	justify-content: center;

	border-width: 1px;
	border-color: rgba(255, 255, 255, 0.3);
	border-radius: 30px;
	overflow: hidden;

	width: 335px;
	height: 400px;
	box-shadow: 0 30px 60px rgba(42, 28, 91, 0.5);
`;

const Title = styled.Text`
	font-size: 35px;
	color: white;
	font-weight: 700;
	margin-left: 20px;
`;

const Caption = styled.Text`
	font-size: 15px;
	color: rgba(255, 255, 255, 0.7);
	margin-left: 20px;
	margin-top: 16px;
`;

const IconEmail = styled.Image`
	width: 24px;
	height: 16px;
	position: absolute;
	top: 132px;
	left: 31px;
`;

const IconPassword = styled.Image`
	width: 18px;
	height: 24px;
	position: absolute;
	top: 192px;
	left: 35px;
`;
