import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Linking from "../utils/linking";
import Logo from "../utils/logo.js";
import Collection from "../utils/collection";
import { getWeatherDesc, getCovidDesc } from "../utils/calculator";
import { Svg, Image as ImageSvg } from "react-native-svg";
import { BlurView } from "@react-native-community/blur";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

const PlaceView = props => {
  const {
    card,
    coordinate,
    navigation,
    toggleUpdate,
    liked = false
  } = props;
  const { title, type, image, sys } = card;
  const [ height, setHeight ] = useState(350);

  //TODO
  const cases = (Math.random()*1000).toFixed(0);
  const temp = (Math.random()*40).toFixed(0);
  const rain = Math.random()*20;
  const uv = Math.random()*12;

  const [weather, icon] = getWeatherDesc(uv, rain);
  const covidDesc = getCovidDesc(cases);
  return (
    <View 
    onLayout={(e)=>{setHeight(e.nativeEvent.layout.height)}}
    style={styles.container}>
      <View style={styles.bubble}>
        <View style={styles.group}>
          <View style={styles.group.wrapper}>
            <FontAwesome
              name={icon}
              size={14}
              color={"#ffffff"}
              style={styles.group.weatherLogo}
            >
            </FontAwesome>
            <Text style={styles.group.weather}>{'  '+weather+' '+temp+'°C '}</Text>
          </View>
          <View style={styles.group.wrapper}>
            <FontAwesome
              name={'head-side-mask'}
              size={13}
              color={"#ececec"}
              style={styles.group.covidLogo}
            >
            </FontAwesome>
            <Text style={styles.group.covid}>{'  '+ covidDesc}</Text>
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
        <Collection
          style={[styles.heart,{top:(height-290)/2+268}]}
          toggleUpdate={toggleUpdate}
          sys={sys}
          liked={liked}
        />
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
    top: 8,
    left: 8,
    alignItem: 'center',
    justifyContent: 'center',
    shadowRadius: 6,
    shadowOpacity: 0.9,
    shadowOffset: { width: 1, height: 1 },
    wrapper: {
      height: 24,
      flexDirection: 'row',
    },
    weather: {
      color: "#ffffff",
      fontWeight: "bold",
      lineHeight: 24,
      fontSize: 17,
    },
    weatherLogo: {
      top: 6,
      left: 3,
      marginRight: 3,
    },
    covid: {
      color: "#ececec",
      fontWeight: "bold",
      lineHeight: 24,
      fontSize: 14,
    },
    covidLogo: {
      top: 6,
      left: 3,
      marginRight: 6,
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
