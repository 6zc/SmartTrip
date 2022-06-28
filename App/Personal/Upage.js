/*
	user Page
	//根据登陆界面跳转
	// My favorites
	// Recent visited
*/
import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
	StyleSheet,
	View,
	Text, 
	Dimensions, 
	Image, 
	TextInput, 
	Button, 
	ScrollView,
	Animated,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Setting from './util/setting.js'
import LoginPage from './LoginPage'
import SignPage from './SignPage'
Icon.loadFont();
const Upage = props =>{
	const onIcon = ()=>{
		alert('hi')
	}
	return(
	<ScrollView>
		<View style={style.container}>
			<TouchableOpacity onPress = {onIcon} style={style.gear}>
				<Icon name="gear" size={25} color="#52C0FE" />
			</TouchableOpacity>
			<Image 
					source={require('./assets/avatar-default.jpg')} 
					style={style.havatar}
			/>
				<View style={style.innerContainer}>
					<View>
						<Text style={style.bigText}>		
							Hi!
						</Text>
					</View>
					<View style={style.login}>
					<Text>Already have an account?</Text>
					<TouchableOpacity onPress = {onIcon} style={style.login}>
						<Text>Login in</Text>
					</TouchableOpacity>
					</View>	
				</View>
		</View>
	</ScrollView>
	)
}
export default Upage
const style = StyleSheet.create({
	container: {
		height: '100%',
		alignItems: 'center'
	},
	gear: {
		width: 100,
		height: 100,
		marginTop: 50,
		position:'absolute',
		right: -50
	},
	havatar: {
		marginTop: 100,
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 1,
	},
	bigText: {
		fontSize: 31,
		marginBottom: 20
	},
	smallText: {
		fontSize: 20,
	},
	innerContainer: {
		marginTop: 20,
		width: '100%',
    	alignItems: 'center',
	},
	login:{
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		backGround
	}
})