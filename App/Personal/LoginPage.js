/*
	Log in Page
*/

import React, {useState, useEffect, useRef} from 'react';
//import type(Node) from 'react'
import {
	StyleSheet,
	View,
	Text, 
	Dimensions, 
	Image, 
	TextInput, 
	Button, 
	ScrollView,
	Animated} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "react-navigation-stack";

import { Input } from "@rneui/themed";
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';
import { ModalPortal } from 'react-native-modals';
import { ModalFooter, ModalButton} from 'react-native-modals';
import SignPage from './SignPage'
//import Upage from './Upage'
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();
server = 'http://139.155.180.227:10089/login'
var {width, height, scale} = Dimensions.get('window');
IMAGE_URL = './assets/bg-head.jpeg'
scrollY =  new Animated.Value(0);
const input = React.createRef('input');
const input2 = React.createRef('input2');

const LoginPage = props => {
	const [namemail, setName] = useState('');
	const [pwd, setPwd] = useState('');
	const [loginStates, setLoginState] = useState(false);
	const [signupState,setSignupState] = useState(false);
	const [visiblee,setVisible] = useState(false)
	const holder1 = '  Please input user name or email';
	const holder2 = '  Please input password';
	const onChangeTextName = (Text) => {
		setName(Text);
	}
	const onChangeTextPwd = (Text) => {
		setPwd(Text)
	}
	const cancelSign = () => {
		setVisible(false)
	}
	const confirmSign = () => {
	}
	function onLogin (){
		console.log('onLogin',pwd,namemail)
        fetch(server, {
        body: JSON.stringify({pwd:pwd,namemail:namemail}), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
  }).then(response => {
            console.log('then')
            input.current.clear()
            input2.current.clear()
            response.json()// parses response to JSON
            console.log(response.json())
            //跳转页面
            navigator.push({name:'In'})

        }).catch(error=>{
            //讨论错误
            console.log('error:',error)
        })
        input.current.clear()
        input2.current.clear()
        props.navigation.navigate('Upage')
	}
	return(
		
	<ScrollView>
		<ModalPortal />	
		<SignPage                  
            visible={visiblee}
            cancel = {cancelSign}
            confirm = {confirmSign}
        />
		<View style={style.container}>
			<Image 
				source={require('./assets/bg-head.jpeg')} 
				style={style.headbg}
			/>
	      	<View style={style.inputs}>
	      		<Input 
					placeholder={holder1} 
					keyboardType='default'
					onChangeText={(Text)=>onChangeTextName(Text)}
					ref={input}
					leftIcon={{ type: 'font-awesome', name: 'user-o' }}
					/>
				<Input 
					placeholder={holder2} 
					secureTextEntry={true}
					onChangeText={(Text)=>onChangeTextPwd(Text)}
					ref = {input2}
					leftIcon={{ type: 'font-awesome', name: 'lock' }}
					/>
				<Text>
					<Button title="login" onPress={onLogin} style = {style.button1}/>
					<Button title="sign up" onPress={()=>{setVisible(!visiblee)}} style = {style.button2}/>
				</Text>	
			</View>
		</View>
	</ScrollView>
	); 
}
const HomeScreen = createStackNavigator({
    LoginPage: {screen: LoginPage},
    Upage: {screen: Upage}
    
});
const style = StyleSheet.create({
	container: {
		height: '100%',
		alignItems: 'center'
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
		marginBottom: 20,
		alignItems: 'center'
	},
	button1: {
		display: 'inline-block',
		padding: 240
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