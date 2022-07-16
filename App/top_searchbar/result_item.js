import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import Rating from "./rating";
import { Svg, Image as ImageSvg } from "react-native-svg";
import { getUserPosition, calDistance } from "../utils/calculator";

const Item = (props) => {
  //TODO
  const [ rate, setRate ] = useState(0);
  const [ liked, setLiked ] = useState(false);

  useEffect(()=>{
    setRate(Math.random() * 5);
    setLiked(Math.random() > 0.5);
  },[])
  const [distance ,setDis] = useState(0)

  const { item, navigation, setShowList } = props;
  const { title, image, location, type } = item;
  let position = {
    lat:undefined,
    lng:undefined,
  };

  let res = getUserPosition();
  setTimeout(() => {
    position.lat = res.center.latitude;
    position.lng = res.center.longitude;
    setDis(calDistance(position, location))
  }, 100)

  return (
    <View style={styles.container}>
      <View style={styles.distanceWrapper}>
        <Text style={styles.distanceWrapper.distance}>{' '+distance+' KM '}</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Svg style={styles.imageWrapper.image}>
          <ImageSvg
            width={"100%"}
            height={"100%"}
            preserveAspectRatio="xMidYMid slice"
            href={{ uri: image.url }}
          />
        </Svg>
      </View>
      <View style={styles.title}>
        <View>
          <Text style={styles.title.text}>{title}</Text>
          <Text style={styles.title.type}>{type}</Text>
        </View>
        <View style={styles.rateWrapper}>
          <Text style={styles.rateType}>{'Overall Rating:'}</Text>
          <Rating width={110} rate={rate} rateAble={false} />
        </View>
      </View>
      <View style={styles.backOpacity}></View>
      <TouchableOpacity
        style={styles.navi}
        onPress={() => {
          setShowList(false);
          setTimeout(() => {
            navigation.navigate("Map",{
              itemID: item.sys.id,
            });
          }, 300)}
        }
      >
        <Ionicon
          name="arrow-forward-circle-outline"
          size={45}
          color="#ffffff"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.heart}
        onPress={() => Alert.alert("Added to Favorite")}
      >
        {liked ? (
          <Ionicon name="heart" size={40} color="#ff4040" />
        ) : (
          <Ionicon name="heart-outline" size={40} color="#ffffff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rateWrapper: {
    flexDirection:'column',
    bottom: 10,
    left: 10,
  },
  distanceWrapper: {
    position: "absolute",
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    height: 20,
    zIndex:4,
    bottom: 5,
    left: 6,
    opacity:0.7,
    distance: {
      fontWeight: "bold",
      lineHeight: 20,
      fontSize: 12,
      color: "#4c4c4c",
    },
  },
  rateType:{
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 25,
    color: "#cecece",
    left: -1
  },
  backOpacity: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: -1,
    opacity: 0.7,
    backgroundColor: "#b5b5b5",
    width: 320,
    height: 150,
  },
  imageWrapper: {
    width: 130,
    height: 150,
    overflow: "hidden",
    left: -10,
    image: {
      height: 150,
      width: 150,
      left: -10,
      zIndex: 2,
    },
  },
  navi: {
    position: "absolute",
    right: 4,
    bottom: 2,
    zIndex: 2,
  },
  heart: {
    position: "absolute",
    right: 4,
    top: 2,
    zIndex: 2,
  },
  title: {
    borderColor: "#000000",
    width: 200,
    flexDirection: "column",
    left: -10,
    alignSelf: "stretch",
    justifyContent: "space-between",
    text: {
      fontSize: 18,
      fontWeight: "bold",
      lineHeight: 18,
      width: 150,
      left: 8,
      top: 8,
      color: "#ffffff",
    },
    type: {
      fontSize: 14,
      fontWeight: "bold",
      lineHeight: 25,
      width: 150,
      left: 8,
      top: 5,
      color: "#cecece",
    },
  },
  container: {
    marginTop: 15,
    overflow: "hidden",
    height: 150,
    width: 320,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: "flex-start",
    flexDirection: "row",
  },
});

export default Item;
