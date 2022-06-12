import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Ionicon from 'react-native-vector-icons/Ionicons';
import PlaceView from './place_view.js'
import {getCord} from '../utils/calculator';

const refs = []

const {width, height} = Dimensions.get('window');

const Map = (props) => {
  const {stationList, curStation, humidity, uvindex, itemList} = props
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.2;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [latitude, setLatitude] = useState(22.2745);
  const [longitude, setLongitude] = useState(114.1533);

  const region = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  // useEffect(() => {
  //   const {latitude,longitude} = getCord(curStation)
  //   setLatitude(latitude);
  //   setLongitude(longitude);
  //   if(refs[curStation]){
  //     setTimeout(() => refs[curStation].showCallout(), 0);
  //   }
  // },[props.curStation]);
  const tempPlaceList = ['Hong Kong Park', 'Hong Kong Observatory', 'Tai Po']

  return (
    <View style={styles.container}>
      <MapView
        provider={props.provider}
        style={styles.map}
        showsUserLocation={true}
        region={region}
        minZoomLevel={9}
        maxZoomLevel={16}>
        {itemList.map((card, index) => (
            <Marker
              ref={ref=>refs[card.title]=ref}
              key={card.title}
              coordinate={getCord(tempPlaceList[index])}
              >
              <View style={styles.customMarker}>
                <Image style={styles.logo} source={card.logo}></Image>
              </View>
              <Callout
                alphaHitTest
                tooltip={true}
                onPress={e => {
                  if (
                    e.nativeEvent.action === 'marker-inside-overlay-press' ||
                    e.nativeEvent.action === 'callout-inside-press'
                  ) {
                    return;
                  }
                }}
                style={styles.customView}>
                  <PlaceView
                    logo={card.logo}
                    image={card.image}
                    title={card.title}
                    subtitle={card.subtitle}
                    coordinate={getCord(tempPlaceList[index])}
                  />
              </Callout>
            </Marker>
          ))}
      </MapView>
      <View style={styles.tips}>
        {uvindex.length ?
          <View style={styles.tipLeft}>
            <Ionicon name="sunny" size={18} style={styles.icons}/>
            <Text style={styles.tip}>{' UV Index: ' + uvindex[0].value+ '/10'}</Text>
          </View> : 
          <View style={styles.tipLeft}>
            <Ionicon name="sunny" size={18} style={styles.icons}/>
            <Text style={styles.tip}>{' UV Index: 0/10'}</Text>
          </View>
        }
        {humidity.length ? 
          <View style={styles.tipRight}>
            <Ionicon
                name="thermometer"
                size={18}
                style={styles.icons}
              />
            <Text style={styles.tip}>{' Humidity: ' + humidity[0].value + '%'}</Text>
          </View> : 
          <View style={styles.tipRight}>
            <Ionicon
              name="thermometer"
              size={18}
              style={styles.icons}
            />            
            <Text style={styles.tip}>{' Humidity: 65%'}</Text>
          </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navi:{
    position: 'absolute',
    right: 30, 
    bottom: 30, 
    zIndex:5,
    width:40,
    height:40
  },
  tips:{
    width: 365,
    height:40,
    position:'absolute',
    bottom: 53,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowRadius:5,
    shadowOffset:{width:0,height:0},
    shadowColor:'#000000',
    shadowOpacity:0.1,
  },
  tip:{
    fontSize:17,
    fontWeight:'bold'
  },
  tipLeft:{
    borderRadius: 12,
    width: 170,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    marginLeft: -10,
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
    // alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    height:30,
    width:30,
    backgroundColor: '#ffffff',
    borderRadius:9,
    shadowRadius:3,
    shadowOffset:{width:0,height:0},
    shadowColor:'#000000',
    shadowOpacity:0.4,
    zIndex:4
  },
  logo:{
    height:22,
    width:22,
  },
  customView:{
    // height:60
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: height-65,
    width: width+10,
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height:1200
  },
});

export default Map;
