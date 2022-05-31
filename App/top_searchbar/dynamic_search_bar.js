import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Animated} from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import { BlurView } from "@react-native-community/blur";
import ResultItem from './result_item';


const searchbar = props => {
  const {itemList, navigation} = props
  const [queryText, setQueryText] = useState('')
  const [dataSource, setDataSource] = useState(itemList)
  const [dataBackup, setDataBackup] = useState(itemList)
  const [showList, setShowList] = useState(false)

  const filterList = (text) => {
    var newData = dataBackup;
    newData = dataBackup.filter((item) => {
      const itemData = item.place.toLowerCase().split(" ").join("");
      const textData = text.toLowerCase().split(" ").join("");
      return itemData.includes(textData);
    });
    setDataSource(newData)
    setQueryText(text)
    console.log(newData)
  };

  const renderItems = item => {
    return(
      <ResultItem />
    )
  }

  return (
    <View style={styles.container}>
      <SearchBar
        style={styles.bar}
        fontSize={19}
        fontColor="#c6c6c6"
        iconColor="#c6c6c6"
        shadowColor="#282828"
        cancelIconColor="#c6c6c6"
        placeholder="Search here"
        onFocus={()=>setShowList(true)}
        onBlur={()=>setShowList(false)}
        onChangeText={(text) => filterList(text)}
        onSearchPress={() => console.log("Search Icon is pressed")}
        onClearPress={() => {
          filterList("")
          setShowList(false)
        }}
        onPress={() => setShowList(true)}
      />
      {showList?
        <View style={styles.wrapper}>
          <BlurView
            style={styles.blur}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"/>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            style={styles.flatlist}
            data={dataSource}
            renderItem={renderItems}/>
        </View> : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    top:45,
    width:430,
    height:720,
    alignItems: 'center',
    position: 'absolute',
    // justifyContent:'center',
  },
  flatlist: {
    top:60,
    width: 350,
    zIndex:4,
    // alignItems: 'center',
  },
  blur: {
    top:-50,
    width: 430,
    height:800,
    position: 'absolute',
    zIndex:3,
  },
  contentContainer: {
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#ffffff',
    height: 150,
    width: 320,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#757575',
    shadowOpacity: 0.3,
    shadowOffset:{
      width:0,
      height:3
    },
    shadowRadius:8,
    alignItems: 'center',
    justifyContent:'center',
  },
  container: {
    zIndex:2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar:{
    zIndex:4,
    top: 40,
    height:45,
    width:350,
    fontSize:40
  }
});

export default searchbar