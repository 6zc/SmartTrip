import Geolocation from '@react-native-community/geolocation';

function calDistance(coord1, coord2){
  const { lat:lat1, lng:lng1 } = coord1;
  const { lat:lat2, lon:lng2 } = coord2;
  let radLat1 = lat1*Math.PI / 180.0;
  let radLat2 = lat2*Math.PI / 180.0;
  let a = radLat1 - radLat2;
  let  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
  Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
  s = s * 6378.137 ; // EARTH_RADIUS;
  s = Math.round(s * 10) / 10;
  return s;
}

function getUserPosition() {
  let Camera = {
    center: {
      latitude: 1,
      longitude: undefined
    },
    altitude: 30000,
    // pitch: 0,
    zoom: 12,
  }

  Geolocation.getCurrentPosition(
    pos => {
      Camera.center.latitude = pos.coords.latitude;
      Camera.center.longitude = pos.coords.longitude+0.005;
    },
    error => {
      console.log(error.code, error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
      accuracy: { 
        android: 'balanced',
        ios: 'threeKilometers	',
      }
    }
  );
  return Camera
}

function getCamera(lon = 0, lat = 0, offset = 0) {
  return {
    center: {
      latitude: lat+offset,
      longitude: lon
    },
    altitude: 30000,
    // pitch: 0,
    zoom: 12,
  }
}

function getTempColor(temp) {
  const colorList = [
    "#00FFFF",
    "#97FFFF",
    "#7FFFD4",
    "#C1FFC1",
    "#54FF9F", //blue
    "#9AFF9A",
    "#7FFF00",
    "#C0FF3E",
    "#CAFF70", //green
    "#FFF68F",
    "#FFEC8B",
    "#FFD700",
    "#FFC125", //yellow
    "#FF8247",
    "#FF3030",
    "#8B2323", //red
  ];
  temp = parseInt(temp, 10);
  if (temp >= 40) {
    return colorList[15];
  } else if (temp <= -8) {
    return colorList[0];
  } else {
    return colorList[Math.floor(temp / 3)];
  }
}

function getWeatherDesc(uv, rain, night) {
  if(rain===0){
    if(night) return ['Good Night', 'moon'];
    if(uv<4) return ['Cloudy', 'cloud-sun'];
    else if(uv<10) return ['Sunny', 'sun'];
    else return ['Sunburnt', 'umbrella-beach'];
  }
  else if(rain<5) return ['Drizzling', 'umbrella'];
  else if(rain<10) return ['Raining', uv>4?'cloud-sun-rain':'cloud-rain'];
  else if(rain<20) return ['Heavily',uv>4?'cloud-sun-rain':'cloud-showers-heavy'];
  else return ['Rainstorm', 'cloud-showers-heavy'];
}

function getCovidDesc(count) {
  if(count === 0) return 'No Risk';
  else if(count<100) return 'Low Risk';
  else if(count<500 || !count) return 'Mild Risk';
  else if(count<1000) return 'High Risk';
  else return 'Very High Risk';
}

export { 
  calDistance,
  getTempColor,
  getUserPosition,
  getCamera,
  getWeatherDesc,
  getCovidDesc,
};
