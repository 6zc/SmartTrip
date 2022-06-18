import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Ionicon from "react-native-vector-icons/Ionicons";
import Linking from '../utils/linking';

const PlaceView = props => {
  const {title, type, image, coordinate, logo} =props
  
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <TouchableOpacity 
          style={styles.navi}
          onPressOut={() => {
            Linking.link2map(...Object.values(coordinate), title)
            }}>
          <Ionicon backgroundColor='#ffffff' name="navigate-circle-outline" size={35} color="#ffffff" />
        </TouchableOpacity>
        <Image style={styles.image} source={image} />
        <View style={styles.lineWrapper}>
          <Text style={styles.lineWrapper.type}>{type} </Text>
          <Image style={styles.lineWrapper.logo} source={logo} />
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
    top: -6,
    maxWidth: 220,
    type: {
      fontSize:15,
      left:12,
      color:'#aaaaaa',
      fontWeight:'bold'
    },
    logo: {
      width:15,
      height:15,
      left: 12,
    },
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
    alignItem: 'flex-start',
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
  
  title:{
    fontSize:22,
    top:-4,
    left:12,
    marginBottom: 8,
    fontWeight:'bold',
    maxWidth: 220
  }
});

export default PlaceView;
