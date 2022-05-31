/*
	Log in Page
*/

import React, {useState, useEffect, useRef} from 'react';
//import type(Node) from 'react'
import {StyleSheet, View, Text, Dimensions, Image, TextInput, Button} from 'react-native';

var {width, height, scale} = Dimensions.get('window');
const LoginPage = props => {

	const actRef = useRef(null);
	const pwdRef = useRef(null)
	const holder1 = 'Please input user name'
	const holder2 = 'Please input password'	
	return(
	<View style={style.container}>
		<Image source={require('./assets/avatar-default.jpg')} style={style.havatar}/>
		<TextInput placeholder={holder1} style={style.inputs}/>
		<TextInput placeholder={holder2} style = {style.inputs}/>
		<Button title="login" onPress={onPress}/>

	</View>
	); 
}

const style = StyleSheet.create({
	container: {
		alignItems: 'center',
		height: '100%',
	},
	havatar: {
		width: 80,
		height: 80,
		marginTop: 150,
		marginBottom: 20,
		borderRadius: 40,
		borderWidth: 1,
	},
	inputs: {
		padding: 10,
		width: '80%',
		height: 40,
		backgroundColor: '#eee',
		marginBottom: 20,
	}

})

const onPress = () =>{
	alert('login received')
	// 清空
}
export default LoginPage
/*
	
*/