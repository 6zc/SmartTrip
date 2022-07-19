import { Linking, Platform } from "react-native";
import { showLocation } from "react-native-map-link";
const linkingToMap = {
  turn2MapApp(lon = 0, lat = 0) {
    if (0 == lat && 0 == lon) {
      console.warn("Not a valid location");
      return;
    }
    let url = "";
    if (Platform.OS == "android") {
      //android
      url = `https://maps.google.com/?daddr=${lon},${lat}`;
    } else if (Platform.OS == "ios") {
      //ios
      // url = `https://maps.google.com/?daddr=${lon},${lat}&saddr=here`

      url = `https://maps.apple.com/?daddr=${lon},${lat}&saddr=here`;
    }

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
          // return Linking.openURL(webUrl).catch(e => console.warn(e));
        } else {
          return Linking.openURL(url).catch((e) => console.warn(e));
        }
      })
      .catch((err) => console.error("An error occurred", err));
  },
  link2map(lon = 0, lat = 0, title = "") {
    if (lon === 0 || lat === 0) {
      lat = undefined;
      lon = undefined;
    }
    showLocation({
      latitude: lat,
      longitude: lon,
      // sourceLatitude: -8.0870631,  // optionally specify starting location for directions
      // sourceLongitude: -34.8941619,  // not optional if sourceLatitude is specified
      title: title, // optional
      googleForceLatLon: false, // optionally force GoogleMaps to use the latlon for the query instead of the title
      alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
      dialogTitle: "Before we start...", // optional (default: 'Open in Maps')
      dialogMessage: "Which map app do you prefer?", // optional (default: 'What app would you like to use?')
      cancelText: "Cancel navigation", // optional (default: 'Cancel')
      appsWhiteList: ["google-maps", "apple-maps"], // optionally you can set which apps to show (default: will show all supported apps installed on device)
      naverCallerName: "com.example.myapp", // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
      // appTitles: { 'google-maps': 'My custom Google Maps title' }, // optionally you can override default app titles
      directionsMode: "walk", // optional, accepted values are 'car', 'walk', 'public-transport' or 'bike'
    });
  },
};
export default linkingToMap;
