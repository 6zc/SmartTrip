import React from 'react';
import {StyleSheet, View, Text, Platform, Image, TouchableOpacity} from 'react-native';
import Ionicon from "react-native-vector-icons/Ionicons";
import Linking from '../utils/linking';

const PlaceView = props => {
  const {title, subtitle, image, coordinate, logo} =props
  
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <TouchableOpacity 
          style={styles.navi}
          onPressOut={() => {
            console.log('1')
            Linking.link2map(...Object.values(coordinate), title)
            }}>
          <Ionicon backgroundColor='#ffffff' name="navigate-circle-outline" size={35} color="#ffffff" />
        </TouchableOpacity>
        <Image style={styles.image} source={image} />
        <View style={styles.lineWrapper}>
          <Text style={styles.subtitle}>{subtitle} </Text>
          <Image style={styles.logo} source={logo} />
        </View>
        <Text style={styles.title}>{title} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lineWrapper:{
    flexDirection: 'row',
    alignItem:'center',
    top:-6,
  },
  logo: {
    width:15,
    height:15,
    left: 12,
  },
  navi:{
    position: 'absolute',
    right: 2, 
    top: 7, 
    zIndex:3,
    width:40,
    height:40
  },
  container: {
    flexDirection: 'column',
    alignItem: 'flex-end',
    justifyContent:'flex-end',
    height:520,
    width:328,
    backgroundColor: 'rgba(255,255,255,0)',
    shadowRadius:6,
    shadowOffset:{width:0,height:0},
    shadowColor:'#000000',
    shadowOpacity:0.4,
  },
  bubble: {
    height:350,
    width:290,
    flexDsirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    overflow:'hidden',
  },
  image: {
    width:290,
    height:290,
    top:-13,
    
  },
  subtitle: {
    fontSize:15,
    // left:5,
    left:12,
    color:'#aaaaaa',
    fontWeight:'bold'
  },
  title:{
    // left:5,
    fontSize:22,
    top:-4,
    left:12,
    fontWeight:'bold'
  }
});

export default PlaceView;
