import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * @param {int} rate 具体评分数值
 * @param {int} width 评分组件整体宽度，内部space-between
 * @param {string} id card.sys.id
 * @param {boolean} rateAble 是否可以评分，不可以则只展示 无Press事件触发
 * @param {object} style 希望应用的style（可选）
 */
const Rating = props => {
  const {
    rate = 3,
    width:fullwidth,
    style,
    rateAble,
    children,
    id
  } = props;
  const [ userRate, setUserRate ] = useState(rate);

  const faceArray = ['meh-blank', 'meh','smile', 'grin','grin-beam', 'grin-hearts'];
  let face = faceArray[Math.floor(userRate)];

  useEffect(()=>{
    face = faceArray[Math.floor(userRate)];
  }, [userRate])

  const faceWidth = (fullwidth/5)*0.8
  let rateArray = new Array(5).fill(0);
  rateArray = rateArray.map((_item, index) => {
    if (index < Math.floor(userRate)) return 1;
    else if (index >= userRate) return 0;
  });

  const handleRating = (index, e) => {
    if(!rateAble){
      e.stopPropagation();
      return;
    }
    if(index+1 === userRate){
      Alert.alert("Same score, no need to rate.")
      return;
    }
    AsyncStorage.getItem("state").then(serializedState => {
			const state = JSON.parse(serializedState);
			if (state && state.token) {
        const { token } = state;
        fetch(`http://39.108.191.242:10089/rank`, { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            score: index+1,
            placeId: id,
          }),
          redirect: "follow",
          cache: "no-cache"
        }).then(response => {
          console.log(response)
          if(response.status === 200){
            response.json().then(value => {
              console.log(value)
              if(value.msg==='success'){
                Alert.alert("Operation success!")
                setUserRate(index+1);
              }else{
                Alert.alert("Operation failed. Try again later :(")
              }
            });
          }else{
            Alert.alert("Something went wrong. Try again later :(")
          }
        }).catch(error => console.log(error))
			}
		}).catch(error => console.log(error));
  }

  return(
    <View style={[styles.container, {width:fullwidth}, style]}>
      {rateArray.map((value, _i)=>(
        rateAble ?
        <TouchableOpacity
          key={_i}
          onPressOut={(e)=>handleRating(_i,e)}
        >
          <FontAwesome
            solid
            name={face}
            size={faceWidth}
            color={value === 1?"#ffd700":"#cecece"}
          />
        </TouchableOpacity>
        :
        <FontAwesome
          solid
          key={_i}
          name={face}
          size={faceWidth}
          color={value === 1?"#ffd700":"#cecece"}
        />
      ))}
      {children}
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
});

export default Rating;
