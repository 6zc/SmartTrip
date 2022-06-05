import { Linking, Platform } from 'react-native';
const linkingToMap = {
    /**
     * 跳转到导航界面
     * @param lon
     * @param lat
     */
    turn2MapApp(lon = 0, lat = 0){
        if (0 == lat && 0 == lon) {
            console.warn('Not a valid location');
            return;
        }
        let url = '';
        if (Platform.OS == 'android') {//android
            url = `https://maps.google.com/?daddr=${lon},${lat}`
        } else if (Platform.OS == 'ios') {//ios
            url = `https://maps.apple.com/?daddr=${lon},${lat}`
        }

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
                // return Linking.openURL(webUrl).catch(e => console.warn(e));
            } else {
                return Linking.openURL(url).catch(e => console.warn(e));
            }
        }).catch(err => console.error('An error occurred', err));
    },

};
export default linkingToMap
