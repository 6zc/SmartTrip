import React from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

/**
 * @param {int} rate 具体评分数值
 * @param {int} width 评分组件整体宽度，内部space-between
 * @param {boolean} rateAble 是否可以评分，不可以则只展示 无Press事件触发
 * @param {object} style 希望应用的style（可选）
 */
const Rating = (props) => {
  const { rate, width:fullwidth, style, rateAble } = props;
  const faceArray = ['frown', 'meh','smile', 'grin','grin-beam', 'grin-hearts']
  const face = faceArray[Math.floor(rate)]

  const faceWidth = (fullwidth/5)*0.8
  let rateArray = new Array(5).fill(0);
  rateArray = rateArray.map((_item, index) => {
    if (index < Math.floor(rate)) return 1;
    else if (index > rate) return 0;
  });
  //TODO
  const handleRating = (index, e) => {
    if(!rateAble){
      e.stopPropagation();
      return;
    }
    Alert.alert(`Rate this place as ${index+1}`)
    // fetch ......
  }

  return(
    <View style={[styles.container, {width:fullwidth}, style]}>
      {rateArray.map((value, _i)=>(
        rateAble ?
        <TouchableOpacity
          onPressOut={(e)=>handleRating(_i,e)}
        >
          <FontAwesome
            solid
            key={_i}
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
