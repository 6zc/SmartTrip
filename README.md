# Smart Trip

## App Showcases

### Home Page

<img src="https://github.com/6zc/SmartTrip/blob/main/IMG/home/home_main.JPEG" height="500px"> <img src="https://github.com/6zc/SmartTrip/blob/main/IMG/home/home_section.JPEG" height="500px"> <img src="https://github.com/6zc/SmartTrip/blob/main/IMG/home/home_signin.JPEG" height="500px">

### Map Page

<img src="https://github.com/6zc/SmartTrip/blob/main/IMG/map/map_main.JPEG" height="500px"> <img src="https://github.com/6zc/SmartTrip/blob/main/IMG/map/map_search.JPEG" height="500px"> <img src="https://github.com/6zc/SmartTrip/blob/main/IMG/map/map_card.JPEG" height="500px">

For more screenshots, please go to [/IMG](https://github.com/6zc/SmartTrip/tree/main/IMG).

The screen recordings showcasing the usage of our app can be checked here:

[Home Page Recording](https://drive.google.com/file/d/11iOwsIDpmeAUYCKR5p9xcW9_4-qz_SIw/view?usp=sharing)

[Map Page Recording](https://drive.google.com/file/d/1t4CkRdCILN7GqhbdmKxY-obezfR7FQBF/view?usp=sharing)


## Installation

### 1. React-native environment.

[Full Chinese docs (recommended)](https://www.react-native.cn/docs/environment-setup) for those who are new to smart phone app development, including steps for building up iOS/Android development environment on different platforms.

[English docs for react-native setting up](https://reactnative.dev/docs/0.67/environment-setup) for those who already has relative environments but are new to react-native.

Don't run steps for compilation as dependicies are not installed.

### 2. Deps

Under the root folder of the project, in terminal run:

```bash
npm install
cd ios && pod install && cd ..
# For those Apple Silicon user, if pod install meet any problem, check these commands.
# sudo arch -x86_64 gem install ffi
# arch -x86_64 pod install
```

### 3. Google API key

#### Important! Especially for Android users.  

#### 3.1 Follow the link [Setting Up API key](https://developers.google.com/maps/documentation/android-sdk/get-api-key#release-cert) and get your API key.

#### 3.2 Turn on this API [Map SDK](https://console.cloud.google.com/apis/library/maps-android-backend.googleapis.com)

#### 3.3 Add your API key to your manifest file

In `android/app/src/main/AndroidManifest.xml`:

```xml
<application>
   <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="Your Google maps API Key Here"/>
</application>
```

4.29 Update:

**DONT UPGRADE** to react-native-map@**0.31.0** and keep using **0.30.x**. May lead to compilation error on iOS.

I can't expose my API key becaues it would lead to serious warnings from Google.

Without the API key, the compilation on Android would fail but on iOS still works fine.

### 4. Compilation

```bash
# Under the root folder
yarn ios
# or for Android
yarn android
```

That's it! You made it!
