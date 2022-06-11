import React from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import EIcon from 'react-native-vector-icons/Ionicons';
EIcon.loadFont();

const CustomCallout = props => {
  const weatherObj = props.weatherObj;
  const {place, value} = weatherObj;
  const rainfall = {}
  if(!weatherObj.rainfall){
    rainfall.max = 0
  }else{
    rainfall.max = weatherObj.rainfall.max
  }
  // const rainIcon = rainfall.max === 0?'sun':(rainfall.max>25?'cloud-rain':'cloud-showers-heavy')
  return (
    <View style={[styles.container, props.style]}>
      <View style={[styles.bubble, {width:Math.max(place.length*9+20, 130)}]}>
        <View style={[styles.lines,{marginTop:-6},{marginBottom:2}]}>
          <EIcon name="navigate" size={18} style={styles.icons}/>
          <Text style={styles.tip}>{'  ' + place}</Text>
        </View>
        <View style={styles.lines}>
          <EIcon name="thermometer-outline" size={18} style={styles.icons}/>
          <Text style={styles.tip}>{ '  '+value + '°C'}</Text>
        </View>
        <View style={styles.lines}>
          <EIcon name="water" size={18} style={styles.icons}/>
          <Text style={styles.tip}>{'  ' + rainfall.max + ' mm rainfall'}</Text>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tip:{
    fontSize:15,
    fontWeight:'bold'
  },
  icons: {
    // paddingRight: 3,
  },
  lines: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    height: Platform.OS === 'ios' ? 46 : 70,
    // height:43,
    flexDsirection: 'column',
    justifyContent: Platform.OS === 'ios' ? '':'center',
    backgroundColor: '#ffffff',
  },
  amount: {
    flex: 1,
  },
});

export default CustomCallout;
