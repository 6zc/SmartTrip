import React from "react";
import styled from "styled-components";
import { Dimensions, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from "react-native";
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

const server = "http://39.108.191.242:10089/login";

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
		updateToken: token =>
			dispatch({
				type: "UPDATE_TOKEN",
				token,
			}),
		updateCollection: collection =>
			dispatch({
				type: "UPDATE_COLLECTION",
				collection,
			}),
	};
}

class LoginScreen extends React.Component {
	state = {
		user: "",
		password: "",
		userColor: "rgba(255,255,255, 0.6)",
		passwordColor: "rgba(255,255,255, 0.6)",
		isSuccessful: false,
		isLoading: false,
	};

	getCollectionDB = () => {
		var token = "";
		AsyncStorage.getItem("state")
			.then(serializedState => {
				const savedState = JSON.parse(serializedState);

				if (savedState && savedState.token) {
					token = savedState.token;
					fetch("http://39.108.191.242:10089/collect", {
						method: "GET",
						headers: { Authorization: token },
						redirect: "follow",
						cache: "no-cache",
					})
						.then(response => {
							console.log(response);
							if (response.status === 200) {
								response.json().then(value => {
									// console.log("home: collect");
									// console.log(value.data);
									var collection = [];
									for (const element of value.data) {
										collection.push(element.collectId);
									}
									this.props.updateCollection(collection);
									// console.log(this.state.collection);
								});
							}
						})
						.catch(error => console.log(error));
				}
			})
			.catch(error => console.log(error));
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
		// fetch("https://randomuser.me/api/")
		// 	// transform to json first
		// 	.then(response => response.json())
		// 	// using the response
		// 	.then(response => {
		// 		const name = response.results[0].name.first;
		// 		const avatar = response.results[0].picture.thumbnail;
		// 		saveState({ name, avatar });
		// 		this.props.updateName(name);
		// 		this.props.updateAvatar(avatar);
		// 	});

		const user = this.state.user;
		const password = this.state.password;

		fetch(server, {
			body: JSON.stringify({ username: user, password: password }), // must match 'Content-Type' header
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			//mode: 'cors', // no-cors, cors, *same-origin
			redirect: "follow", // manual, *follow, error
		})
			.then(response => {
				// console.log("response message: ");
				// console.log(response);
				response
					.json()
					.then(data => {
						// login success
						console.log("login success");
						// save name and avatar
						const name = user;
						const token = data.Authorization;
						saveState({
							name,
							token,
						});
						this.props.updateName(name);
						this.props.updateToken(token);
						this.getCollectionDB();
						// animation
						setTimeout(() => {
							this.setState({ isLoading: false });
							this.setState({ isSuccessful: true });
							setTimeout(() => {
								// hide login
								this.props.navigation.goBack();
								this.setState({ isSuccessful: false });
							}, 1000);
						}, 400);

						// console.log(data);
					})
					.catch(data => {
						// login failed
						console.log("failed");
						// animation and alert
						setTimeout(() => {
							this.setState({ isLoading: false });
							Alert.alert("Login Failed", "Wrong user name or password.");
						}, 300);
					});
			})
			.catch(error => {
				console.log(error);
			});
	};

	// login function
	handleLogin = () => {
		// console.log(this.state.user, this.state.password);

		// hide keyboard
		this.tapBackground();

		// loading animation
		this.setState({
			isLoading: true,
		});

		// api call
		this.fetchUser();

		// ...
		// simulate api call
		// setTimeout(() => {
		// 	this.setState({ isLoading: false });

		// 	// store user name
		// 	// this.storeName(user);

		// 	if (this.state.loginStatus == false) {
		// 		// send alert
		// 		Alert.alert("Login Failed", "Wrong user name or password.");
		// 	} else {
		// 		// success!
		// 		// auto hide login
		// 		this.setState({ isSuccessful: true });
		// 		setTimeout(() => {
		// 			this.props.navigation.goBack();
		// 			this.setState({ isSuccessful: false });
		// 		}, 1000);
		// 	}

		// 	// update user name
		// 	// this.props.updateName(user);
		// }, 1000);
	};

	focusUser = () => {
		this.setState({
			userColor: "rgba(255,255,255, 0.6)",
			userColor: "#5263ff",
			passwordColor: "rgba(255,255,255, 0.6)",
		});
	};

	focusPassword = () => {
		this.setState({
			userColor: "rgba(255,255,255, 0.6)",
			userColor: "rgba(255,255,255, 0.6)",
			passwordColor: "#5263ff",
		});
	};

	tapBackground = () => {
		Keyboard.dismiss();
		this.setState({
			userColor: "rgba(255,255,255, 0.6)",
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
						onChangeText={user => this.setState({ user })}
						placeholder="User Name"
						placeholderTextColor="rgba(255,255,255,0.5)"
						onFocus={this.focusUser}
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

const Iconuser = styled.Image`
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
