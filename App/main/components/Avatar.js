import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function mapStateToProps(state) {
	return {
		name: state.name,
		avatar: state.avatar,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateName: name =>
			dispatch({
				type: "UPDATE_NAME",
				name: name,
			}),
		updateAvatar: avatar =>
			dispatch({
				type: "UPDATE_AVATAR",
				avatar,
			}),
	};
}

class Avatar extends React.Component {
	componentDidMount() {
		// fetch("https://randomuser.me/api/")
		// 	// transform to json first
		// 	.then(response => response.json())
		// 	// using the response
		// 	.then(response => {
		// 		// console.log(response);
		// 		this.setState({
		// 			// change state
		// 			photo: response.results[0].picture.thumbnail,
		// 		});
		// 		// this.props.updateName(response.results[0].name.first);
		// 	});
		this.loadState();
	}

	loadState = () => {
		AsyncStorage.getItem("state").then(serializedState => {
			const state = JSON.parse(serializedState);

			if (state) {
				console.log(state);
				this.props.updateName(state.name);
				this.props.updateAvatar(state.avatar);
			} else {
				console.log("avatar: not logged in");
			}
		});
	};

	render() {
		return <Image source={{ uri: this.props.avatar }} />;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = styled.Image`
	width: 44px;
	height: 44px;
	border-radius: 22px;
`;
