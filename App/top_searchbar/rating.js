import React from "react";
import { StyleSheet, View } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";

const Rating = props => {
  const { rate } = props;
  return(
    rate===1?
    <Ionicon name="star" size={18} color="#ffd700"/>:
    (rate===0.5?<Ionicon name="star-half" size={18} color="#ffd700"/>:
    <Ionicon name="star" size={18} color="#cecece"/>
    )
  )
}

export default Rating
