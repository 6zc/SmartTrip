import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import Linking from "../utils/linking";
import Logo from "../utils/logo.js";
import { Cal, getWeatherDesc } from "../utils/calculator";
import { Svg, Image as ImageSvg } from "react-native-svg";
import { BlurView } from "@react-native-community/blur";

const PlaceView = (props) => {
  const { card, coordinate, navigation } = props;
  const { title, type, image } = card;
  const [ height, setHeight ] = useState(350);
  const [ liked, setLiked ] = useState(false);

  const temp = (Math.random()*40).toFixed(0);
  const rain = Math.random()*20;
  const uv = Math.random()*12;
  
  //TODO
  const handleLike = () => {
    setLiked(!liked);
    // fetch .......
  }

  const weather = getWeatherDesc(uv, rain);
  return (
    <View 
    onLayout={(e)=>{setHeight(e.nativeEvent.layout.height)}}
    style={styles.container}>
      <View style={styles.bubble}>
        <View style={styles.group}>
          <View style={styles.group.weatherWrapper}>
            <BlurView style={styles.blur} blurType="xlight" blurAmount={5} />
            <Text style={styles.group.weather}>{' '+weather+' '}</Text>
          </View>
          <View style={[styles.group.tempWrapper,{backgroundColor:Cal(temp)}]}>
            <Text 
              style={styles.group.temp}>{' '+temp+'°C '}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.navi}
          onPressOut={() => {
            Linking.link2map(...Object.values(coordinate), title);
          }}
        >
          
          <BlurView style={styles.blur} blurType="xlight" blurAmount={5} />
          <Text style={styles.navi.naviText}>GO!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detail}
          onPressOut={() => {
            setTimeout(() => {
              navigation.navigate("Section",{
                section: card
              });
            }, 400)
          }}
        >
            <BlurView style={styles.blur} blurType="xlight" blurAmount={5} />
            <Text style={styles.detail.detailText}>Detail</Text>
        </TouchableOpacity>
        <Svg width={290} height={290}>
          <ImageSvg
            width={"100%"}
            height={"100%"}
            preserveAspectRatio="xMidYMid slice"
            href={{ uri: image.url }}
          />
        </Svg>
        <View style={styles.lineWrapper}>
          <Text style={styles.lineWrapper.type}>{type}</Text>
          <Logo
            style={styles.lineWrapper.logo}
            height={15}
            width={15}
            type={type}
          />
        </View>
        <Text style={styles.title}>{title} </Text>
        <TouchableOpacity
          style={[styles.heart,{top:(height-290)/2+268}]}
          onPressOut={()=>handleLike()}
        >
          {liked ? (
            <Ionicon name="heart" size={40} color="#ff4040" />
          ) : (
            <Ionicon name="heart-outline" size={40} color="#4c4c4c" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heart: {
    position: "absolute",
    right:10,
    zIndex: 4,
  },
  blur:{
    position: "absolute",
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: -1,
    borderRadius: 8,
  },
  detail: {
    position: "absolute",
    right: 6,
    top: 259,
    zIndex: 4,
    height: 24,
    width: 55,
    alignItems: 'center',
    detailText:{
      fontWeight: "bold",
      color: "#5263ff",
      fontSize: 15,
      lineHeight:24
    },
  },
  lineWrapper: {
    flexDirection: "row",
    minWidth: 290,
    type: {
      lineHeight: 25,
      left: 12,
      fontWeight: "bold",
      fontSize: 15,
      color: "#aaaaaa",
    },
    logo: {
      top: 5,
      left: 18,
    },
  },
  group: {
    position: "absolute",
    zIndex: 5,
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'center',
    weatherWrapper: {
      borderRadius: 8,
      height: 24,
      overflow: "hidden",
    },
    weather: {
      color: "#6c6c6c",
      fontWeight: "bold",
      lineHeight: 24,
      fontSize: 15,
    },
    tempWrapper: {
      height: 24,
      borderRadius: 8,
      left: 8,
      shadowRadius: 3,
      shadowColor:'#000000',
      shadowOpacity: 0.35,
      shadowOffset: { width: 0, height: 1 },
      opacity: 0.9,
    },
    temp: {
      fontWeight: "bold",
      lineHeight: 24,
      fontSize: 15,
      color: "#4c4c4c",
    },
  },
  navi: {
    position: "absolute",
    right: 69,
    top: 259,
    zIndex: 5,
    width: 38,
    height: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    naviText:{
      fontWeight: "bold",
      color: "#5263ff",
      fontSize: 15,
      lineHeight:24
    },
  },
  container: {
    flexDirection: "column",
    maxHeight: 400,
    width: 328,
  },
  bubble: {
    width: 290,
    flexDsirection: "column",
    justifyContent: "center",
  },
  image: {
    width: 290,
    height: 290,
    top: -13,
  },

  title: {
    fontSize: 21,
    left: 12,
    marginBottom: 8,
    fontWeight: "bold",
    maxWidth: 240,
    color: "#4c4c4c",
  },
});

export default PlaceView;
