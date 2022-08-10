import React, { useEffect, useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicon from "react-native-vector-icons/Ionicons";

/**
 * @param {boolean} liked 首次加载时收藏情况
 * @param {obejct} sys 获取对应 Place 的 sys.id
 * @param {function} toggleUpdate 用于触发父组件重新渲染的函数，更新服务器端最新状态（可选）
 * @param {object} style 希望应用的style（可选）
 */
const Collection = props => {
  const {
    toggleUpdate = ()=>{},
    liked = false,
    style,
    sys
  } = props;

  const [ displayLiked, setLiked ] = useState(liked);
  useEffect(() => {
    setLiked(liked)
  },[liked])

  const handleLike = id => {
    AsyncStorage.getItem("state").then(serializedState => {
			const state = JSON.parse(serializedState);
			if (state && state.token) {
        const { token } = state;
        fetch(`http://120.77.255.227:10089/collect/${id}`, { 
          method: liked ? "PUT":"POST",
          headers: {
            Authorization: token
          },
          redirect: "follow",
          cache: "no-cache"
        }).then(response => {
          if(response.status === 200){
            response.json().then(value => {
              if(value.msg==='success'){
                Alert.alert("Operation success!")
                toggleUpdate(Math.random())
                setLiked(!displayLiked);
              }else{
                Alert.alert("Operation failed. Try again later :(")
                toggleUpdate(Math.random())
              }
            });
          }else{
            Alert.alert("Something went wrong. Try again later :(")
            toggleUpdate(Math.random())
          }
        }).catch(error => console.log(error))
			}
		}).catch(error => console.log(error));
  }

  return (
    <TouchableOpacity
      style={style}
      onPressOut={()=>handleLike(sys.id)}
    >
      {displayLiked ? (
        <Ionicon name="heart" size={40} color="#ff4040" />
      ) : (
        <Ionicon name="heart-outline" size={40} color="#4c4c4c" />
      )}
    </TouchableOpacity>
  )

}

export default Collection;
