import React from "react";
import { Svg, Image as ImageSvg } from "react-native-svg";

const TYPES = {
  "Theme Park": require("../resource/theme-park.png"),
  Bar: require("../resource/bar.png"),
  Museum: require("../resource/museum.png"),
  "Movie theater": require("../resource/movie.png"),
  Park: require("../resource/park.png"),
  Restaurant: require("../resource/restaurant.png"),
  Default: require("../resource/location.png"),
};

const Logo = (props) => {
  const { type, height, width, style } = props;
  let path = TYPES[type] || TYPES.Default;
  return (
    <Svg width={width} height={height} style={style}>
      <ImageSvg
        width={"100%"}
        height={"100%"}
        preserveAspectRatio="xMidYMid slice"
        href={path}
      />
    </Svg>
  );
};

export default Logo;
