import { Linking, Platform } from "react-native";
import { showLocation } from 'react-native-map-link'
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
    link2map(lon =0, lat = 0, title=''){
        console.log(lon,lat)
        showLocation({
            latitude: lat,
            longitude: lon,
            // sourceLatitude: -8.0870631,  // optionally specify starting location for directions
            // sourceLongitude: -34.8941619,  // not optional if sourceLatitude is specified
            title: title,  // optional
            googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            // googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
            dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
            cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
            // appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
            naverCallerName: 'com.example.myapp', // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
            // appTitles: { 'google-maps': 'My custom Google Maps title' }, // optionally you can override default app titles
            // app: 'uber',  // optionally specify specific app to use
            directionsMode: 'walk' // optional, accepted values are 'car', 'walk', 'public-transport' or 'bike'
        })
    }
};
export default linkingToMap;
