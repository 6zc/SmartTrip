import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { Svg, Image as ImageSvg } from "react-native-svg";

const TYPES = {
  "Theme Park": require("../main/assets/theme-park.png"),
  "Bar": require("../main/assets/bar.png"),
  "Museum": require("../main/assets/museum.png"),
  "Movie Theater": require("../main/assets/movie.png"),
  "Coffee Shop": require("../main/assets/coffee.png"),
  "Park": require("../main/assets/park.png"),
  "Restaurant": require("../main/assets/restaurant.png"),
  "Book Shop": require("../main/assets/bookshop.png"),
  "Grocery Store": require("../main/assets/grocery.png"),
  "Shopping Mall": require("../main/assets/shopping.png"),
  "Zoo": require("../main/assets/zoo.png"),
  "Default": require("../main/assets/point-of-interest.png"),
};

const Logo = props => {
  const { type, height, width, style } = props;
  let path = TYPES[type] || TYPES.Default;
  return (
    <View style={styles.container}>
      <Svg 
        width={width}
        height={height}
        style={style}>
        <ImageSvg
          width={"100%"}
          height={"100%"}
          preserveAspectRatio="xMidYMid slice"
          href={path}
          />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#DCDCDC'
  }
})

export default Logo;
