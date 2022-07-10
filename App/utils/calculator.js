// import Geolocation from 'react-native-geolocation-service'
import Geolocation from '@react-native-community/geolocation';

function calDistance(coord1, coord2){
  // console.log(coord1, coord2);
  const { lat:lat1, lng:lng1 } = coord1;
  const { lat:lat2, lon:lng2 } = coord2;
  let radLat1 = lat1*Math.PI / 180.0;
  let radLat2 = lat2*Math.PI / 180.0;
  let a = radLat1 - radLat2;
  let  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
  Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
  s = s * 6378.137 ;// EARTH_RADIUS;
  s = Math.round(s * 10) / 10;
  return s;
}

function getUserPosition() {
  let Camera = {
    center: {
      latitude: undefined,
      longitude: undefined
    },
    altitude: 30000,
    // pitch: 0,
    zoom: 5,
  }

  Geolocation.getCurrentPosition(
    pos => {
      Camera.center = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude+0.005,
      };
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
    zoom: 5,
  }
}

function Cal(temp) {
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

function getCord(name) {
  const cordList = {
    "Kai Tak Runway Park": { latitude: 22.3043, longitude: 114.21556 },
    "King's Park": { latitude: 22.31271, longitude: 114.17386 },
    "Hong Kong Observatory": { latitude: 22.3023, longitude: 114.17431 },
    "Wong Chuk Hang": { latitude: 22.24552, longitude: 114.16698 },
    "Ta Kwu Ling": { latitude: 22.54208, longitude: 114.16358 },
    "Lau Fau Shan": { latitude: 22.4675, longitude: 113.98419 },
    "Tai Po": { latitude: 22.4425, longitude: 114.16531 },
    "Sha Tin": { latitude: 22.37278, longitude: 114.19717 },
    "Tuen Mun": { latitude: 22.4008, longitude: 113.94308 },
    "Tseung Kwan O": { latitude: 22.30719, longitude: 114.2606 },
    "Sai Kung": { latitude: 22.4194, longitude: 114.33264 },
    "Chek Lap Kok": { latitude: 22.30541, longitude: 113.91899 },
    "Tsing Yi": { latitude: 22.34626, longitude: 114.10219 },
    "Shek Kong": { latitude: 22.43245, longitude: 114.08722 },
    "Tsuen Wan Ho Koon": { latitude: 22.3835, longitude: 114.10809 },
    "Tsuen Wan Shing Mun Valley": { latitude: 22.37449, longitude: 114.12505 },
    "Hong Kong Park": { latitude: 22.27722, longitude: 114.16035 },
    "Shau Kei Wan": { latitude: 22.27769, longitude: 114.22729 },
    "Kowloon City": { latitude: 22.32853, longitude: 114.18941 },
    "Happy Valley": { latitude: 22.26877, longitude: 114.18505 },
    "Wong Tai Sin": { latitude: 22.34095, longitude: 114.19383 },
    Stanley: { latitude: 22.21965, longitude: 114.21367 },
    "Kwun Tong": { latitude: 22.31168, longitude: 114.22357 },
    "Sham Shui Po": { latitude: 22.32954, longitude: 114.15844 },
    "Yuen Long Park": { latitude: 22.44215, longitude: 114.01889 },
    "Tai Mei Tuk": { latitude: 22.47496, longitude: 114.23462 },
  };
  return cordList[name];
}

function getWeatherDesc(uv, rain) {
  if(rain===0){
    if(uv<4) return 'Cloudy';
    else if(uv<8) return 'Serene';
    else return 'Sunny'
  }
  else if(rain<5) return 'Drizzling';
  else if(rain<10) return 'Raining';
  else if(rain<20) return 'Raining Heavily';
  else return 'Rainstorm'
}

export { 
  Cal,
  getCord,
  getUserPosition,
  calDistance,
  getCamera,
  getWeatherDesc
};

// export default Cal;
