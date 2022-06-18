import React, { useRef } from "react";
import {StyleSheet, View, Text, Image, Animated, Easing} from 'react-native';

const Oops=(props) => {
  const { loading } = props
  const spinAnim = useRef(new Animated.Value(0)).current

  Animated.loop(Animated.timing(spinAnim, {
    toValue: 100,
    duration: 2000,
    easing: Easing.linear,
    useNativeDriver: true,
  })).start()

  const interpolatedAnimation = spinAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      {loading ?
        <Animated.View
        style={[styles.logo,
          {transform: [
              {rotate: interpolatedAnimation},
          ]}]}>
          <Image style={styles.loading} source={require('../resource/loading.png')}></Image>
        </Animated.View>
        :
        <Image style={styles.error} source={require('../resource/error.png')}></Image>
      }
      {loading ?
        <Text style={styles.tip}>{'Loading...'}</Text> :
        <Text style={styles.tip}>{'Oops! :(\nTry again later.'}</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent:'center',
  },
  loading: {
    height:50,
    width:50,
    opacity:0.6
  },
  error: {
    height:50,
    width:50,
    opacity:0.6
  },
  tip: {
    fontSize: 30,
    fontWeight:'bold',
    opacity: 0.6,
    // right: -12,
    top: 15,
    textAlign: 'center'
  }
})

export default Oops