import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import CustomCallout from './custom_callout';
import {Cal, getCord} from '../utils/calculator';
import Linking from '../utils/linking';
import EIcon from 'react-native-vector-icons/Ionicons';

EIcon.loadFont();

const refs = []

const {width, height} = Dimensions.get('window');

const Map = (props) => {
  const {stationList, curStation, humidity, uvindex} = props
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.4;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [latitude, setLatitude] = useState(22.2745);
  const [longitude, setLongitude] = useState(114.1533);

  const region = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  useEffect(() => {
    const {latitude,longitude} = getCord(curStation)
    setLatitude(latitude);
    setLongitude(longitude);
    if(refs[curStation]){
      setTimeout(() => refs[curStation].showCallout(), 0);
    }
  },[props.curStation]);

  return (
    <View style={styles.container}>
      <MapView
        provider={props.provider}
        style={styles.map}
        showsUserLocation={true}
        region={region}
        minZoomLevel={9}
        maxZoomLevel={15}
        zoomTapEnabled={false}>
        {stationList.map(marker => (
          getCord(marker.place) ?
          <Marker
            ref={ref=>refs[marker.place]=ref}
            key={marker.place}
            coordinate={getCord(marker.place)}
            >
            <View style={styles.customMarker}>
              <View
                style={[
                  styles.textWrapper,
                  {backgroundColor: Cal(marker.value)},
                ]}>
                <Text style={styles.temp}>{marker.value}</Text>
                <Text style={styles.celsius}>{'°C'}</Text>
              </View>
            </View>
            <Callout
              alphaHitTest
              onPress={e => {
                if (
                  e.nativeEvent.action === 'marker-inside-overlay-press' ||
                  e.nativeEvent.action === 'callout-inside-press'
                ) {
                  return;
                } else{
                  Linking.link2map(...Object.values(getCord(marker.place)), marker.place)
                }
              }}
              style={styles.customView}>
              <CustomCallout weatherObj={marker} />
            </Callout>
          </Marker> : null
        ))}
      </MapView>
      <View style={styles.tips}>
        {uvindex.length ?
          <View style={styles.tipLeft}>
            <EIcon name="sunny" size={18} style={styles.icons}/>
            <Text style={styles.tip}>{' UV Index: ' + uvindex[0].value+ '/10'}</Text>
          </View> : 
          <View style={styles.tipLeft}>
            <EIcon name="sunny" size={18} style={styles.icons}/>
            <Text style={styles.tip}>{' UV Index: 0/10'}</Text>
          </View>
        }
        {humidity.length ? 
          <View style={styles.tipRight}>
            <EIcon
                name="thermometer"
                size={18}
                style={styles.icons}
              />
            <Text style={styles.tip}>{' Humidity: ' + humidity[0].value + '%'}</Text>
          </View> : 
          <View style={styles.tipRight}>
            <EIcon
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
  tips:{
    width: 365,
    height:40,
    position:'absolute',
    bottom: 53,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tip:{
    fontSize:17,
    fontWeight:'bold'
  },
  tipLeft:{
    borderRadius: 15,
    width: 170,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    marginLeft: -10,
    alignItems: 'center',
    justifyContent:'center',

  },
  tipRight:{
    borderRadius: 15,
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
    alignSelf: 'flex-start',
    alignItems: 'center',
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
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
