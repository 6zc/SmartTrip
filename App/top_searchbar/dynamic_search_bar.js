import React, { useState, useRef } from "react";
import { StyleSheet, View, Platform, Animated, Easing, TouchableOpacity } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import { BlurView } from "@react-native-community/blur";
import ResultItem from "./result_item";

const searchBar = props => {
  const {
    itemList,
    navigation,
    collection,
    toggleUpdate,
    rates
  } = props;
  const dataBackup = itemList;
  const [queryText, setQueryText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [showList, setShowList] = useState(false);
  // const [spinnerVisibility, setSpinner] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const driftAnim = useRef(new Animated.Value(700)).current;
  const parallelAni = Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: Platform.OS === "ios" ? 1 : 0.8,
      duration: 300, // return to start
      useNativeDriver: true,
    }),
    Animated.timing(driftAnim, {
      toValue: 60,
      duration: 400,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }),
  ]);

  const filterList = () => {
    // setSpinner(true)
    const textData = queryText.toLowerCase().split(" ").join("");
    if(textData==='liked'){
      setDataSource(dataBackup.filter((item) => {
        return collection.some( value => {
          return value == item.sys.id
        })
      }))
    }else{
      setDataSource(dataBackup.filter((item) => {
        const itemData = item.title.toLowerCase().split(" ").join("");
        const typeData = item.type.toLowerCase().split(" ").join("");
        return itemData.includes(textData) || typeData.includes(textData);
      }))
    }
    // setSpinner(false)
    // setQueryText(text);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        style={[
          styles.bar,
          { backgroundColor: showList ? "#9c9c9c" : "#ffffff" },
        ]}
        fontSize={19}
        placeholder={ queryText || "Find a place" }
        placeholderTextColor={"#9c9c9c"}
        darkMode={ showList ? true : false }
        // spinnerVisibility={spinnerVisibility}
        onFocus={() => {
          setShowList(true);
          parallelAni.start();
          setQueryText('')
        }}
        onBlur={() => {
          filterList()
          // setShowList(false);
          // fadeAnim.setValue(0);
          // driftAnim.setValue(700);
          // setTimeout(() => {
          //   navigation.navigate("Map",{
          //     itemID: dataSource[0].sys.id,
          //   });
          // }, 300)
        }}
        onChangeText={(text) => setQueryText(text)}
        onSearchPress={() => filterList()}
        onClearPress={() => {
          // setQueryText('')
          // filterList("");
          setShowList(false);
          fadeAnim.setValue(0);
          driftAnim.setValue(700);
        }}
        onPress={() => setShowList(true)}
      />
      {showList ? (
        <View style={styles.wrapper}>
          <Animated.View style={{ ...styles.blurWrapper, opacity: fadeAnim }}>
            <BlurView style={styles.blur} blurType="dark" blurAmount={10} />
          </Animated.View>
          <Animated.FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            style={{ ...styles.flatlist, top: driftAnim }}
            data={dataSource}
            keyExtractor={(item) => item.sys.id}
            // pointerEvents={'auto'}
            ListFooterComponent={() => {
              return (
                <View style={styles.footer}>
                  <View style={styles.footer.dot}></View>
                  <View style={styles.footer.line}></View>
                  <View style={styles.footer.dot}></View>
                </View>
              );
            }}
            renderItem={(item) => {
              return (
                <View style={styles.result_item}>
                  <ResultItem
                    rate={rates[item.item.sys.id] || 3}
                    toggleUpdate={toggleUpdate}
                    item={item.item}
                    navigation={navigation}
                    setShowList={setShowList}
                    liked={collection.some( value => {
                      return value == item.item.sys.id
                    })}
                  />
                </View>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    top: -20,
    height: 40,
    width: 320,
    marginTop: 20,
    // justifyContent: 'flex-start',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    line: {
      height: 2,
      width: "90%",
      backgroundColor: "#b5b5b5",
    },
    dot: {
      height: 4,
      width: 4,
      borderRadius: 2,
      backgroundColor: "#b5b5b5",
    },
  },
  result_item: {
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
  },
  wrapper: {
    // top:25,
    width: 430,
    height: 640,
    alignItems: "center",
  },
  blurWrapper: {
    width: 430,
    height: 720,
    position: "absolute",
  },
  flatlist: {
    // top:20,
    width: 350,
    flexGrow: 1,
    height: "100%",
  },
  blur: {
    top: -50,
    width: 430,
    height: 800,
    position: "absolute",
    zIndex: 3,
  },
  contentContainer: {
    alignItems: "center",
  },
  item: {
    backgroundColor: "#ffffff",
    height: 150,
    width: 320,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#757575",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    zIndex: 4,
    top: Platform.OS === "ios" ? 50 : 30,
    height: 45,
    width: 350,
    fontSize: 40,
  },
});

export default searchBar;
