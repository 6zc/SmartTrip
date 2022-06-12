/*
	Log in Page
*/

import React, {useState, useEffect, useRef} from 'react';
//import type(Node) from 'react'
import {StyleSheet, View, Text, Dimensions, Image, TextInput, Button, ScrollView} from 'react-native';
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';
import { ModalPortal } from 'react-native-modals';
import { ModalFooter, ModalButton} from 'react-native-modals';

var {width, height, scale} = Dimensions.get('window');
const LoginPage = props => {

	const [namemail, setName] = useState('');
	const [pwd, setPwd] = useState('');
	const [loginStates, setLoginState] = useState(false);
	const [signupState,setSignupState] = useState(false);
	const [visiblee,setVisible] = useState(false)
	const holder1 = 'Please input user name or email';
	const holder2 = 'Please input password'	;
	const nameRef = useRef();
	const pwdRef = useRef();

	const onSignup = () => {
		// const name = nameRef.state.value;
		// const pwd = pwdRef.state.value;
	// 发送
	}
	const onChangeTextName = (Text) => {
		setName(Text);
	}
	const onChangeTextPwd = (Text) => {
		setPwd(Text)
	}
	async function onLogin (){
		
		// 清空
	}
	return(
	<ScrollView >
		
		<ModalPortal />	
		<View style={style.container}>
			<Image source={require('./assets/bg-head.jpeg')} style={style.headbg}/>
			<TextInput 
				placeholder={holder1} 
				style={style.inputs}
				keyboardType='default'
				onChangeText={(Text)=>onChangeTextName(Text)}
				ref = {nameRef}
				/>
			<TextInput 
				placeholder={holder2} 
				style = {style.inputs}
				secureTextEntry={true}
				onChangeText={(Text)=>onChangeTextPwd(Text)}
				ref = {pwdRef}
				/>
			<Text>
				<Button title="login" onPress={onLogin} style = {style.button1}/>
				<Button title="sign up" onPress={()=>{setVisible(!visiblee)}} style = {style.button2}/>
			</Text>	
			  <Modal
    				visible={visiblee}
    				modalAnimation={new SlideAnimation({
      				slideFrom: 'bottom',
    					})}
    				style={style.modal}
  				>
    			<ModalContent>
      				{}
    			</ModalContent>
  			</Modal>	
		</View>
		
		<View style={style.container}>
			<Image source={require('./assets/bg-head.jpeg')} style={style.headbg}/>
		</View>
	</ScrollView>
	); 
}

const style = StyleSheet.create({
	container: {
		alignItems: 'center',
		height: '100%',
	},
	headbg:{
		width:'100%',
		height: 350,
		marginBottom: 20
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
		marginTop: 20,
		padding: 10,
		width: '85%',
		height: 40,
		backgroundColor: '#eee',
		marginBottom: 20,
	},
	button1: {
		width: 40

	},
	button2: {

	},
	modal: {
		width: '80%',
		marginLeft: '10%',
		backgroundColor: 'white'
	}
})


export default LoginPage
/*
	bg head
	input 
	sign up

*/
// 滑动放大
// 注册界面