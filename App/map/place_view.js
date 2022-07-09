import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import Linking from "../utils/linking";
import Logo from "../utils/logo.js";
import { Cal } from "../utils/calculator";
import { Svg, Image as ImageSvg } from "react-native-svg";

const PlaceView = (props) => {
  const { title, type, image, coordinate, id } = props;
  const temp = 30;
  const weather = 'Sunny';

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <View style={styles.group}>
          <View style={styles.group.weatherWrapper}>
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
          <Ionicon
            backgroundColor="#ffffff"
            name="navigate-circle-outline"
            size={35}
            color="#ffffff"
          />
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    opacity: 0.85,
    position: "absolute",
    zIndex: 5,
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'center',
    weatherWrapper: {
      backgroundColor: '#ffffff',
      borderRadius: 8,
      height: 24,
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
    right: 2,
    top: 7,
    zIndex: 5,
    width: 40,
    height: 40,
  },
  container: {
    flexDirection: "column",
    maxHeight: 400,
    width: 328,
    backgroundColor: "rgba(255,255,255,0)",
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000000",
    shadowOpacity: 0.4,
  },
  bubble: {
    width: 290,
    flexDsirection: "column",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    overflow: "hidden",
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
