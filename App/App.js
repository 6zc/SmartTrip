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
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";
import gql from "graphql-tag";

EIcon.loadFont();
AIcon.loadFont();
User.loadFont();

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const Tabs = AnimatedTabBarNavigator();
const client = new ApolloClient({
	uri: "https://graphql.contentful.com/content/v1/spaces/z5ui7o420lkc",
	credentials: "same-origin",
	headers: {
		Authorization: `Bearer qxbc_UQWulK8HYHtWVowQoTNj14vFHhiYeQ_9QX-19A`,
	},
});
const CardsQuery = gql`
	{
		cardsCollection {
			items {
				title
				subtitle
				image {
					title
					description
					contentType
					fileName
					size
					url
					width
					height
				}
				subtitle
				caption
				logo {
					title
					description
					contentType
					fileName
					size
					url
					width
					height
				}
				content
			}
		}
	}
`;


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
      <Query query={CardsQuery}>
        {({ loading, error, data }) => {
          return (
            <View>
              <DynamicSearchBar
                navigation={props.navigation}
                itemList={data.cardsCollection.items}
                setCurStation={setCurStation}
                curStation={curStation}/>
              <MapWrapper
                navigation={props.navigation}
                itemList={data.cardsCollection.items}
                stationList={stationList}
                curStation={curStation}
                humidity={humidity}
                uvindex={uvindex}/>
            </View>)}}
      </Query>
    );
  };
  return (
    <ApolloProvider client={client}>
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
            name="Login"
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
    </ApolloProvider>
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
