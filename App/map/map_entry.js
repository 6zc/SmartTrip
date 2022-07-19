import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Oops from "./oops";
import DynamicSearchBar from "../top_searchbar/dynamic_search_bar";
import MapWrapper from "./map";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

function mapStateToProps(state) {
	return {
		action: state.action,
		username: state.name,
		collection: state.collection,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateCollection: collection =>
			dispatch({
				type: "UPDATE_COLLECTION",
				collection,
			}),
	};
}

const CardsQuery = gql`
	{
		cardsCollection {
			items {
				sys {
					id
				}
				district
				title
				type
				image {
					size
					url
					width
					height
				}
				location {
					lat
					lon
				}
				caption
				logo {
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

const MapEntry = props => {
	const { route, navigation, collection, updateCollection} = props;
  const [ token, setToken] = useState('');
  const [ needUpdate, toggleUpdate ] = useState(1);
  AsyncStorage.getItem("state").then(serializedState => {
    const state = JSON.parse(serializedState);
    if (state && state.token) {
      const { token } = state;
      setToken(token)
    }
  }).catch(error => console.log(error));

  useEffect(() => {
    fetch("http://39.108.191.242:10089/collect", { 
      method: "GET",
      headers: { Authorization: token },
      redirect: "follow",
      cache: "no-cache"
    }).then(response => {
      if(response.status=== 200){
        response.json().then(value => {
          updateCollection(value.data.map(entry=>{
						return entry.collectId
					}))
        });
      }
    }).catch(error => console.log(error))

  }, [token, needUpdate])

  return (
    <Query query={CardsQuery}>
			{({ loading, error, data }) => {
				if (loading || error) return <Oops loading={loading}></Oops>;
				return (
					<View>
						<DynamicSearchBar
							route={route}
							navigation={navigation}
              collection={collection}
							itemList={data.cardsCollection.items}
              toggleUpdate={toggleUpdate}
						/>
						<MapWrapper
							route={route}
							navigation={navigation}
              collection={collection}
							itemList={data.cardsCollection.items}
              toggleUpdate={toggleUpdate}
						/>
					</View>
				);
			}}
		</Query>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MapEntry);
