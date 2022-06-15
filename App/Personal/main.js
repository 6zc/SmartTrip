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
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';
import { ModalPortal } from 'react-native-modals';
import { ModalFooter, ModalButton} from 'react-native-modals';
import SignPage from './SignPage'
server = 'http://139.155.180.227:10089/login'
var {width, height, scale} = Dimensions.get('window');
IMAGE_URL = './assets/bg-head.'
scrollY =  new Animated.Value(0);
NavHeight =220
const LoginPage = props => {
	const [namemail, setName] = useState('');
	const [pwd, setPwd] = useState('');
	const [loginStates, setLoginState] = useState(false);
	const [signupState,setSignupState] = useState(false);
	const [visiblee,setVisible] = useState(false)
	const holder1 = 'Please input user name or email';
	const holder2 = 'Please input password'	;
	const pwdRef = useRef();

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
	async function onLogin (){
		// posts
		console.log('here')
        fetch(server, {
        body: JSON.stringify(this.state), // must match 'Content-Type' header
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
            input3.current.clear()
            input4.current.clear() 
            response.json()// parses response to JSON
            console.log(response.json())
        }).catch(error=>{
            //讨论错误
            console.log('error:',error)
        })
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
	<Animated.Image
        			pointerEvents='none'
        style={{
          height: 255,
          transform: [{
            translateY: scrollY.interpolate({
              inputRange: [-255, 0, 255 - NavHeight, 255],
              outputRange: [255 / 2, 0, -(255 - NavHeight), -(255 - NavHeight)],
            })
          }, {
            scale: scrollY.interpolate({
              inputRange: [-255, 0, 255],
              outputRange: [2, 1, 1], // -255: 2, 0: 1, 255: 1  当scrollY在-255到0时，scale按照2-1的动画运动；当scrollY在0-255时，scale不变。可以输入任意数量对应的值，但必须是递增或者相等
            })
          }]
        }}
        source={{uri: IMAGE_URL}}
      >

      </Animated.Image>
      <TextInput 
				placeholder={holder1} 
				style={style.inputs}
				keyboardType='default'
				onChangeText={(Text)=>onChangeTextName(Text)}
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

		</View>

	</ScrollView>
	); 
}

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
		height: 40,
		backgroundColor: '#eee',
		marginBottom: 20,
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