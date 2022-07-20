import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { getUserPosition, getCamera } from "../utils/calculator.js"
import Ionicon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { BlurView } from "@react-native-community/blur";
import PlaceView from "./place_view.js";
import Logo from "../utils/logo.js";

const refs = [];
const iOS = Platform.OS === 'ios';

const { width, height } = Dimensions.get("window");

const Map = props => {
  const {
    toggleUpdate,
    navigation,
    itemList,
    collection
  } = props;

  const itemID = navigation.state?.params?.itemID;
	const [areaTemp, setAreaTemp] = useState([]);
	const [humidity, setHumidity] = useState([]);
	const [uvindex, setUvindex] = useState([]);

  // const ASPECT_RATIO = width / height;
  // const LATITUDE_DELTA = 0.2;
  // const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  // const region = {
  //   latitude: 22.2745,
  //   longitude: 114.1533,
  //   latitudeDelta: LATITUDE_DELTA,
  //   longitudeDelta: LONGITUDE_DELTA,
  // };

  useEffect(()=>{
    if(refs[itemID]){
      
      setTimeout(() => {
        refs['map'].animateCamera(getCamera(
          ...Object.values(refs[itemID].props.coordinate),0.03),{ duration: 300 })
        refs[itemID].showCallout();
      }, 600)
    }else{
      let Camera = getUserPosition();
      setTimeout(() => {
        refs['map'].animateCamera(Camera, { duration: 1000 })
      }, 600)
    }
  }, [itemID]);

  useEffect(() => {
		async function fetchWeatherData() {
			try {
				let response = await fetch("http://39.108.191.242:10089/api/homepage", { method: "GET" });
				let responseJson = await response.json();
				if (responseJson.status === 404) {
					return;
				}
				setAreaTemp(responseJson.area_temp);
				setHumidity(responseJson.humidity ? responseJson.humidity.data : []);
				setUvindex(responseJson.uvindex ? responseJson.uvindex.data : []);
			} catch (error) {
				console.error(error);
			}
		}
		fetchWeatherData();

    // let Camera = getUserPosition();
    // setTimeout(() => {
    //   refs['map'].animateCamera(Camera, { duration: 1000 })
    // }, 300)

	}, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.goBack}
        onPress={ e =>{
          let Camera = getUserPosition();
          setTimeout(() => {
            refs['map'].animateCamera(Camera, { duration: 1000 })
          }, 10)
        }}
        >
          <BlurView style={styles.blur} blurType="xlight" blurAmount={100} />
          <FontAwesome
              name={'compass'}
              size={24}
              color={"#4c4c4c"}
              style={styles.goBack.logo}
            ></FontAwesome>
        </TouchableOpacity>
      <MapView
        stopPropagation={true}
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        minZoomLevel={9}
        maxZoomLevel={20}
        ref={ref => {
          refs['map'] = ref;
        }}
      >
        {itemList.map((card) => (
          <Marker
            ref={(ref) => (refs[card.sys.id] = ref)}
            key={card.sys.id}
            pointerEvents={"auto"}
            tracksViewChanges={false}
            coordinate={{
              longitude: card.location.lon + (iOS?0.0049:0),
              latitude: card.location.lat - (iOS?0.0028:0),
            }}
          >
            <View style={styles.customMarker}>
              <Logo height={18} width={18} type={card.type} />
            </View>
            <Callout
              style={styles.callout}
              alphaHitTest={true}
              tooltip={true}
              onPress={(e) => {
                if (
                  e.nativeEvent.action === "marker-inside-overlay-press" ||
                  e.nativeEvent.action === "callout-inside-press"
                ) {
                  return;
                }
              }}
            >
              <View style={styles.placeViewWrapper}>
                <BlurView style={styles.blur} blurType="xlight" />
                <PlaceView
                  // weather={areaTemp}
                  toggleUpdate={toggleUpdate}
                  navigation={navigation}
                  card={card}
                  coordinate={{
                    longitude: card.location.lon,
                    latitude: card.location.lat,
                  }}
                  liked={collection.some( value => {
                    return value == card.sys.id
                  })}
                />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.tips}>
        <View style={styles.tips.tipLeft}>
          {/* 这里会让安卓下崩溃！！ */}
          <BlurView style={styles.blur} blurType="xlight" blurAmount={100} />
          <Ionicon name="sunny" size={18} style={styles.icons} />
          <Text style={styles.tips.tip}>
            {" UV Index: " + (uvindex.length ? uvindex[0].value : 0) + "/10"}
          </Text>
        </View>
        <View style={styles.tips.tipRight}>
          <BlurView style={styles.blur} blurType="xlight" blurAmount={10} />
          <Ionicon name="thermometer" size={18} style={styles.icons} />
          <Text style={styles.tips.tip}>
            {" Humidity: " + ( humidity.length ? humidity[0].value : 70 ) + "%"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeViewWrapper: {
    borderRadius: 15,
    overflow: "hidden",
  },
  blur:{
    position: "absolute",
    top: -1,
    left: -1,
    height: '103%',
    width: '103%',
    zIndex:-1,
    borderRadius: 8,

  },
  goBack: {
    height: 30,
    width: 30,
    position: "absolute",
    left: '86%',
    bottom: 83,
    zIndex:4,
    borderRadius: 8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    // overflow: "hidden",
    logo:{ 
      top:2.5,
      left:3
    },
  },
  callout: {
    width: 290,
    height: 500,
    justifyContent: "flex-end",
  },
  navi: {
    position: "absolute",
    right: 30,
    bottom: 30,
    zIndex: 5,
    width: 40,
    height: 40,
  },
  tips: {
    width: "98%",
    height: 40,
    position: "absolute",
    bottom: 33,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    tip: {
      fontSize: 17,
      fontWeight: "bold",
    },
    tipLeft: {
      overflow: 'hidden',
      borderRadius: 12,
      width: 170,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    tipRight: {
      overflow: 'hidden',
      borderRadius: 12,
      width: 170,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  textWrapper: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 0,
    borderRadius: 6,
    borderColor: "#eeeeee",
    borderWidth: 0.5,
  },
  celsius: {
    fontSize: 12,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 16,
    fontWeight: "bold",
  },
  customMarker: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    width: 20,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    zIndex: 4,
  },
  logo: {
    height: 18,
    width: 18,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    height: height - 65,
    width: width + 10,
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 800,
    width: width,
    // zIndex:-2
  },
});

export default Map;
