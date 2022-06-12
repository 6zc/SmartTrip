import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import EIcon from 'react-native-vector-icons/Ionicons';
import AIcon from 'react-native-vector-icons/AntDesign';
import User from 'react-native-vector-icons/Entypo'
import LoginPage from './Personal/main'
import DynamicSearchBar from './top_searchbar/dynamic_search_bar'
import MapWrapper from './map/map';
import MainPage from './main/main';
import { LogBox } from "react-native";

EIcon.loadFont();
AIcon.loadFont();
User.loadFont();

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const Tabs = AnimatedTabBarNavigator();
const App = () => {
  const [curStation, setCurStation] = useState('Hong Kong Park');
  const [stationList, setStationList] = useState([])
  const [humidity, setHumidity] = useState([])
  const [uvindex, setUvindex] = useState([])

  useEffect(() => {
    async function fetchData(){
      try {
        let response = await fetch('http://47.94.208.98:8080/homepage');
        let responseJson = await response.json();
        setStationList(responseJson.temperature.data)
        setHumidity(responseJson.humidity ? responseJson.humidity.data : [])
        setUvindex(responseJson.uvindex ? responseJson.uvindex.data : [])
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  },[])

  const Main = props => {
    return (
      <MainPage></MainPage>
    )
  }
  //
  const Login = props => {
    return (
      <Login></Login>
    )
  }
  // Declare your page component
  const Map = props => {
    return (
      <View>
        <DynamicSearchBar
          navigation={props.navigation}
          itemList={stationList}
          setCurStation={setCurStation}
          curStation={curStation}/>
        <MapWrapper
          navigation={props.navigation}
          stationList={stationList}
          curStation={curStation}
          humidity={humidity}
          uvindex={uvindex}/>
      </View>
    );
  };
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: '#ffffff',
          activeBackgroundColor: '#4da4dd',
          tabStyle:{
            backgroundColor: '#f1f1f1',
            height:100,
          },
          labelStyle: {
            fontSize: 24,
          },
        }}>
        <Tabs.Screen
          name="Main"
          component={Main}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <AIcon
              name="home"
              size={34}
              color={focused ? color : '#4da4dd'}
              focused={focused}
              />
              ),
            }}
        />
        <Tabs.Screen
          name="Map"
          component={Map}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <EIcon
                name="location-sharp"
                size={30}
                color={focused ? color : '#4da4dd'}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Sign Up"
          component={LoginPage}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <User
                name="user"
                size={34}
                color={focused ? color : '#4da4dd'}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  today: {
    backgroundColor: '#4da4dd',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 780,
    width: 400,
  },
});

export default App;
