import React from 'react';
import {StyleSheet,View,Text, TouchableOpacity, Image, Alert} from 'react-native';
import Linking from '../utils/linking';
import Ionicon from "react-native-vector-icons/Ionicons";
import Rating from './rating';
import { assertScalarType } from 'graphql';
import {Svg, Image as ImageSvg} from 'react-native-svg';



const Item = props => {
  // TEMPORARY DATA
  const rating = Math.random()*5
  const liked = Math.random()>0.5

  const {item} = props
  const {title, image, location, type} = item
  const coordinate = {
    longitude: location.lon+0.0049,
    latitude: location.lat-0.0028,
  }
  let rateArray = new Array(5).fill(0)
  rateArray = rateArray.map((_item, index)=>{
    if(index<Math.floor(rating)) return 1
    else if(index>rating) return 0
    else if(index+1>rating) return 0.5
  })
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Svg style={styles.imageWrapper.image}>
          <ImageSvg
            width={'100%'} 
            height={'100%'}
            preserveAspectRatio="xMidYMid slice"
            href={{ uri: image.url}}
          />
        </Svg>
        {/* <Image style={styles.imageWrapper.image} source={image} /> */}
      </View>
      <View style={styles.title}>
        <View>
          <Text style={styles.title.text}>{title}</Text>
          <Text style={styles.title.type}>{type}</Text>
        </View>
        <View style={styles.starWrapper}>
          {
            rateArray.map((item, index) =>
              <Rating 
                rate={item}
                key={index}
              />
            )
          }
        </View>
      </View>
      <View style={styles.backOpacity}></View>
      <TouchableOpacity 
        style={styles.navi}
        onPress={() => Linking.link2map(...Object.values(coordinate), title)}>
        <Ionicon name="arrow-forward-circle-outline" size={45} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.heart}
        onPress={() => Alert.alert('Added to Favorite')}>
        {
          liked?
          <Ionicon name="heart" size={40} color="#ff4040" />
          :
          <Ionicon name="heart-outline" size={40} color="#ffffff" />
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  starWrapper:{
    zIndex:2,
    height: 30,
    width: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left:  10,
  },
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
  heart:{
    position: 'absolute',
    right: 4,
    top: 2,
    zIndex: 2
  },
  title:{
    borderColor: '#000000',
    width: 200,
    flexDirection: 'column',
    left: -10,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    text:{
      fontSize:18,
      fontWeight:'bold',
      lineHeight: 18,
      width: 150,
      left: 8,
      top: 8,
      color: '#ffffff',
    },
    type:{
      fontSize:15,
      fontWeight:'bold',
      lineHeight: 25,
      width: 150,
      left: 8,
      top: 5,
      color: '#cecece',
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