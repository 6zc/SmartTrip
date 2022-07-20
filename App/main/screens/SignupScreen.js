import React from "react";
import styled from "styled-components";
import { Dimensions, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from "react-native";
import { BlurView } from "@react-native-community/blur";
import LottieView from "lottie-react-native";
import { Divider } from "@rneui/base";
import Ionicon from "react-native-vector-icons/Ionicons";
import Congrat from "../components/Congrat";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const server = "http://39.108.191.242:10089/users/signup";

class SignupScreen extends React.Component {
	state = {
		user: "",
		email: "",
		phone: "",
		password: "",
		isSuccessful: false,
		userColor: "rgba(255,255,255, 0.6)",
		emailColor: "rgba(255,255,255, 0.6)",
		phoneColor: "rgba(255,255,255, 0.6)",
		passwordColor: "rgba(255,255,255, 0.6)",
	};

	focusUser = () => {
		this.setState({
			userColor: "#5263ff",
			emailColor: "rgba(255,255,255, 0.6)",
			phoneColor: "rgba(255,255,255, 0.6)",
			passwordColor: "rgba(255,255,255, 0.6)",
		});
	};

	focusEmail = () => {
		this.setState({
			userColor: "rgba(255,255,255, 0.6)",
			emailColor: "#5263ff",
			phoneColor: "rgba(255,255,255, 0.6)",
			passwordColor: "rgba(255,255,255, 0.6)",
		});
	};

	focusPhone = () => {
		this.setState({
			userColor: "rgba(255,255,255, 0.6)",
			emailColor: "rgba(255,255,255, 0.6)",
			phoneColor: "#5263ff",
			passwordColor: "rgba(255,255,255, 0.6)",
		});
	};

	focusPassword = () => {
		this.setState({
			userColor: "rgba(255,255,255, 0.6)",
			emailColor: "rgba(255,255,255, 0.6)",
			phoneColor: "rgba(255,255,255, 0.6)",
			passwordColor: "#5263ff",
		});
	};

	tapBackground = () => {
		Keyboard.dismiss();
		this.setState({
			userColor: "rgba(255,255,255, 0.6)",
			emailColor: "rgba(255,255,255, 0.6)",
			passwordColor: "rgba(255,255,255, 0.6)",
		});
	};

	handleSuccess = () => {
		// animation

		this.setState({ isSuccessful: true });
		Alert.alert("Success", "Please sign in to continue.");
		setTimeout(() => {
			this.props.navigation.goBack();
			this.setState({ isSuccessful: false });
		}, 1300);
	};

	handleSignup = () => {
		this.tapBackground();
		userState = {
			username: this.state.user,
			password: this.state.password,
			phone: this.state.phone,
			email: this.state.email,
		};
		fetch(server, {
			body: JSON.stringify(userState), // must match 'Content-Type' header
			headers: { "Content-Type": "application/json" },
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			method: "POST", // *GET, POST, PUT, DELETE, etc.
		})
			.then(response => {
				response
					.json()
					.then(data => {
						if (data.code == "0000") {
							// login success

							console.log("sign up success", data);
							this.handleSuccess();
						} else {
							Alert.alert("Sign Up Failed", data.msg);
							console.log("sign up failed", data);
						}
					})
					.catch(data => {
						console.log("sign up fail", data);

						//login fail
						//json 解析错误
					});
			})
			.catch(error => {
				console.log("sign up falied", error);
			});
	};

	render() {
		return (
			<Container>
				<TouchableWithoutFeedback onPress={this.tapBackground}>
					<Image source={require("../assets/bg3.png")} />
				</TouchableWithoutFeedback>
				{/* <Background />
				<LottieView
					source={require("../assets/gradient-bg.json")}
					autoPlay={true}
					speed={0.5}
					loop={true}
					ref={animation => {
						this.animation = animation;
					}}
					style={{
						width: 355,

						position: "absolute",
						top: 70,
					}}
				/> */}
				<BlurView
					blurType="ultraThinMaterialDark"
					blurAmount={10}
					style={{
						position: "absolute",
						width: 335,
						height: 480,
						borderRadius: 30,
					}}
				/>
				<Background></Background>

				<Content>
					<Title>Create Account</Title>
					<Caption>Begin to plan your trip. With fun.</Caption>
					<TextField
						onChangeText={user => this.setState({ user })}
						placeholder="User Name"
						placeholderTextColor="rgba(255,255,255,0.5)"
						onFocus={this.focusUser}
					/>
					<TextField
						onChangeText={email => this.setState({ email })}
						placeholder="Email"
						placeholderTextColor="rgba(255,255,255,0.5)"
						keyboardType="email-address"
						onFocus={this.focusEmail}
					/>
					<TextField
						onChangeText={phone => this.setState({ phone })}
						placeholder="Phone"
						placeholderTextColor="rgba(255,255,255,0.5)"
						keyboardType="phone-pad"
						onFocus={this.focusPhone}
					/>
					<TextField
						onChangeText={password => this.setState({ password })}
						placeholder="Password"
						placeholderTextColor="rgba(255,255,255,0.5)"
						secureTextEntry={true}
						onFocus={this.focusPassword}
					/>
					<Ionicon
						name="person"
						size={24}
						color={this.state.userColor}
						style={{
							position: "absolute",
							top: 116,
							left: 31,
						}}
					/>
					<Ionicon
						name="mail"
						size={24}
						color={this.state.emailColor}
						style={{
							position: "absolute",
							top: 180,
							left: 31,
						}}
					/>
					<Ionicon
						name="call"
						size={24}
						color={this.state.phoneColor}
						style={{
							position: "absolute",
							top: 245,
							left: 32,
						}}
					/>
					<Ionicon
						name="lock-closed"
						size={24}
						color={this.state.passwordColor}
						style={{
							position: "absolute",
							top: 308,
							left: 32,
						}}
					/>
					<TouchableOpacity onPress={this.handleSignup}>
						<Button>
							<ButtonText>Sign up</ButtonText>
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
					<FootNote>By clicking on Sign up, you agree to our Terms of service and Privacy policy</FootNote>
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
				<Congrat isActive={this.state.isSuccessful} />
			</Container>
		);
	}
}

export default SignupScreen;

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
	margin-right: 20px;
	margin-top: 10px;
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

const Background = styled.View`
	position: absolute;
	width: 335px;
	height: 480px;
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
	height: 480px;
	box-shadow: 0 30px 60px rgba(42, 28, 91, 0.5);
`;

const Title = styled.Text`
	font-size: 35px;
	color: white;
	font-weight: 700;
	margin-left: 20px;
	margin-top: 8px;
`;

const Caption = styled.Text`
	font-size: 15px;
	color: rgba(255, 255, 255, 0.7);
	margin-left: 20px;
	margin-top: 8px;
`;
