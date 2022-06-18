import React from 'react';
import {StyleSheet,View,Text, TouchableOpacity, Image} from 'react-native';
import Linking from '../utils/linking';
import Ionicon from "react-native-vector-icons/Ionicons";


const Item = props => {
  const {item} = props
  const {title, image, location} = item
  const coordinate = {
    longitude: location.lon+0.0049,
    latitude: location.lat-0.0028,
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image style={styles.imageWrapper.image} source={image} />
      </View>
      <View style={styles.title}>
        <Text style={styles.title.text}>{title}</Text>
      </View>
      <View style={styles.backOpacity}></View>
      <TouchableOpacity 
        style={styles.navi}
        onPress={() => Linking.link2map(...Object.values(coordinate), title)}>
        <Ionicon name="arrow-forward-circle-outline" size={45} color="#ffffff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  backOpacity:{
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1,
    opacity: 0.7,
    backgroundColor: '#b5b5b5',
    width: 320,
    height: 150
  },
  imageWrapper:{
    width:130,
    height:150,
    overflow: 'hidden',
    left: -10,
    image:{
      height: 150,
      width: 150,
      left: -10,
      zIndex: 2,
    },
  },
  navi:{
    position: 'absolute',
    right: 4,
    bottom: 2,
    zIndex: 2
  },
  title:{
    borderColor: '#000000',
    width: 200,
    flexDirection: 'column',
    left: -10,
    alignSelf: 'stretch',
    text:{
      fontSize:18,
      fontWeight:'bold',
      lineHeight: 25,
      width: 150,
      left: 10,
      color: '#ffffff',
    },
  },
  container: {
    marginTop: 15,
    overflow: 'hidden',
    // backgroundColor: '#ffffff',
    height: 150,
    width: 320,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
})

export default Item