import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, Image, Platform, WebView} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Ionicon from 'react-native-vector-icons/Ionicons';
import PlaceView from './place_view.js';
import {Svg, Image as ImageSvg} from 'react-native-svg';

const refs = []

const {width, height} = Dimensions.get('window');

const Map = (props) => {
  const { navigation, itemList } = props;
  const itemID = navigation.state?.params?.itemID;
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.2;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
	const [stationList, setStationList] = useState([]);
	const [humidity, setHumidity] = useState([]);
	const [uvindex, setUvindex] = useState([]);
  // 

  const region = {
    latitude: 22.2745,
    longitude: 114.1533,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  useEffect(()=>{
    if(refs[itemID]){
      setTimeout(() => {
        refs[itemID].showCallout();
      }, 200)
    }
  })
  useEffect(() => {
		async function fetchData() {
			try {
				let response = await fetch("http://139.155.252.3:10089/api/homepage", { method: "GET" });
				let responseJson = await response.json();
				console.log(responseJson);
				if (responseJson.status === 404) {
					return;
				}
				setStationList(responseJson.temperature.data);
				setHumidity(responseJson.humidity ? responseJson.humidity.data : []);
				setUvindex(responseJson.uvindex ? responseJson.uvindex.data : []);
			} catch (error) {
				console.error(error);
			}
		}
		fetchData();
    
	}, []);


  return (
    <View style={styles.container}>
      <MapView
        // provider={props.provider}
        mapPadding={{top:30, right:30, bottom:30,left:30}}
        stopPropagation={true}
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        region={region}
        minZoomLevel={9}
        maxZoomLevel={20}>
        {itemList.map((card) => (
          <Marker
            ref={ref=>refs[card.sys.id]=ref}
            key={card.sys.id}
            pointerEvents={'auto'}
            coordinate={{
              longitude: card.location.lon+0.0049,
              latitude: card.location.lat-0.0028,
            }}
            // onPress={()=>console.log('pressed')}
            >
            <View style={styles.customMarker}>
              <Svg width={18} height={18}>
                <ImageSvg
                  width={'100%'} 
                  height={'100%'}
                  preserveAspectRatio="xMidYMid slice"
                  href={{ uri: card.logo.url}}
                />
              </Svg>
            </View>
            <Callout
              style={styles.callout}
              alphaHitTest
              tooltip={true}
              onPress={e => {
                if (
                  e.nativeEvent.action === 'marker-inside-overlay-press' ||
                  e.nativeEvent.action === 'callout-inside-press'
                ) {
                  return;
                }
              }}>
                <PlaceView
                  logo={card.logo}
                  image={card.image}
                  title={card.title}
                  type={card.type}
                  coordinate={{
                    longitude: card.location.lon,
                    latitude: card.location.lat
                  }}
                />
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.tips}>
        {uvindex.length ?
          <View style={styles.tips.tipLeft}>
            <Ionicon name="sunny" size={18} style={styles.icons}/>
            <Text style={styles.tips.tip}>{' UV Index: ' + uvindex[0].value+ '/10'}</Text>
          </View> : 
          <View style={styles.tips.tipLeft}>
            <Ionicon name="sunny" size={18} style={styles.icons}/>
            <Text style={styles.tips.tip}>{' UV Index: 0/10'}</Text>
          </View>
        }
        {humidity.length ? 
          <View style={styles.tips.tipRight}>
            <Ionicon
                name="thermometer"
                size={18}
                style={styles.icons}
              />
            <Text style={styles.tips.tip}>{' Humidity: ' + humidity[0].value + '%'}</Text>
          </View> : 
          <View style={styles.tips.tipRight}>
            <Ionicon
                name="thermometer"
                size={18}
                style={styles.icons}
              />
            <Text style={styles.tips.tip}>{' Humidity: 65%'}</Text>
          </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  callout:{
    maxHeight:400,
    width:290,
  },
  navi:{
    position: 'absolute',
    right: 30, 
    bottom: 30, 
    zIndex:5,
    width:40,
    height:40
  },
  tips:{
    width: '98%',
    height:40,
    position:'absolute',
    bottom: 53,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    shadowRadius:10,
    shadowOffset:{width:0,height:0},
    shadowColor:'#000000',
    shadowOpacity:0.25,
    tip:{
      fontSize:17,
      fontWeight:'bold'
    },
    tipLeft:{
      borderRadius: 12,
      width: 170,
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
    },
    tipRight:{
      borderRadius: 12,
      width: 170,
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
    },
  },
  textWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 0,
    borderRadius: 6,
    borderColor: '#eeeeee',
    borderWidth: 0.5,
  },
  celsius: {
    fontSize: 12,
    fontWeight:'bold'
  },
  temp:{
    fontSize:16,
    fontWeight:'bold'
  },
  customMarker: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height:20,
    width:20,
    backgroundColor: '#ffffff',
    borderRadius:5,
    shadowRadius:3,
    shadowOffset:{width:0,height:0},
    shadowColor:'#000000',
    shadowOpacity:0.4,
    zIndex:4
  },
  logo:{
    height:18,
    width:18,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: height-65,
    width: width+10,
    // zIndex: -1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height:1200,
    // zIndex:-2
  },
});

export default Map;
