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
	Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();
const Upage = props =>{
	return(
	<ScrollView>
		<View style={style.container}>
			 <Icon name="gear" size={30} color="#52C0FE" style={style.gear}/>
			<Image 
				source={require('./assets/taylor.jpg')} 
				style={style.havatar}
			/>
	      	<View style={style.inputs}>
				<Text style={style.smallText}>
					Welcome ! Taylor
				</Text>
				<Text style={style.bigText}>
					Collections
				</Text>
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
		marginBottom: 50,
	},
	havatar: {
		width: 100,
		height: 100,
		marginTop: 100,
		marginBottom: 40,
		borderRadius: 50,
		borderWidth: 1,
	},
	bigText: {
		fontSize: 31
	},
	smallText: {
		fontSize: 20
	}
})